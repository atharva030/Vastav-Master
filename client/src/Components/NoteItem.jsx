import React, { useContext } from "react";
import noteContext from "../Context/notes/noteContext";
import { MdModeEdit, MdDelete } from "react-icons/md";
import "../Styles/Addnote.css";
import { useState } from "react";

const NoteItem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, handleShow } = props;

  const handleEdit = () => {
    console.log("called")
    handleShow(note);
  };

  return (
    <div className="note-item-container">
      <div className="row-item">
        <div className="column">
          <div className="card">
            <h1>{note.title}</h1>
            <p>{note.description}</p>
            <p>{note.id}</p>
            <MdDelete
              style={{ cursor: "pointer" }}
              onClick={() => {
                deleteNote(note._id);
                props.showAlert("Deleted Successfully", "success");
              }}
            />
            <MdModeEdit onClick={handleEdit} style={{cursor:"pointer"}}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
