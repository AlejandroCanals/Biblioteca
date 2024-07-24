from rest_framework import serializers
from .models import Favorito,Libro

class LibroSerializer(serializers.ModelSerializer):
    autor = serializers.ListField(child=serializers.CharField(), required=False)
    class Meta:
        model = Libro
        fields = ['id', 'titulo', 'autor', 'imagen_portada', 'fecha_publicacion']

class FavoritoSerializer(serializers.ModelSerializer):
    libro = LibroSerializer()

    class Meta:
        model = Favorito
        fields = ['id', 'user', 'libro', 'fecha_agregado']