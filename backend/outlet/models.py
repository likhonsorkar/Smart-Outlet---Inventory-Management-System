from django.db import models
from django.conf import settings

class Outlet(models.Model):
    name = models.CharField(max_length=150)
    location = models.CharField(max_length=255)
    code = models.CharField(max_length=50, unique=True)
    outletmanager = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="outlet")
    def __str__(self):
        return self.name
