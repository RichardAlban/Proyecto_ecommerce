const { Given, When, Then, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { Builder, By, until } = require('selenium-webdriver');

setDefaultTimeout(20000);
let timeOut = 20000;
let driver;

// Escenario: Navegar a la página de inicio
Given('Yo ingreso a Home', async () => {
    try {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get('http://localhost:3000');
    } catch (error) {
        console.error('Error al ingresar a Home:', error);
        throw error;
    }
});

// Primer Escenario: Verificar el título de la página
When('Puedo ver el titulo de la página', async () => {
    await driver.wait(until.elementLocated(By.id('ProductsAll')), timeOut);
});

Then('El título de la página debe ser {string}', async (expectedTitle) => {
    const titleElement = await driver.findElement(By.id('ProductsAll'));
    const title = await titleElement.getText();
    if (title !== expectedTitle) {
        throw new Error(`El título debe ser: ${expectedTitle}, el título encontrado es: ${title}`);
    }
});

// Segundo Escenario: Verificar el título de un producto
When('Puedo ver el titulo del Producto', async () => {
    await driver.wait(until.elementLocated(By.id('Pruebas12')), timeOut);
});

Then('El titulo del producto es {string}', async (expectedProductTitle) => {
    const productTitleElement = await driver.findElement(By.id('Pruebas12')); 
    const productTitle = await productTitleElement.getText();
    if (productTitle !== expectedProductTitle) {
        throw new Error(`El título debe ser: ${expectedProductTitle}, el título encontrado es: ${productTitle}`);
    }
});

// Cierra el navegador después de las pruebas
After(async () => {
    await driver.quit();
});