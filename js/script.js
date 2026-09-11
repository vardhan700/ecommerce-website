// =========================
// PRODUCT SEARCH
// =========================

const searchInput = document.getElementById("searchInput");
const productCards = document.querySelectorAll(".product-card");

if (searchInput) {

    searchInput.addEventListener("input", function () {

        const searchText = searchInput.value.toLowerCase().trim();

        productCards.forEach(function (card) {

            const productName =
                card.querySelector("h3").textContent.toLowerCase();

            if (productName.includes(searchText)) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }

        });

    });

}


// =========================
// CATEGORY FILTER
// =========================

const categoryButtons =
    document.querySelectorAll(".category-btn");

if (categoryButtons.length > 0) {

    categoryButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const selectedCategory =
                button.getAttribute("data-category");

            categoryButtons.forEach(function (btn) {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            productCards.forEach(function (card) {

                const productCategory =
                    card.getAttribute("data-category");

                if (
                    selectedCategory === "all" ||
                    productCategory === selectedCategory
                ) {
                    card.style.display = "";
                } else {
                    card.style.display = "none";
                }

            });

        });

    });

}


// =========================
// CART DATA
// =========================

let cart = JSON.parse(localStorage.getItem("cart")) || [];


// =========================
// CART COUNT
// =========================

const cartCount =
    document.querySelector(".cart-count");


function updateCartCount() {

    if (cartCount) {

        let totalItems = 0;

        cart.forEach(function (product) {
            totalItems += product.quantity;
        });

        cartCount.textContent = totalItems;

    }

}

updateCartCount();


// =========================
// ADD TO CART
// =========================

const cartButtons =
    document.querySelectorAll(".add-cart");

if (cartButtons.length > 0) {

    cartButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const productCard =
                button.closest(".product-card");

            const productName =
                productCard.querySelector("h3").textContent.trim();

            const productPrice =
                productCard.querySelector(".new-price").textContent.trim();

            const productImage =
                productCard.querySelector("img").getAttribute("src");


            const existingProduct =
                cart.find(function (item) {
                    return item.name === productName;
                });


            if (existingProduct) {

                existingProduct.quantity += 1;

            } else {

                cart.push({
                    name: productName,
                    price: productPrice,
                    image: productImage,
                    quantity: 1
                });

            }


            localStorage.setItem(
                "cart",
                JSON.stringify(cart)
            );


            updateCartCount();


            button.textContent = "Added ✓";

            setTimeout(function () {
                button.textContent = "Add to Cart";
            }, 1000);

        });

    });

}


// =========================
// CART PAGE
// =========================

const cartItemsContainer =
    document.getElementById("cartItems");


if (cartItemsContainer) {

    displayCart();


    function displayCart() {

        cartItemsContainer.innerHTML = "";


        if (cart.length === 0) {

            cartItemsContainer.innerHTML = `
                <div class="empty-cart">
                    <h2>Your cart is empty</h2>
                    <p>Add products from the shop to see them here.</p>
                    <a href="home.html">Start Shopping</a>
                </div>
            `;

            updateCartTotal();

            return;
        }


        cart.forEach(function (product, index) {

            const price =
                parseFloat(
                    product.price.replace("$", "")
                );


            const itemTotal =
                price * product.quantity;


            const cartItem =
                document.createElement("div");

            cartItem.className = "cart-item";


            cartItem.innerHTML = `

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    class="cart-item-image"
                >

                <div>

                    <h3>${product.name}</h3>

                    <p class="cart-item-price">
                        $${price.toFixed(2)}
                    </p>

                    <div class="quantity-controls">

                        <button
                            onclick="decreaseQuantity(${index})">
                            −
                        </button>

                        <span class="quantity">
                            ${product.quantity}
                        </span>

                        <button
                            onclick="increaseQuantity(${index})">
                            +
                        </button>

                    </div>

                    <button
                        class="remove-btn"
                        onclick="removeFromCart(${index})">
                        Remove
                    </button>

                </div>

                <strong>
                    $${itemTotal.toFixed(2)}
                </strong>

            `;


            cartItemsContainer.appendChild(cartItem);

        });


        updateCartTotal();

    }


    // =========================
    // INCREASE QUANTITY
    // =========================

    window.increaseQuantity = function (index) {

        cart[index].quantity += 1;

        saveCart();

    };


    // =========================
    // DECREASE QUANTITY
    // =========================

    window.decreaseQuantity = function (index) {

        if (cart[index].quantity > 1) {

            cart[index].quantity -= 1;

        } else {

            cart.splice(index, 1);

        }

        saveCart();

    };


    // =========================
    // REMOVE PRODUCT
    // =========================

    window.removeFromCart = function (index) {

        cart.splice(index, 1);

        saveCart();

    };


    // =========================
    // SAVE CART
    // =========================

    function saveCart() {

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );

        updateCartCount();

        displayCart();

    }


    // =========================
    // TOTAL PRICE
    // =========================

    function updateCartTotal() {

        let subtotal = 0;


        cart.forEach(function (product) {

            const price =
                parseFloat(
                    product.price.replace("$", "")
                );

            subtotal +=
                price * product.quantity;

        });


        const shipping =
            subtotal > 0 ? 10 : 0;

        const total =
            subtotal + shipping;


        const subtotalElement =
            document.getElementById("cartSubtotal");

        const shippingElement =
            document.getElementById("shippingCost");

        const totalElement =
            document.getElementById("cartTotal");


        if (subtotalElement) {
            subtotalElement.textContent =
                "$" + subtotal.toFixed(2);
        }

        if (shippingElement) {
            shippingElement.textContent =
                "$" + shipping.toFixed(2);
        }

        if (totalElement) {
            totalElement.textContent =
                "$" + total.toFixed(2);
        }

    }

}
const menuBtn = document.getElementById("menuBtn");
const menuDropdown = document.getElementById("menuDropdown");

if (menuBtn && menuDropdown) {

    menuBtn.addEventListener("click", function () {
        menuDropdown.classList.toggle("show");
    });

}