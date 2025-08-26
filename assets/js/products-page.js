function renderProducts(list){
  const grid = $('#productsGrid');
  grid.empty();
  list.forEach(p=>{
    const col = $(`
      <div class="col-6 col-md-4 col-lg-3 fade-in">
        <div class="card h-100 rounded-4 card-product">
          <img src="${p.image}" class="card-img-top p-3" alt="">
          <div class="card-body d-flex flex-column">
            <h6 class="card-title">${p.title}</h6>
            <div class="mt-auto d-flex justify-content-between align-items-center">
              <span class="price">RM${(p.price*4.7).toFixed(2)}</span>
              <div class="btn-group">
                <a href="product-detail.html?id=${p.id}" class="btn btn-sm btn-outline-dark">View</a>
                <button class="btn btn-sm btn-dark" data-add='${JSON.stringify(p).replace(/'/g,"&#39;")}'>Add</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      }

function applyFilters(products){
  const q = $('#searchInput').val().toLowerCase();
  const cat = $('#categoryFilter').val();
  let filtered = products.filter(p => p.title.toLowerCase().includes(q));
  if(cat && cat !== 'all') filtered = filtered.filter(p => p.category === cat);
  renderProducts(filtered);
}

$(async function(){
  try{
    const [products, categories] = await Promise.all([fetchAllProducts(), fetchCategories()]);
    const sel = $('#categoryFilter');
    sel.append(`<option value="all">All categories</option>`);
    categories.forEach(c => sel.append(`<option value="${c}">${c}</option>`));
    renderProducts(products);
    ScrollTrigger.refresh();
    $('#searchInput, #categoryFilter').on('input change', ()=>applyFilters(products));
    $('#productsGrid').on('click', '[data-add]', function(){
      const p = JSON.parse($(this).attr('data-add'));
      addToCart({id:p.id, title:p.title, price:p.price, image:p.image, qty:1});
    });
  }catch(e){
    $('#productsGrid').html('<div class="alert alert-danger">Failed to load products from API.</div>');
    console.error(e);
  }
});

$(async function(){
  const container = $('#newArrivals');
  if(container.length === 0) return;
  try{
    const products = await fetchAllProducts();
    products.slice(0,4).forEach(p=>{
      const col = $(`
      <div class="col-6 col-lg-3 fade-in">
        <div class="card h-100 rounded-4 card-product">
          <img src="${p.image}" class="card-img-top p-3" alt="">
          <div class="card-body d-flex flex-column">
            <h6 class="card-title">${p.title}</h6>
            <div class="mt-auto d-flex justify-content-between align-items-center">
              <span class="price">RM${(p.price*4.7).toFixed(2)}</span>
              <div class="btn-group">
                <a href="product-detail.html?id=${p.id}" class="btn btn-sm btn-outline-dark">View</a>
                <button class="btn btn-sm btn-dark" data-add='${JSON.stringify(p).replace(/'/g,"&#39;")}'>Add</button>
              </div>
            </div>
          </div>
        </div>
      </div>`);
      container.append(col);
    });
    container.on('click', '[data-add]', function(){
      const p = JSON.parse($(this).attr('data-add'));
      p.price = p.price * 4.7;
      addToCart({id:p.id, title:p.title, price:p.price, image:p.image, qty:1});
    });
  }catch(e){
    container.html('<div class="alert alert-danger">Failed to load new arrivals.</div>');
  }
});
