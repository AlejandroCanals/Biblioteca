from django.db import models
from django.contrib.auth.models import User


class Libro(models.Model):
    titulo = models.CharField(max_length=100)
    autor = models.CharField(max_length=100)
    imagen_portada = models.URLField()
    fecha_publicacion = models.CharField(max_length=50)
