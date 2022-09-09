const { Order, Sales, Product } = require('../models');

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
        const salesPersonId = user._id;
        const customerId = req.body.customerId;
        const grandTotal = req.body.grandTotal;
        const sales = req.body.sales;

        // create a new Order object
        const order = await Order.create({
            referenceId,
            salesPersonId,
            customerId,
            grandTotal
        });

        /**
         * Iterate through the sales array and 
         * add each sales object to the database
         */
        const orderItemList = [];
        sales.map(async (item) => {
            const orderItem = await Sales.create({
                referenceId: item.referenceId,
                orderId: order._id,
                productId: item.productId,
                quantity: item.quantity,
                subTotal: item.subTotal,
                organizationId: user.organizationId
            });

            /**
             * Subtract the number of the purchased product
             * from the product collection
             */
            let pur_product = await Product.findOne({ _id: item.productId });
            pur_product.quantity = (pur_product.quantity) - item.quantity;
            pur_product.save();

            orderItemList.push(orderItem);
            // update order at the end of the iteration
            if ((orderItemList.length) === (sales.length)) {
                // add item to order as reference
                await order.sales.push(...orderItemList);
                await order.save();
            }
        });


        res.status(201).json({
            message: 'Sales recorded successflly',
            data: order,
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
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;

    try {
        // find the authenticated user
        const user = res.locals.user;
        // get sales
        let sales = await Order.find({
            organizationId: user.organizationId,
            createdAt: {
                "$gte": new Date(startDate),
                "$lt": new Date(endDate)
            }
        })
            .populate({
                path: 'sales',
                populate: {
                    path: 'productId'
                }
            })
            .sort({ createdAt: -1 });

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