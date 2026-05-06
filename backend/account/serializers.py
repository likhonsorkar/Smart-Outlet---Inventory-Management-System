from account.models import User
from djoser.serializers import UserCreateSerializer as DjoserUserCreateSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from datetime import timedelta
from rest_framework import serializers

class UserCreateSerializers(DjoserUserCreateSerializer):
    class Meta(DjoserUserCreateSerializer.Meta):
        model = User
        fields = ('id', 'first_name', 'last_name', 'phone_number',  'password')

class TokenSerializer(TokenObtainPairSerializer):
    remember_me = serializers.BooleanField(required=False, default=False)
    def validate(self, attrs):
        data = super().validate(attrs)
        remember = self.context['request'].data.get('remember_me')
        if remember:
            self.token.set_exp(lifetime=timedelta(days=30))
        return data