// API wrapper (now using local product.json instead of fakestoreapi)
const API_BASE = 'data/product.json';

// Fetch all products
function fetchAllProducts(){
  return $.getJSON(API_BASE); 
}

// Fetch categories (extract unique categories from JSON)
function fetchCategories(){
  return $.getJSON(API_BASE).then(products => {
    return [...new Set(products.map(p => p.category))]; // unique categories
  });
}

// Fetch single product by ID
function fetchProduct(id){
  return $.getJSON(API_BASE).then(products => {
    return products.find(p => p.id == id); // match by id
  });
}
