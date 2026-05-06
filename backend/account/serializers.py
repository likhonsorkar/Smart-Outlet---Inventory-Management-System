from account.models import User
from djoser.serializers import UserCreateSerializer as DjoserUserCreateSerializer

class UserCreateSerializers(DjoserUserCreateSerializer):
    class Meta(DjoserUserCreateSerializer.Meta):
        model = User
        fields = ('id', 'first_name', 'last_name', 'phone_number',  'password')