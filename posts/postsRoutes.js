const express = require('express');

const router = express.Router();

const db = require('../data/db');

//get all post
router.get('/', (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json({ posts });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: 'The posts information could not be retrieved.' });
    });
});

//get post by id
router.get('/:id', (req, res) => {
  const id = req.params.id;
  db.findById(id)
    .then(post => {
      //   console.log('id result: ', post);
      if (!`${post}`) {
        res
          .status(400)
          .json({ message: 'The post with the specified ID does not exist.' });
      } else {
        res.status(200).json({ post });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: 'The post information could not be retrieved.'
      });
    });
});

//get comments from a post
router.get('/:id/comments', (req, res) => {
  const id = req.params.id;
  db.findPostComments(id)
    .then(comment => {
      if (!`${comment}`) {
        res
          .status(404)
          .json({ message: 'The post with the specified ID does not exist.' });
      } else {
        res.status(200).json({ comment });
      }
    })
    .catch(err =>
      res
        .status(500)
        .json({ error: 'The comments information could not be retrieved.' })
    );
});

//Create a new post
router.post('/', (req, res) => {
  res.status(200).json('Hello From Post');
});

//Create a new comment for the post
router.post('/:id/comment', (req, res) => {
  res.status(200).json('Hello From Post');
});

//Delete a post
router.delete('/:id', (req, res) => {
  res.status(200).json('Hello From Post');
});

//Update a post
router.put('/:id', (req, res) => {
  res.status(200).json('Hello From Post');
});

module.exports = router;
