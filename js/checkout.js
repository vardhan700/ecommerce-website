let cart = JSON.parse(localStorage.getItem("cart")) || [];

const checkoutItems = document.getElementById("checkoutItems");
const checkoutSubtotal = document.getElementById("checkoutSubtotal");
const checkoutShipping = document.getElementById("checkoutShipping");
const checkoutTotal = document.getElementById("checkoutTotal");


// Show cart items
function showCheckoutItems() {

    checkoutItems.innerHTML = "";

    let subtotal = 0;

    cart.forEach(item => {

        const price = Number(item.price);

        const itemTotal = price * item.quantity;

        subtotal += itemTotal;

        const div = document.createElement("div");

        div.innerHTML = `
            <p>
                ${item.name}
                × ${item.quantity}
                <strong>$${itemTotal.toFixed(2)}</strong>
            </p>
        `;

        checkoutItems.appendChild(div);
    });


    let shipping = 0;

    if (cart.length > 0) {
        shipping = 5;
    }


    checkoutSubtotal.textContent =
        "$" + subtotal.toFixed(2);

    checkoutShipping.textContent =
        "$" + shipping.toFixed(2);

    checkoutTotal.textContent =
        "$" + (subtotal + shipping).toFixed(2);
}


// Place order
const checkoutForm = document.getElementById("checkoutForm");

checkoutForm.addEventListener("submit", function(event) {

    event.preventDefault();


    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;
    }


    const payment =
        document.querySelector(
            'input[name="payment"]:checked'
        ).value;


    const orderData = {

        full_name:
            document.getElementById("fullName").value,

        email:
            document.getElementById("email").value,

        phone:
            document.getElementById("phone").value,

        address:
            document.getElementById("address").value,

        city:
            document.getElementById("city").value,

        pincode:
            document.getElementById("pincode").value,

        payment_method: payment,

        cart: cart
    };


  fetch("https://ecommerce-website-pl9y.onrender.com/api/orders/", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(orderData)

    })

    .then(response => response.json())

    .then(data => {

        if (data.success) {

            alert(
                "Order placed successfully! Order ID: "
                + data.order_id
            );

            localStorage.removeItem("cart");

            window.location.href = "home.html";

        } else {

            alert(data.message);

        }

    })

    .catch(error => {

        console.log("Order error:", error);

        alert("Something went wrong while placing the order.");

    });

});


showCheckoutItems();