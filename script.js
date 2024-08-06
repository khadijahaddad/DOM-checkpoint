document.addEventListener('DOMContentLoaded', () => {
    const cart = document.querySelector('.cart');
    const totalPriceElement = document.querySelector('.total-price');

    // Fonction pour mettre à jour le prix total
    function updateTotalPrice() {
        let total = 0;
        document.querySelectorAll('.item').forEach(item => {
            const quantity = parseInt(item.querySelector('.quantity').textContent);
            const price = parseFloat(item.dataset.price);
            total += quantity * price;
        });
        totalPriceElement.textContent = `$${total.toFixed(2)}`;
    }

    // Gestion des événements sur le panier
    cart.addEventListener('click', (event) => {
        if (event.target.classList.contains('quantity-btn')) {
            const item = event.target.closest('.item');
            const quantityElement = item.querySelector('.quantity');
            let quantity = parseInt(quantityElement.textContent);

            // Ajustement de la quantité
            if (event.target.classList.contains('plus')) {
                quantity++;
            } else if (event.target.classList.contains('minus')) {
                if (quantity > 1) {
                    quantity--;
                }
            }
            quantityElement.textContent = quantity;

            // Mise à jour du prix total de l'article
            item.querySelector('.item-total-price').textContent = `$${(quantity * parseFloat(item.dataset.price)).toFixed(2)}`;
            updateTotalPrice();
        }

        // Suppression d'un article
        if (event.target.classList.contains('remove-btn')) {
            const item = event.target.closest('.item');
            item.remove();
            updateTotalPrice();
        }

        // Ajout/enlèvement de l'état "aime" d'un article
        if (event.target.classList.contains('like-btn')) {
            event.target.classList.toggle('liked');
        }

        // Zoom sur l'image du produit
        if (event.target.classList.contains('product-image')) {
            event.target.classList.toggle('zoomed');
        }
    });

    // Mise à jour initiale du prix total
    updateTotalPrice();
});
