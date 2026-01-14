document.getElementById("loadProducts").addEventListener("click", () => {
  fetch("https://api.escuelajs.co/api/v1/products?offset=0&limit=40")
    .then(res => res.json())
    .then(products => {
      const container = document.getElementById("productsRow");
      container.innerHTML = "";

      window.allProducts = products; // para el modal

      products.forEach(product => {
        container.innerHTML += `
          <div class="col-md-3 mb-4">
            <div class="card shadow-sm">
              <img src="${product.images[0] || 'https://via.placeholder.com/200'}" class="card-img-top" height="200">
              <div class="card-body">
                <h6>${product.title}</h6>
                <p class="card-text">${(product.description || '').substring(0, 100)}...</p>
                <p>$${product.price}</p>
                <button class="btn btn-sm btn-outline-secondary"
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
    })
    .catch(err => {
      console.error(err);
      alert("Error al cargar productos");
    });
});

function openModal(id) {
  const product = window.allProducts.find(p => p.id === id);
  if (!product) return;

  document.getElementById("modalTitle").textContent = product.title;
  document.getElementById("modalDescription").textContent = product.description;
  document.getElementById("modalCategory").textContent = product.category?.name || "N/A";

  // Imagen principal
  const mainImage = document.getElementById("modalMainImage");
  mainImage.src = product.images[0] || 'https://via.placeholder.com/400';

  // Miniaturas
  const imagesContainer = document.getElementById("modalImages");
  imagesContainer.innerHTML = "";
  (product.images || []).slice(1, 3).forEach(img => {
    const thumb = document.createElement("img");
    thumb.src = img;
    thumb.width = 100;
    thumb.style.cursor = "pointer";

    // Cambiar imagen principal al click
    thumb.onclick = () => {
      mainImage.src = img;
    }

    imagesContainer.appendChild(thumb);
  });
}







