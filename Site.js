let cart = [];

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
    const cartContainer = document.createElement('div');
    const cartWrapper = document.getElementById('cart-wrapper');
    cartWrapper.innerHTML = '';

    if (Object.keys(cart).length === 0) {
        cartWrapper.innerHTML = "<p>Your cart is empty!</p>";
        return;
    }

    const cartList = document.createElement('ul');
    cartList.style.listStyle = 'none';
    cartList.style.padding = '0';

    Object.entries(cart).forEach(([productName, { price, quantity }]) => {
        const listItem = document.createElement('li');
        listItem.style.marginBottom = '10px';

        listItem.innerHTML = `
            <div>${escapeHtml(productName)} - $${(price * quantity).toFixed(2)}</div>
            <div>
                <button style="margin: 0 5px; font-size: 24px; cursor: pointer; background: none; border: none;" onclick="changeQuantity('${escapeHtml(productName)}', -1)">-</button>
                ${quantity}
                <button style="margin: 0 5px; font-size: 22px; cursor: pointer; background: none; border: none;" onclick="changeQuantity('${escapeHtml(productName)}', 1)">+</button>
                <button class="btn btn-danger" style="margin-left: 10px; " onclick="removeFromCart('${escapeHtml(productName)}')">Clear</button>
            </div>
        `;

        cartList.appendChild(listItem);
    });

    cartContainer.appendChild(cartList);

    const totalPrice = Object.values(cart).reduce(
        (sum, { price, quantity }) => sum + price * quantity,
        0
    );

    const totalPriceDiv = document.createElement('div');
    totalPriceDiv.style.marginTop = '20px';
    totalPriceDiv.style.textAlign = 'center';
    totalPriceDiv.style.fontWeight = 'bold';
    totalPriceDiv.innerHTML = `Total: $${totalPrice.toFixed(2)}`;

    const checkoutButton = document.createElement('button');
    checkoutButton.textContent = 'Checkout';
    checkoutButton.style.padding = '10px 20px';
    checkoutButton.style.backgroundColor = '#28a745';
    checkoutButton.style.color = '#fff';
    checkoutButton.style.border = 'none';
    checkoutButton.style.borderRadius = '5px';
    checkoutButton.style.cursor = 'pointer';
    checkoutButton.style.marginTop = '20px';

    checkoutButton.onclick = () => {
        alert('Checkout completed!');
        cart = {}; 
        renderCart(); 
    };

    cartContainer.appendChild(totalPriceDiv);
    cartContainer.appendChild(checkoutButton);

    cartWrapper.appendChild(cartContainer);
}

function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}





function updateTotalPrice() {
    const totalPrice = document.getElementById('total-price');
    let total = 0;

    Object.values(cart).forEach(({ price, quantity }) => {
        total += price * quantity;
    });

    totalPrice.textContent = total + ':-';
}

function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

window.onload = renderCart;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
