Feature: Gestión del carrito de compras
COMO comprador QUIERO agregar, modificar y eliminar productos del carrito PARA ajustar mi compra.

  Scenario: Agregar un producto al carrito
    Given un usuario visualiza la lista de productos
    When el usuario hace clic en "Add to Cart" para un producto
    Then el producto seleccionado se agrega al carrito con una cantidad de 1

  Scenario: Incrementar la cantidad de un producto en el carrito
    Given un producto está en el carrito
    When el usuario hace clic en el botón "+" del producto
    Then la cantidad del producto aumenta en 1

  Scenario: Decrementar la cantidad de un producto en el carrito
    Given un producto está en el carrito con cantidad mayor a 1
    When el usuario hace clic en el botón "-" del producto
    Then la cantidad del producto disminuye en 1

  Scenario: Eliminar un producto del carrito
    Given un producto está en el carrito
    When el usuario hace clic en el botón "Remove" del producto
    Then el producto se elimina del carrito

  Scenario: Calcular el total del carrito
    Given hay productos en el carrito con precios y cantidades específicas
    When el usuario hace clic en el botón "Calculate Total"
    Then se muestra el total correcto basado en los precios y cantidades

  Scenario: Vaciar el carrito
    Given hay productos en el carrito
    When el usuario hace clic en el botón "Clear Cart"
    Then todos los productos se eliminan del carrito

