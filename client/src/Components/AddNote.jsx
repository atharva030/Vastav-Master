import React, { useContext, useState } from "react";
import NoteContext from "../Context/notes/noteContext";
import Notes from "./Notes";
const AddNote = (props) => {
  const context = useContext(NoteContext);

  const { addNote } = context; //taking addNote function from notestate
  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const handleClick = (e) => {
    e.preventDefault();
    if (!note.title || !note.description) {
      alert("Title and description cant be blank");
    } else {
      addNote(note.title, note.description, note.tag); //addNote is a function in the notestate
      setNote({ title: "", description: "", tag: "" });
      props.showAlert("Added Successfully", "success");
    }
  };

  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value }); //this is mainly use to reflect the change in words on frontend
  };

  return (
    <div className="whole-container">
      <div className="todo-container">
        <form className="wrapper">
          <h3>SCHEDULE YOUR WORK HERE</h3>
          <div className="input-data">
            <input
              type="text"
              id="title"
              name="title"
              value={note.title}
              onChange={onchange}
              required
            />
            <label htmlFor="title">Enter your Title</label>
          </div>
          <div className="input-data">
            <input
              type="text"
              id="description"
              name="description"
              value={note.description}
              onChange={onchange}
              required
            />
            <label htmlFor="description">Enter Your Description</label>
          </div>
          <div className="input-data">
            <input
              type="text"
              id="tag"
              name="tag"
              value={note.tag}
              onChange={onchange}
              required
            />
            <label>Give a Tag</label>
          </div>
          <button
            disabled={note.description.length < 5 || note.title.length < 5}
            className="addtodo"
            type="submit"
            onClick={handleClick}
          >
            Submit
          </button>
        </form>
      </div>
      <Notes />
    </div>
  );
};

export default AddNote;
