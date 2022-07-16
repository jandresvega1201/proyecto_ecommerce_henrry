import { GET_PRODUCT_BY_NAME } from '../actions/productName'

const initialState = {
    products: [],
}

const productName = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_PRODUCT_BY_NAME:
            return {
                ...state,
                products: state.payload,
            };
        default:
            return state;
    }
}

export default productName;