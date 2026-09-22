from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Product, Order
import json


def products(request):

    product_list = Product.objects.all()

    data = []

    for product in product_list:

        data.append({
            "id": product.id,
            "name": product.name,
            "description": product.description,
            "price": str(product.price),
            "category": product.category,
            "image": product.image,
            "stock": product.stock,
        })

    return JsonResponse(data, safe=False)


@csrf_exempt
def create_order(request):

    if request.method != "POST":
        return JsonResponse({
            "message": "Only POST method is allowed"
        }, status=405)

    try:

        data = json.loads(request.body)

        full_name = data.get("full_name")
        email = data.get("email")
        phone = data.get("phone")
        address = data.get("address")
        city = data.get("city")
        pincode = data.get("pincode")
        payment_method = data.get("payment_method")
        cart = data.get("cart", [])

        if not cart:
            return JsonResponse({
                "message": "Cart is empty"
            }, status=400)

        subtotal = 0

        for item in cart:

            product = Product.objects.get(id=item["id"])

            quantity = int(item["quantity"])

            subtotal += product.price * quantity

        shipping = 5

        total = subtotal + shipping

        order = Order.objects.create(
            full_name=full_name,
            email=email,
            phone=phone,
            address=address,
            city=city,
            pincode=pincode,
            payment_method=payment_method,
            total_amount=total
        )

        return JsonResponse({
            "success": True,
            "message": "Order placed successfully",
            "order_id": order.id
        })

    except Product.DoesNotExist:

        return JsonResponse({
            "message": "Product not found"
        }, status=400)

    except Exception as error:

        return JsonResponse({
            "message": str(error)
        }, status=400)