import { URLS } from "../support/constants/url";

export class editarUsuario {
  static editarUsuario(username, userData) {
    return cy.request({
      method: "PUT",
      url: `${URLS.BASE_URL}/user/${username}`,
      body: userData,
      failOnStatusCode: false
    });
  }
}