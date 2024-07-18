let carrito = [];

document.addEventListener('DOMContentLoaded', () => {
    // Cargar el carrito del localStorage al iniciar la página
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'));
        actualizarCarrito();
    }
});

function añadirAlCarrito(productId, categoria) {
    const producto = productos[categoria].find(prod => prod.id === productId);
    const itemEnCarrito = carrito.find(item => item.id === productId);

    if (itemEnCarrito) {
        itemEnCarrito.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    guardarCarrito();
    actualizarCarrito();
    mostrarNotificacion(`${producto.nombre} añadido al carrito.`, 'success');
}

function actualizarCarrito() {
    const tbodyCarrito = document.getElementById('tbody-carrito');
    
    if (!tbodyCarrito) {
        console.error('No se encontró el tbody del carrito.');
        return;
    }

    tbodyCarrito.innerHTML = '';

    carrito.forEach(producto => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td><img src="${producto.imagen}" class="img-thumbnail" width="50" height="50"></td>
            <td>${producto.nombre}</td>
            <td>${producto.marca}</td>
            <td>S/${producto.precio.toFixed(2)}</td>
            <td>
                <input type="number" class="form-control cantidad-input" value="${producto.cantidad}" min="1" max="10" data-id="${producto.id}">
            </td>
            <td>S/<span class="subtotal">${(producto.precio * producto.cantidad).toFixed(2)}</span></td>
            <td>
                <button class="btn btn-sm btn-danger btn-eliminar" data-id="${producto.id}">Eliminar</button>
            </td>
        `;
        tbodyCarrito.appendChild(fila);
    });

    actualizarTotal();  // Actualizar subtotal y total después de renderizar el carrito
    agregarEventos();   // Volver a agregar eventos después de renderizar el carrito
}

function actualizarCantidad(productId, cantidad) {
    const itemEnCarrito = carrito.find(item => item.id === productId);
    if (itemEnCarrito) {
        itemEnCarrito.cantidad = parseInt(cantidad);
        guardarCarrito();
        actualizarCarrito();
    }
}

function eliminarDelCarrito(productId) {
    const producto = carrito.find(item => item.id === productId);
    if (producto) {
        carrito = carrito.filter(item => item.id !== productId);
        guardarCarrito();
        actualizarCarrito();
        mostrarNotificacion(`${producto.nombre} eliminado del carrito.`, 'danger');
    } else {
        console.error(`Producto con ID ${productId} no encontrado en el carrito.`);
    }
}

function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function actualizarTotal() {
    let subtotal = 0;

    carrito.forEach(producto => {
        subtotal += producto.precio * producto.cantidad;
    });

    const impuestos = subtotal * 0.15;
    const total = subtotal + impuestos;

    const subtotalElemento = document.getElementById('subtotal');
    const impuestosElemento = document.getElementById('impuestos');
    const totalElemento = document.getElementById('total');

    if (subtotalElemento && impuestosElemento && totalElemento) {
        subtotalElemento.textContent = subtotal.toFixed(2);
        impuestosElemento.textContent = impuestos.toFixed(2);
        totalElemento.textContent = total.toFixed(2);
    } else {
        console.error('Alguno de los elementos (subtotal, impuestos o total) no fue encontrado.');
    }
}


function agregarEventos() {
    // Actualizar cantidad
    const inputsCantidad = document.querySelectorAll('.cantidad-input');
    inputsCantidad.forEach(input => {
        input.addEventListener('change', e => {
            const productId = parseInt(e.target.dataset.id);
            const nuevaCantidad = e.target.value;
            actualizarCantidad(productId, nuevaCantidad);
        });
    });

    // Eliminar del carrito
    const botonesEliminar = document.querySelectorAll('.btn-eliminar');
    botonesEliminar.forEach(button => {
        button.addEventListener('click', e => {
            const productId = parseInt(e.target.dataset.id);
            eliminarDelCarrito(productId);
        });
    });
}

function vaciarCarrito() {
    carrito = [];
    guardarCarrito();
    actualizarCarrito();
    mostrarNotificacion('Carrito vaciado.', 'danger');
}

function mostrarNotificacion(mensaje, tipo) {
    const notificaciones = document.getElementById('notificaciones');
    const notificacion = document.createElement('div');
    notificacion.className = `alert alert-${tipo}`;
    notificacion.textContent = mensaje;
    notificaciones.appendChild(notificacion);
    
    setTimeout(() => {
        notificacion.remove();
    }, 3000);
}

document.getElementById('vaciar-carrito').addEventListener('click', vaciarCarrito);
