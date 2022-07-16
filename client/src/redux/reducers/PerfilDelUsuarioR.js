import { PERFIL_USUARIO } from "../actions/PerfilDelUsuarioA"

const initialState = {
    perfilDelUsuario: {}

}

const PerfilDelUsuarioR = (state = initialState, { type, payload }) => {
    switch (type) {
       
        case PERFIL_USUARIO:
            // console.log("es este", PERFIL_USUARIO, payload)
            // console.log("es este", state.perfilDelUsuario)
            return {
                ...state,
                perfilDelUsuario: payload
            }

            default:
                return state;
        } 
}
// console.log("es este", perfilDelUsuario)
export default PerfilDelUsuarioR;


