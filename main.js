const SUPABASE_URL = 'https://jpzlofoguhgghyvouzcb.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_r-U7-HbtR2WPu7hEtBrpzQ_LIwSLlhj';

let products = [];
let cart = [];
const productsContainer = document.querySelector('#productsGrid');


async function fetchData() {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/products`, {
        headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
            
        }
    });
    const data = await response.json();
    console.log(data);
    // renderProducts(data);
    products = data;
    displayProducts(products);

}

function createProductCard(product) {
    return `<div class="card" style="width: 18rem;">
        <img src="${product.image_url}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">${product.description}</p>
            <a href="#" class="btn btn-primary">В кошик</a>
        </div>
        </div>`
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