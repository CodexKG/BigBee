# Generated by Django 4.2.1 on 2023-07-31 13:31

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0003_productfavorite'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='productfavorite',
            options={'verbose_name': 'Избранное', 'verbose_name_plural': 'Избранные'},
        ),
    ]
