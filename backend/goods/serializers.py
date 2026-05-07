from rest_framework import serializers
from goods.models import Category

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