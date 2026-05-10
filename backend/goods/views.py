from rest_framework import viewsets, permissions
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from account.permissions import IsAdminOrManager
from goods.models import Category, Goods, GoodsBatch
from goods.serializers import CategorySerializer, GoodsSerializer, GoodsBatchSerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAdminOrManager] 

    def get_queryset(self):
        if 'category_pk' in self.kwargs:
            return Category.objects.filter(parent_id=self.kwargs['category_pk'])
        return Category.objects.all()

class GoodsViewSet(viewsets.ModelViewSet):
    queryset = Goods.objects.all()
    serializer_class = GoodsSerializer
    permission_classes = [IsAdminOrManager]
    parser_classes = (MultiPartParser, FormParser, JSONParser)

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class GoodsBatchViewSet(viewsets.ModelViewSet):
    queryset = GoodsBatch.objects.all()
    serializer_class = GoodsBatchSerializer
    permission_classes = [IsAdminOrManager]

    def perform_create(self, serializer):
        # When creating a batch, requested_by is the current user
        # status is pending by default as per model
        serializer.save(requested_by=self.request.user)
