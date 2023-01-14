/* comment */
/*
console.log('**************************************************************************************');
console.log('*      ========= secret-shore-85438 ========                                         *');
console.log('*      ========= postgresql-perpendicular-72828 using connection string ========     *');       
console.log('*                                                                                    *');
console.log('*                                                                                    *');
console.log('**************************************************************************************');
/*******/
const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 5000;
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var url = require('url');
var cors = require('cors');
//var emailjs = require('emailjs');
//var nodemailer = require('nodemailer');
var router = express.Router();
const querystring = require('querystring'); 
var cookieSession = require('cookie-session'); 
//=================================================================================================
//connect to data base -  postgresql-polished-17783 using connection string
const { Pool } = require('pg');
const pool = new Pool(
{
connectionString: process.env.DATABASE_URL,
ssl: {
  rejectUnauthorized: false
}
}
);
//=================================================================================================
// show connection string in server log
//console.log('************** db conn string ************** ' + process.env.DATABASE_URL);
//=================================================================================================

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.get('/', (req, res) => res.render('pages/index'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())
//=================================================================================================
// Routes
//=================================================================================================
//
//=================================================================================================
// this is the /chess route 
//=================================================================================================
app.get('/chess', async (req, res) => {
  console.log('/ route');
  const client = await pool.connect();
  //-------------------------------------------------------------------------------------
  text = 'SELECT * FROM table01 WHERE id = $1'
  values = ['1']
  //-------------------------------------------------------------------------------------
  try {
  const result = await client.query(text,values);
  const results = { 'results': (result) ? result.rows : null};
  console.log("===> results: " + JSON.stringify(results));
  console.log(results.results[0].id);
  var result_id = (results.results[0].id);
  res.render('pages/game' , results);
  client.release();
  } catch (err) {
 console.error('Error ' + err);
 res.send("Error " + err)
  }
})


/*
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  
  .get('/db', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM test_table');
      const results = { 'results': (result) ? result.rows : null};
      res.render('pages/db', results );
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  
  */
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
