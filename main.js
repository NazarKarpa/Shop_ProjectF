const SUPABASE_URL = 'https://jpzlofoguhgghyvouzcb.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_r-U7-HbtR2WPu7hEtBrpzQ_LIwSLlhj';

let products = [];
const productsContainer = document.querySelector('#productsGrid');
const detailModul = new bootstrap.Modal('#DetailModul', options)

function getJsonCookie(cookieName) {
    const allCookies = document.cookie.split('; ');
    const targetCookie = allCookies.find(row => row.startsWith(cookieName +
        '='));
    if (targetCookie) {

        const encodedData = targetCookie.split('=')[1];
        return JSON.parse(decodeURIComponent(encodedData));
    }
    return null;
}


function saveJsonCookie(cookieName, data, seconds) {
    const jsonString = JSON.stringify(data);
    const safeString = encodeURIComponent(jsonString);

    document.cookie = `${cookieName}=${safeString}; max-age=${seconds}; path=/`;
}

async function fetchData() {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/products`, {
        headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
            
        }
    });
    const data = await response.json();
    console.log(data);
    products = data;
    displayProducts(products);

}

function createProductCard(product) {
    return `<div class="card" style="width: 18rem;">
        <img src="${product.image_url}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">${product.description}</p>
            <button class="btn btn-primary" onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
        </div>`
}

function getCart() {

    return getJsonCookie('cart') || [];

}


function updateCartCount() {

    const cart = getCart();

    const cartCount =
        document.querySelector('#cartCount');

    if (!cartCount) return;

    cartCount.textContent = cart.length;

}


function renderCart() {

    const cartItems =
        document.querySelector('#cartItems');

    const cartTotal =
        document.querySelector('#cartTotal');


    if (!cartItems) return;


    const cart = getCart();


    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="text-center py-5">

                <h5>
                    Your cart is empty
                </h5>

                <p class="text-muted">
                    Add some games to your cart.
                </p>

            </div>

        `;

        cartTotal.textContent = '$0.00';

        return;
    }


    let total = 0;


    cartItems.innerHTML = '';


    cart.forEach((product, index) => {

        total += Number(product.price);


        cartItems.innerHTML += `

            <div
                class="d-flex align-items-center
                       justify-content-between
                       border-bottom py-3"
            >

                <div class="d-flex align-items-center">

                    <img
                        src="${product.image_url}"
                        alt="${product.name}"
                        width="70"
                        height="90"
                        class="rounded object-fit-cover me-3"
                    >

                    <div>

                        <h6 class="mb-1">
                            ${product.name}
                        </h6>

                        <small class="text-muted">
                            ${product.description}
                        </small>

                    </div>

                </div>


                <div class="d-flex align-items-center gap-3">

                    <strong>
                        $${Number(product.price).toFixed(2)}
                    </strong>

                    <button
                        class="btn btn-sm btn-outline-danger"
                        onclick="removeFromCart(${index})"
                    >
                        Remove
                    </button>

                </div>

            </div>

        `;

    });


    cartTotal.textContent =
        `$${total.toFixed(2)}`;

}

function removeFromCart(index) {
    const cart = getCart();
    cart.splice(index, 1);
    saveJsonCookie('cart', cart, 3600 * 24 * 7);
    renderCart();

    updateCartCount();

}

document.addEventListener(
    'DOMContentLoaded',
    () => {

        updateCartCount();

    }
);

function addToCart(productId) {
    const product = products.find(p => p.id === productId);

    if (!product) return;

    const cart = getCart();

    cart.push(product);

    saveJsonCookie(
        'cart',
        cart,
        3600 * 24 * 7);
    updateCartCount();

    console.log('Product added to cart:', product);
}


function displayProducts(products) {
    productsContainer.innerHTML = '';
    products.forEach(product => {
        const productCard = createProductCard(product);
        productsContainer.innerHTML += productCard;
    });
    
}


document.addEventListener('DOMContentLoaded', () => {
    fetchData();
});