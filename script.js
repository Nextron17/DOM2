const productos = [
    {
        id: 1,
        nombre: "Laptop",
        descripcion: "Laptop de última generación",
        precio: 3.5,
        imagen: "img/pexels-tuurt-812264.jpg"
    },
    {
        id: 2,
        nombre: "Celular",
        descripcion: "Celular inteligente",
        precio: 800,
        imagen: "img/pexels-noah-erickson-97554-404280.jpg"
    },
    {
        id: 3,
        nombre: "Auriculares",
        descripcion: "Auriculares inalámbricos con cancelación de ruido",
        precio: 250,
        imagen: "img/pexels-gaurav-kumar-1281378-29684681.jpg"
    },
    {
        id: 4,
        nombre: "Televisor",
        descripcion: "Televisor de inteligente de 55 pulgadas",
        precio: 1.6,
        imagen: "img/pexels-freestocks-987586.jpg"
    }
];

let carrito = [];

function renderProductos() {
    const productosContainer = document.getElementById('productos');
    productosContainer.innerHTML = '';

    productos.forEach(producto => {
        const productoDiv = document.createElement('section');
        productoDiv.classList.add('producto');
        productoDiv.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <p>$${producto.precio.toFixed(2)}</p>
            <button class="btn-agregar" onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
        `;
        productosContainer.appendChild(productoDiv);
    });
}

function agregarAlCarrito(productoId) {
    const producto = productos.find(p => p.id == productoId);
    if (producto) {
        carrito.push(producto);
        renderCarrito();
        mostrarModal();
    }
}

function renderCarrito() {
    const itemsCarrito = document.getElementById('items-carrito');
    const totalCarrito = document.getElementById('total-carrito');
    
    itemsCarrito.innerHTML = '';
    
    carrito.forEach((producto, index) => {
        const itemDiv = document.createElement('section');
        itemDiv.classList.add('item-carrito');
        itemDiv.innerHTML = `
            <span>${producto.nombre}</span>
            <span>$${producto.precio.toFixed(2)}</span>
            <button class="btn-eliminar" onclick="eliminarDelCarrito(${index})">Eliminar</button>
        `;
        itemsCarrito.appendChild(itemDiv);
    });

    const total = carrito.reduce((sum, producto) => sum + producto.precio, 0);
    totalCarrito.textContent = `Total: $${total.toFixed(2)}`;
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    renderCarrito();
}

function mostrarModal() {
    document.getElementById('carrito-modal').style.display = 'flex';
}

function ocultarModal() {
    document.getElementById('carrito-modal').style.display = 'none';
}

document.getElementById('btn-limpiar').addEventListener('click', () => {
    carrito = [];
    renderCarrito();
});

document.getElementById('btn-seguir').addEventListener('click', ocultarModal);

renderProductos();