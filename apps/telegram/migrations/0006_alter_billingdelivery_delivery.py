# Generated by Django 4.2.5 on 2023-09-28 04:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('telegram', '0005_alter_billingdelivery_delivery'),
    ]

    operations = [
        migrations.AlterField(
            model_name='billingdelivery',
            name='delivery',
            field=models.CharField(choices=[('Accepted', 'Принят'), ('On way', 'В пути'), ('Delivered', 'Доставлен'), ('Cancel', 'Отменен')], default='Принят', max_length=100, verbose_name='Статус доставки'),
        ),
    ]
