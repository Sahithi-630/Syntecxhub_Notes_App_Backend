const Note = require("../models/Note");

exports.createNote = async (req, res) => {

  try {

    const note = await Note.create({
      title: req.body.title,
      content: req.body.content,
      user: req.user
    });

    res.json(note);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};

exports.getAllNotes = async (req, res) => {

  try {

    const notes = await Note.find({ user: req.user, archived: false })
      .populate("user", "name email");

    res.json(notes);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};

exports.getSingleNote = async (req, res) => {

  const note = await Note.findById(req.params.id).populate("user", "name email");

  if (!note) {
    return res.status(404).json({ message: "Note not found" });
  }

  res.json(note);

};

exports.updateNote = async (req, res) => {

  const note = await Note.findById(req.params.id);

  if (!note) {
    return res.status(404).json({ message: "Note not found" });
  }

  note.title = req.body.title || note.title;
  note.content = req.body.content || note.content;

  await note.save();

  res.json(note);

};

exports.archiveNote = async (req, res) => {

  const note = await Note.findById(req.params.id);

  note.archived = true;

  await note.save();

  res.json({ message: "Note archived successfully" });

};

exports.deleteNote = async (req, res) => {

  const note = await Note.findById(req.params.id);

  await note.deleteOne();

  res.json({ message: "Note deleted" });

};