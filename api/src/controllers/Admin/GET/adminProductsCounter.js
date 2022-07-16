const {Product} = require("../../../db")
const {Op} = require('sequelize')

const adminProductsCounter = async (req, res) => {
    try {
        const counter = await Product.count({
            where: {
                [Op.and]: [
                    {stock: {
                        [Op.ne]: 0,
                    }},
                    {disabled: false},
                ]
            }
        })
        res.json(counter)
    } catch (error) {
        res.status.send("No se pudo obtener la cantidad de productos activos")
    }
}

module.exports = {adminProductsCounter}