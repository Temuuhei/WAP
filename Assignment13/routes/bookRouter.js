const express = require('express');
const booksController = require('../controllers/booksController');
const router = express.Router();

router.get('/:bookId', booksController.getBookById);
router.get('/author/name', booksController.getBookByAuhtor);
router.post('/', booksController.saveBook);
router.get('/', booksController.getBooks);
router.delete('/:bookId', booksController.deleteBookById);
router.put('/:bookId', booksController.updateBook);

module.exports = router;