from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from django.conf import settings
from .serializers import LibroSerializer
import requests  # Importa la biblioteca requests
from rest_framework.pagination import PageNumberPagination

#Trae los datos (titulo,autor,imagen y fecha) haciendo una llamada a la api de google
class LibroListView(APIView):
    def get(self, request, titulo):
        url = f"https://www.googleapis.com/books/v1/volumes?q=intitle:{titulo}&fields=items(volumeInfo/title,volumeInfo/authors,volumeInfo/imageLinks/thumbnail,volumeInfo/publishedDate)"
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
                        'imagen': imagen,
                        'fecha_publicacion' : fecha_publicacion
                    })
                 
                    if serializer.is_valid():
                        libros_data.append(serializer.data)
                return Response(libros_data)


