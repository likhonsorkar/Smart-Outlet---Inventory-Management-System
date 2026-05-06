from django.shortcuts import render
from rest_framework_simplejwt.views import TokenObtainPairView
from account.serializers import TokenSerializer
class MyTokenView(TokenObtainPairView):
    serializer_class = TokenSerializer
