const { Supplier } = require('../models');

const addSupplier = async (req, res, next) => {
    /**
     * This controller adds a new supplier to an
     * organizations categories list
     */

    try {
        // find the authenticated user
        const user = res.locals.user;

        const supplierName = req.body.supplierName;
        const status = req.body.status;
        const organizationId = user.organizationId;
        const supplierContact = req.body.supplierContact;

        // create a new supplier object
        await Supplier.create({
            supplierName,
            status,
            organizationId,
            supplierContact
        });

        res.status(201).json({
            message: 'Supplier created successflly',
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

const getSuppliers = async (req, res, next) => {
    /**
     * This controller returns all the supplier 
     * in the suppliers collection
     */
    try {
        // find the authenticated user
        const user = res.locals.user;
        // get suppliers
        let suppliers = await Supplier.find({ organizationId: user.organizationId })
            .sort({ supplierName: 1 });
        res.json({
            data: suppliers,
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


const updateSupplier = async (req, res, next) => {
    /**
     * This controller updates the a supplier status
     */

    try {
        const supplierId = req.body.supplierId;
        const status = req.body.status;
        const supplierContact = req.body.supplierContact;
        // find the authenticated user
        const user = res.locals.user;

        let supplier = await Supplier.findOne({ _id: supplierId, organizationId: user.organizationId });
        // update
        supplier.status = status;
        supplier.supplierContact = supplierContact;
        supplier.save();

        res.json({
            data: supplier,
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

const deleteSupplier = async (req, res, next) => {
    /**
     * This controller delete a supplier
     */
    try {
        const supplierId = req.body.supplierId;
        // find the authenticated user
        const user = res.locals.user;

        let supplier = await Supplier.findOneAndDelete({
            _id: supplierId,
            organizationId: user.organizationId
        });

        return res.json({
            data: supplier,
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

module.exports = { addSupplier, getSuppliers, updateSupplier, deleteSupplier };