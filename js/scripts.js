document.addEventListener('DOMContentLoaded', function() {
    // Fetch and display products on index.html
    fetch('backend/getProducts.php')
        .then(response => response.json())
        .then(data => {
            let productList = document.getElementById('product-list');
            data.forEach(product => {
                let productItem = document.createElement('div');
                productItem.className = 'col-md-4';
                productItem.innerHTML = `
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text">${product.description}</p>
                            <p class="card-text">$${product.price}</p>
                        </div>
                    </div>
                `;
                productList.appendChild(productItem);
            });
        });

    // Handle form submission for adding new products
    let productForm = document.getElementById('product-form');
    if (productForm) {
        productForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let formData = new FormData(productForm);
            fetch('backend/insert.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.text())
            .then(data => {
                alert(data);
                window.location.reload();
            });
        });
    }
});
