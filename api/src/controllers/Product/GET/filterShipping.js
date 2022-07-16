const {Product} = require('../../../db')

const filterShipping = async (req, res) => {
    let filterShipping = req.params.filterShipping

    try{
        let allProducts = await Product.findAll({
            where: {
                freeShipping: filterShipping
            }
        })
        res.send(allProducts)
    } catch(e) {
        console.log(e)
    }
}

module.exports = {
    filterShipping
}