from django.urls import path

from .views import *

urlpatterns = [
    path('categories', CategoryListView.as_view())
]