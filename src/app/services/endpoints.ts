import { environment } from "src/environments/environment";

export const endpoints = {
    auth: {
        login: environment.authUrl + '/realms/' + environment.realm + '/protocol/openid-connect/token',
        infoUser: environment.authUrl + '/realms/' + environment.realm + '/protocol/openid-connect/userinfo'
    },
    alimento: {
        listaAlimentos: environment.apiUrl + '/catalogo/alimento/listar',
        agregarAlimentos: environment.apiUrl + '/catalogo/alimento/store',
        editarAlimentos: environment.apiUrl + '/catalogo/alimento/update',
        elimarAlimentos: environment.apiUrl + '/catalogo/alimento/' 
    }
};

