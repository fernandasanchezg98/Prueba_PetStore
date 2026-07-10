import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { UsuarioAPI } from "../../pages/crearUsuario";
import { faker } from "@faker-js/faker";
import { UsuarioAssertions } from "../../support/assertions/usuarioAssertions";

let userData;
let response;

Given("que tengo los datos a crear de un usuario", () => {
  userData = {
    id: faker.number.int(),
    username: faker.internet.username(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    phone: faker.phone.number(),
    userStatus: 1
  };
});

When("envio la peticion para crear el usuario", () => {
  UsuarioAPI.crearUsuario(userData)
    .then((res) => {
      response = res;
    });
});

Then("la respuesta del create debe tener status 200", () => {
  UsuarioAssertions.validarStatusOK(response);
});

Then("el mensaje debe ser correcto", () => {
  UsuarioAssertions.validarMensajeCorrecto(response);
});

Then("el usuario debe haberse creado correctamente", () => {
  UsuarioAssertions.validarUsuarioCreado(response);
});