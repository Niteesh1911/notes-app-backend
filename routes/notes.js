const express = require("express");
const { addNote, deleteNotes} = require("../controllers/notes");
const { getAllNotes , updateNotes} = require("../controllers/notes");
const { verifyToken } = require("../middleware/authmiddleware");
const { handlenoteIdParam } = require("../middleware/notemiddleware");
const router = express.Router();

router.param("noteid" ,handlenoteIdParam);


router.post("/add",verifyToken,addNote );
router.get("/getallnotes", verifyToken,getAllNotes);
router.put("/update/:noteid",verifyToken,updateNotes );
router.delete("/delete/:noteid",verifyToken,deleteNotes ); 



module.exports = router;

// localhost:8000/auth/signin
// localhost:8000/auth/signup 