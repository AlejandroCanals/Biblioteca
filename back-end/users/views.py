from django.urls import reverse_lazy
from django.views import generic
from .forms import SignUpForm

class SignUpView(generic.CreateView):
    form_class = SignUpForm
    success_url = reverse_lazy('login')  # Redirige al usuario a la página de inicio de sesión después de registrarse
    template_name = 'users/signup.html'
