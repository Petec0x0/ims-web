const { Customer } = require('../models');

const addCustomer = async (req, res, next) => {
    /**
     * This controller adds a new customer to an
     * organizations categories list
     */

    try {
        // find the authenticated user
        const user = res.locals.user;

        const customerName = req.body.customerName;
        const status = req.body.status;
        const organizationId = user.organizationId;
        const customerContact = req.body.customerContact;
        const customerAddress = req.body.customerAddress;

        // create a new customer object
        await Customer.create({
            customerName,
            status,
            organizationId,
            customerContact,
            customerAddress
        });

        res.status(201).json({
            message: 'Customer created successflly',
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

const updateCustomer = async (req, res, next) => {
    /**
     * This controller updates the a customer status
     */

    try {
        const customerId = req.body.customerId;
        const status = req.body.status;
        const customerContact = req.body.customerContact;
        const customerAddress = req.body.customerAddress;
        // find the authenticated user
        const user = res.locals.user;

        let customer = await Customer.findOne({_id: customerId, organizationId: user.organizationId});
        // update
        customer.status = status;
        customer.customerContact = customerContact;
        customer.customerAddress = customerAddress;
        customer.save();

        res.json({
            data: customer,
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

module.exports = { addCustomer, updateCustomer };