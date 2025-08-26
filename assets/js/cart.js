function renderCart(){
  const items = getCart();
  const container = document.getElementById('cartItems');
  const totalEl = document.getElementById('cartTotal');
  if(!container) return;
  container.innerHTML = '';
  let total = 0;
  if(items.length === 0){
    container.innerHTML = '<div class="alert alert-light">Your cart is empty.</div>';
  }else{
    items.forEach(it => {
      const line = document.createElement('div');
      line.className = 'd-flex align-items-center justify-content-between p-3 border rounded-4';
     const subtotal = (it.price * 4.7) * it.qty;
total += subtotal;
line.innerHTML = `
  <div class="d-flex align-items-center gap-3">
    <img src="${it.image}" alt="" width="64" height="64" style="object-fit:contain" class="rounded">
    <div>
      <div class="fw-semibold">${it.title}</div>
      <div class="small text-muted">Qty: <input type="number" min="1" value="${it.qty}" data-id="${it.id}" class="form-control form-control-sm d-inline-block" style="width:90px"></div>
    </div>
  </div>
  <div class="text-end">
    <div class="price">${formatMYR(subtotal)}</div>
    <button class="btn btn-sm btn-outline-dark mt-2" data-remove="${it.id}">Remove</button>
  </div>`;
      container.appendChild(line);
    });
  }
  totalEl.textContent = formatMYR(total);

  container.addEventListener('change', (e)=>{
    if(e.target.matches('input[type="number"]')){
      const id = Number(e.target.getAttribute('data-id'));
      const cart = getCart();
      const item = cart.find(x=>x.id===id);
      if(item){ item.qty = Math.max(1, Number(e.target.value)||1); saveCart(cart); renderCart(); }
    }
  });
  container.addEventListener('click', (e)=>{
    const btn = e.target.closest('[data-remove]');
    if(btn){ removeFromCart(Number(btn.getAttribute('data-remove'))); renderCart(); }
  });

  const checkoutBtn = document.getElementById('checkoutBtn');
  checkoutBtn?.addEventListener('click', ()=>{
    saveCart([]);
    renderCart();
    document.getElementById('checkoutMsg').textContent = 'Thank you! Your (simulated) order has been placed.';
  });
}
document.addEventListener('DOMContentLoaded', renderCart);
