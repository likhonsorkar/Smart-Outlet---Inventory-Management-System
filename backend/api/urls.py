from django.urls import path, include
from rest_framework_nested import routers
from account.views import MyTokenView, UserProfileViewSet
from goods.views import CategoryViewSet, GoodsViewSet, GoodsBatchViewSet

# Main router
router = routers.DefaultRouter()
router.register('profile', UserProfileViewSet, basename='profile')
router.register('categories', CategoryViewSet, basename='category')
router.register('goods', GoodsViewSet, basename='goods')
router.register('batches', GoodsBatchViewSet, basename='batch')

# Nested router for categories/id/sub_categories/
categories_router = routers.NestedDefaultRouter(router, r'categories', lookup='category')
categories_router.register('sub_categories', CategoryViewSet, basename='category-sub')

urlpatterns = [
    path("api-auth/", include("rest_framework.urls")),
    path("login/", MyTokenView.as_view(), name="token_create"),
    path("", include(router.urls)),
    path("", include(categories_router.urls)),
]
