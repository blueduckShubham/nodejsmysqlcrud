const express = require("express");
const app = express();
const port = 3308
const mysql = require("./connection").con
// configuration
app.set("view engine", "hbs");
app.set("views", "./view")
app.use(express.static(__dirname + "/public"))

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Parse JSON request bodies

// app.use(express.urlencoded())
// app.use(express.json())
// Routing
app.get("/", (req, res) => {
  res.render("index")
});
app.get("/add", (req, res) => {
  res.render("add")

});
app.get("/search", (req, res) => {
  res.render("search")

});
app.get("/update", (req, res) => {
  res.render("update")

});

app.get("/delete", (req, res) => {
  res.render("delete")

});

app.get("/getStudents", (req, res) => {
  // Set the response header to indicate JSON content
  res.setHeader('Content-Type', 'application/json');

  let qry = "select * from test ";
  mysql.query(qry, (err, results) => {
    if (err) {
      res.status(500).send('Internal Server Error');
      return;
    }

     // Extract the array of students from the results
     const students = results.map(result => {
      console.log(result)
      return {
        name: result.name,
        phone: result.phoneno,
        email: result.emailid,
        gender: result.gender
      };
    });

    // Send the JSON response
    res.json(students);
  });
})


app.get("/getStudent", (req, res) => {
  // Set the response header to indicate JSON content
  res.setHeader('Content-Type', 'application/json');

  const email = req.query.email;
  console.log("fdfsdfs")
  console.log(email)
  const query = 'SELECT * FROM test WHERE emailid = ?';

  mysql.query(query, [email], (err, results) => {
    if (err) {
      console.error('Error executing the query: ', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ message: 'Student not found' });
      return;
    }

    const student = results[0];
    res.json({ data: student });
  });
})


app.get("/view", (req, res) => {
  let qry = "select * from test ";
  mysql.query(qry, (err, results) => {
    if (err) throw err
    else {
      res.render("view", { data: results });
    }

  });

});


app.post("/addstudent", (req, res) => {
  // fetching data from form

  const { name, phone, email, gender } = req.body;

  // Sanitization XSS...
  let qry = "select * from test where emailid=? or phoneno=?";
  mysql.query(qry, [email, phone], (err, results) => {
    if (err)
      throw err
    else {

      if (results.length > 0) {
        res.render("add", { checkmesg: true })
      } else {

        // insert query
        let qry2 = "insert into test values(?,?,?,?)";
        mysql.query(qry2, [name, phone, email, gender], (err, results) => {

          if (err) {
            console.log("sfdsfdfd")
            console.log(err.message)
            throw err;
          } else {
            if(results.affectedRows > 0) {
              res.render("add", { mesg: true })
            }
          }
        })
      }
    }
  })
});


app.get("/searchstudent", (req, res) => {
  // fetch data from the form


  const { phone } = req.query;

  let qry = "select * from test where phoneno=?";
  mysql.query(qry, [phone], (err, results) => {
    if (err) throw err
    else {
      if (results.length > 0) {
        res.render("search", { mesg1: true, mesg2: false })
      } else {

        res.render("search", { mesg1: false, mesg2: true })

      }

    }
  });
})

app.get("/updatesearch", (req, res) => {

  const { phone } = req.query;

  let qry = "select * from test where phoneno=?";
  mysql.query(qry, [phone], (err, results) => {
    if (err) throw err
    else {
      if (results.length > 0) {
        res.render("update", { mesg1: true, mesg2: false, data: results })
      } else {

        res.render("update", { mesg1: false, mesg2: true })

      }

    }
  });
})
app.get("/updatestudent", (req, res) => {
  // fetch data

  const { phone, name, gender } = req.query;
  let qry = "update test set username=?, gender=? where phoneno=?";

  mysql.query(qry, [name, gender, phone], (err, results) => {
    if (err) throw err
    else {
      if (results.affectedRows > 0) {
        res.render("update", { umesg: true })
      }
    }
  })

});

app.get("/removestudent", (req, res) => {

  // fetch data from the form


  const { phone } = req.query;
  console.log(phone)

  let qry = "delete from test where phoneno=?";
  mysql.query(qry, [phone], (err, results) => {
    if (err) throw err
    else {
      if (results.affectedRows > 0) {
        res.render("delete", { mesg1: true, mesg2: false })
      } else {

        res.render("delete", { mesg1: false, mesg2: true })

      }

    }
  });
});


//Create Server
app.listen(port, (err) => {
  if (err)
    throw err
  else
    console.log("Server is running at port %d:", port);
});



