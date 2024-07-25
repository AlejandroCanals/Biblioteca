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

    def save(self):
        user = User(
            username=self.validated_data['username']
        )
        password = self.validate_data['password']
        password2= self.validate_data['password2']

        if password != password2:
            raise serializers.ValidationError({'password': 'Las contraseñas no coinciden'})
        

        user.set_password(password)
        user.save()

        return user
    

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username']

