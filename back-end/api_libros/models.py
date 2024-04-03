from django.db import models
from django.contrib.auth.models import User


class Libro(models.Model):
    titulo = models.CharField(max_length=100)
    autor = models.CharField(max_length=100)
    imagen_portada = models.URLField()
    fecha_publicacion = models.CharField(max_length=50)
    
class Resumen(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    libro = models.ForeignKey(Libro, on_delete=models.CASCADE)
    contenido = models.TextField()

class Biblioteca(models.Model):
    usuario = models.OneToOneField(User, on_delete=models.CASCADE)
    libros = models.ManyToManyField(Libro, related_name='biblioteca')