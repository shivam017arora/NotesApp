from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes),
    path('notes/', views.getNotes),
    path('notes/create', views.createNote),
    path('note/<str:pk>', views.getNote),
    path('note/<str:pk>/update', views.updateNote),
    path('note/<str:pk>/delete', views.deleteNote),
]
