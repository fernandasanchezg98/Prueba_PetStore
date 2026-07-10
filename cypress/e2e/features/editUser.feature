Feature: Editar usuario en PetStore


 @editarUsuario
  Scenario: Actualizar nombre y correo de un usuario correctamente
    Given que tengo un usuario creado para editarlo
    When envio la peticion para editar el usuario
    Then la respuesta del edit debe tener status 200
    When consulto el usuario editado
    Then el nombre y email deben estar actualizados