import { Given, When, Then, Before } from "@badeball/cypress-cucumber-preprocessor";
import { faker } from "@faker-js/faker";
import { UsuarioAPI } from "../../pages/crearUsuario";
import { editarUsuario } from "../../pages/editarUsuario";
import { obtenerUsuario } from "../../pages/obtenerUsuario";
import { UsuarioAssertions } from "../../support/assertions/usuarioAssertions";

let respuestaConsulta;

Before({ tags: "@obtenerUsuarioActualizado" }, () => {
  const newUser = {
    id: faker.number.int(),
    username: faker.internet.username(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    phone: faker.phone.number(),
    userStatus: 1
  };

  UsuarioAPI.crearUsuario(newUser)
    .then(() => {
      const usuarioActualizado = {
        ...newUser,
        firstName: faker.person.firstName(),
        email: faker.internet.email()
      };

      editarUsuario.editarUsuario(
        newUser.username,
        usuarioActualizado
      ).then(() => {

        cy.wrap(newUser.username)
          .as("username");
        cy.wrap(usuarioActualizado)
          .as("usuarioActualizado");
      });
    });
});

Given("que tengo un usuario actualizado", () => {
  cy.get("@usuarioActualizado")
    .should("exist");
});

When("envio la peticion para obtener el usuario actualizado", () => {
  cy.get("@username").then((username) => {
    obtenerUsuario.getUser(username)
      .then((res) => {
        respuestaConsulta = res;
      });
  });
});

Then("la respuesta debe tener status 200", () => {
  UsuarioAssertions.validarStatusOK(
    respuestaConsulta
  );
});

Then("los datos del usuario actualizado deben ser correctos", () => {
  cy.get("@usuarioActualizado")
    .then((usuarioActualizado) => {
      UsuarioAssertions.validarUsuarioActualizado(
        respuestaConsulta,
        usuarioActualizado
      );
    });
});