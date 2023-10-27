const express = require('express');

// import modular router for /notes
const notesRouter = require('./notes');

const app = express();

// send any /notes requests to notesRouter
app.use('/notes', notesRouter);

module.exports = app;