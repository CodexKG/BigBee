# Generated by Django 4.2.1 on 2023-08-07 11:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('billing', '0002_billing_payment_code'),
    ]

    operations = [
        migrations.AlterField(
            model_name='billing',
            name='payment_code',
            field=models.CharField(max_length=20, unique=True, verbose_name='Код оплаты биллинга'),
        ),
    ]
