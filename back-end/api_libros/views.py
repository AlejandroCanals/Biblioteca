from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from django.conf import settings
from .serializers import LibroSerializer, FavoritoSerializer
import requests 
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from .models import Favorito, Libro

#Trae los datos (titulo,autor,imagen y fecha) haciendo una llamada a la api de google

class LibroListView(APIView):
    def get(self, request, titulo):
        max_results = 40
        url = f"https://www.googleapis.com/books/v1/volumes?q=intitle:{titulo}&maxResults={max_results}&fields=items(volumeInfo/title,volumeInfo/authors,volumeInfo/imageLinks/thumbnail,volumeInfo/publishedDate)"
        response = requests.get(url)

        if response.status_code == 200:
            data = response.json()
            libros = data.get('items', [])

            if libros:
                libros_data = [] 
                for libro in libros:
                    libro_info = libro.get('volumeInfo', {})
                    titulo = libro_info.get('title', 'Desconocido')
                    autores = libro_info.get('authors', ['Desconocido'])
                    imagen = libro_info.get('imageLinks', {}).get('thumbnail', None)
                    fecha_publicacion = libro_info.get('publishedDate','Desconocido')

                    serializer = LibroSerializer(data={
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

    def get(self, request):
        favoritos = Favorito.objects.filter(user=request.user)
        serializer = FavoritoSerializer(favoritos, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        libro_id = request.data.get('libro_id')
        if not libro_id:
            return Response({"error": "Se requiere el ID del libro"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            libro = Libro.objects.get(id=libro_id)
        except Libro.DoesNotExist:
            return Response({"error": "Libro no encontrado"}, status=status.HTTP_404_NOT_FOUND)
        
        favorito, created = Favorito.objects.get_or_create(user=request.user, libro=libro)

        if created:
            return Response({"message": "El libro añadido a favoritos"}, status=status.HTTP_201_CREATED)
        else:
            return Response({"message": "El libro ya existe"}, status=status.HTTP_200_OK)
        
    def delete(self, request):
        libro_id = request.data.get('libro_id')
        if not libro_id:
            return Response({"error": "Se requiere el ID del libro"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            libro = Libro.objects.get(id=libro_id)
        except Libro.DoesNotExist:
            return Response({"error": "Libro no encontrado"}, status=status.HTTP_404_NOT_FOUND)
        
        try:
            favorito = Favorito.objects.get(user=request.user, libro=libro)
            favorito.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Favorito.DoesNotExist:
            return Response({"error": "El libro no esta en favoritos"}, status=status.HTTP_404_NOT_FOUND)