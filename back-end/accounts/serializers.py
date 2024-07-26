from rest_framework import serializers
from django.contrib.auth.models import User

class RegisterSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only = True)

    class Meta:
        model = User
        fields = ['username','password','password2']
        extra_kwargs ={
            'password':{'write_only': True}
            
        }

    def validate(self, data):
        """
        Realiza la validación personalizada para asegurar que las contraseñas coincidan.
        """
        if data['password'] != data['password2']:
            raise serializers.ValidationError({'password': 'Las contraseñas no coinciden'})
        return data

    def create(self, validated_data):
        """
        Crea y guarda una nueva instancia de usuario con la contraseña hasheada.
        """
        # Eliminamos password2 ya que no es necesario para la creación del usuario
        password = validated_data.pop('password')
        
        user = User(
            username=validated_data['username']
        )
        user.set_password(password)  # Establecemos la contraseña hasheada
        user.save()  # Guardamos el usuario

        return user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username']

