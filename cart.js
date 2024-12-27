
        // Cargar los productos desde el carrito almacenado en localStorage
        function cargarCarrito() {
            const productosCarrito = document.getElementById('productos-carrito');
            const totalElement = document.getElementById('total');
            let carrito = JSON.parse(localStorage.getItem('cart')) || [];
            productosCarrito.innerHTML = '';

            if (carrito.length === 0) {
                productosCarrito.innerHTML = '<p>Tu carrito está vacío.</p>';
                totalElement.textContent = '';
                return;
            }

            let total = 0;
            carrito.forEach(item => {
                const productoDiv = document.createElement('div');
                productoDiv.classList.add('producto-carrito');
                productoDiv.innerHTML = `
                    <p>${item.name} (Cantidad: ${item.quantity}) - $${item.price}</p>
                `;
                productosCarrito.appendChild(productoDiv);

                total += item.price * item.quantity;
            });

            totalElement.textContent = `Total a pagar: $${total}`;
        }

        // Mostrar u ocultar el formulario de pago según la opción seleccionada
        function seleccionarMetodoPago() {
            const formPago = document.getElementById('form-pago');
            const infoTransferencia = document.getElementById('info-transferencia');
            const pagoTarjeta = document.getElementById('pago-tarjeta');
            const pagoTransferencia = document.getElementById('pago-transferencia');

            // Ocultar ambas opciones al inicio
            formPago.classList.add('hidden');
            infoTransferencia.classList.add('hidden');

            // Mostrar la opción seleccionada
            if (pagoTarjeta.checked) {
                formPago.classList.remove('hidden');
                infoTransferencia.classList.add('hidden');
            } else if (pagoTransferencia.checked) {
                infoTransferencia.classList.remove('hidden');
                formPago.classList.add('hidden');
            }
        }

        // Función para simular la compra
        function realizarCompra() {
            const pagoTarjeta = document.getElementById('pago-tarjeta').checked;
            const pagoTransferencia = document.getElementById('pago-transferencia').checked;

            if (!pagoTarjeta && !pagoTransferencia) {
                alert('Por favor, selecciona un método de pago.');
                return;
            }

            if (pagoTarjeta) {
                const numeroTarjeta = document.getElementById('numero-tarjeta').value;
                const fechaExpiracion = document.getElementById('fecha-expiracion').value;
                const cvv = document.getElementById('cvv').value;

                // Validaciones simples de la tarjeta
                if (!numeroTarjeta || numeroTarjeta.length !== 16 || isNaN(numeroTarjeta)) {
                    alert('Por favor, ingresa un número de tarjeta válido.');
                    return;
                }
                if (!fechaExpiracion || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(fechaExpiracion)) {
                    alert('Por favor, ingresa una fecha de expiración válida (MM/AA).');
                    return;
                }
                if (!cvv || cvv.length !== 3 || isNaN(cvv)) {
                    alert('Por favor, ingresa un CVV válido.');
                    return;
                }
            }

            // Mostrar mensaje de compra exitosa
            document.getElementById('mensaje-compra').classList.remove('hidden');

            // Vaciar el carrito
            localStorage.removeItem('cart');
            cargarCarrito();

            // Limpiar el formulario de tarjeta
            document.getElementById('form-pago').reset();
        }

        // Manejar el clic en el botón de comprar
        document.getElementById('comprar').addEventListener('click', realizarCompra);

        // Manejar el cambio en el método de pago
        document.getElementById('pago-tarjeta').addEventListener('change', seleccionarMetodoPago);
        document.getElementById('pago-transferencia').addEventListener('change', seleccionarMetodoPago);

        // Cargar el carrito al cargar la página
        cargarCarrito();

        // Botón para volver a la página principal
        document.getElementById('volver-index').addEventListener('click', () => {
            window.location.href = 'index.html';
        });

      // FORMA DE ENVIOS
      // Mostrar u ocultar las opciones según la forma de envío seleccionada
    function seleccionarFormaEnvio() {
        const infoEnvioDomicilio = document.getElementById('info-envio-domicilio');
        const infoEnvioRetiro = document.getElementById('info-envio-retiro');
        const envioDomicilio = document.getElementById('envio-domicilio');
        const envioRetiro = document.getElementById('envio-retiro');

        // Ocultar ambas opciones al inicio
        infoEnvioDomicilio.classList.add('hidden');
        infoEnvioRetiro.classList.add('hidden');

        // Mostrar la opción seleccionada
        if (envioDomicilio.checked) {
            infoEnvioDomicilio.classList.remove('hidden');
            infoEnvioRetiro.classList.add('hidden');
        } else if (envioRetiro.checked) {
            infoEnvioRetiro.classList.remove('hidden');
            infoEnvioDomicilio.classList.add('hidden');
        }
    }

    // Manejar el cambio en la forma de envío
    document.getElementById('envio-domicilio').addEventListener('change', seleccionarFormaEnvio);
    document.getElementById('envio-retiro').addEventListener('change', seleccionarFormaEnvio);

    // Asegúrate de que la forma de envío seleccionada al cargar la página se refleje correctamente
    seleccionarFormaEnvio();

    