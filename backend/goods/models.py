from django.db import models
from django.utils.text import slugify
from django.conf import settings
from django.core.exceptions import ValidationError

# Create your models here.

class Category(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    slug = models.SlugField(unique=True)
    parent = models.ForeignKey(
        'self', 
        on_delete=models.CASCADE, 
        null=True, 
        blank=True, 
        related_name='children'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.name)
            slug = base_slug
            counter = 1
            while Category.objects.filter(slug=slug).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1
            self.slug = slug
        super().save(*args, **kwargs)

class Goods(models.Model):
    UNIT_CHOICES = [
        ('pcs', 'Pieces'),
        ('kg', 'Kilogram'),
        ('gm', 'Gram'),
        ('ltr', 'Liter'),
        ('ml', 'Milliliter'),
        ('box', 'Box'),
        ('pack', 'Pack'),
    ]
    name = models.CharField(max_length=255)
    description = models.TextField()
    slug = models.SlugField(unique=True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True, related_name='goods')
    global_code = models.CharField(max_length=100, unique=True, help_text="Global Product Code / Barcode", blank=True, null=True)
    local_code = models.CharField(max_length=100, unique=True, help_text="Local Product Code / Barcode", blank=True, null=True)
    weight = models.DecimalField(max_digits=10, decimal_places=3, null=True, blank=True)
    unit = models.CharField(max_length=20, choices=UNIT_CHOICES, default='pcs')
    brand = models.CharField(max_length=150, blank=True)
    is_active = models.BooleanField(default=True)
    low_stock_threshold = models.DecimalField(max_digits=12, decimal_places=2, default=10.00)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        related_name='created_goods'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    @property
    def total_stock(self):
        # Calculates total remaining quantity from all received batches
        return sum(batch.remaining_quantity for batch in self.batches.filter(status='received'))

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.name)
            slug = base_slug
            counter = 1
            while Goods.objects.filter(slug=slug).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1
            self.slug = slug
        super().save(*args, **kwargs)

class GoodsImages(models.Model):
    goods = models.ForeignKey(
        Goods,
        on_delete=models.CASCADE,
        related_name="images"
    )
    image = models.ImageField(upload_to="goodsimg/")

    def __str__(self):
        return f"Image for {self.goods.name}"

class GoodsVariant(models.Model):
    goods = models.ForeignKey(
        Goods,
        on_delete=models.CASCADE,
        related_name='variants'
    )
    variant_name = models.CharField(max_length=255)
    sku = models.CharField(max_length=100, unique=True)
    global_code = models.CharField(max_length=100, unique=True, blank=True, null=True)
    local_code = models.CharField(max_length=100, unique=True, blank=True, null=True)
    weight = models.DecimalField(max_digits=10, decimal_places=3, null=True, blank=True)
    unit = models.CharField(max_length=20, choices=Goods.UNIT_CHOICES, default='pcs')
    image = models.ImageField(upload_to='goods/variants/', blank=True, null=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.goods.name} - {self.variant_name}"

    @property
    def total_stock(self):
        # Calculates total remaining quantity for this variant from all received batches
        return sum(batch.remaining_quantity for batch in self.batches.filter(status='received'))

    class Meta:
        ordering = ['-created_at']

class VariantAttribute(models.Model):
    variant = models.ForeignKey(
        GoodsVariant,
        on_delete=models.CASCADE,
        related_name='attributes'
    )
    name = models.CharField(max_length=100)
    value = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.name}: {self.value}"

class GoodsBatch(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('sent', 'Sent'),
        ('received', 'Received'),
        ('cancelled', 'Cancelled'),
    ]
    goods = models.ForeignKey(
        Goods,
        on_delete=models.CASCADE,
        related_name='batches'
    )
    variant = models.ForeignKey(
        GoodsVariant,
        on_delete=models.CASCADE,
        related_name='batches', 
        blank=True, 
        null=True
    )
    batch_no = models.CharField(max_length=100, unique=True)
    quantity = models.DecimalField(max_digits=12, decimal_places=2)
    remaining_quantity = models.DecimalField(max_digits=12, decimal_places=2)
    
    # Pricing (Kept in Batch as requested by user)
    purchase_price = models.DecimalField(max_digits=12, decimal_places=2)
    selling_price = models.DecimalField(max_digits=12, decimal_places=2)

    manufacture_date = models.DateField(null=True, blank=True)
    expiry_date = models.DateField(null=True, blank=True)

    requested_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='requested_batches'
    )
    approved_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='approved_batches'
    )
    received_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='received_batches'
    )
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    note = models.TextField(blank=True)
    sent_at = models.DateTimeField(null=True, blank=True)
    received_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        variant_info = f" ({self.variant.variant_name})" if self.variant else ""
        return f"Batch: {self.batch_no} - {self.goods.name}{variant_info}"

    def clean(self):
        if self.variant and self.variant.goods != self.goods:
            raise ValidationError("Variant does not belong to this goods.")
        if self.remaining_quantity < 0:
            raise ValidationError("Remaining quantity cannot be negative.")
        if self.remaining_quantity > self.quantity:
            raise ValidationError("Remaining quantity cannot exceed initial quantity.")
        if self.manufacture_date and self.expiry_date:
            if self.expiry_date <= self.manufacture_date:
                raise ValidationError("Expiry date must be after manufacture date.")

    def save(self, *args, **kwargs):
        if self._state.adding:
            self.remaining_quantity = self.quantity
        super().save(*args, **kwargs)

    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['batch_no']),
            models.Index(fields=['status']),
            models.Index(fields=['expiry_date']),
        ]
