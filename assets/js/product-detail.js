$(async function(){
  const id = getParam('id');
  const container = $('#detailContainer');
  if(!id){ container.html('<div class="alert alert-warning">No product specified.</div>'); return; }
  try{
    const p = await fetchProduct(id);
    container.html(`
  <div class="col-md-6 text-center">
    <img src="${p.image}" class="img-fluid rounded-4 p-4" style="max-height:420px;object-fit:contain" alt="">
  </div>
  <div class="col-md-6">
    <h1 class="h3 fw-bold">${p.title}</h1>
    <div class="h4 my-3">RM${(p.price * 4.7).toFixed(2)}</div>
    <p>${p.description}</p>
    <div class="d-flex align-items-center gap-3 my-3">
      <input type="number" id="qty" min="1" value="1" class="form-control" style="width:120px">
      <button id="addBtn" class="btn btn-dark btn-lg">Add to Cart</button>
    </div>
    <div class="small text-muted">Category: ${p.category}</div>
  </div>`);
    $('#addBtn').on('click', ()=>{
      addToCart({id:p.id, title:p.title, price:p.price, image:p.image, qty:Number($('#qty').val())||1});
    });
  }catch(e){
    container.html('<div class="alert alert-danger">Failed to load product.</div>');
  }
});
