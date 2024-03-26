import { environment } from "src/environments/environment";

export const endpoints = {
    auth: {
        login: environment.authUrl + '/api/login',
        infoUser: environment.authUrl + '/api/me',
        logout: environment.authUrl + '/api/logout',
        refresh: environment.authUrl + '/api/refresh',
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
        getExpediente: environment.apiUrl + '/paciente/get',
        obtenerDietaPdf: environment.apiUrl + '/paciente/dieta/pdf',
        notificar: environment.apiUrl + '/paciente/notificar',
    },
    catalogo: {
        menu: environment.apiUrl + '/catalogo/menu',
        paises: environment.apiUrl + '/catalogo/paises',
        departamentos: environment.apiUrl + '/catalogo/departamentos',
        municipios: environment.apiUrl + '/catalogo/municipios',
        listaBase: environment.apiUrl+'/catalogo/listaBase',
        estados: environment.apiUrl + '/catalogo/estados',
        nutricionistas: environment.apiUrl + '/catalogo/nutricionistas',
    },
    cita: {
        listado: environment.apiUrl + '/cita/list',
        guardar: environment.apiUrl + '/cita/save',
        updateFechaHora: environment.apiUrl + '/cita/update/fechora',
        eliminar: environment.apiUrl + '/cita/delete'
    },
    pliegues: {
        guardar: environment.apiUrl + '/pliegues/save',
        editar: environment.apiUrl + '/pliegues/update',
        obtener: environment.apiUrl + '/pliegues/get',
        listar: environment.apiUrl + '/pliegues/list'
    }
};

