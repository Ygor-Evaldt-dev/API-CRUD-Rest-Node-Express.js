const express = require('express');
const router = express.Router();
let data = require("../data/data.js")

// HTTP methods ↓↓ starts here.
router.get('/', function (req, res) {
    res.status(200).json(data);
});

// READ
router.get('/:id', function (req, res) {
    let found = data.find(function (item) {
        return item.id === parseInt(req.params.id);
    });

    if (found) {
        res.status(200).json(found);
    } else {
        res.sendStatus(404);
    }
});

// CREATE
router.post('/', function (req, res) {
    let itemIds = data.map(item => item.id);
    let orderNums = data.map(item => item.order);
    let newId = itemIds.length > 0 ? Math.max.apply(Math, itemIds) + 1 : 1;
    let newOrderNum = orderNums.length > 0 ? Math.max.apply(Math, orderNums) + 1 : 1;
    let newItem = {
        id: newId,
        title: req.body.title,
        order: newOrderNum,
        completed: false,
        createdOn: new Date()
    };
    data.push(newItem);

    res.status(201).json(newItem);
});

// UPDATE
router.put('/:id', function (req, res) {
    // get item object match by `id`
    let found = data.find(function (item) {
        return item.id === parseInt(req.params.id);
    });

    if (found) {
        let updated = {
            id: found.id,
            title: req.body.title,
            order: req.body.order,
            completed: req.body.completed
        };

        let targetIndex = data.indexOf(found);
        data.splice(targetIndex, 1, updated);

        res.status(200).send("Item atualizado com sucesso!");
    } else {
        res.sendStatus(404);
    }
});

// DELETE
router.delete('/:id', function (req, res) {
    let found = data.find(function (item) {
        return item.id === parseInt(req.params.id);
    });

    if (found) {
        let targetIndex = data.indexOf(found);
        data.splice(targetIndex, 1);
    }

    res.status(202).send("Item deletado com sucesso!");
});

module.exports = router;