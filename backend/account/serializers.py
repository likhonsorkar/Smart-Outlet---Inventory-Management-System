from account.models import User, UserProfile
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
    
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['profile_image', 'bio', 'date_of_birth', 'gender']

class UserProfileSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()

    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'address', 'phone_number', 'profile']
        read_only_fields = ['id', 'email']

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile', None)
        
        # Update User fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        # Update Profile fields
        if profile_data:
            profile = instance.profile
            for attr, value in profile_data.items():
                setattr(profile, attr, value)
            profile.save()

        return instance
