import { Given, When, Then, Before } from "@badeball/cypress-cucumber-preprocessor";
import { faker } from "@faker-js/faker";
import { UsuarioAPI } from "../../pages/crearUsuario";
import { editarUsuario } from "../../pages/editarUsuario";
import { UsuarioAssertions } from "../../support/assertions/usuarioAssertions";
import { obtenerUsuario } from "../../pages/obtenerUsuario";

let respuestaEdicion;
let respuestaConsulta;

Before({ tags: "@editarUsuario" }, () => {

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

  UsuarioAPI.crearUsuario(newUser).then(() => {
    cy.wrap(newUser).as("usuarioData");
    cy.wrap(newUser.username).as("username");
  });
});

Given("que tengo un usuario creado para editarlo", () => {
  cy.get("@usuarioData").then((usuarioData) => {
    const userEditData = {
      ...usuarioData,
      firstName: faker.person.firstName(),
      email: faker.internet.email()
    };
    cy.wrap(userEditData).as("userEditData");
  });
});

When("envio la peticion para editar el usuario", () => {
  cy.get("@username").then((username) => {
    cy.get("@userEditData").then((userEditData) => {
      editarUsuario.editarUsuario(username, userEditData)
        .then((res) => {
          respuestaEdicion = res;
        });
    });
  });
});

When("consulto el usuario editado", () => {
  cy.get("@username").then((username) => {
    obtenerUsuario.getUser(username).then((res) => {
      respuestaConsulta = res;
    });
  });
});

Then("la respuesta del edit debe tener status 200", () => {
  UsuarioAssertions.validarStatusOK(respuestaEdicion);
});

Then("el nombre y email deben estar actualizados", () => {
  cy.get("@userEditData").then((userEditData) => {
    UsuarioAssertions.validarUsuarioActualizado(
      respuestaConsulta,
      userEditData
    );
  });
});