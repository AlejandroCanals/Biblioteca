from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone


class Libro(models.Model):
    titulo = models.CharField(max_length=200)
    autor = models.CharField(max_length=500)
    imagen_portada = models.TextField() 
    fecha_publicacion = models.CharField(max_length=2000)
    google_id = models.CharField(max_length=100, unique=True, default='')  

class Favorito(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    libro = models.ForeignKey(Libro,  on_delete= models.CASCADE)
    fecha_agregado = models.DateTimeField(default=timezone.now)
    class Meta:
        unique_together = ('user', 'libro')
        verbose_name = 'Favorito'
        verbose_name_plural = 'Favoritos'

