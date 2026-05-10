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
        # Remove remember_me from attrs so super().validate doesn't get confused
        remember = attrs.pop('remember_me', False)
        
        data = super().validate(attrs)
        
        if remember:
            # Re-generate token with longer lifetime if remember_me is True
            refresh = self.get_token(self.user)
            refresh.set_exp(lifetime=timedelta(days=30))
            data['refresh'] = str(refresh)
            data['access'] = str(refresh.access_token)
            
        return data
    
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['profile_image', 'bio', 'date_of_birth', 'gender']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'phone_number', 'role']
        read_only_fields = ['id', 'email', 'role']

class UserProfileSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()

    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'address', 'phone_number', 'role', 'profile']
        read_only_fields = ['id', 'email', 'role']

    def to_internal_value(self, data):
        # Handle flat keys from FormData (e.g., 'profile.bio')
        if any(key.startswith('profile.') for key in data.keys()):
            # Create a mutable copy of the data if it's a QueryDict
            if hasattr(data, 'dict'):
                data = data.dict()
            else:
                data = data.copy()
            
            profile_data = data.get('profile', {})
            if isinstance(profile_data, str): # Handle empty or malformed strings
                profile_data = {}
            
            for key in list(data.keys()):
                if key.startswith('profile.'):
                    field_name = key.split('.', 1)[1]
                    profile_data[field_name] = data.pop(key)
            
            data['profile'] = profile_data
            
        return super().to_internal_value(data)

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
