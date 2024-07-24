from django.urls import path
from .views import LibroListView, FavoritoListView

urlpatterns = [
    path('libros/<str:titulo>/', LibroListView.as_view(), name='libro-list'),
    path('favoritos/', FavoritoListView.as_view(), name='favorito-list'),
]
