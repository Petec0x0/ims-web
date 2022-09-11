const { Order, Product } = require('../models');

const getStats = async (req, res, next) => {
    // find the authenticated user
    const user = res.locals.user;

    try {
        const totalProduct = await Product.count({
            organizationId: user.organizationId,
        });

        const lowStockProduct = await Product.count({
            organizationId: user.organizationId,
            quantity: {
                "$gte": 0,
                "$lt": 5
            }
        });
        const outOfStockProduct = await Product.count({
            organizationId: user.organizationId,
            quantity: {
                "$lt": 1
            }
        });

        const startDate = new Date();
        const endDate = new Date();
        console.log(startDate);
        const saleThisMonth = await Order.find({
            organizationId: user.organizationId,
            createdAt: {
                "$gte": new Date(startDate.getFullYear(), startDate.getMonth()),
                "$lt": new Date(endDate)
            }
        });

        res.json({
            data: {
                totalProduct,
                lowStockProduct,
                outOfStockProduct,
                saleThisMonth: saleThisMonth.reduce((prev, item) => (
                    prev + (item.grandTotal)
                ), 0)
            },
            error: false
        })
    } catch (err) {
        console.log(err);
        return res.json({
            message: 'An error occured',
            error: true
        })
    }
}

module.exports = { getStats };