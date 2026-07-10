Feature: Eliminar usuario


  @eliminarUsuario
  Scenario: Eliminar un usuario creado correctamente

    Given que tengo un usuario creado para eliminarlo
    When envio la peticion para eliminar el usuario
    Then la respuesta del delete debe tener status 200
    And el usuario debe quedar eliminado