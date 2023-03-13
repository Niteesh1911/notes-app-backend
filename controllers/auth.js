const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const client = require("../configs/DB");

// const temporaryData = [
//     {
//         name : "nit",
//         email : "nit@gmail.com",
//         password : "123456",
//     },

//     {
//         name : "dikki",
//         email : "dikki@gmail.com",
//         password: "123456",
//     },

//     {
//        name:"venu",
//        email : "venu@gmail.com",
//        password: "123456",

//     },
// ];

exports.signUp = (req, res) => {
  //complete signUp

  const { name, email, password } = req.body;
  console.log("----------------------",name, " ", email, " ", password);

  //   const isValid = temporaryData.findIndex((ele) =>  (ele.email === email));

  client
    .query(`SELECT * FROM users where email = '${email}';`)
    .then((data) => {
      isValid = data.rows;

      if (isValid.length != 0) {
        res.status(400).json({
          error: "user already exists.",
        });
      } else {
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) {
            res.status(500).json({
              error: "Internal server error.",
            });
          }
          const user = {
            name,
            email,
            password: hash,
          };

          // temporaryData.push(user);
          client
            .query(
              `INSERT INTO users(name , email , password) VALUES('${user.name}','${user.email}','${user.password}');`
            )
            .then((data) => {
              console.log(data);
              const token = jwt.sign(
                {
                  email: email,
                },
                process.env.SECRET_KEY
              );
              res.status(200).json({
                message: "user added successfully to the DB",
                token: token,
              });
            })
            .catch((err) => {
              res.status(500).json({
                error: "database error",
              });
            });
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: "database error",
      });
    });
};

exports.signIn = (req, res) => {
  const { email, password } = req.body;

  client
    .query(`SELECT * FROM users where email = '${email}';`)
    .then((data) => {
      userData = data.rows;

      if (userData.length === 0) {
        res.status(400).json({
          error: "user dosen't exist please sign up.",
        });
      } else {
        bcrypt.compare(password, userData[0].password, (err, result) => {
          if (err) {
            res.status(500).json({
              error: "error occured",
            });
          } else if (result === true) {
            const token = jwt.sign(
              {
                email: email,
              },
              process.env.SECRET_KEY
            );

            res.status(200).json({
              message: "signed in successfully",
              token: token,
            });
          } else {
            res.status(400).json({
              error: "Incorrect password",
            });
          }
        });
    }
    })
    .catch((err) => {
      res.status(500).json({
        error: "database error",
      });
    });
};
