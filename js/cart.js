let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItems = document.getElementById("cartItems");
const cartSubtotal = document.getElementById("cartSubtotal");
const shippingCost = document.getElementById("shippingCost");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.querySelector(".cart-count");


// Show cart products
function showCart() {

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p>Your cart is empty.</p>
        `;

        cartSubtotal.textContent = "$0.00";
        shippingCost.textContent = "$0.00";
        cartTotal.textContent = "$0.00";

        updateCartCount();

        return;
    }

    let subtotal = 0;

    cart.forEach(item => {

        const itemPrice = Number(item.price);
        const itemTotal = itemPrice * item.quantity;

        subtotal += itemTotal;

        const div = document.createElement("div");

        div.className = "cart-item";

        div.innerHTML = `
            <img src="${item.image}" alt="${item.name}">

            <div class="cart-item-info">

                <h3>${item.name}</h3>

                <p>$${itemPrice.toFixed(2)}</p>

                <div class="quantity">

                    <button onclick="decreaseQuantity(${item.id})">
                        -
                    </button>

                    <span>${item.quantity}</span>

                    <button onclick="increaseQuantity(${item.id})">
                        +
                    </button>

                </div>

                <p>Item Total: $${itemTotal.toFixed(2)}</p>

                <button onclick="removeItem(${item.id})">
                    Remove
                </button>

            </div>
        `;

        cartItems.appendChild(div);
    });


    // Shipping
    let shipping = 0;

    if (subtotal > 0) {
        shipping = 5;
    }


    // Update summary
    cartSubtotal.textContent = "$" + subtotal.toFixed(2);

    shippingCost.textContent = "$" + shipping.toFixed(2);

    cartTotal.textContent =
        "$" + (subtotal + shipping).toFixed(2);


    updateCartCount();
}


// Increase quantity
function increaseQuantity(id) {

    const item = cart.find(product => product.id === id);

    if (item) {
        item.quantity++;
    }

    saveCart();
}


// Decrease quantity
function decreaseQuantity(id) {

    const item = cart.find(product => product.id === id);

    if (item) {

        item.quantity--;

        if (item.quantity <= 0) {

            cart = cart.filter(product => product.id !== id);

        }
    }

    saveCart();
}


// Remove product
function removeItem(id) {

    cart = cart.filter(product => product.id !== id);

    saveCart();
}


// Update cart count
function updateCartCount() {

    let totalItems = 0;

    cart.forEach(item => {
        totalItems += item.quantity;
    });

    if (cartCount) {
        cartCount.textContent = totalItems;
    }
}


// Save cart
function saveCart() {

    localStorage.setItem("cart", JSON.stringify(cart));

    showCart();
}


// Start
showCart();