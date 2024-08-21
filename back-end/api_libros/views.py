from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import LibroSerializer, FavoritoSerializer
import requests 
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import Favorito, Libro


class LibroListView(APIView):

    #Trae los datos (titulo,autor,imagen y fecha) haciendo una llamada a la api de google
    def get(self, request, titulo):
        max_results = 40
        url = f"https://www.googleapis.com/books/v1/volumes?q=intitle:{titulo}&maxResults={max_results}&fields=items(id,volumeInfo/title,volumeInfo/authors,volumeInfo/imageLinks/thumbnail,volumeInfo/publishedDate)"
        response = requests.get(url)

        """
        Se realiza una consulta a la api de google para acceder a los libros con el titulo que hemos requerido, se crea una lista y agregamos el contenido que necesitamos a esa lista, luego
        serializamos los datos para pasarlos al front 
        """
        if response.status_code == 200:
            data = response.json()
            libros = data.get('items', [])

            if libros:
                libros_data = [] 
                for libro in libros:
                    libro_id = libro.get('id', 'Desconocido')
                    libro_info = libro.get('volumeInfo', {})
                    titulo = libro_info.get('title', 'Desconocido')
                    autores = libro_info.get('authors', ['Desconocido'])
                    imagen = libro_info.get('imageLinks', {}).get('thumbnail', None)
                    fecha_publicacion = libro_info.get('publishedDate','Desconocido')

                    serializer = LibroSerializer(data={
                        'google_id': libro_id,
                        'titulo': titulo,
                        'autor': autores,
                        'imagen_portada': imagen,
                        'fecha_publicacion' : fecha_publicacion
                    })
                 
                    if serializer.is_valid():
                        libros_data.append(serializer.data)
                    else:
                        print("Errores en el serializador:", serializer.errors)
                print(libros_data)
                return Response(libros_data, status=status.HTTP_200_OK)
        
        return Response({"error": "No se encontraron resultados"}, status=status.HTTP_404_NOT_FOUND)        

class FavoritoListView(APIView):
    permission_classes = [IsAuthenticated]

    #Muestra los libros que tiene en favoritos cada usuario
    def get(self, request):
        favoritos = Favorito.objects.filter(user=request.user)
        serializer = FavoritoSerializer(favoritos, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    
    #Agrega un libro a favoritos
    def post(self, request):
        #Se pasa el id de google que tiene el libro para recuperar sus datos y guardar la info en la base de datos
        google_id = request.data.get('google_id')
        if not google_id:
            return Response({"error": "Se requiere el ID de Google del libro"}, status=status.HTTP_400_BAD_REQUEST)
        
        google_book_url = f"https://www.googleapis.com/books/v1/volumes/{google_id}"
        google_response = requests.get(google_book_url)
        
        if google_response.status_code != 200:
            return Response({"error": "Libro no encontrado en Google Books"}, status=status.HTTP_404_NOT_FOUND)
        
        google_data = google_response.json()
        libro_info = google_data.get('volumeInfo', {})
        titulo = libro_info.get('title', 'Desconocido')
        autores = libro_info.get('authors', [])
        autores_str = ', '.join(autores)  # Une los nombres de los autores en una sola cadena
        imagen = libro_info.get('imageLinks', {}).get('thumbnail', None)
        fecha_publicacion = libro_info.get('publishedDate', 'Desconocido')


        libro, created = Libro.objects.get_or_create(
            google_id=google_id,
            defaults={
                'titulo': titulo,  # Limitar longitud
                'autor': autores_str,  # Limitar longitud
                'imagen_portada': imagen,  # Limitar longitud
                'fecha_publicacion': fecha_publicacion # Limitar longitud
            }
        )
        
        favorito, created = Favorito.objects.get_or_create(user=request.user, libro=libro)

        if created:
            return Response({"message": "El libro añadido a favoritos"}, status=status.HTTP_201_CREATED)
        else:
            return Response({"message": "El libro ya existe"}, status=status.HTTP_200_OK)
        
    #Elimina un libro de favoritos
    def delete(self, request):
        """Mediante la id de google del libro , hacemos una consulta a nuestro modelo libro de la base de datos, si lo encuentra,
            realiza otra consulta al modelo favoritos pasando la informacion del libro y el usuario que pide la eliminacion del libro"""
        
        id = request.data.get('id')

        if not id :
            return Response({"error": "Se requieren el libro_id y el user_id"},status=status.HTTP_400_BAD_REQUEST)
        
        try:
            favorito = Favorito.objects.get(id =id)
            favorito.delete()
            return Response({"message": "Se ha eliminado el libro correctamente"},status=status.HTTP_204_NO_CONTENT)
        except Favorito.DoesNotExist:
            return Response({{"error": "El libro no esta en favortios"}}, status=status.HTTP_404_NOT_FOUND)
        