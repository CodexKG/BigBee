from django.shortcuts import render

from apps.settings.models import Setting
from apps.categories.models import Category
from apps.products.models import Product

# Create your views here.
def category_detail(request, slug):
    setting = Setting.objects.latest('id')
    category = Category.objects.get(slug=slug)
    products = Product.objects.filter(category=category.id).order_by('image')
    random_categories = Category.objects.all().order_by('?')[:7]
    return render(request, 'category/detail.html', locals())