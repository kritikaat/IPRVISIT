const { response } = require("express");
const {Pool} = require("pg")

const pool = new Pool({
    user: "postgres",
    password: "kri22tika",
    host: "localhost",
    port: 5432,
    database: "visitor_info"
});

const createtblquery = `CREATE TABLE IPRScientificVisitForm (
    id SERIAL PRIMARY KEY,
    campus TEXT[],
    ipr_time VARCHAR(50),
    fcipt_time VARCHAR(50),
    visit_date DATE,
    visit_time TIME,
    materials TEXT[],
    email VARCHAR(100)
);`

pool.query (createtblquery).then((response)=>{
    console.log(response);
}).catch((err)=>{
    console.log(err);
});

module.exports = pool;