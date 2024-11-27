from django.urls import path
from .views import helo

urlpatterns=[
    path('helo/',helo,name="trty")
]