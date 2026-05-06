from django.contrib import admin
from django.urls import path, include
from account.views import MyTokenView

urlpatterns = [
    path("api-auth/", include("rest_framework.urls")),
    path("login/", MyTokenView.as_view(), name="token_create")
]
