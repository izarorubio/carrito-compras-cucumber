const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');

// Variables globales para las pruebas
let productos = [];
let carrito = [];
let total = 0;
let estadoPedidoVisible = false;

// Funciones auxiliares
function agregarProducto(nombre, precio) {
  const producto = carrito.find(p => p.nombre === nombre);
  if (producto) {
    producto.cantidad++;
  } else {
    carrito.push({ nombre, precio, cantidad: 1 });
  }
}

function incrementarCantidad(nombre) {
  const producto = carrito.find(p => p.nombre === nombre);
  if (producto) {
    producto.cantidad++;
  }
}

function decrementarCantidad(nombre) {
  const producto = carrito.find(p => p.nombre === nombre);
  if (producto && producto.cantidad > 1) {
    producto.cantidad--;
  }
}

function eliminarProducto(nombre) {
  carrito = carrito.filter(p => p.nombre !== nombre);
}

function calcularTotal() {
  total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
}

function vaciarCarrito() {
  carrito = [];
}


// Steps para los escenarios
Given('un usuario visualiza la lista de productos', function () {
  productos = [
    { nombre: 'Manzana', precio: 1 },
    { nombre: 'Plátano', precio: 2 },
  ];
  carrito = [];
});

When('el usuario hace clic en "Add to Cart" para un producto', function () {
  agregarProducto('Manzana', 1);
});

Then('el producto seleccionado se agrega al carrito con una cantidad de {int}', function (cantidadEsperada) {
  const producto = carrito.find(p => p.nombre === 'Manzana');
  assert.strictEqual(producto.cantidad, cantidadEsperada);
});

Given('un producto está en el carrito', function () {
  carrito = [{ nombre: 'Manzana', precio: 1, cantidad: 0 }];
});

When('el usuario hace clic en el botón "+" del producto', function () {
  incrementarCantidad('Manzana');
});

Then('la cantidad del producto aumenta en {int}', function (cantidadEsperada) {
  const producto = carrito.find(p => p.nombre === 'Manzana');
  assert.strictEqual(producto.cantidad, cantidadEsperada);
});

Given('un producto está en el carrito con cantidad mayor a {int}', function (cantidad) {
  carrito = [{ nombre: 'Manzana', precio: 1, cantidad: 2 }];
});

When('el usuario hace clic en el botón "-" del producto', function () {
  decrementarCantidad('Manzana');
});

Then('la cantidad del producto disminuye en {int}', function (cantidadEsperada) {
  const producto = carrito.find(p => p.nombre === 'Manzana');
  assert.strictEqual(producto.cantidad, cantidadEsperada);
});

When('el usuario hace clic en el botón "Remove" del producto', function () {
  eliminarProducto('Manzana');
});

Then('el producto se elimina del carrito', function () {
  const producto = carrito.find(p => p.nombre === 'Manzana');
  assert.strictEqual(producto, undefined);
});

Given('hay productos en el carrito con precios y cantidades específicas', function () {
  carrito = [
    { nombre: 'Manzana', precio: 1, cantidad: 2 },
    { nombre: 'Plátano', precio: 2, cantidad: 1 },
  ];
});

When('el usuario hace clic en el botón "Calculate Total"', function () {
  calcularTotal();
});

Then('se muestra el total correcto basado en los precios y cantidades', function () {
  assert.strictEqual(total, 4);
});

// Given: Hay productos en el carrito
Given('hay productos en el carrito', function () {
    carrito = [
      { nombre: 'Manzana', precio: 1, cantidad: 2 },
      { nombre: 'Plátano', precio: 2, cantidad: 1 },
    ];
  });
  

When('el usuario hace clic en el botón "Clear Cart"', function () {
  vaciarCarrito();
});

Then('todos los productos se eliminan del carrito', function () {
  assert.strictEqual(carrito.length, 0);
});


module.exports = {};
