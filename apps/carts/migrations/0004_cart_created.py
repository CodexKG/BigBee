# Generated by Django 4.2.1 on 2023-08-06 06:56

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('carts', '0003_alter_cartitem_options'),
    ]

    operations = [
        migrations.AddField(
            model_name='cart',
            name='created',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]