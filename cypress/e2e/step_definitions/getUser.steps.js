import { Given, When, Then, Before } from "@badeball/cypress-cucumber-preprocessor";
import { faker } from "@faker-js/faker";
import { obtenerUsuario } from "../../pages/obtenerUsuario";
import { UsuarioAPI } from "../../pages/crearUsuario";
import { HTTP_STATUS } from "../../support/constants/status";
import { UsuarioAssertions } from "../../support/assertions/usuarioAssertions";

let respuesta;

Before({ tags: "@obtenerUsuario" }, () => {
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

  UsuarioAPI.crearUsuario(newUser).then((res) => {
    expect(res.status).to.eq(HTTP_STATUS.OK);
    cy.wrap(newUser.username).as("username");
    cy.wrap(newUser.email).as("usuarioEmail");
    cy.wrap(newUser).as("usuarioData");
  });
});

Given("que tengo un usuario creado", () => {
  cy.get("@username").then((username) => {
    Cypress.env("username", username);
  });
});

When("envio la peticion para obtener el usuario", () => {
  cy.get("@username").then((username) => {
    obtenerUsuario.getUser(username).then((res) => {
      respuesta = res;
    });
  });
});

Then("la respuesta del get debe tener status 200", () => {
 // expect(respuesta.status).to.eq(HTTP_STATUS.OK);
 UsuarioAssertions.validarStatusOK(respuesta);
});

Then("el campo email debe existir", () => {
  cy.get("@usuarioEmail").then((emailEsperado) => {
   // expect(respuesta.body.email).to.eq(emailEsperado);
   UsuarioAssertions.validarEmail(
    respuesta,
    emailEsperado
);
});
});