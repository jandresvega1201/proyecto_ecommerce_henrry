import axios from "axios";

export const PERFIL_USUARIO = 'PERFIL_USUARIO';

export function PerfilDelUsuarioA (username){
    return async function (dispatch) {
            var json = await axios.get(`/users/${username}`);
            // console.log(json.data)
            return dispatch ({
                type: PERFIL_USUARIO,
                payload: json.data
            })
    }
}