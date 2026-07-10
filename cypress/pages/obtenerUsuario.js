import { URLS } from "../support/constants/url";

export class obtenerUsuario {
  static getUser(username) {
    return cy.request({
      method: "GET",
      url: `${URLS.BASE_URL}/user/${username}`,
      failOnStatusCode: false
    });
  }
}