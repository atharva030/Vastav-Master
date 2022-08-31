import React, { useContext,useState, useEffect } from "react";
import noteContext from "../Context/notes/noteContext";
import NoteItem from "./NoteItem";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";


export const Notes = (props) => {
  let navigate = useNavigate();
  
  const context = useContext(noteContext); //using useContext
  const { notes, getNotes,editNote } = context; //taking notes from notestate
  
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    }
    else{
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);
  const [note, setNote] = useState({id:"",etitle:"",edescription:"",etag:""})
  const [show, setShow] = useState(false);

  const handleClose = () => {
    editNote(note.id,note.etitle,note.edescription,note.etag);
    setShow(false);
    props.showAlert("Note Has Been Saved Successfully!","success")

  }
// const condelete=()=>{
// return  <Condelete
// }
  const handleShow = (currentNote) => {
      setShow(true);
      // conDelete();
      setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag});
    };
    
  const onchange=(e)=>{
    setNote({...note,[e.target.name]:e.target.value}) //this is mainly use to reflect the change in words on frontend
  } 
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="etitle"
                onChange={onchange}
                value={note.etitle}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="title"
                name="edescription"
                onChange={onchange}
                value={note.edescription}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Tag</Form.Label>
              <Form.Control
                type="text"
                name="etag"
                onChange={onchange}
                value={note.etag}
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button disabled={note.edescription.length<5 || note.etitle.length<5} variant="primary" onClick={handleClose}>
            Save Note
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="row ">
        <h3>Your Notes</h3>
        {notes.length===0 && <h2 className="container text-center my-5">Oops! No Notes to Display</h2> }
        {
          //mapping all fetched notes
          
          notes.map((note) => {
            return (
              <>
              <NoteItem note={note} handleShow={handleShow} showAlert={props.showAlert} key={note._id} /> 
              {/* passing note as a prop */}
            </>
            );
          })
        }
        
      </div>
    </>
  );
};
