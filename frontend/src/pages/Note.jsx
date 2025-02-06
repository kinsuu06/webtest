import { useState } from "react";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [noteText, setNoteText] = useState("");

  const addNote = () => {
    if (noteText.trim() === "") return;
    setNotes([...notes, noteText]);
    setNoteText("");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      

      {/* Add Note Section */}
      <div className="max-w-lg mx-auto mt-6 p-4 bg-white rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-2">Add a Note</h2>
        <textarea
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
          rows="3"
          placeholder="Write your note here..."
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
        ></textarea>
        <button
          onClick={addNote}
          className="mt-2 w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
        >
          Add Note
        </button>
      </div>

      {/* Notes List */}
      <div className="max-w-4xl mx-auto mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {notes.length === 0 ? (
          <p className="text-gray-500 text-center col-span-full">No notes added yet.</p>
        ) : (
          notes.map((note, index) => (
            <div key={index} className="p-4 bg-white rounded-lg shadow">
              <p className="text-gray-700">{note}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
