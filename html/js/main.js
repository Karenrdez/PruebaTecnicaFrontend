document.getElementById("loadProducts").addEventListener("click", () => {

  fetch("https://api.escuelajs.co/api/v1/products")
    .then(res => res.json())
    .then(products => {

      const container = document.getElementById("productsRow");
      container.innerHTML = "";

      products.slice(0, 8).forEach(product => {

        const shortDescription = product.description.substring(0, 100) + "...";

        container.innerHTML += `
          <div class="col-md-3 mb-4">
            <div class="card shadow-sm">
              <img src="${product.images[0]}" class="card-img-top" height="200">
              <div class="card-body">
                <h6>${product.title}</h6>
                <p class="card-text">${shortDescription}</p>
                <p>$${product.price}</p>
                <button 
                  class="btn btn-sm btn-outline-secondary"
                  data-bs-toggle="modal"
                  data-bs-target="#productModal"
                  onclick="openModal(${product.id})">
                  View
                </button>
              </div>
            </div>
          </div>
        `;
      });

      window.allProducts = products;
    });
});


function openModal(id) {
  const product = window.allProducts.find(p => p.id === id);

  document.getElementById("modalTitle").textContent = product.title;
  document.getElementById("modalDescription").textContent = product.description;
  document.getElementById("modalCategory").textContent = product.category.name;

  const imagesContainer = document.getElementById("modalImages");
  imagesContainer.innerHTML = "";

  product.images.slice(1, 3).forEach(img => {
    imagesContainer.innerHTML += `
      <img src="${img}" width="150">
    `;
  });
}





