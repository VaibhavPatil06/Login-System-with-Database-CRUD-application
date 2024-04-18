import express from "express";
import bodyParser from "body-parser";
import mysql from "mysql";

var mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "user_register",
});

mysqlConnection.connect((err) => {
  if (!err) console.log("DB connection succeeded");
  else
    console.log(
      "DB connection failed \n Error :" + JSON.stringify(err, undefined, 2)
    );
});
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view-engine", "ejs");

app.get("/", (req, res) => {
  res.render("login.ejs");
});
app.get("/register", (req, res) => {
  res.render("register.ejs");
});
app.post("/register", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const mobile_no = req.body.mobile_no;
  let sql = `INSERT INTO LOGIN (name, mobile_no, email, password) VALUES("${name}", "${mobile_no}", "${email}", "${password}") `;
  let query = mysqlConnection.query(sql, (err, rows, fields) => {
    if (!err) {
      res.status(200);
    } else {
      console.log(err);
    }
  });

  res.render("login.ejs");
});

app.post("/submit", (req, res) => {
  let sql = `Select * from LOGIN where name = '${req.body.username}'`;
  let query = mysqlConnection.query(sql, (err, rows, fields) => {
    if (!err) {
      if (rows.length > 0) {
        // Assuming you're checking for a single user with the provided username
        const user = rows[0];
        console.log(user);
        const name = user.name;
        const pass = user.password;

        if (req.body.username === name && req.body.password === pass) {
          res.render("home.ejs", { name: req.body.username });
        } else {
          console.log("Incorrect username or password");
          // Handle invalid login credentials
        }
      } else {
        console.log("No user found");
        // Handle case where no user exists
      }
    } else {
      console.log(err);
    }
  });
});
app.get("/forget", function (req, res) {
  res.render("forget_pass.ejs");
});

app.post("/forget", function (req, res) {
  let sql = `SELECT * FROM LOGIN WHERE mobile_no = "${req.body.mobile_no}"`;
  mysqlConnection.query(sql, (err, rows, fields) => {
    if (!err) {
      if (rows.length > 0) {
        const user = rows[0];
        const mob = user.mobile_no;
        let sql1 = `UPDATE LOGIN SET password = "${req.body.password}" WHERE mobile_no = "${mob}"`;
        mysqlConnection.query(sql1, (err, result) => {
          if (!err) {
            console.log("Password updated successfully");
            // Handle success
          } else {
            console.error("Error updating password:", err);
            // Handle error
          }
        });
      } else {
        console.log("User with the provided mobile number not found");
        // Handle case where user is not found
      }
    } else {
      console.log("Error querying database:", err);
      // Handle error
    }
  });
});
app.post("/change", function (req, res) {
  let sql = `SELECT * FROM LOGIN WHERE password = "${req.body.currentpassword}"`;
  mysqlConnection.query(sql, (err, rows, fields) => {
    if (!err) {
      if (rows.length > 0) {
        const user = rows[0];
        const userId = user.id; // Assuming there's an id field in your LOGIN table
        let sql1 = `UPDATE LOGIN SET password = "${req.body.newPassword}" WHERE password = "${req.body.currentpassword}"`;
        mysqlConnection.query(sql1, (err, result) => {
          if (!err) {
            console.log("Password updated successfully");
            // Handle success
          } else {
            console.error("Error updating password:", err);
            // Handle error
          }
        });
      } else {
        console.log("User with the provided current password not found");
        // Handle case where user is not found
      }
    } else {
      console.log("Error querying database:", err);
      // Handle error
    }
  });
});

app.listen(port, () => {
  console.log("port is running");
});
