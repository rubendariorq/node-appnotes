const router = require('express').Router();
const Notes = require('../models/Notes');

router.get('/notes/add', (req, res) => {
    res.render('notes/new-note');
});

router.post('/notes/new-note', async (req, res) => {
    const {title, description} = req.body;
    const errors = [];

    if(!title){
        errors.push({text: 'Please you write a title'});
    }
    if(!description){
        errors.push({text: 'Please you write a description'});
    }
    if(errors.length > 0){
        res.render('notes/new-note', {
            errors,
            title,
            description
        });
    } else{
        const newNote = new Notes({ title, description });
        await newNote.save();
        res.redirect('/notes');
    }
});

router.get('/notes', async (req, res) => {
    const notes = await Notes.find().sort({date: 'desc'});
    res.render('notes/all-notes', { notes });
});

router.get('/notes/edit/:id', async (req, res) => {
    const note = await Notes.findById(req.params.id);
    res.render('notes/edit-note', { note });
});

router.put('/notes/edit-note/:id', async (req, res) => {
    const { title, description } = req.body;
    await Notes.findByIdAndUpdate(req.params.id, {title, description});
    res.redirect('/notes');
});

module.exports = router;