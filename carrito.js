// carrito.js

// Inicializar un array vacío para almacenar los productos del carrito
let carrito = [];

// Función para actualizar el carrito en la tabla
function actualizarCarrito() {
    const tbody = document.querySelector("#cart-items tbody");
    tbody.innerHTML = ''; // Limpiar el contenido previo

    let total = 0;

    carrito.forEach((item, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${item.nombre}</td>
            <td>$${item.precio}</td>
            <td>
                <input type="number" value="${item.cantidad}" min="1" data-index="${index}" class="cantidad-input">
            </td>
            <td>$${item.precio * item.cantidad}</td>
            <td><button class="remove-item" data-index="${index}">Eliminar</button></td>
        `;

        tbody.appendChild(row);

        total += item.precio * item.cantidad;
    });

    // Actualizar el total
    document.getElementById('total-amount').innerText = total;

    // Actualizar cantidad de productos
    document.querySelectorAll('.cantidad-input').forEach(input => {
        input.addEventListener('change', actualizarCantidad);
    });

    // Eliminar producto del carrito
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', eliminarProducto);
    });
}

// Función para agregar un producto al carrito
function agregarAlCarrito(nombre, precio) {
    const productoExistente = carrito.find(item => item.nombre === nombre);

    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        const nuevoProducto = {
            nombre: nombre,
            precio: parseFloat(precio),
            cantidad: 1
        };
        carrito.push(nuevoProducto);
    }

    actualizarCarrito();
}

// Función para actualizar la cantidad de un producto
function actualizarCantidad(e) {
    const index = e.target.dataset.index;
    const nuevaCantidad = parseInt(e.target.value);

    carrito[index].cantidad = nuevaCantidad > 0 ? nuevaCantidad : 1;
    actualizarCarrito();
}

// Función para eliminar un producto del carrito
function eliminarProducto(e) {
    const index = e.target.dataset.index;
    carrito.splice(index, 1); // Eliminar del array
    actualizarCarrito();
}

// Añadir evento a los botones "Añadir al carrito"
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const nombre = button.getAttribute('data-name');
        const precio = button.getAttribute('data-price');
        agregarAlCarrito(nombre, precio);
    });
});

// Función de checkout (comprar)
document.getElementById('checkout').addEventListener('click', () => {
    if (carrito.length > 0) {
        alert(`Compra realizada con éxito. Total a pagar: $${document.getElementById('total-amount').innerText}`);
        carrito = []; // Limpiar carrito
        actualizarCarrito();
    } else {
        alert('El carrito está vacío.');
    }
});
