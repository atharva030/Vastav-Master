const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

//ROUTE 1: Get all the notes using: GET "/api/notes/fetchallnotes"  require auth i.e. login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  const notes = await Note.find({ user: req.user.id }); //fetching all notes
  res.json(notes);
});

//ROUTE 2: Add a new notes using POST: GET "/api/notes/addnote"  require auth i.e. login required
router.post("/addnote",
  fetchuser,
  [
    body("title", "Enter the title").isLength({ min: 3 }),
    body("description", "Description Must be atleast 6 character").isLength({
      min: 5,
    }),
  ],

  async (req, res) => {

    try {
      const { title, tag, description } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//ROUTE 3:Update an existing Note using: PUT "/api/notes/updatenote".Login Required
//Commonly put is used for the updation
router.put("/updatenote/:id",fetchuser, async (req, res) => {
 const {title,description,tag}=req.body;//taking parameters from the body
    const newNote={}; //new object created
    if(title){
      newNote.title=title; //if title exist then store it
    }
    if(description){
      newNote.description=description; //if description exist then store it
    }
    if(tag){
      newNote.tag=tag; //if tag exist then store it
    }

    //find the note to be updated and update it
    let note=await Note.findById(req.params.id);  //fetching Note using id and req.params.id gives "id"
    
    //if note is not exists then
     if(!note){
       return res.status(404).send("Not found");
     }

   //checking is the user same as that of req.user?
    if(note.user.toString()!==req.user.id)   //this match the id send by note.user.toString() with the original one
     //this means one user wants to access the data of another user
     {
      return res.status(401).send("Not Allowed");
     }
     
     note=await Note.findByIdAndUpdate(req.params.id, {$set:newNote},{new:true}); //this will update the note
     res.json({note});
   
    })

//ROUTE 4:Delete an existing Note using: DELETE "/api/notes/deletenote".Login Required
//Commonly delete is used for the deletion
router.delete("/deletenote/:id",fetchuser, async (req, res) => {
  try {
    //find the note to be deleted and delete it
    let note=await Note.findById(req.params.id);  //fetching Note using id and req.params.id gives "id"
    
    //if note is not exists then
     if(!note){
       return res.status(404).send("Not found");
     }
   //Allow deletion only if user owns this Note
   //checking is the user same as that of req.user?
    if(note.user.toString()!==req.user.id)   //this match the id send by note.user.toString() with the original one
     //this means one user wants to access the data of another user
     {
      return res.status(401).send("Not Allowed");
     }
     
     note=await Note.findByIdAndDelete(req.params.id);
     res.json({"Success":"Note has been deleted"})
    }
   catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
}
 )
module.exports = router;
