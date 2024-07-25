from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate, login, logout
from .serializers import RegisterSerializer, UserSerializer
from rest_framework_simplejwt.tokens import RefreshToken

class RegisterView(APIView):

    def post(self,request):
        serializer = RegisterSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Usuario registrado exitosamente'})

        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):

    def post(self,request):

        username = request.data.get('username')
        password = request.data.get('password') 

        user = authenticate(request,username=username,password=password)

        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh':str(refresh),
                'access':str(refresh.access_token),
                'user': UserSerializer(user).data,
            }) 
        
        else:
            return Response({'error': 'Credenciales invalidas'},status=status.HTTP_401_UNAUTHORIZED)
        

class LogoutView(APIView):
    def post(self,request):
        logout(request)
        return Response({'message': 'Sesion cerrada exitosamente'},status=status.HTTP_200_OK)
