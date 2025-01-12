Feature: Productos
    
    Scenario: Verificar el título de la página
    Given Yo ingreso a Home
    When Puedo ver el titulo de la página
    Then El título de la página debe ser "Todos los Productos"

    Scenario: Verificar el titulo de un Producto
    Given Yo ingreso a Home
    When Puedo ver el titulo del Producto
    Then El titulo del prodcuto es "Pruebas12"
