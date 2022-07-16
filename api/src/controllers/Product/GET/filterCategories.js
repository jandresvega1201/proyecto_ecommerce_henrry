const {Product} = require('../../../db')

const filterCategories = async (req, res) => {
    let filterCategory = req.params.filterCategory
    try {
    let allProducts = await Product.findAll({
        where: {
            categories : filterCategory
        }
    })

    res.send(allProducts)
    } catch(e) {
        console.log(e)
    }
}

module.exports = {
    filterCategories
}