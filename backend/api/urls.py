from django.contrib import admin
from django.urls import path, include
from account.views import MyTokenView, UserProfileViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('profile', UserProfileViewSet, basename='profile')

urlpatterns = [
    path("api-auth/", include("rest_framework.urls")),
    path("login/", MyTokenView.as_view(), name="token_create"),
    path("", include(router.urls)),
]
