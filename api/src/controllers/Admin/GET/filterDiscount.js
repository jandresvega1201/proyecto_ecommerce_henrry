const { Product } = require('../../../db')
const { Op } = require('sequelize')

const filterDiscount = async (req, res) => {
    let discount = req.params.discount

    try {
        switch (discount) {
            case '+05':
                let productFilter1 = await Product.findAll({
                    where: {
                        discount: {
                            [Op.gt]: 4
                        }
                    }
                })
                return res.send(productFilter1)

            case '+10':
                let productFilter2 = await Product.findAll({
                    where: {
                        discount: {
                            [Op.gt]: 9
                        }
                    }
                })
                return res.send(productFilter2)

            case '+15':
                let productFilter3 = await Product.findAll({
                    where: {
                        discount: {
                            [Op.gt]: 14
                        }
                    }
                })
                return res.send(productFilter3)

            case '+20':
                let productFilter4 = await Product.findAll({
                    where: {
                        discount: {
                            [Op.gt]: 19
                        }
                    }
                })
                return res.send(productFilter4)

            case '+25':
                let productFilter5 = await Product.findAll({
                    where: {
                        discount: {
                            [Op.gt]: 24
                        }
                    }
                })
                return res.send(productFilter5)

            case '+30':
                let productFilter6 = await Product.findAll({
                    where: {
                        discount: {
                            [Op.gt]: 29
                        }
                    }
                })
                return res.send(productFilter6)

            default:
                break;
        }
    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    filterDiscount
}