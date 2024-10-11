import './App.css';
import { Label, Note } from "./types"; // Import the Label type from the appropriate module
import { dummyNotesList } from "./constant"; // Import the dummyNotesList from the appropriate module
import HomePage from './hooksExercise'
import { useState } from 'react';


function App() {
  // controls list of favorite notes
  const [favoriteNotes, setFavoriteNotes] = useState<string[]>([])

  // controls favorite/unfavorite of note sticker
  const [favorite, setFavorite ] = useState("Favorite")

  // allows fields of current notes to be edited
  const [editField, setEditField] = useState<{ id: number | null; field: string | null }>({
    id: null,
    field: null,
  });

  // sets initial state of notes when loading the page first
  const [notes, setNotes] = useState(dummyNotesList)

  const initialNote =  {
    id:-1,
    title:'',
    content:'',
    label: Label.other,
  } 

  // state for creating, set note to null
  const [createNote, setCreateNote] = useState(initialNote)


  // DELETION: handle deletion, filters out the specified note
  const handleNoteDelete = (id: number ) => {
    setNotes((prevNotes) =>
      prevNotes.filter((note) => note.id !== id)
    )
  }

   // EDITING:  Function to enable inline editing on click
   const handleEdit = (id: number, field: string) => {
    setEditField({ id, field });
  };

  // EDITING: Function to disable editing (onBlur)
  const handleBlur = () => {
    setEditField({ id: null, field: null  });
  };

 // EDITING: Function to handle updating a note
const handleNoteChange = (id: number, field: string, value: string) => {
  setNotes((prevNotes) =>
    prevNotes.map((note) => {
      if (note.id === id) {
        const updatedNote = { ...note, [field]: value };

        // If the title is being updated, check and update the favorite list
        if (field === 'title') {
          const oldTitle = note.title;
          const newTitle = value;
          
          setFavoriteNotes((prevFavorites) => {
            // Check if the old title is in the favorite list
            if (prevFavorites.includes(oldTitle)) {
              // Replace the old title with the new one
              return prevFavorites.map((fav) =>
                fav === oldTitle ? newTitle : fav
              );
            }
            return prevFavorites;
          });
        }
        return updatedNote;
      }
      return note;
    })
  );
};


  // CREATING: function to handle input changes in the form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {name, value} = e.target;
    setCreateNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }))
  }

  // CREATING: function to handle form submission and add a new note
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if(!createNote.title || !createNote.content) {
      alert('Please fill out all fields')
      return
    }

    // add new note to list
    setNotes ((prevNotes) => [
      ...prevNotes,
      {...createNote, id: notes.length + 1}
    ])

    // reset the form inputs
    setCreateNote(initialNote)
  }
  
  // Function to handle adding/removing favorites
  const toggleFavoriteList = (noteTitle: string) => {
    setFavoriteNotes((prevFavorites) => {
      const isFavorited = prevFavorites.includes(noteTitle);

      setFavorite(isFavorited ? "Favorite" : "Unfavorite")

      return isFavorited
        ? prevFavorites.filter((title) => title !== noteTitle) // remove if already favorited
        : [...prevFavorites, noteTitle] // add if not favorite
    })
  };
  
 return (
   <div className='app-box'>
      <HomePage/>
    </div>

        

 );
}

export default App;

