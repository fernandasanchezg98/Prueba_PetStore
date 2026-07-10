import { URLS } from "../support/constants/url";

export class eliminarUsuario {

    static eliminarUsuario(username) {

        return cy.request({

            method: "DELETE",

            url: `${URLS.BASE_URL}/user/${username}`,

            failOnStatusCode: false

        });

    }

}