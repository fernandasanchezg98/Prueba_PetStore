#  Reto de Automatización con Cypress - PetStore

Este proyecto tiene como objetivo implementar pruebas automatizadas sobre la API de PetStore:

https://petstore.swagger.io/


Para el desarrollo del reto se utilizó Cypress con Cucumber, aplicando buenas prácticas de automatización como separación de responsabilidades mediante Features, Step Definitions, Pages, Assertions y Constants.

Se automatizaron escenarios asociados a usuarios validando los métodos:

- POST: Creación de usuario
- GET: Consulta de usuario
- PUT: Actualización de usuario
- DELETE: Eliminación de usuario

#  Estructura del proyecto

## features

Contiene los escenarios de prueba escritos en lenguaje Gherkin utilizando Given, When y Then.

Aquí se encuentran los flujos funcionales que serán automatizados.

Features:

- Crear usuario
- Consultar usuario
- Actualizar usuario
- Eliminar usuario
- Consultar usuario después de su actualización

## pages

Contiene los métodos encargados de consumir los servicios de la API.

Aquí se encuentran las peticiones HTTP realizadas:

- POST
- GET
- PUT
- DELETE

## step_definitions

Aquí conectamos los escenarios con la lógica de automatización.

En esta capa se realiza:

- Preparación de los datos de prueba.
- Consumo de métodos creados en pages.
- Manejo de respuestas.
- Llamado de validaciones

## assertions

Contiene las validaciones del proyecto.

Ejemplo:

- Validación de status code.
- Validación de datos actualizados.
- Validación de respuestas esperadas.

## constants

Contiene valores para evitar datos quemados en el código.

Ejemplo:

- URL base
- Códigos HTTP
- Mensajes esperados

# Ejecución de pruebas 
Para ejecutar las pruebas se utiliza el siguiente comando:
npx cypress open

# Generación de reportes 
Ejecutamos con: 
npx cypress run 

Al finalizar la ejecución se genera el reporte en la carpeta:
cypress/reports

# Ejecutar todos los escenarios
npm run test:all

# Ejecutar escenario creación usuario
npm run test:create

# Ejecutar escenario actualización usuario
npm run test:edit

# Ejecutar escenario consulta usuario
npm run test:get

# Ejecutar escenario búsqueda usuario actualizado
npm run test:updated

# Ejecutar escenario eliminación usuario
npm run test:delete



# Tecnologías utilizadas

- Cypress
- Cucumber
- JavaScript
- Mochawesome Reporter

# Resultado esperado

Las pruebas permiten validar el correcto funcionamiento de los servicios de usuario de PetStore mediante automatización API, generando evidencia de ejecución mediante reportes HTML.