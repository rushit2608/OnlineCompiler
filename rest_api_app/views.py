from django.shortcuts import render
from django.http import JsonResponse
# Create your views here.

def helo(request):
    return JsonResponse({'data':"rushi"})