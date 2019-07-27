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
  const newPost = req.body;
  const { title, contents } = newPost;
  console.log('Testing ', contents);
  db.insert(newPost)
    .then(post => {
      res.status(201).json({ post });
    })
    .catch(err => {
      if (!contents || !title) {
        res.status(400).json({
          errorMessage: 'Please provide title and contents for the post.'
        });
      } else {
        res.status(500).json({
          error: 'There was an error while saving the post to the database'
        });
      }
    });
});

//Create a new comment for the post
//
// insertComment(): calling insertComment while passing it a
// comment object will add it to the database and return an
// object with the id of the inserted comment. The object
// looks like this: { id: 123 }. This method will throw an error if
// the post_id field in the comment object does not match a valid post id in the database.
//
router.post('/:id/comments', (req, res) => {
  const newComment = req.body;
  const id = req.params.id;
  const { text, post_id } = newComment;
  console.log('update: ', newComment);
  db.insertComment(newComment)
    .then(comment => {
      res.status(201).json({ comment });
    })
    .catch(err => {
      if (!post_id) {
        res
          .status(404)
          .json({ message: 'The post with the specified ID does not exist.' });
      } else if (!text) {
        res
          .status(400)
          .json({ errorMessage: 'Please provide text for the comment.' });
      } else {
        res.status(500).json({
          error: 'There was an error while saving the comment to the database'
        });
      }
    });
});

//Delete a post
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  db.remove(id)
    .then(deleted => {
      console.log('delete: ', deleted);
      if (!deleted) {
        res
          .status(404)
          .json({ message: 'The post with the specified ID does not exist.' });
      } else {
        res.status(200).json({ deleted });
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'The post could not be removed' });
    });
});

//Update a post
router.put('/:id', (req, res) => {
  const post = req.body;
  const id = req.params.id;
  const { title, contents } = post;
  db.update(id, post)
    .then(ids => {
      console.log('Id:', ids);
      if (!ids) {
        res
          .status(404)
          .json({ message: 'The post with the specified ID does not exist.' });
      } else if (!title || !contents) {
        res.status(400).json({
          errorMessage: 'Please provide title and contents for the post.'
        });
      } else {
        res.status(200).json({ ids });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: 'The post information could not be modified.' });
    });
});

module.exports = router;
