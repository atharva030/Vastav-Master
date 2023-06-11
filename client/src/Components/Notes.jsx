import React, { useContext, useState, useEffect } from "react";
import noteContext from "../Context/notes/noteContext";
import NoteItem from "./NoteItem";
import { useNavigate } from "react-router-dom";
import "../Styles/Notes.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Spinner from "./Spinner";

const Notes = (props) => {
  let navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;

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

  const [showModal, setShowModal] = useState(false);

  const handleClose = () => {
    editNote(note.id, note.etitle, note.edescription, note.etag);
    setShowModal(false);
    props.showAlert("Note has been saved successfully!", "success");
  };

  const handleShow = (currentNote) => {
    setShowModal(true);
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="row">
      <h1 className="h1style">Your Notes</h1>
      {notes.length === 0 && (
        <h2 style={{ marginLeft: "43rem" }}>Oops! No Notes to Display</h2>
      )}

      {notes.map((note) => (
        <React.Fragment key={note._id}>
          {!loader && <Spinner />}
          <NoteItem
            note={note}
            handleShow={handleShow}
            showAlert={props.showAlert}
          />
        </React.Fragment>
      ))}

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="input-flex">
              <TextField
                hiddenLabel
                id="filled-hidden-label-small"
                defaultValue="Small"
                variant="filled"
                placeholder="Edit Title"
                size="small"
                style={{ marginTop: 12 }}
                onChange={onchange}
                value={note.etitle}
                name="etitle"
              />
              <div className="input-label">
                <TextField
                  hiddenLabel
                  id="filled-hidden-label-small"
                  placeholder="Enter description"
                  defaultValue="Small"
                  variant="filled"
                  size="small"
                  name="edescription"
                  onChange={onchange}
                  value={note.edescription}
                  style={{ marginTop: 12, width: "100%" }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row-reverse",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  variant="contained"
                  style={{ width: 30, marginTop: 40 }}
                  disabled={note.edescription.length < 5 || note.etitle.length < 5}
                  onClick={handleClose}
                >
                  Submit
                </Button>
                <div>
                  <Button
                    variant="contained"
                    style={{ width: 30, marginTop: 40 }}
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notes;
