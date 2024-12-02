from django.db import models
from django.contrib.auth.models import AbstractUser

class Language(models.Model):
    language = models.CharField(max_length=10)
    description = models.CharField(max_length=30)
    default_syntax = models.TextField()

    def __str__(self):
        return self.language

class Users(AbstractUser):
    name = models.CharField(max_length=20)
    mobile_no = models.CharField(max_length=15)  # Updated to CharField

    def __str__(self):
        return self.name
