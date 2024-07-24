# api_libros/tests.py

from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from .models import Libro, Favorito
class FavoritoListViewTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.client.force_authenticate(user=self.user)
        self.libro1 = Libro.objects.create(titulo="Libro 1", autor="Autor 1", imagen_portada="imagen1.jpg", fecha_publicacion="2024-01-01")
        self.libro2 = Libro.objects.create(titulo="Libro 2", autor="Autor 2", imagen_portada="imagen2.jpg", fecha_publicacion="2024-02-01")
        self.url = reverse('favorito-list')
        print(f"Testing URL: {self.url}")  # Verifica que la URL es correcta

    def test_add_libro_to_favorites(self):
        print(f"Testing URL: {self.url}")
        print(f"Libro ID: {self.libro1.id}")
        response = self.client.post(self.url, {'libro_id': self.libro1.id}, format='json')
        print(f"Response status code: {response.status_code}")
        print(f"Response data: {response.data}")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['message'], "El libro añadido a favoritos")


    
    def test_get_favorites(self):
        Favorito.objects.create(user=self.user, libro=self.libro1)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        favoritos = response.json()
        print(favoritos)  # Imprime la respuesta para depuración
        self.assertEqual(len(favoritos), 1)
        favorito = favoritos[0]
        self.assertIn('libro', favorito)
        self.assertIn('id', favorito['libro'])
        self.assertEqual(favorito['libro']['id'], self.libro1.id)

    def test_add_existing_favorite(self):

        self.client.post(self.url,{'libro_id':self.libro1.id}, format='json')
        response = self.client.post(self.url,{'libro_id':self.libro1.id}, format='json')   
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'],"El libro ya existe")

    def test_delete_favorite(self):
        #Agreo el libro a favoritos
        self.client.post(self.url,{'libro_id':self.libro1.id}, format='json')
        #Elimino el libro
        response = self.client.delete(self.url,{'libro_id':self.libro1.id},format='json')

        self.assertEqual(response.status_code,status.HTTP_204_NO_CONTENT)

        #Compruebo que el libro no este en favoritos

        favoritos = self.client.get(self.url).json()
        self.assertEqual(len(favoritos),0)

    def test_delete_non_existing_favorite(self):

        response = self.client.delete(self.url,{'libro_id':self.libro1.id},format='json')
        
        self.assertEqual(response.status_code,status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['error'],"El libro no esta en favoritos")

    def test_delete_non_existing_id_favorite(self):
        
        non_existing_id = 3000

        response = self.client.delete(self.url,{'libro_id':non_existing_id},format='json')

        self.assertEqual(response.status_code,status.HTTP_404_NOT_FOUND)


    def test_delete_non_id_favorite(self):

        response = self.client.delete(self.url,{'name': 'hola'})
        self.assertEqual(response.status_code,status.HTTP_400_BAD_REQUEST)