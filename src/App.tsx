import './App.css';
import { Label, Note } from "./types"; // Import the Label type from the appropriate module
import { dummyNotesList } from "./constant"; // Import the dummyNotesList from the appropriate module
import {Route, Routes } from 'react-router-dom'

import HomePage from './hooksExercise'
import StickyNotes from './StickyNotes'
import { ToDoList } from './ToDoList';
import {Navbar} from './Navbar'


function App() {

 return (
   <div className='app-box'>
      <Navbar/>
      <Routes>
        <Route path="/" element={<StickyNotes />}/>
        <Route path="/todolist/:name" element={<ToDoList />} />
      </Routes>
    </div>

        

 );
}

export default App;

