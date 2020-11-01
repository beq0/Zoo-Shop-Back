const Parameter = require('../models/Parameter.model');

module.exports.addParameter = (req, res) => {
    const param = new Parameter({
        name: req.body.name,
        description: req.body.description,
        parameterType: req.body.parameterType,
        value: req.body.value
    });
    param.save().then(() => {
        res.status(200).json({message: `Added ${param} Parameter!`, status: 200, _id: param._id});
    }).catch((error) => {
        console.log(error);
        res.status(500).json({message: `Internal Error! Could not add ${param} Parameter`, status: 500});
    });
};

module.exports.changeParameter = (req, res) => {
    if (!req.body._id) {
        res.status(500).json({message: 'Id of the Parameter not provided!'});
        return;
    }
    let updatedParameter = {}
    if (req.body.name) updatedParameter['name'] = req.body.name;
    if (req.body.description) updatedParameter['description'] = req.body.description;
    if (req.body.parameterType) updatedParameter['parameterType'] = req.body.parameterType;
    if (req.body.value) updatedParameter['value'] = req.body.value;
    console.log(updatedParameter);
    Parameter.findOneAndUpdate(
        { '_id': req.body._id },
        { $set: updatedParameter },
        (err) => {
            if (err) {
                console.log(err);
                res.status(500).json({message: err, status: 500});
            } else {
                res.status(200).json({message: `Updated Parameter ${req.body._id}!`, status: 200, _id: req.body._id});
            }
        }
    )
};

module.exports.deleteParameter = (req, res) => {
    Parameter.findOneAndDelete(
        { '_id': req.params._id },
        (err, doc) => {
            if (err) {
                res.status(500).json({message: err, status: 500});
            } else {
                res.status(200).json({message: `Deleted Parameter ${req.body._id}!`, status: 200});
            }
        }
    )
};

module.exports.findParameters = (req, res) => {
    Parameter.find().then((parameters) => {
        res.status(200).json(parameters);
    }).catch((err) => {
        res.status(500).json({message: err});
    })
};