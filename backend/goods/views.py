from rest_framework import viewsets
from account.permissions import IsAdminOrManager
from .models import Category
from .serializers import CategorySerializer

class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    permission_classes = [IsAdminOrManager] 

    def get_queryset(self):
        if 'category_pk' in self.kwargs:
            return Category.objects.filter(parent_id=self.kwargs['category_pk'])
        return Category.objects.all()