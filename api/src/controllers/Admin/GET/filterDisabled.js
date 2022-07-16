const {Product} = require('../../../db')

const filterDisabled = async (req, res) => {
    let filterDisabled = req.params.filterDisabled
    if(filterDisabled === 'Disabled') {
        let allProducts = await Product.findAll({
            where: {
                disabled: true
            }
        })
        res.send(allProducts)
    }
    if(filterDisabled === 'Enabled') {
        let allProducts = await Product.findAll({
            where: {
                disabled: false
            }
        })
        res.send(allProducts)
    }
}

module.exports = {
    filterDisabled
}