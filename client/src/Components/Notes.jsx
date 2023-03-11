import React, { useContext, useState, useEffect } from "react";
import noteContext from "../Context/notes/noteContext";
import NoteItem from "./NoteItem";
import { useNavigate } from "react-router-dom";
import "../Styles/Notes.css";
import Spinner from "./Spinner";
const Notes = (props) => {
  let navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const context = useContext(noteContext); //using useContext
  const { notes, getNotes, editNote } = context; //taking notes from notestate

  useEffect(() => {
    if (localStorage.getItem("token")) {
      console.log("Senddd");
      getNotes();
    } else {
      console.log("You are not logged in");
      navigate("/signup");
    }
    // eslint-disable-next-line
  }, []);
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });
  const [show, setShow] = useState(false);

  const handleClose = () => {
    editNote(note.id, note.etitle, note.edescription, note.etag);
    setShow(false);
    props.showAlert("Note Has Been Saved Successfully!", "success");
  };

  const handleShow = (currentNote) => {
    setShow(true);
    // conDelete();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value }); //this is mainly use to reflect the change in words on frontend
  };
  return (
    <div className="row ">
      <h1 style={{ marginLeft: "43rem" }}>Your Notes</h1>
      {notes.length === 0 && (
        <h2 style={{ marginLeft: "43rem" }}>Oops! No Notes to Display</h2>
      )}
      {
        //mapping all fetched notes

        notes.map((note) => {
          return (
            <>
              {!loader && <Spinner />}

              <NoteItem
                note={note}
                handleShow={handleShow}
                showAlert={props.showAlert}
                key={note._id}
              />
              {/* passing note as a prop */}
            </>
          );
        })
      }
    </div>
    // </>
  );
};
export default Notes;
