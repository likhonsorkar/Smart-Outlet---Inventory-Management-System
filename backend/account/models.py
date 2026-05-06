from django.db import models
from django.contrib.auth.models import AbstractUser
from account.managers import UserManager
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