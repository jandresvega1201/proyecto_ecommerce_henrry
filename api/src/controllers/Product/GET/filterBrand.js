const {Product} = require('../../../db')

const filterBrand = async (req, res) => {
    let filterBrand = req.params.filterBrand
    try {
        let allProducts = await Product.findAll({
            where: {
                brand: filterBrand
            }
        })
        res.send(allProducts)
    } catch(e) {
        console.log(e)
    }
}

module.exports = {
    filterBrand
}