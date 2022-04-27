const { Order, Sales } = require('../models');

const addSales = async (req, res, next) => {
    /**
     * This controller creates and adds new Order
     *  and the associated sales to thier respective 
     * collections
     */
    try {
        // find the authenticated user
        const user = res.locals.user;
        // get the request body
        const referenceId = req.body.referenceId;
        const orderDate = req.body.orderDate;
        const salesPersonId = user._id;
        const customerId = req.body.customerId;
        const grandTotal = req.body.grandTotal;
        const sales = req.body.sales;

        // create a new Order object
        const order = await Order.create({
            referenceId,
            orderDate,
            salesPersonId,
            customerId,
            grandTotal
        });

        /**
         * Iterate through the sales array and 
         * add each sales object to the database
         */
        sales.map(item => {
            await Sales.create({
                referenceId: item.referenceId,
                orderId: order._id,
                productId: item.productId,
                quantity: item.quantity,
                subTotal: item.subTotal,
                organzationId: item.organzationId
            });
        });

        res.status(201).json({
            message: 'Sales recorded successflly',
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

const getSales = async (req, res, next) => {
    /**
     * This controller returns all the sales 
     * in the sales collection
     */
    try {
        // find the authenticated user
        const user = res.locals.user;
        // get sales
        let sales = await Sales.find({ organizationId: user.organizationId });
        res.json({
            data: sales,
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


module.exports = { addSales, getSales };