from rest_framework import permissions

class ProfileOwner(permissions.BasePermission):
    """
    Custom permission to only allow owners of a profile to edit it.
    """
    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True

        # Write permissions are only allowed to the owner of the profile.
        # In our case, the 'obj' is the User instance (or UserProfile if we changed the viewset)
        # But UserProfileViewSet.get_object returns the User instance.
        return obj == request.user
