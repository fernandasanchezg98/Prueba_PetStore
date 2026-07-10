import { HTTP_STATUS } from "../../support/constants/status";
import { MESSAGE } from "../../support/constants/message";

export class UsuarioAssertions {
    static validarStatusOK(response) {
        expect(response.status).to.eq(HTTP_STATUS.OK);
    }

    static validarMensajeCorrecto(response) {
        expect(response.body.message).to.eq(MESSAGE.OK);
    }

    static validarUsuarioCreado(response) {
        expect(response.body).to.have.property(
            "code",
            HTTP_STATUS.OK
        );
        expect(response.body).to.have.property("type");
    }

    static validarEmail(response, emailEsperado) {
        expect(response.body.email).to.eq(emailEsperado);
    }

    static validarUsuarioActualizado(response, usuarioEditado) {
        expect(response.body.firstName)
            .to.eq(usuarioEditado.firstName);
        expect(response.body.email)
            .to.eq(usuarioEditado.email);
    }
}