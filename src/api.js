const router = require("express").Router();
const books = require("./books_dumb");

let booksDirectory = books;

router.get("/books", (req, res) => {
  res.send(booksDirectory);
});

router.get("/books/:id", (req, res) => {
  const book = booksDirectory.find((b) => b.isbn === req.params.id);
  if (!book) return res.status(404).send("Book does not exist");

  res.send(book);
});

router.post("/books", (req, res) => {
  const {
    title,
    isbn,
    pageCount,
    publishedDate,
    thumbnailUrl,
    shortDescription,
    longDescription,
    status,
    authors,
    categories,
  } = req.body;

  const bookExist = booksDirectory.find((b) => b.isbn === isbn);
  if (bookExist) return res.send("Book already exists");

  const book = {
    title,
    isbn,
    pageCount,
    publishedDate,
    thumbnailUrl,
    shortDescription,
    longDescription,
    status,
    authors,
    categories,
  };
  booksDirectory.push(book);

  res.send(book);
});

router.put("/books/:id", (req, res) => {
  const {
    title,
    isbn,
    pageCount,
    publishedDate,
    thumbnailUrl,
    shortDescription,
    longDescription,
    status,
    authors,
    categories,
  } = req.body;

  const book = booksDirectory.find((b) => b.isbn === req.params.id);
  if (!book) return res.send("Book does not exist");

  const updateField = (val, prev) => (!val ? prev : val);

  const updatedBook = {
    ...book,
    title: updateField(title, book.title),
    pageCount: updateField(pageCount, book.pageCount),
    publishedDate: updateField(publishedDate, book.publishedDate),
    thumbnailUrl: updateField(thumbnailUrl, book.thumbnailUrl),
    shortDescription: updateField(shortDescription, book.shortDescription),
    longDescription: updateField(longDescription, book.longDescription),
    authors: updateFiled(authors, book.authors),
    categories: updateField(categories, book.categories),
  };

  const bookIndex = booksDirectory.findIndex((b) => b.isbn === req.params.id);
  booksDirectory.splice(bookIndex, 1, updatedBook);

  res.send(updatedBook);
});

router.delete("/books/:id", (req, res) => {
  let book = booksDirectory.find((b) => b.isbn === req.params.id);
  if (!book) return res.status(404).send("Book does not exist");

  booksDirectory = booksDirectory.filter((b) => b.isbn !== req.params.id);

  res.send("Success");
});

module.exports = router;
