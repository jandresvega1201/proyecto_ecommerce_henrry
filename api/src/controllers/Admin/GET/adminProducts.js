const {Product} = require("../../../db")
const {Op} = require('sequelize')

async function getProductByName (name) {
    let products = await Product.findAll({
        where: {
                name:{
                    [Op.iLike]:`%${name}%`
                }
        },
    })
    return products
}

const adminProducts = async (req, res) =>{
    const {name} = req.query
    try {
        if(name){
        let product = await getProductByName(name)
        if(product) return res.json(product)
    }
    let products = await Product.findAll()
    res.json(products)        
    } catch (error) {
     res.status(404).send("No se pudieron obtener los productos")    
    }}

module.exports = {adminProducts}