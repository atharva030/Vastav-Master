import React, { useContext } from "react";
import noteContext from "../Context/notes/noteContext";
import { MdModeEdit, MdDelete } from "react-icons/md";
import "../Styles/Addnote.css";
const NoteItem = (props) => {
  const context = useContext(noteContext); //using useContext
  const { deleteNote } = context; //taking deleteNote function from notestate
  const { note, handleShow } = props;
  return (
    <div className="note-item-container">
      <div class="row-item">
        <div class="column">
          <div class="card">
            <h1>{note.title}</h1>
            <p>{note.description}</p>
            <p>{note.id}</p>
            <MdDelete
              style={{ cursor: "pointer" }}
              onClick={() => {
                deleteNote(note._id);
                props.showAlert("Deleted Successfully", "success"); //calling deleteNote in the noteState and passing id to it
              }}
            ></MdDelete>
            <MdModeEdit
              onClick={() => {
                handleShow(note);
              }}
            ></MdModeEdit>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
