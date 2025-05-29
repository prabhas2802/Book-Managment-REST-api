const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let books = [
  { id: 1, title: "Atomic Habits", author: "James Clear" },
  { id: 2, title: "The Alchemist", author: "Paulo Coelho" }
];

// GET /books
app.get('/books', (req, res) => {
  res.json(books);
});

// POST /books
app.post('/books', (req, res) => {
  const newBook = req.body;
  newBook.id = books.length + 1;
  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT /books/:id
app.put('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedBook = req.body;
  const index = books.findIndex(book => book.id === id);

  if (index !== -1) {
    books[index] = { id, ...updatedBook };
    res.json(books[index]);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

// DELETE /books/:id
app.delete('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const initialLength = books.length;
  books = books.filter(book => book.id !== id);

  if (books.length < initialLength) {
    res.status(204).send();
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
