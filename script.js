let cart = [];

async function loadImages() {
  const imgs = document.querySelectorAll('img[data-src]');
  await Promise.all([...imgs].map(async (img) => {
    const path = img.getAttribute('data-src');
    const b64path = 'img-b64/' + path.replace('images/', '') + '.b64';
    try {
      const res = await fetch(b64path);
      if (!res.ok) throw new Error('missing');
      const b64 = (await res.text()).trim();
      img.src = 'data:image/jpeg;base64,' + b64;
    } catch (e) {
      img.src = path;
    }
  }));
}

function addToCart(name, price) {
  cart.push({ name, price });
  updateCartUI();
}

function updateCartUI() {
  document.getElementById('cart-count').textContent = cart.length;
  const list = document.getElementById('cart-items');
  list.innerHTML = '';
  cart.forEach((item, index) => {
    const li = document.createElement('li');
    const label = document.createElement('span');
    label.textContent = item.name;
    const price = document.createElement('strong');
    price.textContent = item.price.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' });
    const remove = document.createElement('button');
    remove.textContent = '×';
    remove.setAttribute('aria-label', 'Quitar ' + item.name);
    remove.style.cssText = 'border:0;background:none;font-size:20px;cursor:pointer';
    remove.onclick = () => { cart.splice(index, 1); updateCartUI(); };
    li.append(label, price, remove);
    list.appendChild(li);
  });
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  document.getElementById('cart-total').textContent =
    'Total: ' + total.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' });
}

function toggleCart() {
  const modal = document.getElementById('cart-modal');
  modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
}

function checkout() {
  if (!cart.length) {
    alert('Tu bolsa está vacía.');
    return;
  }
  alert('La tienda todavía no tiene pagos conectados. No se ha realizado ningún cobro.');
}

window.addEventListener('click', (event) => {
  const modal = document.getElementById('cart-modal');
  if (event.target === modal) modal.style.display = 'none';
});
window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') document.getElementById('cart-modal').style.display = 'none';
});
document.addEventListener('DOMContentLoaded', loadImages);
