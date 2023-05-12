const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// empty books array Creating 
let books = [];

//Book route - will Return a JSON array of the Book
app.get('/books', function (req, res) {
    res.json(books)
})

// Add a book
app.post('/books', (req, res) => {
    const {title, author, publishDate} = req.body;

    // Create Book ID
    const id = Date.now().toString();

    // Create new Book Object
    const book = {
        id,
        title,
        author,
        publishDate
    }
    // Require Title and author
    if (!title || !author) {
        return res.status(400).json({ message: 'Title and author are required' });
    }
    // add books to the array
    books.push(book);

    // Send new book details;
    res.json(book)
})

// Delete book
app.delete('/books/:id', (req, res) => {
    const id = req.params.id;
    const bookIndex = books.findIndex(book => book.id === id);
    if (bookIndex === -1) {
        return res.status(404).json({ message: 'Book not found' });
    }
    const deletedBook = books.splice(bookIndex, 1);
    res.json({ message: 'Book deleted successfully' });
})


// route
app.get('/', (req, res )=> {
    res.sendFile(`${__dirname}/index.html`, )
})


// app Run
app.listen(8000, function () {
    console.log("Server Run Success")
})
