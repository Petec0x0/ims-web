const { Suplier } = require('../models');

const addSuplier = async (req, res, next) => {
    /**
     * This controller adds a new suplier to an
     * organizations categories list
     */

    try {
        // find the authenticated user
        const user = res.locals.user;

        const suplierName = req.body.suplierName;
        const status = req.body.status;
        const organizationId = user.organizationId;
        const suplierContact = req.body.suplierContact;

        // create a new suplier object
        await Suplier.create({
            suplierName,
            status,
            organizationId,
            suplierContact
        });

        res.status(201).json({
            message: 'Suplier created successflly',
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

const getSupliers = async (req, res, next) => {
    /**
     * This controller returns all the suplier 
     * in the supliers collection
     */
    try {
        // find the authenticated user
        const user = res.locals.user;
        // get supliers
        let supliers = await Suplier.find({ organizationId: user.organizationId })
            .sort({ suplierName: 1 });
        res.json({
            data: supliers,
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


const updateSuplier = async (req, res, next) => {
    /**
     * This controller updates the a suplier status
     */

    try {
        const suplierId = req.body.suplierId;
        const status = req.body.status;
        const suplierContact = req.body.suplierContact;
        // find the authenticated user
        const user = res.locals.user;

        let suplier = await Suplier.findOne({ _id: suplierId, organizationId: user.organizationId });
        // update
        suplier.status = status;
        suplier.suplierContact = suplierContact;
        suplier.save();

        res.json({
            data: suplier,
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

const deleteSuplier = async (req, res, next) => {
    /**
     * This controller delete a suplier
     */
    try {
        const suplierId = req.body.suplierId;
        // find the authenticated user
        const user = res.locals.user;

        let suplier = await Suplier.findOneAndDelete({
            _id: suplierId,
            organizationId: user.organizationId
        });

        return res.json({
            data: suplier,
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

module.exports = { addSuplier, getSupliers, updateSuplier, deleteSuplier };