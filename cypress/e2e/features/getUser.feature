Feature: Obtener usuario


  @obtenerUsuario
  Scenario: Obtener usuario creado correctamente

    Given que tengo un usuario creado
    When envio la peticion para obtener el usuario
    Then la respuesta del get debe tener status 200
    And el campo email debe existir