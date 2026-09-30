import api from './api';

export const login = async (email, senha) => {
    const response = await api.post('/login', {email, senha});
    return response.data;
};

export const salvarSessão = async (token, usuario) => {
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
};

export const limparSessão = () => {
    localStorage.removeItem('token');
    localStorage.remove('usuario');
}

export const getUsuarios = async (search = '') => {
    const response = await api.get('/usuarios', {
        params: { search },
    });
    return response.data;
};

export const getUsuario = async (id) => {
    const response = await api.get(`/usuarios/${id}`);
    return response.data;
};

export const createUsuario = async (data) => {
    const response = await api.post('/usuarios', data);
    return response.data;
};

export const updateUsuario = async (id, data) => {
    const response = await api.put(`/usuarios/${id}`, data);
    return response.data; // também faltava o return aqui
};

export const deleteUsuario = async (id) => {
    const response = await api.delete(`/usuarios/${id}`);
    return response.data;
};