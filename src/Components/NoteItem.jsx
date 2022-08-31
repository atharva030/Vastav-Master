import React,{useContext} from 'react'
import noteContext from '../Context/notes/noteContext';

const NoteItem = (props) => {
  const context = useContext(noteContext);  //using useContext
  const {deleteNote}=context;//taking deleteNote function from notestate
  const {note,handleShow}=props;
  return (
    
<div className='col-md-3 my-3'>  
    <div className="card" >
      <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <p className="card-text">{note.id}</p>
          <i className="fa-solid fa-trash " onClick={()=>{
            deleteNote(note._id); 
            props.showAlert("Deleted Successfully","success")//calling deleteNote in the noteState and passing id to it
          }}></i>
            <i className="fa-solid fa-pen-to-square mx-3" onClick={()=>{handleShow(note);}
          }></i>
      
      </div>
    </div>
</div>
  )
}

export default NoteItem;