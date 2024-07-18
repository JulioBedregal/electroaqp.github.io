const productos = {
    electrohogar: [
        { id: 1, nombre: 'Aspiradora', marca: 'Smarthlife', precio: 50, imagen: 'img/aspiradora_smarthlife.jpg' },
        { id: 2, nombre: 'Horno', marca: 'Corbero', precio: 100, imagen: 'img/Foto_Horno_CCHM603W_corbero.jpg' },
        { id: 3, nombre: 'Horno', marca: 'Corbero', precio: 100, imagen: 'img/Foto_Horno_CCHM603X_corbero.jpg' },
        { id: 4, nombre: 'Microondas', marca: 'Corbero', precio: 100, imagen: 'img/Microondas_CMICM20GLNINTEG.jpg' },
        { id: 5, nombre: 'Microondas', marca: 'Corbero', precio: 100, imagen: 'img/MICROONDAS_CORBERO_CMICG220W.jpg' }
        
        // Añade más productos aquí
    ],
    tecnologia: [
        { id: 11, nombre: 'Celular', marca: 'Dell', precio: 800, imagen: './img/samsung_s20.jpg' },
        { id: 12, nombre: 'Celular', marca: 'Samsung', precio: 600, imagen: './img/samsung_s22.jpg' },
        { id: 13, nombre: 'Laptop', marca: 'Hp', precio: 600, imagen: './img/laptop_250 G7.jpg' },
        { id: 14, nombre: 'Laptop', marca: 'Lenovo', precio: 600, imagen: './img/LENOVO_IDEAPAD 5 14ITL05.jpg' },
        { id: 15, nombre: 'Laptop', marca: 'Dell', precio: 600, imagen: './img/DEL_LAPTOP DELL LATITUDE 3520.jpg' }
        
        
        // Añade más productos aquí
    ],
    muebles: [
        { id: 21, nombre: 'Sofa', marca: 'Ikea', precio: 300, imagen: './img/sofa_chiqui.jpg' },
        { id: 22, nombre: 'Silla', marca: 'Glasglow', precio: 150, imagen: '../img/Silla Glasgow.jpg' },
        { id: 23, nombre: 'Mesa', marca: 'Noa', precio: 150, imagen: './img/Mesa Noa.jpg' },
        { id: 24, nombre: 'Banco', marca: 'Woody', precio: 150, imagen: './img/Banco Woody.jpg' },
        { id: 25, nombre: 'Silla', marca: 'Smart Lux', precio: 150, imagen: './img/Silla Smart Lux.jpg' }
        
        // Añade más productos aquí
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    cargarProductos();
});

function cargarProductos() {
    for (let categoria in productos) {
        const contenedor = document.getElementById(categoria);
        productos[categoria].forEach(producto => {
            const div = document.createElement('div');
            div.className = 'col-4 mb-4';
            div.innerHTML = `
                <div class="card card-product">
                    <img src="${producto.imagen}" class="card-img-top card-img-top-product" alt="${producto.nombre}">
                    <div class="card-body card-body-product">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text">Marca: ${producto.marca}</p>
                        <p class="card-text">Precio: S/${producto.precio.toFixed(2)}</p>
                        <button class="btn btn-primary" onclick="añadirAlCarrito(${producto.id}, '${categoria}')">Añadir al Carrito</button>
                    </div>
                </div>
            `;
            contenedor.appendChild(div);
        });
    }
}
