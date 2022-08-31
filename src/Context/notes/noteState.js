import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "https://atharva-jagdale.herokuapp.com";
  const initialState = [];

  const [notes, setNotes] = useState(initialState);


  //Get All Notes
  const getNotes = async () => {
    const response = await fetch(
      `${host}/api/notes/fetchallnotes`,
      {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type":"application/json",
          "auth-token":localStorage.getItem('token'),
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    const json=await response.json()
    setNotes(json);
//se
  };

  //Adding note
  const addNote = async (title, description, tag) => {
    const response = await fetch(
      `${host}/api/notes/addnote`,
      {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type":"application/json",
          "auth-token":localStorage.getItem('token'),
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
      }
    );
   const note=await response.json();
    setNotes(notes.concat(note)); //concat returns an array whereas push updates an array
  };


  //Delete Note
  const deleteNote = async(id) => {
      //API Call
      const response = await fetch(
        `${host}/api/notes/deletenote/${id}`,
        {
          method: "DELETE", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token'),
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
      const json=response.json();
      const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
    console.log(json);
  };


  //Edit Note
  const editNote = async (id, title, description,tag) => {
    //API Call
    const response = await fetch(
      `${host}/api/notes/updatenote/${id}`,
      {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token'),
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
      }
    );
    const json=response.json();
   console.log(json);

    // Logic for updating the edited content on frontend
   let newNotes=JSON.parse(JSON.stringify(notes))

    //edit logic
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
      break;
      }
    }
    setNotes(newNotes)
  };


  return (
    //passing values or exporting the functions of notes,setNotes as a object
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
