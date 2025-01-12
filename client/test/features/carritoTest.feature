Feature: Carrito de compras
 
  Scenario: Ver carrito vacío
    Given el usuario está en la página del carrito de compras
    When no hay productos en el carrito
    Then el mensaje "Tu carrito está vacío" debería mostrarse
    And el total debería ser "$0.00"

  Scenario: Agregar un producto al carrito
    Given el usuario está en la página del carrito de compras
    When el usuario agrega un producto llamado "Producto A" con precio "$10.00"
    Then el carrito debería mostrar el producto "Producto A"
    And el total debería ser "$10.00"

  Scenario: Actualizar dirección del usuario
    Given el usuario está en la página del carrito de compras
    And la dirección actual es "admin"
    When el usuario actualiza la dirección a "Nueva dirección"
    Then la dirección actual debería ser "Nueva dirección"

  Scenario: Completar el proceso de pago
    Given el carrito contiene productos
    When el usuario hace clic en el botón "Pagar"
    Then el sistema debería redirigir al proceso de pago