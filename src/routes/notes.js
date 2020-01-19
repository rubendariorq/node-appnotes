const router = require('express').Router();
const Notes = require('../models/Notes');
const { isAuthenticated } = require('../helpers/auth')

router.get('/notes/add', isAuthenticated, (req, res) => {
    res.render('notes/new-note');
});

router.post('/notes/new-note', isAuthenticated, async (req, res) => {
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
        req.flash('success_msg', 'Note created successfully');
        res.redirect('/notes');
    }
});

router.get('/notes', isAuthenticated, async (req, res) => {
    const notes = await Notes.find().sort({date: 'desc'});
    res.render('notes/all-notes', { notes });
});

router.get('/notes/edit/:id', isAuthenticated, async (req, res) => {
    const note = await Notes.findById(req.params.id);
    res.render('notes/edit-note', { note });
});

router.put('/notes/edit-note/:id', isAuthenticated, async (req, res) => {
    const { title, description } = req.body;
    await Notes.findByIdAndUpdate(req.params.id, {title, description});
    req.flash('success_msg', 'Nota updeted successfully');
    res.redirect('/notes');
});

router.delete('/notes/delete-note/:id', isAuthenticated, async (req, res) => {
    await Notes.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Nota deleted successfully');
    res.redirect('/notes');
});

module.exports = router;