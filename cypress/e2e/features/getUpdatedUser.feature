Feature: Obtener usuario actualizado


  @obtenerUsuarioActualizado
  Scenario: Consultar usuario después de actualizarlo

    Given que tengo un usuario actualizado
    When envio la peticion para obtener el usuario actualizado
    Then la respuesta debe tener status 200
    And los datos del usuario actualizado deben ser correctos