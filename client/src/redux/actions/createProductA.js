import axios from "axios";

export function catalogo() {
    return async function (dispatch) {
        var info = await axios.get("/Catalog", {

        });
        return dispatch({ type: "CATALOGO", payload: info.data });
    };
}

export function postProducto(payload) {
    return async function (dispatch) {
        var response = await axios.post("/CreateProduct", payload);
        console.log(response)
        return response;
    }
}

