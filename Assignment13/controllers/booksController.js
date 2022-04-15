const Books = require('../models/book');

module.exports.getBookById = (req, res, next) => {
    let bookId = req.params.bookId;
    res.status(200).json(Books.findBookById(bookId));
    // res.json(Books.findBookById(bookId));
};

exports.getBookByAuhtor = (req, res) => {
    console.log('Temkass', req.query, req.params);
    let authorName = req.query.authorName;
    res.json(Books.findByAuthor(authorName));
};

module.exports.saveBook = (req, res, next) => {
    let newBook = req.body;
    // console.log('SAVEEEE', newBook);
    const book = new Books(null, newBook.title, newBook.ISBN, newBook.publishedDate, newBook.author);
    res.status(201).json(book.save());
};

module.exports.getBooks = (req, res, next) => {
    res.status(200).json(Books.getBooks());
};

module.exports.deleteBookById = (req, res, next) => {
    res.status(200).json(Books.deleteBookById(req.params.bookId));
};

module.exports.updateBook = (req, res, next) => {
    console.log('update :::', req.body,req.params.bookId);
    let updatedBook = req.body;
    let bookId = req.params.bookId;
    const newBook = new Books(bookId, updatedBook.title, updatedBook.ISBN, 
        updatedBook.publishedDate, updatedBook.author);
        console.log('newBook : ', newBook);
    res.status(200).json(Books.update(newBook));
};