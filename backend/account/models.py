from django.db import models
from django.contrib.auth.models import AbstractUser
from account.managers import UserManager
from django.conf import settings

class User(AbstractUser):
    ADMIN = 'admin'
    MANAGER = 'manager'
    CUSTOMER = 'customer'
    OUTLET_MANAGER = 'outlet_manager'
    ROLE_CHOICES = (
        (ADMIN, 'Admin'),
        (MANAGER, 'Manager'),
        (CUSTOMER, 'customer'),
        (OUTLET_MANAGER, 'outlet_manager'),
    )
    username = None
    phone_number = models.CharField(max_length=15, unique=True)
    role = models.CharField(max_length=15, choices=ROLE_CHOICES, default=CUSTOMER)
    address = models.TextField(blank=True, null=True)
    USERNAME_FIELD = 'phone_number'
    REQUIRED_FIELDS = []
    objects = UserManager()
    def __str__(self):
        return f"{self.phone_number} - {self.get_role_display()}"
    

class UserProfile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='profile'
    )
    profile_image = models.ImageField(upload_to='profiles/', blank=True, null=True)
    bio = models.TextField(blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
    gender = models.CharField(
        max_length=10,
        choices=(
            ('male', 'Male'),
            ('female', 'Female'),
            ('other', 'Other'),
        ),
        blank=True
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.phone_number} Profile"
