const axios = require('axios')
const { PAYPAL_API, PAYPAL_API_SECRET, PAYPAL_API_CLIENT } = process.env


const createOrder = async (req, res) => {

    function converter(cantidad) {
        let dolar = 0.0079;
        let resultado = (cantidad * dolar).toFixed(2)
        return resultado
    }


    let allProducts = [];
    req.body.forEach(e => {
        let obj = {
            "name": e.name,
            "description": e.description,
            "quantity": e.quantity,
            "unit_amount": {
                "currency_code": "USD",
                "value": converter(e.unit_amount.value)
            }
        }
        allProducts.push(obj)
    });

    let totalAmount = 0

    allProducts.forEach(e => {
        totalAmount = totalAmount + e.unit_amount.value * e.quantity
    })

    try {


        const order = {
            "intent": "CAPTURE",
            "total_items": "3",
            "purchase_units": [
                {
                    "items": allProducts,
                    "amount": {
                        "currency_code": "USD",
                        "value": totalAmount,
                        "breakdown": {
                            "item_total": {
                                "currency_code": "USD",
                                "value": totalAmount
                            }
                        }
                    }
                }
            ],
            "application_context": {
                "landing_page": "NO_PREFERENCE",
                "user_action": "PAY_NOW",
                "return_url": "http://localhost:3000/success",
                // "return_url": "http://localhost:3001/capture-order",
                "cancel_url": "http://localhost:3001/cancel-order"
            }
        }

        const params = new URLSearchParams()
        params.append('grant_type', 'client_credentials')

        const { data: { access_token } } = await axios.post('https://api-m.sandbox.paypal.com/v1/oauth2/token', params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            auth: {
                username: PAYPAL_API_CLIENT,
                password: PAYPAL_API_SECRET
            }
        })


        const info = await axios.post(`${PAYPAL_API}/v2/checkout/orders`, order, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })
        // console.log('DATA INFO:', info.data)
        res.json(info.data)
    } catch (e) {
        res.status(400).send(e)
    }

}

const orderDetails = async (req, res) => {
    const order_id = req.params.order_id
    try {

        const params = new URLSearchParams()
        params.append('grant_type', 'client_credentials')

        const { data: { access_token } } = await axios.post('https://api-m.sandbox.paypal.com/v1/oauth2/token', params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            auth: {
                username: PAYPAL_API_CLIENT,
                password: PAYPAL_API_SECRET
            }
        })


        const response = await axios.get(`${PAYPAL_API}/v2/checkout/orders/${order_id}`, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })
        // console.log(response.data)
        res.send(response.data)
    } catch (e) {
        console.log(e)

    }
}

const captureOrder = async (req, res) => {
    const { token } = req.query

    const response = await axios.post(`${PAYPAL_API}/v2/checkout/orders/${token}/capture`, {}, {
        auth: {
            username: PAYPAL_API_CLIENT,
            password: PAYPAL_API_SECRET
        }
    })

    console.log(response.data)
    res.send('Capture Order')
}

const cancelOrder = async (req, res) => {
    res.redirect('http://localhost:3001/Catalog')
}

module.exports = {
    createOrder,
    captureOrder,
    cancelOrder,
    orderDetails
}