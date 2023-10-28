const notes = require('express').Router();

// require uuid package to create unique id for each note
const {v4: uuidv4 } = require('uuid');
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require('../helpers/fsUtilities');

// GET route for retrieving all saved notes
notes.get('/', (req, res) => {
  readFromFile('./db/db.json')
  .then((data) => 
    res.json(JSON.parse(data))
  );
});

// POST route for saving a new note
notes.post('/', (req, res) => {
  console.log("post route");
  console.log(req.body);
  // destructure elements in req.body
  const { title, text } = req.body;
  console.log("title: " + title);
  console.log("text: " + text);
  // if body has a title and a note
  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuidv4()
    };

    readAndAppend(newNote, './db/db.json');

    const response = {
      status: 'success',
      body: newNote
    }

    res.json(response);
  } else {
    res.json('Error in saving new note');
  }

});


// DELETE route for a specific note
notes.delete('/:note_id', (req, res) => {
  const noteId = req.params.note_id;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((parsedData) => {
      // create new array of all notes except the one with the ID provided in the URL
      const newData = parsedData.filter((note) => note.id !== noteId);
      console.log("newData:");
      console.log(newData);
      // save the new array 
      writeToFile('./db/db.json', newData);
      // Respond to the DELETE request
      res.json(`Note ${noteId} has been deleted`);
    });
});

module.exports = notes;