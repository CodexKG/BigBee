from django.db import models
from django.contrib.auth.models import AbstractUser
import random, string

from apps.shops.models import Shop

# Create your models here.
class User(AbstractUser):
    USER_ROLE_CHOICE = (
        ('Client', 'Client'),
        ('Partner', 'Partner'),
        ('Manager', 'Manager')
    )
    shop = models.ForeignKey(
        Shop, on_delete=models.SET_NULL,
        related_name='shop_manages',
        verbose_name="Магазин",
        blank=True, null=True,
        help_text="Магазин на котором менеджер может создавать товары и управлять ими"
    )
    user_role = models.CharField(
        max_length=100,
        choices=USER_ROLE_CHOICE,
        verbose_name="Роль пользователя",
        default='Client',
    )
    phone = models.CharField(
        max_length=50,
        verbose_name="Телефонный номер",
        blank=True, null=True,
        help_text="Телефонный номер менеджера для контакта"
    )
    address = models.CharField(
        max_length=100,
        verbose_name="Адрес",
        blank=True, null=True,
        help_text="Адрес проживания"
    )
    promo_code = models.CharField(
        max_length=100,
        blank=True, null=True,
        help_text="Промо код пользователя"
    )
    telegram_chat_id = models.IntegerField(
        verbose_name="Chat ID",
        blank=True, null=True,
        help_text="Chat ID менеджера для получения уведомления с маркетплейса"
    )
    
    def __str__(self):
        return self.username 
    
    def save(self, *args, **kwargs):
        if not self.promo_code:
            self.promo_code = self.generate_promo_code()
        return super().save(*args, **kwargs)

    @staticmethod
    def generate_promo_code():
        characters = string.ascii_letters + string.digits
        code = ''.join(random.choice(characters) for _ in range(6)).upper()
        return code

    class Meta:
        verbose_name = "Пользователь"
        verbose_name_plural = "Пользователи"

class Partnership(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE,
        related_name='users_partnership',
        verbose_name="Пользователь",
        blank=True, null=True
    )
    name = models.CharField(
        max_length=255,
        verbose_name="Имя"
    )
    email = models.EmailField(
        verbose_name="Почта"
    )
    phone = models.CharField(
        max_length=255,
        verbose_name="Телефонный номер"
    )
    status = models.BooleanField(
        verbose_name="Статус",
        default=False
    )
    created = models.DateTimeField(
        auto_now_add=True,
        verbose_name="Время заявки"
    )

    def __str__(self):
        return self.name 
    
    class Meta:
        verbose_name = "Заявка на партнерство"
        verbose_name_plural = "Заявка на партнерство"