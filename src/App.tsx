import './App.css';
import { Label, Note } from "./types"; // Import the Label type from the appropriate module
import { dummyNotesList } from "./constant"; // Import the dummyNotesList from the appropriate module
import ClickCounter from './hooksExercise'
import { useState } from 'react';


function App() {
  const [favoriteNotes, setFavoriteNotes] = useState<string[]>([])

  // Function to handle adding/removing favorites
  const toggleFavorite = (noteTitle: string) => {
    setFavoriteNotes((prevFavorites) => 
      prevFavorites.includes(noteTitle) 
        ? prevFavorites.filter((title) => title !== noteTitle) // Remove if already favorite
        : [...prevFavorites, noteTitle] // Add if not favorite
    );
  };
  
 return (
   <div className='app-container'>
    <ClickCounter/>
    <form className="note-form">
       <div><input placeholder="Note Title"></input></div>

       <div><textarea></textarea></div>

       <div><button type="submit">Create Note</button></div>
    </form>
    <div className="notes-grid">
       {dummyNotesList.map((note) => (
         <div
           key={note.id}
           className="note-item">
           <div className="notes-header">
             <button>x</button>
             <button 
                className={`favorite-btn ${favoriteNotes.includes(note.title) ? 'favorited' : ''}`} 
                onClick={() => toggleFavorite(note.title)}
              >
                ♥
              </button>
           </div>
           <h2> {note.title} </h2>
           <p> {note.content} </p>
           <p> {note.label} </p>
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

export default App;

