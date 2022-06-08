import { environment } from "src/environments/environment";

export const endpoints = {
    auth: {
        login: environment.authUrl + '/realms/' + environment.realm + '/protocol/openid-connect/token',
        infoUser: environment.authUrl + '/realms/' + environment.realm + '/protocol/openid-connect/userinfo'
    },
    consulta: {
        guardarConsulta: environment.apiUrl + '/consulta/save',
    }
};

