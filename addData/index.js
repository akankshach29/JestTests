const express = require("express");
const app = express();

app.use(express.json());

let users = [];
let books = [];
let reviews = [];

const validateUser = (user) => {
  if (!user.name || typeof user.name !== "string") {
    return "Name is required and should be a string.";
  }
  if (!user.email || typeof user.email !== "string") {
    return "Email is required and should be a string.";
  }
  return null;
};

app.post("/api/users", (req, res) => {
  const error = validateUser(req.body);
  if (error) return res.status(400).send(error);

  const user = { id: users.length + 1, ...req.body };
  users.push(user);
  res.status(201).json(user);
});

const validateBook = (book) => {
  if (!book.title || typeof book.title !== "string") {
    return "Title is required and should be a string.";
  }
  if (!book.author || typeof book.author !== "string") {
    return "Author is required and should be a string.";
  }
  return null;
};

app.post("/api/books", (req, res) => {
  const error = validateBook(req.body);
  if (error) return res.status(400).send(error);

  const book = { id: books.length + 1, ...req.body };
  books.push(book);
  res.status(201).json(book);
});

const validateReview = (review) => {
  if (!review.content || typeof review.content !== "string") {
    return "Content is required and should be a string.";
  }
  if (!review.userId || typeof review.userId !== "number") {
    return "User ID is required and should be a number.";
  }
  return null;
};

app.post("/api/reviews", (req, res) => {
  const error = validateReview(req.body);
  if (error) return res.status(400).send(error);

  const review = { id: reviews.length + 1, ...req.body };
  reviews.push(review);
  res.status(201).json(review);
});

module.exports = {
  app,
  validateUser,
  validateBook,
  validateReview,
};
