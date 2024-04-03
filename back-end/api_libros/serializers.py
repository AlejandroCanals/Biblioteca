from rest_framework import serializers

class LibroSerializer(serializers.Serializer):
    titulo = serializers.CharField(max_length=200)
    autor = serializers.ListField()
    imagen = serializers.URLField(required=False)
    fecha_publicacion = serializers.DateField()

