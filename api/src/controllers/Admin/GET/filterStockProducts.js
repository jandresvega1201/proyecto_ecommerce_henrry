const {Product} = require('../../../db')

const filterStockProduct = async (req, res) => {
    let filterStock = req.params.filterStock

    try {
        if(filterStock === 'SinStock') {
            let allProducts = await Product.findAll({
                where: {
                    stock: 0
                }
            })
            res.send(allProducts)
        }
        if(filterStock === 'ConStock') {
            let allProducts = await Product.findAll()
            let productsWithStock = allProducts.filter(e => e.stock > 0)
            res.send(productsWithStock)
        }

    } catch(e) {
        console.log(e)
    }
}

module.exports = {
    filterStockProduct
}