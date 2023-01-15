//=================================================================================================
//  written for pure-basin-37825
//  this is a portable set of functions to handle interactions with the server code
//  date: 23/02/2021 
//=================================================================================================
console.log('start jslib')
//=================================================================================================
// local storage functions
//=================================================================================================
function lsSet(key, value) {localStorage.setItem(key, value);}
function lsGet(key)        {var lsData = localStorage.getItem(key);return lsData;}
function lsDel(key)        {localStorage.removeItem(key);}
function lsClr()           {localStorage.clear();}

//=================================================================================================
// clear local storage before anyone uses it
//=================================================================================================
lsClr()
console.log('local storage cleared')

//=================================================================================================
// write a log record to a new row each time a move is saved
//=================================================================================================
function writelog() {
  console.log('==> writelog');
//
  g_tod = 1234567890;
  g_bi_csv   = g_bi_ar.join();
  g_hi_csv   = g_hi_ar.join();
  g_vars_csv = "a,b,c,d";
  g_ucolour  = myClientId;
//---------------------------------------------------
  return new Promise((resolve, reject) => {
  $.ajax({
  url: 'https://pure-basin-37825.herokuapp.com/writelog',
  type: 'POST',
  data: {
  log_tod:     g_tod,
  log_uname:   g_uname,
  log_bi:      g_bi_csv,
  log_hi:      g_hi_csv,
  log_gvars:   g_vars_csv,
  log_ucolour: g_ucolour
  },
  success: function (data) {
  resolve(data)
  },
  error: function (error) {
  reject(error)
  console.log(error)
  },
  })
  })
  }

//=================================================================================================
//
//=================================================================================================

function readallusers() {
console.log('==> readallusers');
return new Promise((resolve, reject) => {
$.ajax({
url: 'https://pure-basin-37825.herokuapp.com/readallusers',
type: 'POST',
data: {
key: 'value',
},
success: function (data) {
resolve(data)
console.log('readalluser ' + JSON.stringify(data));
wLog(JSON.stringify(data));
},
error: function (error) {
reject(error)
},
})
})
}

//=================================================================================================
//
//=================================================================================================

function readplayers() {
  console.log('==> readplayers');
  return new Promise((resolve, reject) => {
  $.ajax({
  url: 'https://pure-basin-37825.herokuapp.com/readplayers',
  type: 'POST',
  data: {
  key: 'value',
  },
  success: function (data) {
  resolve(data)
  console.log('readplayers ' + JSON.stringify(data));
  console.log(data["results"])
  console.log(data["results"][0].id)
  console.log(data["results"][1].id)
  wLog(data["results"][0].id)
  wLog(data["results"][1].id)
  },
  error: function (error) {
  reject(error)
  },
  })
  })
  }

//=================================================================================================
// 
//=================================================================================================

function insertuser(userkey,username,userstatus,usercolour,userupdtms,userupdtct) {
console.log('==> insertuser');
userkey = userkey;
username = username;
userstatus = userstatus;
return new Promise((resolve, reject) => {
$.ajax({
url: 'https://young-hamlet-57834.herokuapp.com/insertuser',
type: 'POST',
data: {
userkey:    userkey,
username:   username,
userstatus: userstatus,
usercolour: usercolour,
userupdtms: userupdtms,
userupdtct: userupdtct
},
success: function (data) {
resolve(data)
},
error: function (error) {
reject(error)
},
})
})
}

//=================================================================================================
// rsGet() 
//=================================================================================================
function rsGet(rskey) {
console.log('==> rsGet()');
return new Promise((resolve, reject) => {
$.ajax({
url: 'https://young-hamlet-57834.herokuapp.com/rsget',
type: 'POST',
data: {
rskey: rskey,
},
success: function (data) {
resolve(data)
},
error: function (error) {
reject(error)
},
})
})
}

//=================================================================================================
// rsSet() 
//=================================================================================================
function rsSet(rskey,rsvalue) {
console.log('==> rsSet()');
return new Promise((resolve, reject) => {
$.ajax({
url: 'https://young-hamlet-57834.herokuapp.com/rsset',
type: 'POST',
data: {
rskey: rskey,
rsvalue: rsvalue,
},
success: function (data) {
resolve(data)
},
error: function (error) {
reject(error)
},
})
})
}

//=================================================================================================
// stackpop() - get stackdata from top of stack table
//=================================================================================================
function stackpop() {
console.log('==> stackpop()');
var rskey = "abc"
return new Promise((resolve, reject) => {
$.ajax({
url: 'https://young-hamlet-57834.herokuapp.com/stackpop',
type: 'POST',
data: {
//stackdata : stackdata,
},
success: function (data) {
resolve(data)
},
error: function (error) {
reject(error)
},
})
})
}

//=================================================================================================
// stackpush() - put stackdata into  top of stack table
//=================================================================================================
function stackpush(stackdata) {
console.log('==> stackpush()');
var rskey = "abc"
return new Promise((resolve, reject) => {
$.ajax({
url: 'https://young-hamlet-57834.herokuapp.com/stackpush',
type: 'POST',
data: {
stackdata: stackdata,
},
success: function (data) {
resolve(data)
},
error: function (error) {
reject(error)
},
})
})
}

//=================================================================================================
// getstackptrhandler() - get the sequence value if the top of stack table
//=================================================================================================
function getstackptr() {
console.log('==> getstackptr()');
return new Promise((resolve, reject) => {
$.ajax({
url: 'https://young-hamlet-57834.herokuapp.com/getstackptr',
type: 'POST',
data: {
// no data posted
},
success: function (data) {
resolve(data)
},
error: function (error) {
reject(error)
},
})
})
}

//=================================================================================================
// test_app_lock
//=================================================================================================
function test_app_lock() {
console.log('==> test_app_lock()');
//var mylock = lsGet("mycookie")
return new Promise((resolve, reject) => {
$.ajax({
url: 'https://young-hamlet-57834.herokuapp.com/test_app_lock',
type: 'POST',
data: {
//mylock: mylock,
},
success: function (data) {
resolve(data)
},
error: function (error) {
reject(error)
},
})
})
}
//
//=================================================================================================
// get_app_lock
//=================================================================================================
function get_app_lock(mylock) {
console.log('==> get_app_lock()');
var mylock = lsGet("mycookie")
return new Promise((resolve, reject) => {
$.ajax({
url: 'https://young-hamlet-57834.herokuapp.com/get_app_lock',
type: 'POST',
data: {
mylock: mylock,
},
success: function (data) {
resolve(data)
},
error: function (error) {
reject(error)
},
})
})
}
//
//=================================================================================================
// free_app_lock
//=================================================================================================
function free_app_lock(mylock) {
console.log('==> free_app_lock()');
var mylock = lsGet("mycookie")
return new Promise((resolve, reject) => {
$.ajax({
url: 'https://young-hamlet-57834.herokuapp.com/free_app_lock',
type: 'POST',
data: {
mylock: mylock,
},
success: function (data) {
resolve(data)
},
error: function (error) {
reject(error)
},
})
})
}
//
//=================================================================================================
// force_free
//=================================================================================================
function force_free() {
console.log('==> force_free()');
//var mylock = lsGet("mycookie")
return new Promise((resolve, reject) => {
$.ajax({
url: 'https://young-hamlet-57834.herokuapp.com/force_free',
type: 'POST',
data: {
//mylock: mylock,
},
success: function (data) {
resolve(data)
},
error: function (error) {
reject(error)
},
})
})
}
//
//=================================================================================================
//                                    UTILITIES
//=================================================================================================
//=================================================================================================
// wlog() a utility to print daignostic information
//=================================================================================================
function wlog(textToAppend) {
console.log(textToAppend);
var txa = textToAppend;
//
var x = document.getElementById("wlog");
var t = document.createTextNode(textToAppend + '\n');
x.appendChild(t);
x.scrollTop = x.scrollHeight;
} 
//
function clear_wlog() {
var table = document.getElementById("wlog");
table.innerHTML = "";
}
//=================================================================================================
// dlog() a utility to print daignostic information
//=================================================================================================
function dlog(textToAppend) {
  console.log('dlog: ' +  textToAppend)
}
//=================================================================================================
// dlogX() a utility to print daignostic information
//=================================================================================================
function dlogX(textToAppend) {
  console.log('dlogX: ' + textToAppend);
    var txa = textToAppend;
    //
    var x = document.getElementById("dlog");
    var t = document.createTextNode(textToAppend + '\n');
    x.appendChild(t);
    x.scrollTop = x.scrollHeight;
    } 
    //
    
    function clear_dlog() {
    var table = document.getElementById("dlog");
    table.innerHTML = "";
    }

//=================================================================================================
// alog() a utility to print daignostic information
//================================================================================================
function alog(textToAppend) {
  console.log('alog: ' + textToAppend);
    var txa = textToAppend;
    //
    var x = document.getElementById("amsg");
    var t = document.createTextNode(textToAppend + '\n');
    x.appendChild(t);
    x.scrollTop = x.scrollHeight;
    } 
    //
    
    function clear_amsg() {
    var table = document.getElementById("amsg");
    table.innerHTML = "";
    }    

//=================================================================================================
// amsg()
//=================================================================================================
function amsg(textToAppend) {
  console.log('amsg:' + textToAppend);
var txa = textToAppend;
  document.getElementById("amsg").innerHTML = txa;
}

//=================================================================================================
// bmsg()
//=================================================================================================
function bmsg(textToAppend) {
  console.log('bmsg:' + textToAppend);
var txa = textToAppend;
  document.getElementById("bmsg").innerHTML = txa;
}
//=================================================================================================
// wmsg()
//=================================================================================================
function wmsg(textToAppend) {
  console.log('wmsg:' + textToAppend);
var txa = textToAppend;
  document.getElementById("wmsg").innerHTML = txa;
  play("ding");
}
//=================================================================================================
// chatlog() a utility to print daignostic information
//=================================================================================================
function chatlog(textToAppend) {
  console.log('===> chat()')
  var txa = textToAppend;
//---
  var x = document.getElementById("chatlog");
  var t = document.createTextNode(textToAppend + '\n');
  x.appendChild(t);
  x.scrollTop = x.scrollHeight;
} 
//---
function clear_chatlog() {
  console.log('===> clear_chatlog')
  var table = document.getElementById("chatlog");
  table.innerHTML = "";
}
//=================================================================================================
//                                  New Login Code
//=================================================================================================
async function  login()  {
  console.log('enter login');
  var  parameters = "parms"
  call_login()
  .then((data) => {
  console.log(data)
  })
  }
  //=================================================================================================
//                                  New Call_Login Code
//=================================================================================================
async function  call_login() {
  console.log('enter call_login');
    $.post('https://pure-basin-37825.herokuapp.com/testf',  
    {
      //
    log_tod      : "123456789",
    log_uname    : "barbara",
    log_bi       : "bibibi",
    log_hi       : "hihihi",
    log_gvars    : "gvgvgv",
    log_ucolour  : "purple"
    },
    function(data) {
    console.log(JSON.stringify(data));   
    return data;      
    })    
    }    
//=================================================================================================
//                                  DIAGNOSTICS
//=================================================================================================
//=================================================================================================
// this is a diagnostic test - keep it 
//=================================================================================================
function testselect(testkey) {
console.log('==> testselect()');
return new Promise((resolve, reject) => {
$.ajax({
url: 'https://young-hamlet-57834.herokuapp/comtestselect',
type: 'POST',
data: {
testkey: testkey,
},
success: function (data) {
resolve(data)
},
error: function (error) {
reject(error)
},
})
})
}
//

// this is a diagnostic test - keep it 
//=================================================================================================
function lockable_action() {
console.log('==> lockable_action()');
return new Promise((resolve, reject) => {
$.ajax({
url: 'https://young-hamlet-57834.herokuapp.com/lockable_action',
type: 'POST',
data: {
//testkey: testkey,
},
success: function (data) {
resolve(data)
},
error: function (error) {
reject(error)
},
})
})
}
//==================================================================================================
// Form Handlers
//==================================================================================================

//==================================================================================================
// getstackptr form handler
//==================================================================================================
function xxx()  {
  wLog('xxx');
  }

//==================================================================================================
// LOGIN form handler
//==================================================================================================
function loginFormHandler(formObject)  {
  console.log('===> loginFormHandle')
var userkey = formObject.elements.userkey.value;
var username = formObject.elements.username.value;
var userstatus = formObject.elements.userstatus.value;
var usercolour = formObject.elements.usercolour.value;
lsSet("userkey",userkey)
lsSet("username",username)
lsSet("userstatus",userstatus)
lsSet("usercolour",usercolour)
login(userkey,username,userstatus,usercolour);
}

//==================================================================================================
// RS GET form handler
//==================================================================================================
function getrsFormHandler(formObject)  {
  console.log('===> getrsFormHandler')
var rskey = formObject.elements.rskeyget.value;
var rsvalue = formObject.elements.rsvalueget.value;
var rsowner = formObject.elements.rsownerget.value;
lsSet("rskey",rskey)
lsSet("rsvalue",rsvalue)
lsSet("rsowner",rsowner)
call_rsGet(rskey);
}

//==================================================================================================
// RS PUT form handler
//==================================================================================================
function setrsFormHandler(formObject)  {
  console.log('===> setrsFormHandler')
var rskey = formObject.elements.rskeyput.value;
var rsvalue = formObject.elements.rsvalueput.value;
var rsowner = formObject.elements.rsownerput.value;
lsSet("rskey",rskey)
lsSet("rsvalue",rsvalue)
lsSet("rsowner",rsowner)
call_rsSet(rskey,rsvalue);
}

//==================================================================================================
// sample client server call front end
//==================================================================================================
function  sample_server_call()  {
var  parameters = "parms"
call_server_call(parameters);
}

//=================================================================================================
// *** various diagnostic test functions
//=================================================================================================
// list_bi_ar() 
//=================================================================================================
function list_bi_ar() {
var i;
dlog('list board array')
for (i=0;i<64;i++) { 
dlog('g_bi_ar ' + ' ' + i + ' ' + g_bi_ar[i]);
}
}
//=================================================================================================
// *** displaySingle_bi_ar() ***
//=================================================================================================
function displaySingle_bi_ar() {
dlog('*** displeySingle_bi_ar');
let myIndex = document.getElementById("keyparm2").value;
let myValue = g_bi_ar[myIndex];
dlog('Index ' + myIndex + ' Value ' + myValue);
} 
//=================================================================================================
// display_single_bi_ar() 
//=================================================================================================
function display_single_bi_ar(bi) {
dlog('single board array')
dlog('single g_bi_ar ' + bi + ' ' + g_bi_ar[bi]);
}
//===============================================================================================
// testemit()
//===============================================================================================
function testemit() {
socket.emit('change_username', {username : mycookie})
sf1=1;
}
//===============================================================================================
// testemit2c()
//===============================================================================================
function testemit2c() {
console.log('==> testemit2c');
var mymsg = "Test Message 2C";
socket.emit('new_message2c', {message : mymsg})
sf2=2;
dlog('<== testemit2c')
}
//=================================================================================================
// *** listAll_LS() ***
//==================================================================================================
function listAll_LS() {
dlog1('*** listAll_LS');
Object.keys(localStorage).forEach(function(key){
dlog1('LS key ' + key + ' value ' + localStorage.getItem(key));
});
} 
//=================================================================================================
// *** displaySingle_LS() ***
//=================================================================================================
function displaySingle_LS() {
console.log('*** listSingle_LS');
let myKey = document.getElementById("keyparm").value;
let myItem = lsGet(myKey);
console.log('key : item -- ' + myKey + ' : ' + myItem);
} 
//================================================================================================
//==============================================================================================================
// send an email from the server .. use testemail route - same as testemail()
//==============================================================================================================        
function diagemail() {
let mysubject = 'Chess Logs from Player: ' + myClientId;
let mytoaddress = document.getElementById("emailtoaddress").value;
let mymsg = document.getElementById("mailbody").value;
// HTML for the email message 
let myhtml = '<html>'+
'<head>'+
'<title>HTMLFont size</title>'+
'</head>'+
'<body>'+
'<p style="color:blue;font-size:9px;">' + mymsg + '</p>'+
'</body>'+
'</html>'
// HTML for the email message

var toaddr;
var subject;
var mytext;
var html;

toaddr = "steve.fallon@gmail.com"; // force email address as recipient
//toaddr = mytoaddress             // uncomment to use address sent by client
subject = mysubject;
mytext = mymsg;
html = myhtml;

$.post('https://pure-basin-37825.herokuapp.com/testemail',
{
toaddr: toaddr,
subject: mysubject,
mytext: mytext,
html: html,
},
function(data) { {
//alert("return from server")
}
}
)}
//=================================================================================================
// test function
//=================================================================================================
function testf_01(obj) {
dlog('==> testf_01');
dlog('<== testf_01');
}
//=================================================================================================
// handle login form
//=================================================================================================
function onSubmit( form ){
var data = JSON.stringify( $(form).serializeArray() );
var dataObj = JSON.parse(data);
var myuname = dataObj[0].value
document.getElementById("user_name").innerHTML = myuname;
return false; //don't submit
}
  
//=================================================================================================
// socket.io setup - self-invoked function
//=================================================================================================
$(function(){ 

console.log('from pure-basin-37825 make socket.io connection to https://pure-basin-37825.herokuapp.com as "socket"');
var socket = io.connect('https://pure-basin-37825.herokuapp.com');
var clientid             = $("#clientid");
var send_clientid        = $("#send_clientid")
var message2c            = $("#message2c")
var send_message2c       = $("#send_message2c")
var chatroom2c           = $("#chatroom2c")
var feedback2c           = $("#feedback2c")

//-----------------------------------------------------------------------------------------------
// reminder to me of how all this works...!
//
// EMIT ON new_message2c socket
// 
// send_message_2c is the "id" of a button associated with the input field id="message2c" 
// the .click jquery method invoves the following function which emits the message
// using "new_message2c" - this is picked up by the server's code at around line 35 as follows...
//  socket.on('new_message2c', (data) => {
//   io.sockets.emit('new_message2c', {message : data.message, clientid : socket.clientid});
//  })
//
// that server code broadcast to any connected client using io.sockets.emit
// and our cliend code sees it with its code at line 212 below..
// ... socket.on("new_message2c", (data) => { ...
// which calls the messageHandler() function for decoding and processing
//-----------------------------------------------------------------------------------------------
// this is the 'transmit message' function that uses the user input field "message2c"
// new_message2c is the SOCKET NAME and is arbitrary BUT MUST match the server SOCKET being used
// -- possible later simplification would be to shorten these socket names perhaps to SK1 or similar
// but at present leave as is.
//-----------------------------------------------------------------------------------------------
send_message2c.click(function(){
socket.emit('new_message2c', {message : message2c.val()})
})
//-----------------------------------------------------------------------------------------------
// Listen on new_message2c socket
//-----------------------------------------------------------------------------------------------
socket.on("new_message2c", (data) => {
feedback2c.html('');
message2c.val('');
chatroom2c.append("<p class='message'>" + data.clientid + ": " + data.message + "</p>")
dlog('client id: ' + data.clientid + ' sent message: ' + data.message);
messageHandler(data.clientid, data.message);
})
//-----------------------------------------------------------------------------------------------
// Emit a clientid
//-----------------------------------------------------------------------------------------------
send_clientid.click(function(){
document.getElementById("info_01").innerHTML = clientid.val()
socket.emit('change_clientid', {clientid : clientid.val()} )
var myclientid = clientid.val();
lsSet("clientid", myclientid);
dlog('client id is ' + lsGet("clientid"))
})
//Emit typing
message2c.bind("keypress", () => {
socket.emit('typing')
})
//Listen on typing ...
socket.on('typing', (data) => {
feedback2c.html("<p><i>" + data.clientid + " is typing a message..." + "</i></p>")
})

});
//===============================================================================================
// from peaceful
//===============================================================================================
	
$(function(){
    //make connection
      console.log('from pure-basin-37825 - make socket.io connection to https://pure-basin-37825.herokuapp.com as "socket1"');
      var socket1 = io.connect('https://pure-basin-37825.herokuapp.com');
      //buttons and inputs
      var message = $("#message")
      var username = $("#username")
      var send_message = $("#send_message")
      var send_username = $("#send_username")
      var chatroom = $("#chatroom")
      var feedback = $("#feedback")
  
      //Emit message
      send_message.click(function(){
          socket1.emit('new_message', {message : message.val()})
      })
  
      //Listen on new_message
      socket1.on("new_message", (data) => {
          feedback.html('');
          message.val('');
          chatroom.append("<p class='message'>" + data.username + ": " + data.message + "</p>")
          //chatlog('==> ' +  data.username + ": " + data.message)
          chatlog(data.username + " says: " + data.message)
      })
  
      //Emit a username
      send_username.click(function(){
      // If the length of the element's string is 0 then display helper message
      console.log('===> send_username entry') 
      if ( username.val() == 0) 
      { 
         wmsg("Login name must be at least 1 character");
         console.log("Login name must be at least 1 character");
         return -1;     	 
      }
       else if (username.val() == "no_name") {
        wmsg("Login name" + "no_name" + "is not allowed");
        console.log("Login name" + "no_name" + "is not allowed");
        return -1; 
       }
       else{
         //console.log("Click on a pawn icon above to choose your playing colour");
         console.log("username is: " + username.val());
      }
   
          socket1.emit('change_username', {username : username.val()});
          console.log('from jslib - username is ' + username.val());
          document.getElementById("user_name").innerHTML = username.val();
          g_logged_in = true;
          g_uname = username.val();
          console.log("g_uname = " + g_uname);
          toggle_hide();
          //
          if (g_uname == "white") {
          ribbon1_item_clicked(wrook)
          ping_other()
          console.log('wrook was pressed by program action')
          }
          if (g_uname == "black") {
          ribbon1_item_clicked(brook)
          ping_other()
          console.log('brook was pressed by program action')
          }
          //
      })
  
      //Emit typing
      message.bind("keypress", () => {
          socket1.emit('typing')
      })
  
      //Listen on typing
      socket1.on('typing', (data) => {
          feedback.html("<p><i>" + data.username + " is typing a message..." + "</i></p>")
          chatlog(data.username + ' is typing a message...')
      })
  });	
 //=================================================================================================
//JavaScript function to play the beep sound 
function play(sound) {
  console.log('===> play');
  switch (sound) {
case "check":
  var beepsound = new Audio('notify.mp3');
  beepsound.play();  
  break;
case "ding" :
  var beepsound = new Audio('tick1.mp3'); 
  beepsound.play(); 
  } 
}
  