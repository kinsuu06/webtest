import Note from "../models/Note";


export const createNote = async (req, res) => {
  try {
    const { text, url, audio } = req.body;
    const note = new Note({ text, url, audio });
    await note.save();
    res.status(201).json({ success: true, note });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating note", error });
  }
};

export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, notes });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching notes", error });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    await Note.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting note", error });
  }
};