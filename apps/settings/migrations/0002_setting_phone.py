# Generated by Django 4.2.1 on 2023-05-31 10:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('settings', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='setting',
            name='phone',
            field=models.CharField(default=1, max_length=100, verbose_name='Телефонный номер'),
            preserve_default=False,
        ),
    ]