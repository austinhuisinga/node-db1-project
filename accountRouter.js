const express = require('express');

const db = require('./data/dbConfig.js');

const router = express.Router();

// GET all accounts
router.get('/', (req, res) => {
  db.select('*')
    .from('accounts')
    .then(rows => {
      res.status(200).json({ data: rows });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: 'CRITICAL ERROR.',
      });
    });
});

// GET all accounts by ID
router.get('/:id', (req, res) => {
  db('accounts')
    .where({ id: req.params.id })
    .first()
    .then(account => {
      if(account) {
        res.status(200).json({ data: account });
      } else {
        res.status(404).json({
          message: 'Account not found',
        });
      };
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: 'ERRORRRR!',
      });
    });
});

// POST a new account
router.post('/', (req, res) => {
  const id = req.body;

  db('accounts')
    .insert(id, "id")
    .then(ids => {
      res.status(201).json({ results: ids });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: 'ERROrrrrR!',
      });
    });
});

// UPDATE an account
router.put('/:id', (req, res) => {
  const changes = req.body;

  db('accounts')
    .where({ id: req.params.id })
    .update(changes)
    .then(count => {
      if(count > 0) {
        res.status(200).json({
          message: 'Account updated successfully',
        });
      } else {
        res.status(404).json({
          message: 'Account not found',
        });
      };
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: 'ERRRRRRRRROOOOOOOOR.',
      });
    });
});

// DELETE an account
router.delete('/:id', (req, res) => {
  db('accounts')
    .where({ id: req.params.id })
    .del()
    .then(count => {
      if(count > 0) {
        res.status(200).json({
          message: 'Record deleted successfully',
        });
      } else {
        res.status(404).json({
          message: 'Post not found',
        });
      };
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: 'ERROR!',
      });
    });
})

module.exports = router;