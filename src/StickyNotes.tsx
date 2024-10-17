import { Label, Note } from "./types"; // Import the Label type from the appropriate module
import { dummyNotesList } from "./constant"; // Import the dummyNotesList from the appropriate module
import ClickCounter from './hooksExercise'
import { useState, useEffect, useContext } from 'react';
import { ThemeContext, themes } from "./themeContext";


function StickyNotes() {
  // controls list of favorite notes
  const [favoriteNotes, setFavoriteNotes] = useState<string[]>([])
  const theme = useContext(ThemeContext);

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
   <div className='app-container'
   style={{
    background: theme.background,
    color: theme.foreground,
  }}
   >
    <form className="note-form" onSubmit={handleFormSubmit}>
       <div>
          <input 
            name="title"
            value={createNote.title}
            placeholder='Note Title'
            onChange={handleInputChange}
          />
       </div>
       <div>
        <textarea 
          name='content'
          value={createNote.content}
          placeholder = "Note Content"
          onChange={handleInputChange}
        />
        </div>
        <select
          name='label'
          value={createNote.label}
          onChange={handleInputChange}
        >
          <option value='personal'>personal</option>
          <option value='work'>work</option>
          <option value='other'>other</option>
        </select>
       <div>  
          <button type="submit">Create Note</button>
        </div>
    </form>
     {/* display notes list */}
     <div className="notes-grid"
     >
        {notes.map((note) => (
          <div key={note.id} className="note-item">
            <div className="notes-header">
              <button onClick={() => handleNoteDelete(note.id)}>
                x
              </button>
              <button 
                className={`favorite-btn ${favoriteNotes.includes(note.title) ? 'favorited' : ''}`} 
                onClick={() => toggleFavoriteList(note.title)}
              >
                {favoriteNotes.includes(note.title) ? "Unfavorite" : "Favorite"}
              </button>
            </div>

            {/* Inline Editing for the Title */}
            <div>
              {editField.id === note.id && editField.field === 'title' ? (
                <input
                  type="text"
                  value={note.title}
                  onChange={(e) => handleNoteChange(note.id, 'title', e.target.value)}
                  onBlur={handleBlur} // Stop editing on blur
                  autoFocus // Automatically focus on the input when clicked
                />
              ) : (
                <h2 onClick={() => handleEdit(note.id, 'title')}> {note.title} </h2>
              )}
            </div>

            {/* inline editing */}
            <div>
              {editField.id === note.id && editField.field === 'content' ? (
                <textarea
                  value={note.content}
                  onChange={(e) => handleNoteChange(note.id, 'content', e.target.value)}
                  onBlur={handleBlur} // Stop editing on blur
                  autoFocus // Automatically focus on the textarea when clicked
                />
              ) : (
                <p onClick={() => handleEdit(note.id, 'content')}> {note.content} </p>
              )}
            </div>
             {/* inline editing */}
             <div>
              {editField.id === note.id && editField.field === 'label' ? (
                <select
                  value={note.label}
                  onChange={(e) => handleNoteChange(note.id, 'label', e.target.value)}
                  onBlur={handleBlur} // Stop editing on blur
                  autoFocus // Automatically focus on the textarea when clicked
                >
                  <option>personal</option>
                  <option>work</option>
                  <option>other</option>
                </select>
              ) : (
                <p onClick={() => handleEdit(note.id, 'label')}> {note.label} </p>
              )}
            </div>
           
          </div>
        ))}
      </div>
     {/* List of Favorites */}
     <div className="favorites-list">
        <h3>List of Favorites:</h3>
        <ul>
          {favoriteNotes.map((title, index) => (
            <li key={index}>{title}</li>
          ))}
        </ul>
      </div>
     </div>

        

 );
}

export default StickyNotes;

