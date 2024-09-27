const express = require("express")
const cors = require("cors")
const pool = require("./database")
const { text } = require("body-parser")

const app = express()

app.use(express.json())
app.use(cors())

app.post("/adduser", (req,res) => {

    const { institution_name, student_branch,student_sem  } = req.body;
    const { num_students, num_faculty } = req.body;
    const { name, position, email, mobile} = req.body;
    const { campus = [], ipr_time = null, fcipt_time = null, visit_date, visit_time, materials = [], email_visitor} = req.body;

    const formattedVisitDate = visit_date || new Date().toISOString().split('T')[0]; // Use today's date if undefined
    const formattedVisitTime = visit_time || "00:00"; // Default time if undefined
    const formattedCampus = Array.isArray(campus) ? `{"${campus.join('","')}"}` : '{}';
    const formattedMaterials = Array.isArray(materials) ? `{"${materials.join('","')}"}` : '{}';
    

    const insertSTMT  = `INSERT INTO iprformpage2 (institution_name, student_branch, student_sem) VALUES ('${institution_name}' , '${student_branch}' , '${student_sem}' );`;

    const insertST = `INSERT INTO ipr_visits (num_students,num_faculty) VALUES ('${num_students}' , '${num_faculty}');`;

    const insertgroupinchargestmt = `INSERT INTO ipr_groupincharge (name, position, email, mobile) VALUES ('${name}' , '${position}' , '${email}' , '${mobile}');`;

    const insertiprscientificvisitSTMT = `INSERT INTO iprscientificvisitform (campus, ipr_time, fcipt_time, visit_date, visit_time, materials, email) VALUES ('${formattedCampus}' , '${ipr_time}' , '${fcipt_time}' , '${formattedVisitDate}' ,'${formattedVisitTime}' , '${formattedMaterials}', '${email_visitor}');`;

    pool.query(insertSTMT).then((response)=>{
        console.log("Data Saved");
        console.log(response);
    }).catch((err)=>{
        console.log(err);
    });

    pool.query(insertST).then((response)=>{
        console.log("Data Saved");
        console.log(response);
    }).catch((err)=>{
        console.log(err);
    });

    pool.query(insertgroupinchargestmt).then((response)=>{
        console.log("Data Saved");
        console.log(response);
    }).catch((err)=>{
        console.log(err);
    });

    pool.query(insertiprscientificvisitSTMT).then((response)=>{
        console.log("Data Saved");
        console.log(response);
    }).catch((err)=>{
        console.log(err);
    });

    console.log(req.body)
    res.send("Response Recieved: " + req.body)
})

app.listen(4000, ()=>console.log("server on localhost :4000"))