from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.models import AbstractUser
from .serializer import LanguageSerializer
from .models import Language
# Create your views here.


def LanguageView(request,type):
    try:
        LanguageType = Language.objects.get(language = type)
        serializer = LanguageSerializer(LanguageType).data
        return JsonResponse(serializer)
    except Exception as e:
        return JsonResponse({"data":"error occured"})
    
# def Users(AbstractUser)