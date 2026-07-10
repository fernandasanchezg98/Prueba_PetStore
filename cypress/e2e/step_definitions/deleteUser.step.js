import { Given, When, Then, Before } from "@badeball/cypress-cucumber-preprocessor";
import { faker } from "@faker-js/faker";
import { UsuarioAPI } from "../../pages/crearUsuario";
import { eliminarUsuario } from "../../pages/eliminarUsuario";
import { obtenerUsuario } from "../../pages/obtenerUsuario";
import { UsuarioAssertions } from "../../support/assertions/usuarioAssertions";

let respuestaDelete;
let respuestaConsulta;

Before({ tags: "@eliminarUsuario" }, () => {
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
            cy.wrap(newUser)
                .as("usuarioData");
            cy.wrap(newUser.username)
                .as("username");
        });
});

Given("que tengo un usuario creado para eliminarlo", () => {
    cy.get("@usuarioData")
        .should("exist");
});

When("envio la peticion para eliminar el usuario", () => {
    cy.get("@username").then((username) => {
        eliminarUsuario.eliminarUsuario(username)
            .then((res) => {
                respuestaDelete = res;
            });
    });
});

Then("la respuesta del delete debe tener status 200", () => {
    UsuarioAssertions.validarStatusOK(
        respuestaDelete
    );
});

Then("el usuario debe quedar eliminado", () => {
    cy.get("@username").then((username) => {
        obtenerUsuario.getUser(username)
            .then((res) => {
                respuestaConsulta = res;
                expect(respuestaConsulta.status)
                    .to.eq(404);
            });
    });
});