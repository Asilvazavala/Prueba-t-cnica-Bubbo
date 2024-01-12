const { Router } = require('express');
const { db } = require('../firebase');

const router = Router();

// INITIAL FORM
router.get('/', async (req, res) => {
  const querySnapshot = await db.collection('books').get();

  const books = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
  
  res.render('index', { books });
});

// GET ALL BOOKS
router.get('/books', async (req, res) => {
  const querySnapshot = await db.collection('books').get();

  const books = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
  
  res.send(books);
});

// GET A BOOK BY ID
router.get('/book/:id', async (req, res) => {
  const { id } = req.params;

  const querySnapshot = await db.collection('books').doc(id).get();
  
  const book = {
    id: querySnapshot.id,
    ...querySnapshot.data()
  }

  res.send(book);
})

// POST A BOOK
router.post('/new-book', async (req, res) => {
  const { name, description, image } = req.body;

  await db.collection('books').add({
    name, 
    description,
    image
  });

  res.redirect('/');
})

// DELETE A BOOK
router.get('/delete-book/:id', async (req, res) => {
  const { id } = req.params;

  await db.collection('books').doc(id).delete();

  res.redirect('/');
})

// EDIT A BOOK
router.get("/edit-book/:id", async (req, res) => {
  const { id } = req.params;

  const book = await db.collection('books').doc(id).get();

  res.render('index', { book: { id: book.id, ...book.data() }});
})

// UPDATE A BOOK
router.post('/update-book/:id', async (req, res) => {
  const { id } = req.params;

  db.collection('books').doc(id).update(req.body);

  res.redirect('/');
})

module.exports = router;