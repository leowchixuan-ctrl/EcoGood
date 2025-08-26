// Cookie helpers
function setCookie(name, value, days){
  const d = new Date(); d.setTime(d.getTime() + (days*24*60*60*1000));
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${d.toUTCString()};path=/`;
}
function getCookie(name){
  const cname = name + "=";
  const decoded = decodeURIComponent(document.cookie);
  const arr = decoded.split(';');
  for(let c of arr){
    while(c.charAt(0) == ' ') c = c.substring(1);
    if(c.indexOf(cname) == 0) return c.substring(cname.length, c.length);
  }
  return null;
}

// localStorage cart
function getCart(){ return JSON.parse(localStorage.getItem('eg_cart') || '[]'); }
function saveCart(items){ localStorage.setItem('eg_cart', JSON.stringify(items)); }
function addToCart(item){
  const cart = getCart();
  const existing = cart.find(x => x.id === item.id);
  if(existing){ existing.qty += item.qty || 1; }
  else cart.push({...item, qty: item.qty || 1});
  saveCart(cart);
  updateCartCount();
}
function removeFromCart(id){
  const cart = getCart().filter(x => x.id !== id);
  saveCart(cart);
  updateCartCount();
}
function updateCartCount(){
  const count = getCart().reduce((a,b)=>a + (b.qty||1), 0);
  const el = document.getElementById('cartCount');
  if(el) el.textContent = count;
}
