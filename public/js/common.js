const allLikeButtons = document.querySelectorAll('.like-btn');

async function likeButton(productId, btn) {
    try {
        const response = await axios({
            method: 'post',
            url: `/products/${productId}/like`,
            // check your route spelling
            headers: { 'X-Requested-With': 'XMLHttpRequest' },
            //   withCredentials: true,
        });

        // Toggle icon class (FontAwesome)
        if (btn.children[0].classList.contains('fas')) {
            btn.children[0].classList.remove('fas', 'text-danger');
            btn.children[0].classList.add('far');
        } else {
            btn.children[0].classList.remove('far');
            btn.children[0].classList.add('fas', 'text-danger');
        }

        console.log(response.data);
    } catch (e) {
        console.log(e);
        window.location.replace('/login'); // redirect to login if not logged in
    }
}

// Attach event listener
for (let btn of allLikeButtons) {
    btn.addEventListener('click', () => {
        const productId = btn.getAttribute('product-id');
        likeButton(productId, btn);
    });
}
