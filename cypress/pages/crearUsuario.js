import { URLS } from "../support/constants/url";

export class UsuarioAPI {
    static crearUsuario(userData) {
        return cy.request({
            method: "POST",
            url: `${URLS.BASE_URL}/user/createWithList`,
            body: [
                userData
            ],
            failOnStatusCode: false
        });
    }
  }