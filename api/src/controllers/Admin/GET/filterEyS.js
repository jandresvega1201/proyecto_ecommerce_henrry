const { Op } = require('sequelize')
const {Product} = require('../../../db')

const filterEyS = async (req, res) => {
    let filterEyS = req.params.filterEyS
    try {
        if(filterEyS === 'StockEnable') {
            let allProducts = await Product.findAll({
                where: {
                    disabled: false,
                    stock: {
                        [Op.ne]: 0
                    }
                }
            })
            res.send(allProducts)
        }
        if(filterEyS === 'StockDisabled') {
            let allProducts = await Product.findAll({
                where: {
                    disabled: true,
                    stock: 0
                }
            })
            res.send(allProducts)
        }
    } catch(e) {
        console.log(e)
    }
}

module.exports = {
    filterEyS
}