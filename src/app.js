

let carrito = [];

function agregarProducto(nombre, precio) {
  const producto = carrito.find(p => p.nombre === nombre);
  if (producto) {
    producto.cantidad++;
  } else {
    carrito.push({ nombre, precio, cantidad: 1 });
  }
  actualizarCarrito();
}

function incrementarCantidad(nombre) {
  const producto = carrito.find(p => p.nombre === nombre);
  if (producto) {
    producto.cantidad++;
    actualizarCarrito();
  }
}

function decrementarCantidad(nombre) {
  const producto = carrito.find(p => p.nombre === nombre);
  if (producto && producto.cantidad > 1) {
    producto.cantidad--;
    actualizarCarrito();
  }
}

function eliminarProducto(nombre) {
  carrito = carrito.filter(p => p.nombre !== nombre);
  actualizarCarrito();
}

function calcularTotal() {
  const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
  document.getElementById('total').innerText = `Total: $${total}`;
}

function vaciarCarrito() {
  carrito = [];
  actualizarCarrito();
}

function mostrarEstadoPedido() {
  document.getElementById('estadoPedido').style.display = 'block';
  document.getElementById('carrito').style.display = 'none';
}

function verCarrito() {
  document.getElementById('estadoPedido').style.display = 'none';
  document.getElementById('carrito').style.display = 'block';
}

function actualizarCarrito() {
  const carritoElem = document.getElementById('carrito');
  carritoElem.innerHTML = '';
  carrito.forEach(({ nombre, precio, cantidad }) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${nombre} - $${precio} x ${cantidad}
      <button onclick="incrementarCantidad('${nombre}')">+</button>
      <button onclick="decrementarCantidad('${nombre}')">-</button>
      <button onclick="eliminarProducto('${nombre}')">Remove</button>
    `;
    carritoElem.appendChild(li);
  });
}

document.querySelectorAll('.add').forEach(btn => {
  btn.addEventListener('click', () => {
    const producto = btn.closest('.producto');
    agregarProducto(producto.dataset.nombre, parseFloat(producto.dataset.precio));
  });
});

document.getElementById('calcular').addEventListener('click', calcularTotal);
document.getElementById('vaciar').addEventListener('click', vaciarCarrito);
document.getElementById('verEstado').addEventListener('click', mostrarEstadoPedido);
document.getElementById('verCarrito').addEventListener('click', verCarrito);
