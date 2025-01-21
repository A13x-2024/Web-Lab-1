const cart = {};

function addToCart(productName, price) {
    if (cart[productName]) {
        cart[productName].quantity++;
    } else {
        cart[productName] = { price: parseFloat(price), quantity: 1 };
    }
    renderCart();
    updateTotalPrice();
}

function removeFromCart(productName) {
    if (cart[productName]) {
        delete cart[productName];
        renderCart();
        updateTotalPrice();
    }
}

function changeQuantity(productName, delta) {
    if (cart[productName]) {
        cart[productName].quantity += delta;
        if (cart[productName].quantity <= 0) {
            delete cart[productName];
        }
        renderCart();
        updateTotalPrice();
    }
}

function renderCart() {
    const cartContainer = document.getElementById('cart-items');
    const emptyMessage = document.getElementById('empty-cart-message');
    const cartTotal = document.getElementById('cart-total');
    const checkoutButton = document.getElementById('checkout-button');

    cartContainer.innerHTML = '';

    Object.entries(cart).forEach(([productName, { price, quantity }]) => {
        cartContainer.innerHTML += `
            <li>
                <div>${escapeHtml(productName)} - ${(price * quantity).toFixed(2)}</div>
                <div>
                    <button onclick="changeQuantity('${escapeHtml(productName)}', -1)">-</button>
                    ${quantity}
                    <button onclick="changeQuantity('${escapeHtml(productName)}', 1)">+</button>
                    <button class="btn btn-danger" onclick="removeFromCart('${escapeHtml(productName)}')">Remove</button>
                </div>
            </li>
        `;
    });

    if (Object.keys(cart).length > 0) {
        emptyMessage.style.display = 'none';
        cartTotal.style.display = 'block';
        checkoutButton.style.display = 'block';

        checkoutButton.onclick = () => {
            alert('Checkout is complete!');
        };
    } else {
        emptyMessage.style.display = 'block';
        cartTotal.style.display = 'none';
        checkoutButton.style.display = 'none';

        checkoutButton.onclick = null;
    }
}

function updateTotalPrice() {
    const totalPrice = document.getElementById('total-price');
    let total = 0;

    Object.values(cart).forEach(({ price, quantity }) => {
        total += price * quantity;
    });

    totalPrice.textContent = total.toFixed(2);
}

function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

window.onload = renderCart;