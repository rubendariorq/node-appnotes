const mongose = require('mongoose');

mongose.connect('mongodb://localhost/db-notesapp', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
    .then(db => console.log('DB CONNECT'))
    .catch(err => console.error(err));