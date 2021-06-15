// DEPENDENCIES

const express = require('express');
const path = require('path');

// Tells node that we are creating an "express" server
const app = express();

// Sets an initial port. We"ll use this later in our listener
const PORT = process.env.PORT || 8080;

// app.use(express.static(`public`));
app.use(express.static(path.join(__dirname, './public')));
app.use(express.static('./'));


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ROUTER
// The below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from various URLs.

require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);



// LISTENER
// The below code effectively "starts" our server

app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});