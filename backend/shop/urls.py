from django.urls import path
from .views import products, create_order


urlpatterns = [
    path("products/", products, name="products"),
    path("orders/", create_order, name="create_order"),
]