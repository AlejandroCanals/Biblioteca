from django.urls import path
from .views import LibroListView

urlpatterns = [
    path('libros/<str:titulo>/', LibroListView.as_view(), name='titulo_libro'),
]
