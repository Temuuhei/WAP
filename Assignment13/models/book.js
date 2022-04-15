let books = [];
let mainId = 0;

module.exports = class Books {
    constructor(id, title, ISBN, publishedDate, author) {
        console.log('inside the constructor!');
        this.id = id;
        this.title = title;
        this.ISBN = ISBN;
        this.publishedDate = publishedDate;
        this.author = author;
    }

    static findByAuthor(name) {
        console.log('in books ------');
        return books.filter(book => book.author.toLowerCase()
                            .includes(name.toLowerCase()));
    }

    static findBookById(bookId) {
        let index = books.findIndex(book => book.id == bookId);
        // console.log('book id :', index);
        if (index > -1) {
            return books[index];
        } else {
            console.log('FIND OR GET : Book id not found !');
        }
    }

    save() {
        this.id = mainId + 1;
        books.push(this);
        ++mainId;
        return this;
    }

    static getBooks() {
        return books;
    }

    // splice(start)
    // splice(start, deleteCount)
    // splice(start, deleteCount, item1)
    // splice(start, deleteCount, item1, item2, itemN)


    static deleteBookById(bookId) {
        let index = books.findIndex(book => book.id == bookId);
        if (index > -1) {
            books.splice(index, 1);
        }
        else {
            console.log('DELETE : Book ID is not FOUND ! try another ID');
        }
        return books;
    }

    static update(bookId) {
        let index = books.findIndex(book => book.id == bookId.id);
        if (index > -1) {
            console.log('inside the model book update', bookId);
            books.splice(index, 1, bookId);
        }
        else {
            console.log('UPDATE : Book ID is not FOUND ! try another ID');
        }
        return books;
    }
}