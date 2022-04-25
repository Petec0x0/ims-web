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

        let suplier = await Suplier.findOne({_id: suplierId, organizationId: user.organizationId});
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

module.exports = { addSuplier, updateSuplier };