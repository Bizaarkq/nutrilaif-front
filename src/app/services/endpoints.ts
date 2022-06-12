import { environment } from "src/environments/environment";

export const endpoints = {
    auth: {
        login: environment.authUrl + '/realms/' + environment.realm + '/protocol/openid-connect/token',
        infoUser: environment.authUrl + '/realms/' + environment.realm + '/protocol/openid-connect/userinfo'
    },
    consulta: {
        guardarConsulta: environment.apiUrl + '/consulta/save',
        editarConsulta: environment.apiUrl + '/consulta/update',
        getConsulta: environment.apiUrl + '/consulta/get'
    },
    alimento: {
        listaAlimentos: environment.apiUrl + '/catalogo/alimento/listar',
        agregarAlimentos: environment.apiUrl + '/catalogo/alimento/store',
        editarAlimentos: environment.apiUrl + '/catalogo/alimento/update',
        elimarAlimentos: environment.apiUrl + '/catalogo/alimento/delete' 
    }
};

