from django.shortcuts import render, redirect
from asgiref.sync import async_to_sync
import asyncio

from apps.carts.models import Cart
from apps.users.models import User
from apps.billing.forms import BillingForm
from apps.telegram.views import send_billing_notification, send_error_billing_notification
from apps.shops.models import Shop

# Create your views here.
def create_billing(request):
    if request.method == 'POST':
        form = BillingForm(request.POST)
        if form.is_valid():
            billing = form.save(commit=False)
            billing.user = request.user
            billing.save()

            # Получаем или создаем корзину для текущей сессии
            session_key = request.session.session_key
            if not session_key:
                request.session.save()
                session_key = request.session.session_key

            cart, _ = Cart.objects.get_or_create(session_key=session_key)

            # Получаем связанных менеджеров и отправляем им уведомления
            for cart_item in cart.items.all():
                billing.products.add(cart_item)
                billing.shops.add(cart_item.shop)
                shop_id = cart_item.shop.id

                # Получаем пользователей (менеджеров), связанных с магазином
                users_in_shop = User.objects.filter(shop_id=shop_id)

                # Разделяем товары биллинга по магазинам
                products_in_shop = cart_item.shop.shop_products.all()

                # Проверяем, есть ли менеджеры у магазина
                if users_in_shop.exists():
                    for user in users_in_shop:
                        if user.telegram_chat_id:
                            async_to_sync(send_billing_notification)(
                                manager_id=user.telegram_chat_id,
                                shop=cart_item.shop.name,
                                user=request.user.username,
                                products=", ".join([str(item) for item in products_in_shop]),
                                billing_receipt_type=billing.billing_receipt_type,
                                payment_code=billing.payment_code,
                                created=billing.created.strftime("%Y-%m-%d %H:%M:%S")
                            )
                            print("WORK")
                else:
                    async_to_sync(send_error_billing_notification)(
                        chat_id=-758945574,
                        shop=cart_item.shop.name,
                        products=", ".join([str(item) for item in products_in_shop]),
                        billing_receipt_type=billing.billing_receipt_type,
                        payment_code=billing.payment_code,
                        created=billing.created.strftime("%Y-%m-%d %H:%M:%S")
                    )
                    print("SEND ERROR")
            # Удаляем связи товаров с корзиной, не удаляя товары самих из базы данных
            cart.items.clear()

            return redirect('billing_success')
    else:
        form = BillingForm()

    return render(request, 'billing/billing_form.html', {'form': form})

def billing_success(request):
    return render(request, 'billing/billing_success.html')