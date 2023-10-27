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
  // destructure elements in req.body
  const { title, note } = req.body;

  // if body has a title and a note
  if (title && note) {
    const newNote = {
      title,
      note,
      note_id: uuidv4()
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
      const newData = parsedData.filter((note) => note.note_id !== noteId);
      // save the new array 
      writeToFile('./db/db.json', newData);
      // Respond to the DELETE request
      res.json(`Note ${noteId} has been deleted`);
    });
});

module.exports = notes;