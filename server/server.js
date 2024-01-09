const express = require("express");
const app = express();
const PORT = 8080;
const cors = require("cors");

let booksData = require("./utils/booksData.json");
const { db } = require("./firebase.js")

app.use(cors());

function idNotNumber(id) {
  if (!Number.isInteger(Number(id))) {
    return true;
  }
}

// GET ALL BOOKS
app.get("/api/books", async (req, res) => {
  const allBooks = db.collection('books').doc('associates');
  const doc = await allBooks.get();

  if (!doc.exists()) {
    return res.sendStatus(404).json({ error: "No se contraron libros" });
  }
  res.status(201).send(doc.data());
});

// GET A BOOK BY ID
app.get("/api/books/:id", (req, res) => {
  const { id } = req.params;
  idNotNumber(id) && res.status(400).json({ error: "Formato de ID inválido, solo se aceptan números" });

  const findBook = booksData.find(book => book.id == id);

  if (findBook) {
    res.json(findBook);
  } else {
    res.status(404).json({ error: "Libro no encontrado, intenta con otro" });
  }
});


// ADD A NEW BOOK
app.post("/api/books", async (req, res) => {
  const allBooks = db.collection('books').doc('associates');
  const response = await allBooks.create({
    
  });

  res.status(201).json(newBook);
});


// UPDATE A BOOK BY ID
app.patch("/api/books/:id", async (req, res) => {
  const { id } = req.params;
  idNotNumber(id) && res.status(400).json({ error: "Formato de ID inválido, solo se aceptan números" });
  const updatedBookData = req.body;

  const allBooks = db.collection('books').doc('associates');
  const bookToUpdate = allBooks.filter(book => book.id != id);

  if (bookToUpdate) {
    const response = await allBooks.set({
    
    });
    res.json(booksData);
  } else {
    res.status(404).json({ error: "Libro no encontrado" });
  }

});


// DELETE A BOOK BY ID
app.delete("/api/books/:id", async (req, res) => {
  const { id } = req.params;
  idNotNumber(id) && res.status(400).json({ error: "Formato de ID inválido, solo se aceptan números" });
  const allBooks = db.collection('books').doc('associates');

  const bookToDelete = allBooks.filter(book => book.id != id);
  
  if (bookToDelete) {
    const response = await allBooks.delete(bookToDelete);
    res.json({ message: "Libro eliminado correctamente" });
  } else {
    res.status(404).json({ error: "Libro no encontrado" });
  }
});


app.listen(PORT, () => {
  console.log(`El servidor se inició en el puerto: ${PORT}`);
});