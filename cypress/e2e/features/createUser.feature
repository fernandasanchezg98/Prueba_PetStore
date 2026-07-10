Feature: Crear usuario en PetStore

  Scenario: Crear un usuario correctamente
    Given que tengo los datos a crear de un usuario
    When envio la peticion para crear el usuario
    Then la respuesta del create debe tener status 200
    And el mensaje debe ser correcto
    And el usuario debe haberse creado correctamente