import React, { useContext,useState } from 'react'
import NoteContext from '../Context/notes/noteContext';
import Notes from './Notes';
const AddNote = (props) => {
  const context = useContext(NoteContext);  

  const {addNote}=context;//taking addNote function from notestate
  const [note, setNote] = useState({title:"",description:"",tag:""})
  
  const handleClick=(e)=>{
    e.preventDefault();
    if (!note.title || !note.description) {
      alert("Title and description cant be blank");
    }
    else{
     addNote(note.title,note.description,note.tag);  //addNote is a function in the notestate 
     setNote({title:"",description:"",tag:""})
     props.showAlert("Added Successfully","success")
    }
  }


  const onchange=(e)=>{
    setNote({...note,[e.target.name]:e.target.value}) //this is mainly use to reflect the change in words on frontend
  } 
  
  return (
//     <div className="container">
//         <h2 className='text-center'>Add Notes</h2>
//           <form>
//         <div className="mb-3">
//           <label htmlFor="title" className="form-label">Title</label>
//           <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" value={note.title} onChange={onchange} placeholder="Enter the Title"/>
//         </div>
//         <div className="mb-3">
//           <label htmlFor="description" className="form-label">Description</label>
//           <input type="text" className="form-control" id="description" name='description' value={note.description} onChange={onchange} placeholder="Enter the Description"/>
//         </div>
//         <div className="mb-3">
//           <label htmlFor="tag" className="form-label">Tag</label>
//           <input type="text" className="form-control" id="description"name='tag' value={note.tag} onChange={onchange} placeholder="Enter the Tag"/>
//         </div>
//         <button disabled={note.description.length<5 || note.title.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
//       </form>
// </div>

//</div>
    <div className="whole-container">
    <div className="todo-container">
      <form className="wrapper">
        <h3>SCHEDULE YOUR WORK HERE</h3>
        <div className="input-data">
          <input type="text" id="title" name='title' value={note.title} onChange={onchange} required/>
          <label htmlFor="title" >Enter your Title</label>
        </div>
        <div className="input-data">
          <input type="text" id="description" name='description' value={note.description} onChange={onchange} required/>
          <label htmlFor="description" >Enter Your Description</label>
        </div>
        <div className="input-data">
          <input type="text" id="tag" name='tag' value={note.tag} onChange={onchange} required/>
          <label>Give a Tag</label>
        </div>
        <button disabled={note.description.length<5 || note.title.length<5} className='addtodo' type='submit' onClick={handleClick}>Submit</button>
      </form>
    </div>
<Notes/>
</div>
  )
}

export default AddNote;