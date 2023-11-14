console.log('**************************************************************************************');
console.log('*      ========= secret-shore-85438 ========                                         *');
console.log('*      ========= postgresql-perpendicular-72828 using connection string ========     *');       
console.log('*      ==== USES chess_table =====                                                   *');
console.log('*                                                    xx        YY                    *');
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

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())
//=================================================================================================
// Routes
//=================================================================================================
// was //this is the / route 
// was //app.get('/', (req, res) => res.render('pages/index'))
//=================================================================================================
//=================================================================================================
//  this is the / route  NEW NEW 
//=================================================================================================
// when the app is opened we see if a cookie named 'playerid' was sent
// if it was NOT we send one which will persist so next time we will skip the
// writing of a new one
//=================================================================================================
app.get('/', (req, res) => {
  console.log('**** / route ****')
  let randomid = makeid(5);
  console.log('randomid = ' + randomid)
  // read cookies
  console.log('********* COOKIE TEST *************');
  console.log('**** req cookies ****' + JSON.stringify(req.cookies));
  console.log('**** req query **** ' + req.query.p1) 
  
  var pid_cookie = req.cookies.playerid;

  console.log('playerid cookie = ' +pid_cookie);

  var io_cookie = req.cookies.io;

  console.log(io_cookie);

  let options = {
      maxAge: 1000 * 60 * 576000 // would expire after 400 days (576000 minutes)
      //httpOnly: true, // The cookie only accessible by the web server
      //signed: true // Indicates if the cookie should be signed
  }

  // Set cookie

  function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijklmnpqrstuvwxyz23456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}
if (!pid_cookie) {
  console.log('no pid cookie sent from client so we send ' + randomid + ' one to client')
  res.cookie('playerid', randomid, options) // options is optional
} 
  console.log('render index.ejs')
  res.render('pages/index')
  

})

// NEW NEW //





//=================================================================================================
// MAIN ENTRY POINT
// this is the / route which loads the game.ejs page ..
//=================================================================================================
app.get('/chess', async (req, res) => {
  console.log('/chess route');
  const client = await pool.connect();
  //-------------------------------------------------------------------------------------
  text = 'SELECT * FROM chess_table WHERE id = $1'
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
//=================================================================================================
// MAIN ENTRY POINT
// this is the /chessw route which loads the game_w.ejs page ..
//=================================================================================================
app.get('/chessw', async (req, res) => {
  console.log('/chessw route');
  const client = await pool.connect();
  //-------------------------------------------------------------------------------------
  text = 'SELECT * FROM chess_table WHERE id = $1'
  values = ['1']
  //-------------------------------------------------------------------------------------
  try {
  const result = await client.query(text,values);
  const results = { 'results': (result) ? result.rows : null};
  console.log("===> results: " + JSON.stringify(results));
  console.log(results.results[0].id);
  var result_id = (results.results[0].id);
  res.render('pages/game_w' , results);
  client.release();
  } catch (err) {
 console.error('Error ' + err);
 res.send("Error " + err)
  }
})
//=================================================================================================
// MAIN ENTRY POINT
// this is the /chessb route which loads the game_b.ejs page ..
//=================================================================================================
app.get('/chessb', async (req, res) => {
  console.log('/chessb route');
  const client = await pool.connect();
  //-------------------------------------------------------------------------------------
  text = 'SELECT * FROM chess_table WHERE id = $1'
  values = ['1']
  //-------------------------------------------------------------------------------------
  try {
  const result = await client.query(text,values);
  const results = { 'results': (result) ? result.rows : null};
  console.log("===> results: " + JSON.stringify(results));
  console.log(results.results[0].id);
  var result_id = (results.results[0].id);
  res.render('pages/game_b' , results);
  client.release();
  } catch (err) {
 console.error('Error ' + err);
 res.send("Error " + err)
  }
})

//=================================================================================================
// this is the /api route NO CHANGES NEEDED TO INTEGRATE GENTLE CAVERNS
//=================================================================================================
app.get('/api', (req, res) => {
  console.log('***** .all/api route -*****');
  res.render('pages/api');
  res.end;
})
//=================================================================================================
// this is the /apiworking route NO CHANGES NEEDED TO INTEGRATE GENTLE CAVERNS
//=================================================================================================
app.get('/apiworking', (req, res) => {
  console.log('***** .all/api route -*****');
  res.render('pages/api-working');
  res.end;
})

//===================================================================================================
// /testpost' route NO CHANGES NEEDED TO INTEGRATE GENTLE CAVERN
//===================================================================================================
 app.post('/testpost', async (req, res) => {

  console.log('++++++++++++++++++++++++++++++>oOOOo<+++++++++++++++++++++++++++++++++++++++++++++');
  console.log('**************testpost   TEST TEST TEST       Sand Box           *****************');
  console.log('++++++++++++++++++++++++++++++>oOOOo<+++++++++++++++++++++++++++++++++++++++++++++');

  console.log('req.body ' + JSON.stringify(req.body));
  var reqStr = JSON.stringify(req.body);
  console.log('reqStr ' + reqStr);
  var reqObj = JSON.parse(reqStr);
  //var reqObj = JSON.parse(JSON.stringify(req.body));
  console.log('reqObj ' + reqObj);
  console.log('reqObj.employees ' + reqObj.employees);
  console.log(' employee 1 : ' + reqObj.employees[0].firstName)
  console.log(' employee 2 : ' + reqObj.employees[1].firstName)
  console.log(' employee 3 : ' + reqObj.employees[2].firstName)

  myTime();

  //=====================================
  function addZero(x,n) {
    while (x.toString().length < n) {
      x = "0" + x;
    }
    return x;
  }
  
  function myTime() {
    var d = new Date();
    var h = addZero(d.getUTCHours(), 2);
    var m = addZero(d.getUTCMinutes(), 2);
    var s = addZero(d.getUTCSeconds(), 2);
    var ms = addZero(d.getUTCMilliseconds(), 3);
    var timeStamp = h + ":" + m + ":" + s + ":" + ms;
    //=============================================

  

 var employeeText = {
    "employees":[
      {"firstName":"John", "lastName":"Doe"},
      {"firstName":"Anna", "lastName":"Smith"},
      {"firstName":"Peter", "lastName":"Jones"}
    ]
  }

  //resObj = JSON.parse(JSON.stringify(reqObj));
  //console.log('resObj.name ' + resObj.name );
  //res.json(resObj.employees[0]);
  //res.send('delimiter written in server log');
  //res.json(resObj.name);

  //var resObj = employees;

  //res.send('server says POST complete' + timeStamp);
  res.json(employeeText);
  }

 })

//====================================================================================================================

//===================================================================================================================
//  /dbread to read row id=1 for the board index NO CHANGES NEEDED TO INTEGRATE GENTLE CAVERN
//===================================================================================================================
app.post('/dbread', async (req, res) => {
  console.log('/dbread entered');
  strJSON = JSON.stringify(req.body);
  var reqObj  = JSON.parse(strJSON);
  var row_id   = reqObj.row_id;
  try
  {
  const client = await pool.connect()  	    
  var query = 
  {
  // give the query a unique name
  name: 'read-board-index',
  text: "SELECT * FROM chess_table WHERE id = $1",
  values: [row_id],
  }   
  
  await client.query(query, (err, res) => {
  if (err)  {;
  console.log(err.stack)
  } else {
  
  if(typeof res.rows[0] !== "undefined")
  {
  console.log('Hi. Variable is good !!! '); 
  var resObj = JSON.parse(JSON.stringify(res.rows[0]));
  const resultsMod = {results : [resObj] };
  resObjMod = JSON.parse(JSON.stringify(resultsMod));
  respondToClient(0);
  } else {
  respondToClient(-1);
  }
  }
  })
  
  //callback code is run when the data base 
  //returns the results from the query
  
  console.log(' callback code');
  const results = { 'results': (res) ? res.rows : null};    
  client.release();
  function respondToClient(qstatus) {
  if (qstatus == 0) {
  res.json(resObjMod);
  } else {
  res.send('nomatch');
  }	   
  }
  }
  catch (err) 
  {
  console.error(err);
  res.send("Error-2 " + err);
  }
  })

//=================================================================================================
//  .post('/updbim')
//  this will modify an existing row NO CHANGES NEEDED TO INTEGRATE GENTLE CAVERN
//=================================================================================================
app.post('/updbim', async (req, res) => {
  try {
  console.log("1 req data from client" + JSON.stringify(req.body));
  var strJSON = JSON.stringify(req.body);
  var reqObj = JSON.parse(strJSON);
  console.log('2 *** update row   *** '  + reqObj.row_id);
  console.log('3a *** update data  *** ' + reqObj.row_data1);
  console.log('3b *** update next  *** ' + reqObj.row_saver_uid);
  var row_id = reqObj.row_id;
  var row_data1 = reqObj.row_data1;
  var row_saver_uid = reqObj.row_saver_uid;
  const client = await pool.connect()
  
  //=================================================================================================
  // We are now connected to the Database so send a query using parameterized prepared query
  //=================================================================================================
  var query = {
  //give the query a unique name
  name: 'upd-bim',
  text: "UPDATE chess_table SET board_image = $2, saver_uid = $3  WHERE id = $1",
  values: [row_id, row_data1, row_saver_uid]
  }
  // callback
  await client.query(query, (err, res) => {
  if (err) {
  console.log(err.stack)
  } else {
  console.log('db update OK');
  }
  })
  const results = { 'results': (res) ? res.rows : null};
  console.log('****** results  *************');
  var strJSON = JSON.stringify(results)
  console.log('results ' + strJSON);
  res.send(results);
  res.end()
  client.release();
  }  catch (err) {
  console.error(err);
  res.send("Error " + err);
  }
  })

//===================================================================================================================
// /chat NO CHANGES NEEDED TO INTEGRATE GENTLE CAVERN
//===================================================================================================================
// here is where we come in with /chat request
app.get('/chat', (req, res) => {
  console.log('*************** Chat Route Called ***************');
  res.render('pages/chat');
  res.end;
  })

//===================================================================================================================
// /brchat NO CHANGES NEEDED TO INTEGRATE GENTLE CAVERN
//===================================================================================================================
// here is where we come in with /brchat request
app.get('/brchat', (req, res) => {
  console.log('*************** brchat Route Called ***************');
  res.render('pages/browser_chat');
  console.log('*************** after render ***************');
  res.end;
  })

//========================================================================================================================================
// ROUTE POST /writelog ... call function  writelog() - log each move when user presses save
// DELETE FROM logtable WHERE id>0;
// SELECT setval('usertable_1_id_seq', 1);
// NO CHANGES NEEDED TO INTEGRATE GENTLE CAVERN
//========================================================================================================================================  
app.post('/writelog', async (req, res) => {
  console.log('==> /writelog');
//---------------------------------------
  var strJSON = JSON.stringify(req.body);
  var reqObj = JSON.parse(strJSON);
  var log_tod      = reqObj.log_tod;
  var log_uname    = reqObj.log_uname;
  var log_bi       = reqObj.log_bi;
  var log_hi       = reqObj.log_hi;
  var log_gvars    = reqObj.log_gvars;
  var log_ucolour  = reqObj.log_ucolour;
//----------------------------------------
  console.log('log_tod: '     + log_tod)
  console.log('log_uname: '   + log_uname)
  console.log('log_bi: '      + log_bi)
  console.log('log_hi: '      + log_hi)
  console.log('log_gvars: '   + log_gvars)
  console.log('log_ucolour: ' + log_ucolour)
//---------------------------------------------------------------------
// call the function...
//---------------------------------------------------------------------
  writelog(log_tod,log_uname,log_bi,log_hi,log_gvars,log_ucolour)
  .then((results) => {
  res.json(results);
  res.end();
  })
//-----------------------------------------------------------------------  
  }) 
//========================================================================================================
// FUNCTIONS
//=======================================================================================================

//=================================================================================================
// writelog()  ...  insert a new row for each move - 6 columns NO CHANGES NEEDED TO INTEGRATE GENTLE CAVERN
//=================================================================================================
async function writelog(log_tod,log_uname,log_bi,log_hi,log_gvars,log_ucolour) {
  console.log('==> writelog()')
  const client = await pool.connect();
  var doUpdate    = 0;
  console.log('INSERT a new row in the logtable')
  //-------------------------------------------------------------------------------------------------
  text = 'INSERT INTO logtable(log_tod,log_uname,log_bi,log_hi,log_gvars,log_ucolour) VALUES($1,$2,$3,$4,$5,$6) RETURNING *'
  values = [log_tod,log_uname,log_bi,log_hi,log_gvars,log_ucolour]
  //-------------------------------------------------------------------------------------------------
  try {
  const res1 = await client.query(text, values)
  let results = res1.rows[0]
  console.log('<== writelog() INSERT')
  return results;
  }
  catch (err) {
  console.log(err.stack)
  var insertError = err;
  var errType = err.constraint;
  console.log('err type 1 ' + errType);
  console.log(insertError);
  
  // check if INSERT error was 'duplicate userkey'
  // if so set doUpdate flag to 1
  // and do UPDATE instead of INSERT
  
  if (errType == 'userkey_unique_constraint')  {
  console.log('duplicate key');
  doUpdate = 1;
  } else {
  // we had some unexpected error so send client a message and quit
  console.log('err type 2 ' + errType);
  console.log(insertError);
  }
  }
  //------------------------------------ end of INSERT code ---------------------------------   
  if (doUpdate == 1) {
  console.log('Duplicate key so do UPDATE instead of INSERT')
  //-----------------------------------------------------------------------------------------------------------------
  text = 'UPDATE usertable SET username=$2 WHERE userkey=$1 RETURNING *'
  values = [logkey,logdate]
  //-----------------------------------------------------------------------------------------------------------------
  try {
  const res2 = await client.query(text, values)
  let results = res2.rows[0]
  console.log('<== writelog() UPDATE')
  return results;
  }
  catch (err) {
  console.log(err.stack);
  }
  }
  }
  //====================================================================================================================
  //  .get('/writeLogDelimiter')
  //  put a line in the server log NO CHANGES NEEDED TO INTEGRATE GENTLE CAVERN
  //====================================================================================================================
  app.get('/writelogdelimiter', async (req, res) => {
    console.log('+++---+++---+++---+++---+++--->oOOOo<+++---+++---+++---+++---+++---+++---+++---+++');
     // read cookies
   console.log('********* COOKIE TEST *************');	
   console.log('**** req cookies ****' + JSON.stringify(req.cookies));
   console.log('**** req query **** ' + req.query.p1)  
    res.send('delimiter written in server log'); 
  })

  //====================================================================================================================
  //  .get('/getcookies')
  //  NO CHANGES NEEDED TO INTEGRATE GENTLE CAVERN
  //====================================================================================================================
  app.get('/getcookies', async (req, res) => {
     // read cookies
   console.log('********* GET COOKIES *************');	
   console.log('**** req cookies ****' + JSON.stringify(req.cookies));
   var player_cookie = req.cookies.playerid
  res.send('get cookies sent this... ' + 'playerid = ' + player_cookie); 
  })  

  //====================================================================================================================
  //  .post('/login')
  //  NO CHANGES NEEDED TO INTEGRATE GENTLE CAVERN
  //====================================================================================================================
  app.post('/login', async (req, res) => {
    // login
  console.log('********* LOGIN *************');	

   res.send('login routine sent this...'); 
 })  

//=================================================================================================================
// *** This is going to be the model entry point for all data base queries from the client
//=================================================================================================================
// *** parameterised query code is based on https://node-postgres.com/features/queries
//=================================================================================================================
// NO CHANGES NEEDED TO INTEGRATE GENTLE CAVERN
//
app.post('/dbquerytest', async (req, res) => {
  console.log('***** /dbquerytest route *****');
  //======== connect to data base ===========
  console.log('wait db connect');
  const client = await pool.connect();
  //=========================================
  strJSON = JSON.stringify(req.body);
  console.log('****** /dbquerytest posted ******')
  console.log('****** request object from client ' + strJSON);
  //=========================================
  var reqObj     = JSON.parse(strJSON);
  var q_type     = reqObj.q_type;
  var table_name = reqObj.table_name;
  var row_id     = reqObj.row_id;
  var col_name   = reqObj.col_name;
  var col_data   = reqObj.col_data;
  var q_type     = reqObj.q_type;
  var row_data   = reqObj.row_data;
  var rskey      = reqObj.rskey;
  var rsvalue    = reqObj.rsvalue;
  //===========================================
  console.log('****** table_name '   + table_name);
  console.log('****** row_id '       + row_id);
  console.log('****** col_name '     + col_name);
  console.log('****** col_data '     + col_data);
  console.log('****** q_type '       + q_type);
  console.log('***** row_data '      + row_data);
  console.log('***** rskey '         + rskey);
  console.log('***** rsvalue '       + rsvalue);
  //============================================
  
  switch (table_name) {
  case "chess2": {
  console.log('case chess2 ' + table_name +  ' matched case chess2');

  switch (q_type) {         
  case "insert": 
  console.log('case insert ' + q_type + ' matched case insert in table_name case chess2')
  break;
  case "select":
  console.log('case select ' + q_type + ' matched case select in table_name case chess2')
  break;
  case "update": 
  console.log('case update ' + q_type + ' matched case update in table_name case chess2')
  break;
  case "delete": 
  console.log('case delete' + q_type + ' matched case delete in table_name case chess2')  
  break;
  default: 
  console.log('q_type ' + q_type + ' not matched by any case in table_name case chess2');
  break;
  }
  
  }  // close switch q_type statement for chess2
  
  // }  //close switch table_name statement 
  
  switch (table_name) {
  case "rstable": 
  console.log('case rstable ' + table_name +  ' matched case rstable');
  switch (q_type) {           
  case "insert":
  console.log('case insert ' + q_type + ' matched case insert in table_name case rstable')
  break;
  
  default: 
  console.log('table_name not matched by any case');
  break;
  
  }    // close switch q_type statement for rstable
  
  }

  }  //close switch table_name statement 
  
  res.send('test complete');
  
  });  //close app.post /dbquery route code 


//=================================================================================================================
// *** This is going to be the model entry point for all data base queries from the client
//=========================================================================
// *** parameterised query code is based on https://node-postgres.com/features/queries
//=================================================================================================================
// NO CHANGES NEEDED TO INTEGRATE GENTLE CAVERN //
app.post('/dbquery', async (req, res) => {
  console.log('***** /dbquery route *****');
  //======== connect to data base =================================================================================
  console.log('wait db connect');
  const client = await pool.connect();
  //===============================================================================================================
  strJSON = JSON.stringify(req.body);
  console.log('****** /dbquery posted ******')
  console.log('****** request object from client ' + strJSON);
  //===============================================================================================================
  var reqObj     = JSON.parse(strJSON);
  var resObj     = "";
  var q_type     = reqObj.q_type;
  var table_name = reqObj.table_name;
  var row_id     = reqObj.row_id;
  var col_name   = reqObj.col_name;
  var col_data   = reqObj.col_data;
  var q_type     = reqObj.q_type;
  var row_data   = reqObj.row_data;
  var rskey      = reqObj.rskey;
  var rsvalue    = reqObj.rsvalue;
  var rstype     = reqObj.rstype;
  var doUpdate   = 0;
  //===============================================================================================================
  console.log('****** table_name '   + table_name);
  console.log('****** row_id '       + row_id);
  console.log('****** col_name '     + col_name);
  console.log('****** col_data '     + col_data);
  console.log('****** q_type '       + q_type);
  console.log('***** row_data '      + row_data);
  console.log('***** rskey '         + rskey);
  console.log('***** rsvalue '       + rsvalue);
  //console.log('***** resObj '      + resObj);
  console.log('****** rstype  '      +rstype);
  //===============================================================================================================
  if (q_type == "Qtype") {
  console.log('query type not sent by client')
  res.send('no query type selected')
  }
  
  
  //=====================================================================================================================
  
  switch (table_name) {
  //+++++++++++++++++ TABLE_NAME CASE 'CHESS2' START ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++  
  case "chess2":
  console.log('table_name matched by case chess2');
  
  switch (q_type) {         
  //+++++++++++++++++ Q_TYPE CASE 'INSERT' START +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  case "insert":
  
  console.log('case insert matched in table chess2')              //switch q_type within table chess2
  
  text = 'INSERT INTO chess2(id, game_state) VALUES($1, $2) RETURNING *'
  values = [row_id, col_data]
  
  // async/await
  try {
  const res = await client.query(text, values)
  console.log(res.rows[0])
  resObj = res.rows[0]
  console.log('***** resObj ***** ' + JSON.stringify(resObj))
  respondToClient(resObj);
  // res { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
  } catch (err) {
  console.log(err.stack)
  }
  
  // we have to use a function to get the resObj in scope for the res.json
  function respondToClient(qres) {
  console.log('***** resObj ***** ' + JSON.stringify(qres)) //diagnostic
  res.json(qres);  
  }
  break;
  //+++++++++++++++++ Q_TYPE CASE 'INSERT' END ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  
  //+++++++++++++++++ Q_TYPE CASE 'SELECT' START ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  case "select":
  text = 'SELECT * FROM chess2 WHERE id=$1'
  values = [row_id]
  console.log('*** q_type case select *** ')
  // async/await
  try {
  const res = await client.query(text, values)
  console.log(res.rows[0])
  resObj = res.rows[0]
  console.log('***** resObj ***** ' + JSON.stringify(resObj))
  respondToClient(resObj);
  // res { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
  } catch (err) {
  console.log(err.stack)
  }
  
  // we have to use a function to get the resObj in scope for the res.json
  function respondToClient(qres) {
  console.log('***** resObj ***** ' + JSON.stringify(qres)) //diagnostic
  res.json(qres);  
  }
  break;
  //+++++++++++++++++ Q_TYPE CASE 'SELECT' END ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //+++++++++++++++++ Q_TYPE CASE 'UPDATE' START ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  case "update":
  
  text = "UPDATE chess2 SET game_state = $2  WHERE id = $1",
  values = [row_id, row_data]
  
  // async/await
  try {
  const res = await client.query(text, values)
  console.log('****** res ' + res)
  resObj = res
  console.log('***** resObj ***** ' + JSON.stringify(resObj))
  respondToClient(resObj);
  // res { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
  } catch (err) {
  console.log(err.stack)
  }
  
  // we have to use a function to get the resObj in scope for the res.json
  function respondToClient(qres) {
  console.log('***** resObj ***** ' + JSON.stringify(qres)) //diagnostic
  res.json(qres);  
  }
  break;
  //+++++++++++++++++ Q_TYPE CASE 'UPDATE' END ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //+++++++++++++++++ Q_TYPE CASE 'DELETE' START ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  case "delete":
  text = 'DELETE FROM chess2 WHERE id=$1'
  values = [row_id]
  
  // async/await
  try {
  const res = await client.query(text, values)
  console.log(res.rows[0])
  resObj = res.rows[0]
  console.log('***** resObj ***** ' + JSON.stringify(resObj))
  respondToClient(resObj);
  // res { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
  } catch (err) {
  res.send("Errror " + err);
  console.error(err);
  res.end;
  }
  
  // we have to use a function to get the resObj in scope for the res.json
  function respondToClient(qres) {
  console.log('***** resObj ***** ' + JSON.stringify(qres)) //diagnostic
  res.json(qres);  
  }
  break;
  //+++++++++++++++++ Q_TYPE CASE 'DELETE' END ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  
  //+++++++++++++++++ Q_TYPE CASE 'DEFAULT' START +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  default:
  console.log('q_type not matched by any case');
  break;
  //+++++++++++++++++ Q_TYPE CASE 'DEFAULT' END +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  
  }    //close switch q_type statement
  
  }    // close switch table_name statement
  
  
  //+++++++++++++++++ TABLE_NAME CASE 'CHESS2' END ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  
  //+++++++++++++++++ TABLE_NAME CASE 'RSTABLE' START +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  switch (table_name) {
  case "rstable":
  console.log('table_name matched by case rstable');
  switch (q_type) {                          //switch q_type in table rstable
  case "insert":
  console.log('q_type matched by case insert');
  
  //================== this INSERT works if rskey does not exist ========================================================
  text = 'INSERT INTO rstable(rskey, rsvalue, rstype) VALUES($1, $2, $3) RETURNING *'
  values = [rskey , rsvalue, rstype]
  //=====================================================================================================================
  
  console.log('***** now execute the INSERT *****')
  
  // async/await
  try {
  const res = await client.query(text, values)
  console.log(res.rows[0])
  resObj = res.rows[0]
  console.log('1***** resObj ***** ' + JSON.stringify(resObj))
  console.log('INSERT was ok 1');
  respondToClient(resObj);
  console.log('INSERT was ok 2');
  }
  catch (err) {
  console.log(err.stack)
  var insertError = err;
  var errType = err.constraint;
  console.log('err type 1 ' + errType);
  console.log(insertError);
  // the rskey column has a unique contstrain so if user tries to insert
  // a key that's already been used you get an error
  // so we will log it in the server log but we will not send a response because we
  // need to keep this connection to the client 
  // and we will next try an UPDATE to the rsvalue for the existing rskey row
  
  if (errType == 'unique_constraint')  {
  console.log('duplicate key');
  doUpdate = 1;
  //res.send('duplicate key')
  } 
  else {
  // we had some unexpected error so send client a message and quit
  console.log('err type 2 ' + errType);
  console.log(insertError);
  res.send('query had an error see server log');
  }
  }
  
  console.log('we are at line 601');
  
  
  
  //------------------------------------------ end of INSERT code ---------------------------------   
  
  //------------------------------- if INSERT failed with DUPLICAEE KEY then do UPDATE instead ----
  
  if (doUpdate == 1) {
  
  //=========================================== update ==================================================================
  text = 'UPDATE rstable SET rsvalue = $2 WHERE rskey = $1 RETURNING *'
  values = [rskey, rsvalue]
  //=====================================================================================================================
  
  console.log('***** now execute the UPDATE *****')
  
  // async/await
  try {
  console.log('wait db response');
  const res = await client.query(text, values)
  console.log('res.rows[0] ' + res.rows[0])
  resObj = res.rows[0]
  console.log('3***** resObj ***** ' + JSON.stringify(resObj))
  respondToClient(resObj);
  // res { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
  } 
  catch (err) {
  console.log(err.stack);
  res.send('query had an error see server log');
  }
  
  console.log('we are at line 633');
  
  }
  
  // we have to use a function to get the resObj in scope for the res.json
  function respondToClient(qres) {
  console.log('2***** resObj ***** ' + JSON.stringify(qres)) //diagnostic
  res.json(qres);  
  }
  
  // we have to use a function to get the resObj in scope for the res.json
  //function respondToClient(qres) {
  //console.log('4***** resObj ***** ' + JSON.stringify(qres)) //diagnostic
  //  res.json(qres);  
  // }
  
  break;
  
  //+++++++++++++++++ Q_NAME CASE INSERT FROM rstable END +++++++++++++++++++++++++++++++++++++++++++++++++
  
  //+++++++++++++++++ Q_NAME CASE DELETE FROM rstable START +++++++++++++++++++++++++++++++++++++++++++++++++
  case "delete" :
  var sf1 = 1;
  console.log('q_type matched by case delete in table_name rstable');
  
  if (rstype == "diag") {
  
  //====================================================================================================================
  console.log('rstype = ' + rstype + ' we are setting up this - DELETE FROM rstable WHERE rstype = $1 - values = [rstype]');
  
  text = 'DELETE FROM rstable WHERE rstype = $1'
  values = [rstype]
  //====================================================================================================================
  
  }else{
  
  //=====================================================================================================================
  console.log('rstype = ' + rstype + ' we are setting up this - DELETE FROM rstable WHERE rskey = $1 - values = [rskey]');
  
  text = 'DELETE FROM rstable WHERE rskey = $1'
  values = [rskey]
  //======================================================================================================================
  
  }
  
  console.log('***** now execute the DELETE *****')
  
  // async/await
  try {
  const res = await client.query(text, values)
  console.log(res.rows[0])
  resObj = res.rows[0]
  console.log('1***** resObj ***** ' + JSON.stringify(resObj))
  console.log('DELETE was ok 1');
  respondToClient(resObj);
  console.log('DELETE was ok 2');
  }
  catch (err) {
  console.log(err.stack)
  res.send('DELETE query had an error see server log');
  }
  
  console.log('we are at line 696');
  
  break;
  //+++++++++++++++++ Q_NAME CASE DELETE FROM rstable END +++++++++++++++++++++++++++++++++++++++++++
  case "select" :
  console.log('q_type matched by case select in table_name rstable');
  
  //=====================================================================================================================
  text = 'SELECT rsvalue FROM rstable WHERE rskey = $1'
  values = [rskey]
  //=====================================================================================================================
  
  console.log('***** now execute the SELECT *****')
  
  // async/await
  try {
  const res = await client.query(text, values)
  
  if (typeof res.rows[0] != "undefined") {
  console.log(res.rows[0])
  resObj = res.rows[0]
  console.log('1***** resObj ***** ' + JSON.stringify(resObj))
  console.log('SELECT was ok 1');
  respondToClient(resObj);
  console.log('SELECT was ok 2');
  } else {
  console.log('rskey not found');
  }
  
  } 
  catch (err) {
  console.log(err.stack)
  res.send('SELECT query had an error see server log');
  }
  
  res.end();
  
  console.log('we are at line 733');
  
  break;
  
  //+++++++++++++++++ Q_NAME CASE 'DEFAULT' FROM rstable START ++++++++++++++++++++++++++++++++++++++
  default: 
  console.log('table_name not matched by any case');
  break;
  //=====================================================================================================================
  
  }    // close switch q_type statment
  
  }    // close switch table_name statement
  
  });  //close app.post /dbquery route code

//=================================================================================================
// .get('/dbselectall') loads the page app/views/pages/index.ejs from server at:
//          ... url 'https://still-shelf-78251.herokuapp.com'
//=================================================================================================
//NO CHANGES NEEDED TO INTEGRATE GENTLE CAVERN
//
app.get('/dbselectall', async (req, res) => {
  try {
  console.log('*** dbselectall route **')
  reqStr = JSON.stringify(req.query);
  console.log('reqStr ' + reqStr );
  
  reqObj = JSON.parse(JSON.stringify(req.query));
  const client = await pool.connect();
  //const result = await client.query('SELECT * FROM chess2 ORDER BY id');
  const result = await client.query('SELECT * FROM chess_table ORDER BY id');
  const results = { 'results': (result) ? result.rows : null};
  client.release();

  console.log(' *** 6a ' + JSON.stringify(results));
  resObj = JSON.parse(JSON.stringify(results));
  console.log(' *** 7');
  res.json(resObj);
  console.log(' *** 8 we are done - no errors ****');
  res.end();
  } catch (err) {
  console.error(err);
  res.send("Error " + err);
  }
  })  

//===================================================================================================================
// if the user clicks on select single row we get a request with the 'row_id' we want the db query to use
// in the SELECT * from chess2 WHERE id = the row_id we recieved form the client
//===================================================================================================================
//NO CHANGES NEEDED TO INTEGRATE GENTLE CAVERN//
app.post('/dbselsingle', async (req, res) => {
  console.log(' *** 1');
  //var strJSON = "";
  strJSON = JSON.stringify(req.body);
  // check what we got from the client
  console.log(' *** 2  *** ' + strJSON);
  // put that into a JSON object format
  var reqObj  = JSON.parse(strJSON);
  console.log(' *** 3 ');
  var row_id   = reqObj.row_id;
  // check that the row_id matches what we received
  console.log(' *** 4 row_id ' + row_id);
  try
  {
  const client = await pool.connect()  	    
  var query = 
  {
  // give the query a unique name
  name: 'sel-single-db',
  text: "SELECT * FROM chess2 WHERE id = $1",
  values: [row_id],
  }   
  
  console.log(' *** 5 row_id ' + row_id);
  //query.values[0] = row_id;
  console.log(' *** 6 row_id ' + row_id);
  
  
  await client.query(query, (err, res) => {
  console.log(' *** 7');
  if (err)  {
  console.log('Error-1 ');
  console.log(err.stack)
  } else {
  console.log(' *** 8');
  
  if(typeof res.rows[0] !== "undefined")
  {
  console.log('Hi. Variable is good !!! '); 
  console.log(' *** 9 ' + (JSON.stringify(res.rows[0])));
  var resObj = JSON.parse(JSON.stringify(res.rows[0]));
  const resultsMod = {results : [resObj] };
  console.log(' *** 10 ');
  resObjMod = JSON.parse(JSON.stringify(resultsMod));
  console.log(' *** 11');
  respondToClient(0);
  }	else {
  respondToClient(-1);
  }
  }
  })
  
  // callback code is run when the data base returns the results form the query isssued in the elso block above
  
  console.log(' *** 12');
  const results = { 'results': (res) ? res.rows : null};
  console.log('JSON.stringify results ' + JSON.stringify(results));     
  console.log(' *** 13');     
  client.release();	
  console.log(' *** 14');
  //res.json(resObjMod);	 // at this point resObjMod has not been loaded becuase that is done back in the else block 
  //and that has not been executed yet.
  console.log(' *** 15');
  
  function respondToClient(qstatus) {
  if (qstatus == 0) {
  res.json(resObjMod);
  } else {
  res.send('nomatch');
  }	   
  }
  }
  catch (err) 
  {
  console.error(err);
  res.send("Error-2 " + err);
  }
  })
  
//===================================================================================================================
//
//===================================================================================================================

server = app.listen(PORT, () => console.log(`Listening on ${ PORT }`))

//=================================================================================================

//================================================================================================
//socket.io instantiation
const io = require("socket.io")(server)



//listen on every connection
io.on('connection', (socket) => {
console.log('New browser connected to secret-shore-85438 socket.io server XXX');
console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXYYAA');
//var mysocket = socket;
var keys = Object.keys(socket);
console.log( keys[ 0 ] ); //or console.log( keys.join(",") )
console.log(socket.nsp.name)
console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXYYAA');

console.log(socket.id);
console.log('browswer id = ' , socket.browserid)

//set default username
socket.username = "Anonymous"
console.log('socket.username: ' + socket.username)

//set default username
socket.browserid = "nobrowserid"
console.log('socket.browserid: ' + socket.browserid)

//listen on change_username
socket.on('change_username', (data) => {
socket.username = data.username
console.log('Change User Name: '  + socket.username)
console.log('socket.username: ' + socket.username)
})

//listen on change_browserid
socket.on('change_browserid', (data) => {
  socket.browserid = data.browserid
  console.log('Change browserid: '  + socket.browserid)
  })

//listen on test01
socket.on('test01', (data) => {
socket.broadcast.emit('test01', {username : socket.username})
console.log('BROADCAST EMIT ********** test01 ' + socket.username)
})

socket.on('change_clientid', (data) => {
socket.clientid = data.clientid
console.log('********** CHANGE CLIENT ID : '  + data.clientid)

})

socket.on('new_message', (data) => {
io.sockets.emit('new_message', {message : data.message, username : socket.username});
console.log('>>>>  server pure-basin-37825 received socket.on "new_message" ' + JSON.stringify(data) + ' <<<<< ')
console.log('********** new_message ' + data.message);
})

socket.on('new_message2c', (data) => {
  io.sockets.emit('new_message2c', {message : data.message, clientid : socket.clientid});
  console.log('*test new_message2c ' + data.message + " ; " + "clientid " + data.clientid + " ; " + "unique_browserid " + data.unique_browserid);
  })

socket.on('new_message3c', (data) => {
  io.sockets.emit('new_message3c', {message : data.message, playerid : socket.playerid});
  console.log('*test new_message3c ' + data.message + " ; " + "playerid " + data.playerid);
  })  

  //----------------------------------------------------------------------------------------
socket.on('message_browser', (data) => {
  console.log('********** message_browser ' + data.message);
  io.sockets.emit('message_browser', {message : data.message, browserid : socket.browserid});
  console.log('>>>>  server gentle-caverns-38721 received socket.on "message_browser" ' + JSON.stringify(data) + ' <<<<< ')
  console.log('********** message_browser ' + data.message);
  })

socket.on('typing', (data) => {
socket.broadcast.emit('typing', {username : socket.username})
console.log('BROADCAST EMIT ********** typing ' + socket.username)
})

socket.on('disconnect', function(){
  console.log('disconnect event from clientid ' + socket.clientid);
});

//--------------------------------------------------------------------------------------
var allClients = [];
io.sockets.on('connection', function(socket) {
   console.log('new code for io.sockets.on XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
   allClients.push(socket);

   socket.on('disconnect', function() {
      console.log('Got disconnect!');
      console.log(socket.id);

      var i = allClients.indexOf(socket);
      console.log('index of client = ' , i )
      allClients.splice(i, 1);
   });
});
//--------------------------------------------------------------------------------------

})

