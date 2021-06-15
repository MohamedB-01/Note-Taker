
// const notes = require(`../public/assets/js/index.js`);
const fs = require(`fs`);


// ROUTING

module.exports = (app) => {
  
  const noteList = JSON.parse(fs.readFileSync(`./db/db.json`, `utf8`));

  app.get(`/api/notes`, (req, res) => res.json(noteList));

  

  

  app.post(`/api/notes`, (req, res) => {
    
    let lastId;
    if (noteList.length) {
      lastId = Math.max(...(noteList.map(note => note.id)));
    //Otherwise set to 0
    } else {
      lastId = 0;
    }
    
    //Starts the id's at 1
    const id = lastId + 1;

    // pushes the id of the note along with the rest of the text/input of the array in the request.body
    noteList.push({ id, ...req.body });
    //Removes last index
    res.json(noteList.slice(-1));
  });

  

    // * DELETE `/api/notes/:id` -
    app.delete('/api/notes/:id', (req, res) => {
      //finds note by id, then converts the string into a JSON object with the id parameters of the request made
      let findNote = noteList.find(({ id }) => id === JSON.parse(req.params.id));

      //Delete object matching the index of the note ID
      noteList.splice(noteList.indexOf(findNote), 1);
      res.end("Note was deleted");
  })
};