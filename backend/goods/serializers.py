from rest_framework import serializers
from goods.models import Category, Goods, GoodsImages, GoodsVariant, VariantAttribute, GoodsBatch

class CategorySerializer(serializers.ModelSerializer):
    children = serializers.SerializerMethodField()
    breadcrumb = serializers.SerializerMethodField()
    class Meta:
        model = Category
        fields = [
            'id', 'name', 'description', 'parent', 
            'children', 'breadcrumb', 'created_at', 'updated_at'
        ]
    def get_children(self, obj):
        serializer = CategorySerializer(obj.children.all(), many=True)
        return serializer.data
    def get_breadcrumb(self, obj):
        path = []
        curr = obj
        while curr:
            path.append(curr.name)
            curr = curr.parent
        return " > ".join(reversed(path))

class GoodsImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = GoodsImages
        fields = ['id', 'image']

class VariantAttributeSerializer(serializers.ModelSerializer):
    class Meta:
        model = VariantAttribute
        fields = ['id', 'name', 'value']

class GoodsVariantSerializer(serializers.ModelSerializer):
    attributes = VariantAttributeSerializer(many=True, read_only=True)
    class Meta:
        model = GoodsVariant
        fields = [
            'id', 'variant_name', 'sku', 'global_code', 'local_code', 
            'weight', 'unit', 'image', 'is_active', 'attributes', 'total_stock'
        ]

class GoodsBatchSerializer(serializers.ModelSerializer):
    goods_name = serializers.CharField(source='goods.name', read_only=True)
    variant_name = serializers.CharField(source='variant.variant_name', read_only=True, allow_null=True)
    
    class Meta:
        model = GoodsBatch
        fields = [
            'id', 'goods', 'goods_name', 'variant', 'variant_name', 'batch_no', 
            'quantity', 'remaining_quantity', 'purchase_price', 'selling_price', 
            'manufacture_date', 'expiry_date', 'requested_by', 'approved_by', 
            'received_by', 'status', 'note', 'sent_at', 'received_at', 'created_at'
        ]
        read_only_fields = ['remaining_quantity', 'requested_by', 'approved_by', 'received_by']

class GoodsSerializer(serializers.ModelSerializer):
    images = GoodsImagesSerializer(many=True, read_only=True)
    variants = GoodsVariantSerializer(many=True, read_only=True)
    batches = GoodsBatchSerializer(many=True, read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)
    uploaded_images = serializers.ListField(
        child=serializers.ImageField(max_length=1000000, allow_empty_file=False, use_url=False),
        write_only=True,
        required=False
    )
    
    class Meta:
        model = Goods
        fields = [
            'id', 'name', 'description', 'slug', 'category', 'category_name', 
            'global_code', 'local_code', 'weight', 'unit', 'brand', 
            'is_active', 'low_stock_threshold', 'created_by', 'created_at', 
            'updated_at', 'images', 'variants', 'total_stock', 'uploaded_images', 'batches'
        ]
        read_only_fields = ['slug', 'created_by']

    def to_internal_value(self, data):
        if hasattr(data, 'getlist'):
            images = data.getlist('uploaded_images')
            if images:
                data = data.copy()
                data.setlist('uploaded_images', images)
        return super().to_internal_value(data)

    def create(self, validated_data):
        uploaded_images = validated_data.pop('uploaded_images', [])
        goods = Goods.objects.create(**validated_data)
        for image in uploaded_images:
            GoodsImages.objects.create(goods=goods, image=image)
        return goods

    def update(self, instance, validated_data):
        uploaded_images = validated_data.pop('uploaded_images', [])
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        if uploaded_images:
            for image in uploaded_images:
                GoodsImages.objects.create(goods=instance, image=image)
        return instance
