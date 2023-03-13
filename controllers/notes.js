const client = require("../configs/DB");

exports.addNote = (req, res) => {
  const { heading, content } = req.body;
  console.log(req);
  client
    .query(
      `iNSERT INTO notes(email,heading,content) VALUES ('${req.email}', '${heading}','${content}');`
    )

    .then((data) => {
      res.status(200).json({
        message: "Notes added successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Database error occured",
      });
    });
};

exports.getAllNotes = (req, res) => {
  client
    .query(`SELECT * FROM notes WHERE email = '${req.email}';`)
    .then((data) => {
      const noteData = data.rows;
      const filteredData = noteData.map((note) => {
        return {
          noteId: note.noteid,
          heading: note.heading,
          content: note.content,
        };
      });
      console.log(filteredData);

      res.status(200).json({
        message: "Notes loaded successfully",
        data: filteredData,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Database error occured",
      });
    });
};

exports.updateNotes = (req, res) => {
  const noteId = req.params.noteid;
  const { heading, content } = req.body;
  console.log(heading, content, noteId);
  client
    .query(
      `UPDATE notes SET heading ='${heading}', content = '${content}' WHERE noteid = '${noteId}';`
    )
    .then((data) => {
      res.status(200).json({
        message: "data updated successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "database error occured",
      });
    });
};

exports.deleteNotes = (req, res) => {
  const noteId = req.noteid;
  client.query(`DELETE FROM notes WHERE noteid = '${noteId}';`
  )
  .then((data) => {
    res.status(200).json({
      message: "Notes deleted successfully",
    });
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json({
      message: "database error occured",
    });
  });
};

exports.getnotes = (req ,res) =>{
  const noteId = req.params.noteid;
  client
  .query(`SELECT * FROM notes WHERE email = '${noteId}';`)
  .then((data) => {
    const noteData = data.rows;
    const filteredData = noteData.map((note) => {
      return {
        noteId: note.noteid,
        heading: note.heading,
        content: note.content,
      };
    });
    console.log(filteredData);

    res.status(200).json({
      message: "Notes loaded successfully",
      data: filteredData,
    });
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json({
      message: "Database error occured",
    });
  });

}