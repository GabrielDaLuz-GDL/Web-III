import { useState, useEffect } from 'react';
import { getUsuarios } from '../../services/usuarioService';

function Usuarios() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const data = await getUsuarios();
                setUsers(data.data || []);
            } catch (err) {
                setError(err.response?.data?.err || err.message || 'Erro ao buscar usuarios');
            } finally {
                setLoading(false);
            }
        };

        fetchUsuarios();
    }, []);
}
