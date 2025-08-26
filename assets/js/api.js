// API wrapper using jQuery to call RESTful endpoints
const API_BASE = 'https://fakestoreapi.com';

function fetchAllProducts(){
  return $.getJSON(`${API_BASE}/products`);
}
function fetchCategories(){
  return $.getJSON(`${API_BASE}/products/categories`);
}
function fetchProduct(id){
  return $.getJSON(`${API_BASE}/products/${id}`);
}
