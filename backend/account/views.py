from django.shortcuts import render
from rest_framework_simplejwt.views import TokenObtainPairView
from account.serializers import TokenSerializer
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework.permissions import IsAuthenticated
from account.serializers import UserProfileSerializer
from account.models import User
from rest_framework import mixins
from rest_framework.response import Response
from .permissions import ProfileOwner

class MyTokenView(TokenObtainPairView):
    serializer_class = TokenSerializer

class UserProfileViewSet(mixins.RetrieveModelMixin, 
                         mixins.UpdateModelMixin, 
                         mixins.ListModelMixin,
                         GenericViewSet):
    http_method_names = ['get', 'put', 'patch', 'head', 'options']
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated, ProfileOwner]
    def get_queryset(self):
        if getattr(self, 'swagger_fake_view', False):
            return User.objects.none()
        return User.objects.select_related('profile').all()
    def get_object(self):
        if self.kwargs.get('pk') == 'me':
            return self.request.user
        return super().get_object()
    def list(self, request, *args, **kwargs):
        if not request.user.is_staff:
            return Response({"detail": "Method not allowed"}, status=405)
        return super().list(request, *args, **kwargs)

    