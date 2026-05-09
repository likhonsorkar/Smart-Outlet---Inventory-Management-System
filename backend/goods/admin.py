from django.contrib import admin
from .models import Category, Goods, GoodsImages, GoodsVariant, VariantAttribute, GoodsBatch

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'parent', 'created_at')
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ('name',)
    list_filter = ('parent',)

class GoodsImagesInline(admin.TabularInline):
    model = GoodsImages
    extra = 1

class GoodsVariantInline(admin.TabularInline):
    model = GoodsVariant
    extra = 1
    show_change_link = True

@admin.register(Goods)
class GoodsAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'brand', 'unit', 'total_stock', 'is_active', 'created_at')
    list_filter = ('category', 'brand', 'is_active', 'unit')
    search_fields = ('name', 'brand', 'global_code', 'local_code')
    prepopulated_fields = {'slug': ('name',)}
    inlines = [GoodsImagesInline, GoodsVariantInline]
    readonly_fields = ('total_stock',)

class VariantAttributeInline(admin.TabularInline):
    model = VariantAttribute
    extra = 1

@admin.register(GoodsVariant)
class GoodsVariantAdmin(admin.ModelAdmin):
    list_display = ('variant_name', 'goods', 'sku', 'total_stock', 'is_active')
    list_filter = ('is_active', 'goods__category')
    search_fields = ('variant_name', 'sku', 'global_code', 'local_code', 'goods__name')
    inlines = [VariantAttributeInline]
    readonly_fields = ('total_stock',)

@admin.register(GoodsBatch)
class GoodsBatchAdmin(admin.ModelAdmin):
    list_display = (
        'batch_no', 'goods', 'variant', 'quantity', 
        'remaining_quantity', 'selling_price', 'status', 'expiry_date'
    )
    list_filter = ('status', 'created_at', 'expiry_date')
    search_fields = ('batch_no', 'goods__name', 'variant__variant_name')
    readonly_fields = ('remaining_quantity', 'created_at')
    fieldsets = (
        ('Basic Info', {
            'fields': ('goods', 'variant', 'batch_no', 'status', 'note')
        }),
        ('Quantity & Pricing', {
            'fields': ('quantity', 'remaining_quantity', 'purchase_price', 'selling_price')
        }),
        ('Dates', {
            'fields': ('manufacture_date', 'expiry_date', 'sent_at', 'received_at', 'created_at')
        }),
        ('Personnel', {
            'fields': ('requested_by', 'approved_by', 'received_by')
        }),
    )

