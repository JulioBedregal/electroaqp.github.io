// productos.js

document.addEventListener('DOMContentLoaded', function() {
    // Obtener referencia al contenedor de productos de Electrohogar
    const electrohogarContainer = document.getElementById('electrohogar');

    // Simular datos de productos (puedes obtener estos datos de tu servidor o base de datos)
    const productosElectrohogar = [
        
        { id: 1, nombre: 'Aspiradora', marca: 'Smarthlife', precio: 50, imagen: '../img/aspiradora_smarthlife.jpg' },
        { id: 2, nombre: 'Horno', marca: 'Corbero', precio: 100, imagen: '../img/Foto_Horno_CCHM603W_corbero.jpg' },
        { id: 3, nombre: 'Horno', marca: 'Corbero', precio: 100, imagen: '../img/Foto_Horno_CCHM603X_corbero.jpg' },
        { id: 4, nombre: 'Microondas', marca: 'Corbero', precio: 100, imagen: '../img/Microondas_CMICM20GLNINTEG.jpg' },
        { id: 5, nombre: 'Microondas', marca: 'Corbero', precio: 100, imagen: '../img/MICROONDAS_CORBERO_CMICG220W.jpg' }
            
        // Agrega más productos según sea necesario
    ];

    // Función para renderizar los productos de Electrohogar
    function mostrarProductosElectrohogar() {
        electrohogarContainer.innerHTML = ''; // Limpiar el contenedor

        productosElectrohogar.forEach(producto => {
            // Crear elementos HTML para cada producto
            const card = document.createElement('div');
            card.classList.add('col-md-4', 'mb-4');

            card.innerHTML = `
                <div class="card">
                    <img src="../img/${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                    <div class="card-body">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text">Precio: S/${producto.precio.toFixed(2)}</p>
                        <button class="btn btn-primary btn-block">Agregar al Carrito</button>
                    </div>
                </div>
            `;

            electrohogarContainer.appendChild(card);
        });
    }

    // Mostrar productos al cargar la página
    mostrarProductosElectrohogar();
});
