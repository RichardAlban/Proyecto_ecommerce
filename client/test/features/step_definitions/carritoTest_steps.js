const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');

// Simulaciones para pruebas
let carrito = {
  productos: [],
  total: 0.0,
  direccion: 'admin',
};

Given('el usuario está en la página del carrito de compras', function () {
  // Simula cargar la página
  carrito.productos = [];
  carrito.total = 0.0;
  carrito.direccion = 'admin';
});

When('no hay productos en el carrito', function () {
  // Asegurarse de que el carrito está vacío
  carrito.productos = [];
  carrito.total = 0.0;
});

Then('el mensaje "Tu carrito está vacío" debería mostrarse', function () {
  const mensaje = carrito.productos.length === 0 ? 'Tu carrito está vacío' : '';
  assert.strictEqual(mensaje, 'Tu carrito está vacío');
});

Then('el total debería ser "$0.00"', function () {
  assert.strictEqual(carrito.total, 0.0);
});

When('el usuario agrega un producto llamado {string} con precio {string}', function (nombre, precio) {
  carrito.productos.push({ nombre, precio: parseFloat(precio.replace('$', '')) });
  carrito.total += parseFloat(precio.replace('$', ''));
});

Then('el carrito debería mostrar el producto {string}', function (nombre) {
  const producto = carrito.productos.find(p => p.nombre === nombre);
  assert.notStrictEqual(producto, undefined);
});

Then('el total debería ser {string}', function (total) {
  assert.strictEqual(carrito.total, parseFloat(total.replace('$', '')));
});

When('el usuario actualiza la dirección a {string}', function (nuevaDireccion) {
  carrito.direccion = nuevaDireccion;
});

Then('la dirección actual debería ser {string}', function (direccionEsperada) {
  assert.strictEqual(carrito.direccion, direccionEsperada);
});

Given('el carrito contiene productos', function () {
  carrito.productos = [{ nombre: 'Producto A', precio: 10.0 }];
  carrito.total = 10.0;
});

When('el usuario hace clic en el botón {string}', function (boton) {
  assert.strictEqual(boton, 'Pagar');
  // Simula la acción de redirigir al proceso de pago
  carrito.pagando = true;
});

Then('el sistema debería redirigir al proceso de pago', function () {
  assert.strictEqual(carrito.pagando, true);
});
