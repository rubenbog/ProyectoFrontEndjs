
       // Funcionalidad del carrito de compras
       document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', function () {
                const name = this.getAttribute('data-name');
                const price = this.getAttribute('data-price');
                let cart = JSON.parse(localStorage.getItem('cart')) || [];
                const itemIndex = cart.findIndex(item => item.name === name);

                if (itemIndex !== -1) {
                    cart[itemIndex].quantity += 1;
                } else {
                    cart.push({ name, price, quantity: 1 });
                }

                localStorage.setItem('cart', JSON.stringify(cart));
                alert(`${name} añadido al carrito`);
            });
        });

        // Verificar si el usuario está logueado
        document.getElementById('video-btn').addEventListener('click', function() {
            
            const loggedIn = localStorage.getItem('user');
            
            if (loggedIn && loggedIn.length > 0 )  {
                
                // Si el usuario está logueado, redirigir a la página de videos.
                window.location.href = 'recetas.html';
            } else {
                // Si no está logueado, mostrar el popup
                document.getElementById('popup1').style.display = 'flex';
                
                
            }
        });
 
        // Cerrar el popup
       /* document.querySelector('.close').addEventListener('click', function() {
            document.getElementById('popup1').style.display = 'none';
        });*/
        document.querySelector('.close').addEventListener('click', function() {
            document.getElementById('popup1').classList.remove('flex');
        });

        // Controlar el estado del login
         window.onload = function() {
            const user = localStorage.getItem('user');

            if (user) {
                document.getElementById('logoutSection').style.display = 'block';
                document.getElementById('registerLink').style.display = 'none';
            } else {
                document.getElementById('videoSection').style.display = 'none';
            }
        };

        // Cerrar sesión
        document.getElementById('logoutButton').addEventListener('click', function() {
            localStorage.removeItem('user');
            alert('Sesión cerrada');
            location.reload();
        });
   