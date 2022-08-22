import { environment } from "src/environments/environment";

export const endpoints = {
    auth: {
        login: environment.authUrl + '/realms/' + environment.realm + '/protocol/openid-connect/token',
        infoUser: environment.authUrl + '/realms/' + environment.realm + '/protocol/openid-connect/userinfo',
        logout: environment.authUrl + '/realms/' + environment.realm + '/protocol/openid-connect/logout'
    },
    consulta: {
        guardarConsulta: environment.apiUrl + '/consulta/save',
        editarConsulta: environment.apiUrl + '/consulta/update',
        getConsulta: environment.apiUrl + '/consulta/get',
        listaConsultas: environment.apiUrl + '/consulta/list',
    },
    alimento: {
        listaAlimentos: environment.apiUrl + '/catalogo/alimento/listar',
        agregarAlimentos: environment.apiUrl + '/catalogo/alimento/store',
        editarAlimentos: environment.apiUrl + '/catalogo/alimento/update',
        elimarAlimentos: environment.apiUrl + '/catalogo/alimento/delete' 
    },
    paciente: {
        listaPacientes: environment.apiUrl + '/paciente/list',
        editarPaciente: environment.apiUrl + '/paciente/update',
        eliminarPaciente: environment.apiUrl + '/paciente/delete',
        getExpediente: environment.apiUrl + '/paciente/get'
    },
    catalogo: {
        menu: environment.apiUrl + '/catalogo/menu',
        paises: environment.apiUrl + '/catalogo/paises',
        departamentos: environment.apiUrl + '/catalogo/departamentos',
        municipios: environment.apiUrl + '/catalogo/municipios',
        listaBase: environment.apiUrl+'/catalogo/listaBase',
        estados: environment.apiUrl + '/catalogo/estados',
    }
};

