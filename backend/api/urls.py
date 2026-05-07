from django.urls import path, include
from rest_framework_nested import routers
from account.views import MyTokenView, UserProfileViewSet
from goods.views import CategoryViewSet

# Main router
router = routers.DefaultRouter()
router.register('profile', UserProfileViewSet, basename='profile')
router.register(r'categories', CategoryViewSet, basename='category')

# Nested router for categories/id/sub_categories/
categories_router = routers.NestedDefaultRouter(router, r'categories', lookup='category')
categories_router.register(r'sub_categories', CategoryViewSet, basename='category-sub')

urlpatterns = [
    path("api-auth/", include("rest_framework.urls")),
    path("login/", MyTokenView.as_view(), name="token_create"),
    path("", include(router.urls)),
    path("", include(categories_router.urls)),
]
