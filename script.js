let cart = [];
let cartCount = 0;
let total = 0;

function addToCart(name, price) {
    cart.push({ name, price });
    cartCount++;
    total += price;
    updateCartUI();
    alert(`${name} añadido al carrito. ¡Qué caliente!`);
}

function updateCartUI() {
    document.getElementById('cart-count').textContent = cartCount;
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - €${item.price.toFixed(2)}`;
        cartItems.appendChild(li);
    });
    document.getElementById('cart-total').textContent = `Total: €${total.toFixed(2)}`;
}

function toggleCart() {
    const modal = document.getElementById('cart-modal');
    modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
}

function checkout() {
    if (cart.length === 0) {
        alert('Tu carrito está vacío... ¡añade algo sexy!');
        return;
    }
    alert(`¡Gracias por tu compra de €${total.toFixed(2)}! Esto es un demo, así que no se cobra nada. ¡Hostéalo gratis y hazlo real!`);
    cart = [];
    cartCount = 0;
    total = 0;
    updateCartUI();
    toggleCart();
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('cart-modal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}