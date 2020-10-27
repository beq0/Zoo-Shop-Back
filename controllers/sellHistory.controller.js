const SellHistory = require('../models/SellHistory.model');

module.exports.addHistory = (req, res) => {
    console.log(req.body)
    const sellHistory = new SellHistory({
        productId: req.body.productId,
        productName: req.body.productName,
        sellDate: req.body.sellDate,
        amount: req.body.amount,
        originalPrice: req.body.originalPrice,
        sellingPrice: req.body.sellingPrice
    });
    sellHistory.save().then(() => {
        res.status(200).json({message: `Saved SellHistory of product ${req.body.productId}!`});
    }).catch((error) => {
        console.log(error);
        res.status(500).json({message: 'Internal Error!'});
    });
};

module.exports.deleteHistory = (req, res) => {
    SellHistory.findOneAndDelete(
        { '_id': req.query.id },
        (err, doc) => {
            if (err) {
                res.status(500).json({message: err});
            } else {
                res.status(200).json({message: `Deleted SellHistory ${req.body.id}!`});
            }
        }
    )
};

module.exports.findHistories = (req, res) => {
    let sellHistoryForQuery = {}
    if (req.body.productId) sellHistoryForQuery['productId'] = req.body.productId;
    if (req.body.productName) sellHistoryForQuery['productName'] = new RegExp(req.body.productName, "i");
    if (req.body.sellDateFrom || req.body.sellDateTo) sellHistoryForQuery['sellDate'] = {}
    if (req.body.sellDateFrom) sellHistoryForQuery['sellDate']['$gte'] = req.body.sellDateFrom;
    if (req.body.sellDateTo) sellHistoryForQuery['sellDate']['$lte'] = req.body.sellDateTo;
    if (req.body.amount || req.body.amount === 0) sellHistoryForQuery['amount'] = req.body.amount;
    SellHistory.find(sellHistoryForQuery).then((histories) => {
        res.status(200).json(histories);
    }).catch((err) => {
        res.status(500).json({message: err});
    })
};

module.exports.findAll = (req, res) => {
    SellHistory.find().then((histories) => {
        res.status(200).json(histories);
    }).catch((err) => {
        res.status(500).json({message: err});
    })
}