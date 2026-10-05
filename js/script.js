let products = [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");


// Get products from Django
function getProducts() {

   fetch("https://ecommerce-website-pl9y.onrender.com/api/products/")
        .then(response => response.json())
        .then(data => {

            products = data;

            showProducts(products);
            updateCartCount();
        })
        .catch(error => {
            console.log("Error getting products:", error);
        });
}

// Show products
function showProducts(list) {

    productGrid.innerHTML = "";

    list.forEach(product => {

        const productCard = document.createElement("div");

        productCard.className = "product-card";

        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>

            <div class="product-info">

                <h3>${product.name}</h3>

                <p class="description">
                    ${product.description}
                </p>

                <div class="price">
                    <span class="new-price">
                        $${product.price}
                    </span>
                </div>

                <button class="add-cart" onclick="addToCart(${product.id})">
                    Add to Cart
                </button>

            </div>
        `;

        productGrid.appendChild(productCard);

    });
}


// Search products
searchInput.addEventListener("input", function () {

    const text = searchInput.value.toLowerCase();

    const result = products.filter(product =>
        product.name.toLowerCase().includes(text)
    );

    showProducts(result);

});


// Category buttons
const categoryButtons = document.querySelectorAll(".category-btn");

categoryButtons.forEach(button => {

    button.addEventListener("click", function () {

        categoryButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const category = button.dataset.category;

        if (category === "all") {

            showProducts(products);

        } else {

            const result = products.filter(product =>
                product.category === category
            );

            showProducts(result);
        }

    });

});


// Add product to cart
function addToCart(id) {

    const product = products.find(item => item.id === id);

    if (!product) {
        return;
    }

    const existingProduct = cart.find(item => item.id === id);

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    alert("Product added to cart");

}


// Cart count
function updateCartCount() {

    const cartCount = document.querySelector(".cart-count");

    if (!cartCount) {
        return;
    }

    let total = 0;

    cart.forEach(item => {
        total += item.quantity;
    });

    cartCount.textContent = total;
}


// Menu
const menuButton = document.getElementById("menuBtn");
const menuDropdown = document.getElementById("menuDropdown");

if (menuButton) {

    menuButton.addEventListener("click", function () {

        menuDropdown.classList.toggle("show");

    });

}


// Start
getProducts();
updateCartCount();