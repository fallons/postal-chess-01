//=================================================================================================
//  written for secret-shore-85438
//  this is a specific set of functions for the client side operation
//  date: 23/02/2021 
//=================================================================================================
console.log('start gamelib')
//=================================================================================================
//
//=================================================================================================

//=================================================================================================
// Initialise GLOBAL VARIABLES
//=================================================================================================

//=================================================================================================
var socket = io.connect('https://secret-shore-85438.herokuapp.com'); 
//=================================================================================================
// Used for diagnostic logging - dlog,printlog - **must be at start of script**
//=================================================================================================
var g_log_arr_next = 0;
var g_d = new Date();
var g_log_arr = [];
g_log_arr[g_log_arr_next] = "***** Start of Log : " + g_d + " ****** "
//=================================================================================================
// Used by 'settings' tab
//=================================================================================================
var g_clientIdSet = false;  
var myClientId = "u"        
var g_diag_mode = false;
var g_display_colour;   
//#=================================================================================================
//# Used by checkContent(tArr) and checkContentTest(tArr)
//#=================================================================================================                  
var g_tArrPruned = [];                                          
var g_tArrUnique = [];                                         
//=================================================================================================
// Used by checkContent(tArr) and checkContentTest(tArr)
//=================================================================================================
var g_threatArr = [];                                          
var g_realThreatArr = [];                                      
var g_threatArrPruned = [];
var g_threatArrUnique = [];
//=================================================================================================
var g_bd_arr = []; 
var g_hd_arr = [];                                            
var g_pw1stmove = false;                                       
var g_pb1stmove = false;                                       
var g_epW;                                                     
var g_epB;                                                     
//#=================================================================================================
//# for testCastling()
///=================================================================================================
var g_kwe;                                                                                       
var g_kww;                                                     
var g_kbe;                                                     
var g_kbw;                                                     
//
//# these are used by sq_clicked and are global because they need to be persitant
//# between the 2 calls of a single move:
//# 1st call with pih=no
//# 2nd call with pih=yes.
var g_sqindex_to_clear;                                       
var g_pih_colour;                                              
var g_pih_pname;                                               
var g_pgif_for_target;
var g_pih_pnamecol;                                         
var g_pih = "no";                                              
var g_sqid_to_clear = "";                                      
var g_validTargets_arr = [];                                   
var g_threatTarget;                                             
var g_logged_in = false;
//==================================================================================================
var g_inhibit_white = false;
var g_inhibit_black = false;
var g_inhibit_play_button = false;
//=================================================================================================
// g_cap_w=white and g_cap_z=black is a pointer to the next available slot in hospital
//==================================================================================================
var g_cap_w;
var g_cap_z = 0;
//=================================================================================================
// for enable_other to pass to 'other' so he can highlight the from and to squares
//=================================================================================================
var g_from_sq_for_other;
var g_to_sq_for_other;
//=================================================================================================
// place holders for values used by writelog()
//=================================================================================================
var g_tod;
var g_uname;
var g_bi_csv;
var g_hi_csv;
var g_vars;
var g_ucolour;
//================================================================================================
var g_promo_needed = false;
var g_promo_piece = "";
//================================================================================================
//  prevent saving until themove is completed - set to true by end of put down code
//  tested on entry to save code
var g_allow_save = false;
//================================================================================================
//-------------------------------------------------------------------------------------------------
// conversion table for xy to ix 
//-------------------------------------------------------------------------------------------------
var g_xy2ix_obj = {                                                                             
'00':'00','10':'01','20':'02','30':'03','40':'04','50':'05','60':'06','70':'07',   //#
'01':'08','11':'09','21':'10','31':'11','41':'12','51':'13','61':'14','71':'15',   //#
'02':'16','12':'17','22':'18','32':'19','42':'20','52':'21','62':'22','72':'23',   //#
'03':'24','13':'25','23':'26','33':'27','43':'28','53':'29','63':'30','73':'31',   //#
'04':'32','14':'33','24':'34','34':'35','44':'36','54':'37','64':'38','74':'39',   //#
'05':'40','15':'41','25':'42','35':'43','45':'44','55':'45','65':'46','75':'47',   //#
'06':'48','16':'49','26':'50','36':'51','46':'52','56':'53','66':'54','76':'55',   //#
'07':'56','17':'57','27':'58','37':'59','47':'60','57':'61','67':'62','77':'63'    //#
};                                                                                 //# 

//#------------------------------------------------------------------------------------------------- 
var g_xy2sqid_obj = {                                                                           
'00':'a1','10':'b1','20':'c1','30':'d1','40':'e1','50':'f1','60':'g1','70':'h1',   //#
'01':'a2','11':'b2','21':'c2','31':'d2','41':'e2','51':'f2','61':'g2','71':'h2',   //#
'02':'a3','12':'b3','22':'c3','32':'d3','42':'e3','52':'f3','62':'g3','72':'h3',   //#
'03':'a4','13':'b4','23':'c4','33':'d4','43':'e4','53':'f4','63':'g4','73':'h4',   //#
'04':'a5','14':'b5','24':'c5','34':'d5','44':'e5','54':'f5','64':'g5','74':'h5',   //#
'05':'a6','15':'b6','25':'c6','35':'d6','45':'e6','55':'f6','65':'g6','75':'h6',   //#
'06':'a7','16':'b7','26':'c7','36':'d7','46':'e7','56':'f7','66':'g7','76':'h7',   //#
'07':'a8','17':'b8','27':'c8','37':'d8','47':'e8','57':'f8','67':'g8','77':'h8'    //#
};                                                                                 //#

//#-------------------------------------------------------------------------------------------------              
var g_sq_arr1   = [                                                                             
'a1','b1','c1','d1','e1','f1','g1','h1',                                           //#
'a2','b2','c2','d2','e2','f2','g2','h2',                                           //#
'a3','b3','c3','d3','e3','f3','g3','h3',                                           //#
'a4','b4','c4','d4','e4','f4','g4','h4'                                            //#
];                                                                                 //#
//
var g_sq_arr2   = [                                                                              
'h8','g8','f8','e8','d8','c8','b8','a8',                                           //#
'h7','g7','f7','e7','d7','c7','b7','a7',                                           //#
'h6','g6','f6','e6','d6','c6','b6','a6',                                           //#
'h5','g5','f5','e5','d5','c5','b5','a5'                                            //#
];                                                                                 //#
//-------------------------------------------------------------------------------------------------
var g_sq_arr   = [                                                                             
'a1','b1','c1','d1','e1','f1','g1','h1',                                           //#
'a2','b2','c2','d2','e2','f2','g2','h2',                                           //#
'a3','b3','c3','d3','e3','f3','g3','h3',                                           //#
'a4','b4','c4','d4','e4','f4','g4','h4',                                           //#
'a5','b5','c5','d5','e5','f5','g5','h5',                                           //#
'a6','b6','c6','d6','e6','f6','g6','h6',                                           //#
'a7','b7','c7','d7','e7','f7','g7','h7',                                           //#
'a8','b8','c8','d8','e8','f8','g8','h8'                                            //#
];                                                                                 //#
//-------------------------------------------------------------------------------------------------
// wsq and wsb are used by reset_colors()
var g_wsq_arr = [                                                                                
'b1','d1','f1','h1',                                                             
'a2','c2','e2','g2',                                                             
'b3','d3','f3','h3',                                                             
'a4','c4','e4','g4',                                                             
'b5','d5','f5','h5',                                                             
'a6','c6','e6','g6',                                                            
'b7','d7','f7','h7',                                                             
'a8','c8','e8','g8'                                                              
]                                                                                

var g_bsq_arr = [                                                                               
'a1','c1','e1','g1',                                                                                                                
'b2','d2','f2','h2',                                                             
'a3','c3','e3','g3',                                                             
'b4','d4','f4','h4',                                                             
'a5','c5','e5','g5',                                                             
'b6','d6','f6','h6',                                                             
'a7','c7','e7','g7',                                                            
'b8','d8','f8','h8'                                                              
]                                                                                

//=================================================================================================
// sq_clicked is called when a board square is clicked. This is either to ...
// PICKUP (if g_pih=no)
//  OR 
// PUTDOWN (if g_pih=yes)
//================================================================================================
function sq_clicked(obj) {
  dlogX('********** sq_clicked **** ' + obj.src.substr(-7,3) + '**********')
    if (!g_logged_in) { wmsg("Please Login"); return;}
    if (!g_clientIdSet) { wmsg("Please Choose A Colour"); return;}
// keep in mind that we enter this function twice in each move
// first time we pickup the piece in the square we clicked
// second time we  white a "target square"  aiming to put the piece in our 'hand' into that "target square"
// we will be checking that the "target square" is a validTarget - 'if (!validTarget)' code below..
//-------------------------------------------------------------------------------------------------
g_allow_save = false; // this gets made 'true' when putdown code has completed
console.log('==> begin sq_clicked ' + obj.id);
console.log("next action is "  + lsGet('next_action'))
var mycolour = lsGet("mycolour");
var mydisplay_colour = lsGet("mydisplay_colour");
if ((lsGet('next_action') == "pickup") || (g_diag_mode))  {  // this 'if' ends on line 482
var sqid    = obj.id;
var pgif    = obj.src.substr(-7,7);
var pname   = obj.src.substr(-7,1);
var pcolour = obj.src.substr(-6,1);
var sqindex = obj.name.substr(1,2);
var pnamecol = obj.src.substr(-7,2);
var pnamecolmod = obj.src.substr(-7,3);
var pmod    = obj.src.substr(-5,1);
var pihxy = ix2xy(sqindex);
var pihx = pihxy.substr(0,1) // extract the x value of the target for use by en passant logic
var pihy = pihxy.substr(1,1) // extract the y value of the target for use by en passant logic

console.log('pihxy = ' + pihxy);

switch (g_pih) {

case "no" :
//-------------------------------------------------------------------------------------------------
// g_pih="no" means we need to 'pickup' the piece in the clicked square
//-------------------------------------------------------------------------------------------------   
console.log('case = no - no piece in hand - PICKUP CODE');
g_from_sq_for_other = pihxy;
// check we are not trying to pickup a foe or from an empty square 
g_validTargets_arr = []; // clear the valid targets array in case there is any residual data in it 
console.log('Before Valid Targets are => ' + g_validTargets_arr.join());
if (pname == "e") {
//wlog('Please choose a ' + mydisplay_colour + ' piece');
wmsg('Please choose a ' + mydisplay_colour + ' piece');
console.log('pname = ' + pname + ' sqid = ' + sqid + ' sqindex = ' + sqindex + ' sqxy ' + pihxy);
return
}
if (!g_diag_mode)  {
//if (pcolour != lsGet("mycolour")) {
if (pcolour != mycolour) {
//wlog('Please choose a ' + mydisplay_colour + ' piece');
wmsg('Please choose a ' + mydisplay_colour + ' piece');
dlog('pname = ' + pname + ' sqid = ' + sqid + ' sqindex = ' + sqindex + ' sqxy ' + pihxy);
return
}
}
// if we are here we chose one of our own pieces so continue...
dlog('we now pickup the piece in ' + sqid + ' at sqindex ' + sqindex)  
document.getElementById("pih").src = pgif; //pgif is the name of the gif with image of the piece picked  up
g_pih = "yes"; // so now we have a piece image in the "pih" box in user info area
dlog('Details of piece now in hand ' + pcolour + '  ' + pname + ' from square ' + sqid + ' at sqindex ' + sqindex );
g_sqid_to_clear = sqid; //save the original square id - e.g. "a1"
g_sqindex_to_clear = sqindex; //save the original square index - e.g. "00"
g_pih_colour = pcolour; //save colour of picked up piece
g_pih_pname = pname;
g_pih_pnamecol = pname+pcolour;
g_pgif_for_target = pgif;
// set the from square background to light blue ..
document.getElementById(sqid).style.backgroundColor = "lightblue";

if (!g_diag_mode) {
g_validTargets_arr = genTargetList(pnamecol,pihxy);  //fc
dlog('After Valid Targets are => ' + g_validTargets_arr.join());
}
dlog('END OF PICKUP CODE');
break;
//--------------------------------------------------------------------------------------------------
//
//--------------------------------------------------------------------------------------------------
case "yes" :
//-------------------------------------------------------------------------------------------------
// we have clicked a square with a piece in hand so we want to 'PUTDOWN' that piece in the target square
//------------------------------------------------------------------------------------------------- 
dlog('case = yes - we have a piece in hand - PUTDOWN CODE'); 
g_to_sq_for_other = pihxy;
dlog( sqid + ' contains ' + pname + ' square index = ' + ' sqid ' + sqid + ' xy is ' + pihxy);

if (g_pgif_for_target == 'kw0.gif') {
dlog('we are moving a white king modify "pih.gif" with the moved bit') 
g_pgif_for_target = 'kw1.gif'
}
if (g_pgif_for_target == 'kb0.gif') {
dlog('if we are moving a black king modify "pih.gif" with the moved bit') 
g_pgif_for_target = 'kb1.gif'
}

if (!g_diag_mode) {
dlog('we are NOT in g_diag_mode')
// check if the target square is in the valid targets array
if (g_validTargets_arr.indexOf(pihxy) == -1) {
//wlog('target square is not in the g_validTargets_arr so we exit');
//wlog('Please choose a valid target square');
wmsg('Please choose a valid target square');
undo_move();
return -1;
} 
}  

if (g_validTargets_arr === undefined) {
dlog('Error - Valid Targets Array is undefined');
}
//-------------------------------------------------------------------------------------------------
// the target square IS on the valid target list 
//-------------------------------------------------------------------------------------------------
if (pname == "e") {   //target square is empty
dlog('target square is empty so move the piece in hand to the empty target square');
//---------------------------------------------------------------------------------------------
//----- This is the start of the code to promote pawn that moves into an empty square ------------
//-------------------------------------------------------------------------------------------------
// PROMOTE PAWN (at present this always promotes to Queen - need to ad Rook,Bishop,Knight options)
//-------------------------------------------------------------------------------------------------
// if PIH is a PW AND target y=7 change PIH to QW ( later to NW or BW or RW)
if (g_pih_pnamecol == "pw" && pihy == "7" ) {
  //------------------- prod code -----------------------------
  //document.getElementById("pih").src = "qw0.gif"
  //g_pgif_for_target = "qw0.gif"
  //-----------------------------------------------
  //------------------- test code -----------------------------
  console.log('*** promo_piece *** = ' + g_promo_piece);
  document.getElementById("pih").src = g_promo_piece
  g_pgif_for_target = g_promo_piece
  //-----------------------------------------------
}
// if PIH is a PB AND target y=0 change PIH to QB ( later to NB or BB or RW)
if (g_pih_pnamecol == "pb" && pihy == "0" ) {
  //-------------------prod code --------------------------------
  //document.getElementById("pih").src = "qb0.gif"
  //g_pgif_for_target = "qb0.gif"
  //-----------------------------------------------------------
  //------------------- test code -----------------------------
  document.getElementById("pih").src = g_promo_piece
  g_pgif_for_target = g_promo_piece
  //-----------------------------------------------

  //--------------------------------------------------------
}
//--------------------------------------------------------------------------------------------------
// MOVE PIECE TO EMPTY SQUARE 
//--------------------------------------------------------------------------------------------------
document.getElementById(sqid).src = document.getElementById("pih").src;
//--------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------
//----- This is the end of the code to promote pawn that moves into an empty square ------------
//-------------------------------------------------------------------------------------------------


//----------------- Castling Move White Kings Rook -------------------------------------------------  
if (g_pgif_for_target == 'kw1.gif' && sqid == 'g1') {
document.getElementById('f1').src = 'rw1.gif';
document.getElementById('h1').src = 'en0.gif';
//update g_bi_ar with visual board
g_bi_ar[parseInt('05')] = "rw1.gif";
g_bi_ar[parseInt('07')] = "en0.gif";
}
//--------------- Castling Move White Queens Rook -------------------------------------------------  
if (g_pgif_for_target == 'kw1.gif' && sqid == 'c1') {
document.getElementById('d1').src = 'rw1.gif';
document.getElementById('a1').src = 'en0.gif';
//update g_bi_ar with visual board
g_bi_ar[parseInt('03')] = "rw1.gif";
g_bi_ar[parseInt('00')] = "en0.gif";
}
//------------- Castling Move Black Kings Rook -------------------------------------------------  
if (g_pgif_for_target == 'kb1.gif' && sqid == 'g8') {
document.getElementById('f8').src = 'rb1.gif';
document.getElementById('h8').src = 'en0.gif';
//update g_bi_ar with visual board
g_bi_ar[parseInt('61')] = "rb1.gif";
g_bi_ar[parseInt('63')] = "en0.gif";
}
//--------------Castling Move White Queens Rook -------------------------------------------------  
if (g_pgif_for_target == 'kb1.gif' && sqid == 'c8') {
document.getElementById('d8').src = 'rb1.gif';
document.getElementById('a8').src = 'en0.gif';
//update g_bi_ar with visual board
g_bi_ar[parseInt('59')] = "rb1.gif";
g_bi_ar[parseInt('56')] = "en0.gif";
}
//----------------- PIECE THAS BEEN MOVED TO EMPTY SQUARE -------------------------------------------------

//---------------------------------------------------------------------------------------------------------
// check if there is a pawn on the board that could be taken by en passant
// g_epW or g_epB will have been set when we read in the board after the other players move was saved
//---------------------------------------------------------------------------------------------------------
if (g_epW > -1 || g_epB > -1) {
var epWxy = ix2xy(g_epW)
var epWsqid = xy2sqid(epWxy);
var epBxy = ix2xy(g_epB)
var epBsqid = xy2sqid(epBxy);
var tmpmycolour = lsGet("mycolour");

switch (tmpmycolour) {

case "w" :
if (sqid != epBsqid) {
document.getElementById(epBsqid).src = "en0.gif"  
g_bi_ar[parseInt(g_epB)] = "en0.gif";
}
break

case "b" :
if (sqid != epWsqid) {
document.getElementById(epWsqid).src = "en0.gif"
g_bi_ar[parseInt(g_epW)] = "en0.gif";
}
break
default:
dlog('+++ ERROR - should be w or b but it is: ' + pname);
}
}

//----------------special code for en passant white -----------------------------------------------
// if g_pw1stmove is true 'piece in hand' is a WHITE pawn and this is the 'put down pih' path
// through the 'sq_clicked' function
// this code will put a 'phantom white pawn' in the 1st square north of the pawns starting point
// any white pawn will start with y=1 so we need to make y=2 leaving the x value as is.
//-------------------------------------------------------------------------------------------------
if (g_pw1stmove && pihy == "3") {  //only do this if they move to the y=3 NOT for y=2
var phantStr = "";
phantStr = pihx + 2;  //xy was x1 - make it x2
var testpihy = pihy;
var testpihxy = pihxy;
var bi_ar_ix_int = 16 + parseInt(pihx);
var phantsqid = xy2sqid(phantStr)
document.getElementById(phantsqid).src = "pw1.gif";
g_bi_ar[parseInt(bi_ar_ix_int)] = "pw1.gif";
g_pw1stmove = false;
}
//-----------------------------------------------------------------------------------------------

//----------------special code for en passant black -----------------------------------------------
// if g_pb1stmove is true so 'piece in hand' is a BLACK pawn and this is the 'put down pih' path
// through the 'sq_clicked' function
// this code will put a 'phantom black pawn' in the 1st square south of the pawns starting point
// any black pawn will start with y=6 so we need to make y=5 leaving the x value as is.
//-------------------------------------------------------------------------------------------------
if (g_pb1stmove && pihy == "4") {
var phantStr = "";
phantStr = pihx + 5;  //xy was x6 - make it x5
var bi_ar_ix_int = 40 + parseInt(pihx);
var phantsqid = xy2sqid(phantStr)
document.getElementById(phantsqid).src = "pb1.gif";
g_bi_ar[parseInt(bi_ar_ix_int)] = "pb1.gif";
g_pb1stmove = false;
}
//-----------------------------------------------------------------------------------------------

//reset id="pih" square to blank gif
document.getElementById("pih").src = "en0.gif";

//restore the 'from' square to blank gif... 
document.getElementById(g_sqid_to_clear).src = "en0.gif";
// and original backgroundcolour...
document.getElementById(g_sqid_to_clear).style.backgroundColor = "";

//update the board index array - 'g_bi_ar'  - to match the visual board
dlog('update g_bi_ar')  
g_bi_ar[parseInt(g_sqindex_to_clear)] = "en0.gif";
g_bi_ar[parseInt(sqindex)] = g_pgif_for_target;
//
lsSet("next_action", "save");
document.getElementById("next_action").innerHTML = "Save or Undo your move";
wmsg("Click the Green Tick above to Save your move");
}
// piece has been moved to empty square and to and from square are now updated
//-------------------------------------------------------------------------------------------------
if (pname != "e") { //target square is occupied
dlog('ptarget square is occupied by ' + sqid + ' is  ' +  pcolour + ' ' +  pname + ' ' + pnamecolmod)

//check piece of target square is oppsite colour to pih
if (g_pih_colour != pcolour) {
dlog('target is enemy so continue the move');
dlog('move the piece in hand to the occupied target square and so capture the other players piece');
dlog('piece in hand is ' + g_pih_colour +' ' + g_pih_pname + ' target square is occupied by ' + pcolour + ' ' + pname);
//---------------------------------------------------------------------------------------------
//----- This is the start of the code to promote pawn that moves into an occupied square ------------
//-------------------------------------------------------------------------------------------------
// PROMOTE PAWN (at present this always promotes to Queen - need to ad Rook,Bishop,Knight options)
//-------------------------------------------------------------------------------------------------
// if PIH is a PW AND target y=7 change PIH to QW ( later to NW or BW or RW)
if (g_pih_pnamecol == "pw" && pihy == "7" ) {
  //------------------- prod code -----------------------------
  //document.getElementById("pih").src = "qw0.gif"
  //g_pgif_for_target = "qw0.gif"
  //-----------------------------------------------
  //------------------- test code -----------------------------
  console.log('*** promo_piece *** = ' + g_promo_piece);
  document.getElementById("pih").src = g_promo_piece
  g_pgif_for_target = g_promo_piece
  //-----------------------------------------------
}
// if PIH is a PB AND target y=0 change PIH to QB ( later to NB or BB or RW)
if (g_pih_pnamecol == "pb" && pihy == "0" ) {
  //-------------------prod code --------------------------------
  //document.getElementById("pih").src = "qb0.gif"
  //g_pgif_for_target = "qb0.gif"
  //-----------------------------------------------------------
  //------------------- test code -----------------------------
  document.getElementById("pih").src = g_promo_piece
  g_pgif_for_target = g_promo_piece
  //-----------------------------------------------

}
//--------------------------------------------------------------------------------------------------
// MOVE PIECE TO EMPTY SQUARE 
//--------------------------------------------------------------------------------------------------
document.getElementById(sqid).src = document.getElementById("pih").src;
//--------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------
//----- This is the end of the code to promote pawn that moves into an occupied square ------------
//-------------------------------------------------------------------------------------------------
//----------------- MOVE PIECE TO OCCUPIED SQUARE ---------------------------------------------------
//document.getElementById("pih").src = "qw0.gif" //TEST TEST TEST// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<
document.getElementById(sqid).src = document.getElementById("pih").src;
//----------------- PIECE THAS BEEN MOVED TO OCCUPIED SQUARE ----------------------------------------
dlog('piece ' + pcolour + ' ' + pname + ' has been captured by ' +  g_pih_colour +' ' + g_pih_pname )
pushImage(pnamecolmod); // NEWNEWNEW put on gui hospital ribbon and save in hi array
//----------------special code for en passant white -----------------------------------------------
// if g_pw1stmove is true 'piece in hand' is a WHITE pawn and this is the 'put down pih' path
// through the 'sq_clicked' function
// this code will put a 'phantom white pawn' in the 1st square north of the pawns starting point
// any white pawn will start with y=1 so we need to make y=2 leaving the x value as is.
//-------------------------------------------------------------------------------------------------
if (g_epW > -1 || g_epB > -1) {
var epWxy = ix2xy(g_epW)
var epWsqid = xy2sqid(epWxy);
var epBxy = ix2xy(g_epB)
var epBsqid = xy2sqid(epBxy);
var tmpmycolour = lsGet("mycolour");

switch (tmpmycolour) {
case "w" :
if (sqid != epBsqid) {document.getElementById(epBsqid).src = "en0.gif" }
break
case "b" :
if (sqid != epWsqid) {document.getElementById(epWsqid).src = "en0.gif" }
break
}
}

// ---------------------White Virtual Pawn ---------------------------------------------------------
// if the target was a 'virtual' pawn we need to also remove the 'real' pawn
if (pnamecolmod == "pw1") {
var vpx = pihx;
var vpy = parseInt(pihy) + 1;
var rpxy = vpx.toString() + vpy.toString();
dlog('real pawn xy is... ' + rpxy);
var rpsqindex = g_xy2ix_obj[rpxy];
var rpsqid = g_xy2sqid_obj[rpxy];
dlog('remove the real pawn at...' + rpsqid); 
document.getElementById(rpsqid).src = "en0.gif";
g_bi_ar[parseInt(rpsqindex)] = "en0.gif";
}
// ---------------------Black Virtual Pawn ---------------------------------------------------------
// if the target was a 'virtual' pawn we need to also remove the 'real' pawn
if (pnamecolmod == "pb1") {
var vpx = pihx;
var vpy = parseInt(pihy) - 1;
var rpxy = vpx.toString() + vpy.toString();
dlog('real pawn xy is... ' + rpxy);
var rpsqindex = g_xy2ix_obj[rpxy];
var rpsqid = g_xy2sqid_obj[rpxy];
dlog('remove the real pawn at...' + rpsqid); 
document.getElementById(rpsqid).src = "en0.gif";
g_bi_ar[parseInt(rpsqindex)] = "en0.gif";
}
// ------------------------------------------------------------------------------------------------

//reset id="pih" square to blank gif (this is not visible)
document.getElementById("pih").src = "en0.gif";

//restore the 'from' square to blank gif and original backgroundcolour
document.getElementById(g_sqid_to_clear).src = "en0.gif";
document.getElementById(g_sqid_to_clear).style.backgroundColor = "";

//update the board index array g_bi_ar ------------------------------------------------------------ 
dlog('update g_bi_ar');
g_bi_ar[parseInt(g_sqindex_to_clear)] = "en0.gif";
g_bi_ar[parseInt(sqindex)] = g_pgif_for_target;

lsSet("next_action", "save");
//document.getElementById("next_action").innerHTML = "save";
document.getElementById("next_action").innerHTML = "Save or Undo your move";
wmsg("Click the Green Tick above to Save your move");
//press_save();
//document.getElementById("next_action").innerHTML = "Move Saved";
//document.getElementById('i4').style.backgroundColor = "red";
} else {
dlog('move aborted because target was a friend');
document.getElementById(g_sqid_to_clear).style.backgroundColor = "";
}
}
// if we are here then we put down the piece so set pih="no"
// and reset the g_sqid_to_clear to ""
dlog('set g_pih = no, set squid to clear = ""')
g_pih = "no";
//lsSet("next_action", "save");
dlog('next_action is ' + lsGet("next_action"));
g_sqid_to_clear = "";
//------------------------------
// clean up the promo globals
//------------------------------
g_promo_needed = false;
g_promo_piece = ""
dlog('END OF PUTDOWN CODE')
g_allow_save = true;
break;
//-------------------------------------------------------------------------------------------------
// end of case g_pih=no
//-------------------------------------------------------------------------------------------------
default:
dlog('+++ ERROR should not occur');
}
}  // this is the end of the 'if' statement on line 164 
else
{
wmsg(lsGet("foedisplay_colour") + ' to move')
}
}

//=================================================================================================
// Conversion Utilities
//=================================================================================================
function ix2xy(ix) { 
dlog('*** begin ix2xy');
var mod = 8;
var x = ix % mod;
var y = parseInt(ix/mod);
var xy = (x.toString() + y.toString())
return xy;
}
//=================================================================================================
function xy2ix(xy) {
dlog('*** begin xy2ix');
var ix = g_xy2ix_obj.xy;
return ix;
}

//=================================================================================================
function xy2sqid(xy) {
dlog('*** xy2sqid');
var sqid = g_xy2sqid_obj[xy];
return sqid;
}

//=================================================================================================
// genTargetList(pname,originxy) 
//=================================================================================================
// generate list of possible target squares based on origin square and piece type and colour
// this will be done using xy co-ordinates of squares - so 'a1' in x=0, y=0
// in the test we use a white rook on square co-ord x,y = 3,5 which is square'd6'
// the 4 squares to the right are 'e6', 'f6', 'g6', 'h6' so they are all potential targets
// step1 is is to create an array with the x,y co-ord of each of those squares
// in this example ... [45,55,65,75]
// 
//  from white point of view... so white pawns move 'north'
//
//                          3 north
//                          ^
//                          |
//           west   2 <_____|_____> 1 east
//                          |
//                          |
//                          v
//                          4 south
// we use the same orientation for black which means black pawns move 'south'
//
//
//=================================================================================================
function genTargetList(pname,originxy) {
dlog('*** getTargetList');
// is g_diag_mode on ?
if (g_diag_mode) {
return -1
}
// not g_diag_mode so carry on as normal
dlog('generate list of possible target squares based on origin square and piece type and colour');
var tItem = "";
var tArr = [];
var tList = "";

var x;
var y;
var j;
var i;

var origin = parseInt(originxy);                 // e.g. "35"
var origx = parseInt(originxy.substr(0,1));      // e.g. "3"
var origy = parseInt(originxy.substr(1,1));      // e.g. "5"
var ptype = pname.substr(0,1);                   // e.g. "r"
var pcolour = pname.substr(1,1);                 // e.g. "w"

switch (pname) { 
//=================================================================================================
// White Pieces
//=================================================================================================                  
case "rw" :
case "rb" :
dlog('piece name is ' + pname);
//====================== rw and rb generate tArr EAST =============================================
// initialise variables ..
tItem = "";
tArr = [];
tList = "";
x = origx;
y = origy;
// 
dlog('begin rw tArr EAST with x =  ' + x + '; y = ' + y + '; pname = ' + pname);
//
for (i=x+1;i<8;i++) {                   // get squares to east of origin  
tItem = i + y.toString();              // i = 3 ; increment i up to 7 - so x values are 4,5,6,7
dlog('target list east ' + tItem);
tList = tList + (tItem + ',');         // we get a a csv like this"45,55,65,75,"                                
}

tList = tList.substr(0,tList.length - 1);  // remove the trailing comma
tArr = tList.split(',')                    // put the csv into an array...
          
dlog('end rw and rb tArr EAST');

if (tArr[0] != "") {
checkContent(tArr);  //fc
}
//================== rw and rb end of tArr EAST ===================================================
//=================  rw and rb generate tArr WEST =================================================
// initialise variables
tItem = "";
tArr = [];
tList = "";
x = origx;
y = origy;
//
dlog('begin rw and rb tArr WEST with  x =  ' + x + '; y = ' + y + '; pname = ' + pname);
//
for (i=x-1;i>-1;i--) {                       // get squares to west of origin
tItem = i + y.toString();                   // i = 3 ; decremeni i to 0 so x values are 2,1,0
dlog('target list west ' + tItem);
tList = tList + (tItem + ',');         // we get a a csv like this "25,15,05,"                                
}
tList = tList.substr(0,tList.length - 1);  // remove the trailing comma
tArr = tList.split(',')                     // put the csv into an array...
                                                        
dlog('end rw and rb tArr WEST');

if (tArr[0] != "") {
checkContent(tArr);  //fc
}
//======================== rw and rb end of tArr WEST =============================================

//======================== rw and rb generate tArr 'NORTH =========================================
// initialise variables
tItem = "";
tArr = [];
tList = "";
x = origx;
y = origy;
//
dlog('begin rw and rb tArr NORTH with x =  ' + x + '; y = ' + y + '; pname = ' + pname);
//
for (i=y+1;i<8;i++) {                       // get squares to north of origin
tItem = x + i.toString();                         // i = 6 ; increment i up to 7 - so y values are 6,7
dlog('target list north ' + tItem);
tList = tList + (tItem + ',');         // we get a a csv like this "36,37,"                                
}
tList = tList.substr(0,tList.length - 1);  // remove the trailing comma
tArr = tList.split(',')                    // put the csv into an array...
                  
dlog('end rw and rb tArr NORTH');

if (tArr[0] != "") {
checkContent(tArr);  //fc
}
//====================== rw and rb end of tArr NORTH =====================================================
//====================== rw and rb generate tArr SOUTH ===================================================
//initialise variables
tItem = "";
tArr = [];
tList = "";
x = origx;
y = origy;
//
dlog('begin rw tArr SOUTH with x =  ' + x + '; y = ' + y + '; pname = ' + pname);
// 
for (i=y-1;i>-1;i--) {                       // get squares on left of origin
tItem = x + i.toString();              // i = 5 ; decrement i  to 0 - so y values are 4,3,2,1,0
dlog('target list south ' + tItem);
tList= tList + (tItem + ',');          // we get a a csv like this"34,33,32,31,30,"                                
}
tList = tList.substr(0,tList.length - 1);  // remove the trailing comma
tArr  = tList.split(',')                   // put the csv into an array...
                  
dlog('end rw and rb tArr SOUTH');

if (tArr[0] != "") {
checkContent(tArr);  //fc
}
//=================================== rw and rb end of tArr South=========================================
break;
//=================================================================================================
case "nw" :
case "nb" :
dlog('piece nmae is n ' +  pname);
//====================== nw generate tArr NORTH EAST =====================================================
// initialise variables ..
tItem = "";
tArr = [];
tList = "";
x = origx;
y = origy;

dlog('begin tArr NORTH EAST with x =  ' + x + '; y = ' + y + '; pname = ' + pname);

//-------------------------------------------------------------------------------------------------
i = y+2;
x = x+1;
if (i < 8 && x < 8) {
tItem = x + i.toString();         
dlog('target list north east ' + tItem);
tList = tList + (tItem + ',');
}                  
//-------------------------------------------------------------------------------------------------

tList = tList.substr(0,tList.length - 1);   // remove the trailing comma
tArr = tList.split(',')                     // put the csv into an array...
                
dlog('end nw tArr NORTH EAST');

if (tArr[0] != "") {
checkContent(tArr);  //fc
}
//====================== nw end tArr NORTH EAST ===================================================
//====================== nw generate tArr NORTH WEST ==============================================
// initialise variables ..
tItem = "";
tArr = [];
tList = "";
x = origx;
y = origy;

dlog('begin tArr NORTH WEST with x =  ' + x + '; y = ' + y + '; pname = ' + pname);

//-------------------------------------------------------------------------------------------------
i = y+2;
x = x-1;
if (i < 8 && x > -1) {
tItem = x + i.toString();         
dlog('target list north west ' + tItem);
tList = tList + (tItem + ',');
}                    
//-------------------------------------------------------------------------------------------------

tList = tList.substr(0,tList.length - 1);   // remove the trailing comma
tArr = tList.split(',')                     // put the csv into an array...
                
dlog('end nw tArr NORTH WEST');

if (tArr[0] != "") {
checkContent(tArr);  //fc
}
//====================== nw end tArr NORTH WEST ===================================================
//====================== nw generate tArr EAST NORTH ==============================================
// initialise variables ..
tItem = "";
tArr = [];
tList = "";
x = origx;
y = origy;

dlog('begin tArr EAST NORTH with x =  ' + x + '; y = ' + y + '; pname = ' + pname);

//-------------------------------------------------------------------------------------------------
i = y+1;
x = x+2;
if (i < 8 && x < 8) {
tItem = x + i.toString();         
dlog('target list east north ' + tItem);
tList = tList + (tItem + ',');
}                    
//-------------------------------------------------------------------------------------------------

tList = tList.substr(0,tList.length - 1);   // remove the trailing comma
tArr = tList.split(',')                     // put the csv into an array...
                
dlog('end nw tArr EAST NORTH');

if (tArr[0] != "") {
checkContent(tArr);   //fc
}
//====================== nw end tArr EAST NORTH ===================================================
//====================== nw generate tArr EAST SOUTH ==============================================
// initialise variables ..
tItem = "";
tArr = [];
tList = "";
x = origx;
y = origy;

dlog('begin tArr EAST SOUTH with x =  ' + x + '; y = ' + y + '; pname = ' + pname);

//-------------------------------------------------------------------------------------------------
i = y-1;
x = x+2;
if (i > -1 && x < 8) {
tItem = x + i.toString();         
dlog('target list east south ' + tItem);
tList = tList + (tItem + ',');
}                    
//-------------------------------------------------------------------------------------------------

tList = tList.substr(0,tList.length - 1);   // remove the trailing comma
tArr = tList.split(',')                     // put the csv into an array...
                
dlog('end nw tArr EAST SOUTH');

if (tArr[0] != "") {
checkContent(tArr);  //fc
}
//====================== nw end tArr EAST SOUTH ===================================================
//====================== nw generate tArr SOUTH EAST ==============================================
// initialise variables ..
tItem = "";
tArr = [];
tList = "";
x = origx;
y = origy;

dlog('begin tArr SOUTH EAST with x =  ' + x + '; y = ' + y + '; pname = ' + pname);

//-------------------------------------------------------------------------------------------------
i = y-2;
x = x+1;
if (i > -1 && x < 8) {
tItem = x + i.toString();         
dlog('target list south east ' + tItem);
tList = tList + (tItem + ',');
}                   
//-------------------------------------------------------------------------------------------------

tList = tList.substr(0,tList.length - 1);   // remove the trailing comma
tArr = tList.split(',')                     // put the csv into an array...
                
dlog('end nw tArr SOUTH EAST');

if (tArr[0] != "") {
checkContent(tArr);  //fc
}
//====================== nw end tArr SOUTH EAST ===================================================
//====================== nw generate SOUTH WEST  ==================================================
// initialise variables ..
tItem = "";
tArr = [];
tList = "";
x = origx;
y = origy;

dlog('begin tArr SOUTH WEST with x =  ' + x + '; y = ' + y + '; pname = ' + pname);

//-------------------------------------------------------------------------------------------------
i = y-2;
x = x-1;
if (i > -1 && x > -1) {
tItem = x + i.toString();         
dlog('target list south west ' + tItem);
tList = tList + (tItem + ',');
}                    
//-------------------------------------------------------------------------------------------------

tList = tList.substr(0,tList.length - 1);   // remove the trailing comma
tArr = tList.split(',')                     // put the csv into an array...
                
dlog('end nw tArr SOUTH WEST');

if (tArr[0] != "") {
checkContent(tArr);   //fc
}
//====================== nw end tArr SOUTH WEST  ==================================================
//====================== nw generate tArr WEST SOUTH ==============================================
// initialise variables ..
tItem = "";
tArr = [];
tList = "";
x = origx;
y = origy;

dlog('begin tArr WEST SOUTH with x =  ' + x + '; y = ' + y + '; pname = ' + pname);

//-------------------------------------------------------------------------------------------------
i = y-1;
x = x-2;
if (i > -1 && x > -1) {
tItem = x + i.toString();         
dlog('target list west south ' + tItem);
tList = tList + (tItem + ',');
}                   
//-------------------------------------------------------------------------------------------------

tList = tList.substr(0,tList.length - 1);   // remove the trailing comma
tArr = tList.split(',')                     // put the csv into an array...
                
dlog('end nw tArr WEST SOUTH');

if (tArr[0] != "") {
checkContent(tArr);  //fc
}
//====================== nw end tArr WEST SOUTH  ==================================================
//====================== nw generate tArr  WEST NORTH =============================================
// initialise variables ..
tItem = "";
tArr = [];
tList = "";
x = origx;
y = origy;

dlog('begin tArr WEST NORTH with x =  ' + x + '; y = ' + y + '; pname = ' + pname);

//-------------------------------------------------------------------------------------------------
i = y+1;
x = x-2;
if (i < 8 && x > -1) {
tItem = x + i.toString();         
dlog('target list west north ' + tItem);
tList = tList + (tItem + ',');
}                   
//-------------------------------------------------------------------------------------------------

tList = tList.substr(0,tList.length - 1);   // remove the trailing comma
tArr = tList.split(',')                     // put the csv into an array...
                
dlog('end nw tArr WEST NORTH');

if (tArr[0] != "") {
checkContent(tArr);  //fc
}
//====================== nw end tArr WEST NORTH  ===================================================
break;
//=================================================================================================
case "bw" :
case "bb" :
dlog('piece name is ' + pname)
// initialise variables ..
tItem = "";
tArr = [];
tList = "";
x = origx;
y = origy;
//====================== bw or bb generate tArr NORTH EAST========================================
dlog('begin bw or bb tArr NORTH EAST with x =  ' + x + '; y = ' + y + '; pname = ' + pname);
//
for (i = x+1, j = y+1; (i < 8 && j < 8)  ; i++, j++) {
tItem = i + j.toString(); 
dlog('target list NE ' + tItem);
tList = tList + (tItem + ',');                                 
}

tList = tList.substr(0,tList.length - 1);  // remove the trailing comma
tArr = tList.split(',')                    // put the csv into an array...                        
dlog('end bw or bb tArr NORTH EAST');

if (tArr[0] != "") {
checkContent(tArr);  //fc
}
//================== bw or bb end of tArr NORTH EAST ==============================================
//====================== bw or bb generate tArr NORTH WEST ========================================
tItem = "";
tArr = [];
tList = "";
x = origx;
y = origy;

dlog('begin bw tArr NORTH WEST with x =  ' + x + '; y = ' + y + '; pname = ' + pname);
// 
for (i = x-1, j = y+1; (i > -1 && j < 8)  ; i--, j++) {
tItem = i + j.toString(); 
dlog('target list NW ' + tItem);
tList = tList + (tItem + ',');                                 
}                   

tList = tList.substr(0,tList.length - 1);  // remove the trailing comma
tArr = tList.split(',')                    // put the csv into an array...                        
dlog('end bw or bb tArr NORTH WEST');
if (tArr[0] != "") {
checkContent(tArr);  //fc
}
//================== bw or bb end of tArr NORTH WEST ==============================================
//====================== bw or bb generate tArr SOUTH EAST========================================
tItem = "";
tArr = [];
tList = "";
x = origx;
y = origy;

dlog('begin bw or bb tArr SOUTH EAST with x =  ' + x + '; y = ' + y + '; pname = ' + pname);
//
for (i = x+1, j = y-1; (i < 8 && j > -1)  ; i++, j--) {
tItem = i + j.toString(); 
dlog('target list SE ' + tItem);
tList = tList + (tItem + ',');                                 
}

tList = tList.substr(0,tList.length - 1);  // remove the trailing comma
tArr = tList.split(',')                    // put the csv into an array...                        
dlog('end bw or bb tArr SOUTH EAST');

if (tArr[0] != "") {
checkContent(tArr); //fc
}
//================== bw or bb end of tArr SOUTH EAST ==============================================
//====================== bw or bb generate tArr SOUTH WEST ========================================
tItem = "";
tArr = [];
tList = "";
x = origx;
y = origy;

dlog('begin bw tArr SOUTH WEST with x =  ' + x + '; y = ' + y + '; pname = ' + pname);
// 
for (i = x-1, j = y-1; (i > -1 && j > -1)  ; i--, j--) {
tItem = i + j.toString(); 
dlog('target list SW ' + tItem);
tList = tList + (tItem + ',');                                 
}                   

tList = tList.substr(0,tList.length - 1);  // remove the trailing comma
tArr = tList.split(',')                    // put the csv into an array...                        
dlog('end bw or bb tArr SOUTH WEST');
if (tArr[0] != "") {
checkContent(tArr);  //fc
}
//================== bw or bb end of tArr NORTH WEST ==============================================
break;
//=================================================================================================
// QQQQQQQQ
//=================================================================================================
case "qw" :
case "qb" :
dlog('piece name is  ' + pname)
// initialise variables ..
tItem = "";
tArr = [];
tList = "";
x = origx;
y = origy;

//===============================================================================================
// the queen can move like a bishop AND a rook so we can just copy their code here...
//====================== qw or qb generate tArr NORTH EAST=======================================
// QQQQQQQQQQQQQQQQQQ
// Rook's code for Queen
// QQQQQQQQQQQQQQQQQQ
//-----------------------------------------------------------------------------------------------
dlog('begin tArr EAST with x =  ' + x + '; y = ' + y + '; pname = ' + pname);
//
for (i=x+1;i<8;i++) {                    // get squares to east of origin  
tItem = i + y.toString();              // i = 3 ; increment i up to 7 - so x values are 4,5,6,7
dlog('target list east ' + tItem);
tList = tList + (tItem + ',');         // we get a a csv like this"45,55,65,75,"                                
}

tList = tList.substr(0,tList.length - 1);  // remove the trailing comma
tArr = tList.split(',')                    // put the csv into an array...
          
dlog('end ' + pname + ' tArr EAST');

if (tArr[0] != "") {
checkContent(tArr);  //fc
}
//================== qw and qb end of tArr EAST ==========================================================
//=================  qw and qb generate tArr WEST ========================================================
// initialise variables
tItem = "";
tArr = [];
tList = "";
x = origx;
y = origy;
//
dlog('begin tArr WEST with  x =  ' + x + '; y = ' + y + '; pname = ' + pname);
//
for (i=x-1;i>-1;i--) {                       // get squares to west of origin
tItem = i + y.toString();                   // i = 3 ; decremeni i to 0 so x values are 2,1,0
dlog('target list west ' + tItem);
tList = tList + (tItem + ',');         // we get a a csv like this "25,15,05,"                                
}
tList = tList.substr(0,tList.length - 1);  // remove the trailing comma
tArr = tList.split(',')                     // put the csv into an array...
                                                        
dlog('end ' + pname + ' tArr WEST');

if (tArr[0] != "") {
checkContent(tArr);  //fc
}
//======================== qw and qb end of tArr WEST =======================================================
//======================== qw and qb generate tArr 'NORTH ===================================================
// initialise variables
tItem = "";
tArr = [];
tList = "";
x = origx;
y = origy;
//
dlog('begin tArr NORTH with x =  ' + x + '; y = ' + y + '; pname = ' + pname);
//
for (i=y+1;i<8;i++) {                       // get squares to north of origin
tItem = x + i.toString();                         // i = 6 ; increment i up to 7 - so y values are 6,7
dlog('target list north ' + tItem);
tList = tList + (tItem + ',');         // we get a a csv like this "36,37,"                                
}
tList = tList.substr(0,tList.length - 1);  // remove the trailing comma
tArr = tList.split(',')                    // put the csv into an array...
                  
dlog('end ' + pname + ' tArr NORTH');

if (tArr[0] != "") {
checkContent(tArr);  //fc
}
//====================== qw and qb end of tArr NORTH =====================================================
//====================== qw and qb generate tArr SOUTH ===================================================
//initialise variables
tItem = "";
tArr = [];
tList = "";
x = origx;
y = origy;
//
dlog('begin tArr SOUTH with x =  ' + x + '; y = ' + y + '; pname = ' + pname);
// 
for (i=y-1;i>-1;i--) {                       // get squares on left of origin
tItem = x + i.toString();              // i = 5 ; decrement i  to 0 - so y values are 4,3,2,1,0
dlog('target list south ' + tItem);
tList= tList + (tItem + ',');          // we get a a csv like this"34,33,32,31,30,"                                
}
tList = tList.substr(0,tList.length - 1);  // remove the trailing comma
tArr  = tList.split(',')                   // put the csv into an array...
                  
dlog('end ' + pname + ' tArr SOUTH');

if (tArr[0] != "") {
checkContent(tArr);  //fc
}
//=================================== qw and qb end of tArr South =================================
//==================================== qw and qb end of tArr North East============================
//initialise variables
tItem = "";
tArr = [];
tList = "";
x = origx;
y = origy;
//

dlog('begin tArr NORTH EAST with x =  ' + x + '; y = ' + y + '; pname = ' + pname);
//
for (i = x+1, j = y+1; (i < 8 && j < 8)  ; i++, j++) {
tItem = i + j.toString(); 
dlog('target list NE ' + tItem);
tList = tList + (tItem + ',');                                 
}

tList = tList.substr(0,tList.length - 1);  // remove the trailing comma
tArr = tList.split(',')                    // put the csv into an array...                        
dlog('end ' + pname + ' tArr NORTH EAST');

if (tArr[0] != "") {
checkContent(tArr);  //fc
}
//================== qw or qb end of tArr NORTH EAST ==============================================
//====================== qw or qb generate tArr NORTH WEST ========================================
//initialise variables
tItem = "";
tArr = [];
tList = "";
x = origx;
y = origy;

dlog('begin tArr NORTH WEST with x =  ' + x + '; y = ' + y + '; pname = ' + pname);
// 
for (i = x-1, j = y+1; (i > -1 && j < 8)  ; i--, j++) {
tItem = i + j.toString(); 
dlog('target list NW ' + tItem);
tList = tList + (tItem + ',');                                 
}                   

tList = tList.substr(0,tList.length - 1);  // remove the trailing comma
tArr = tList.split(',')                    // put the csv into an array...                        
dlog('end ' + pname + ' tArr NORTH WEST');
if (tArr[0] != "") {
checkContent(tArr);  //fc
}
//================== qw or qb end of tArr NORTH WEST ==============================================
//====================== qw or qb generate tArr SOUTH EAST========================================
//initialise variables
tItem = "";
tArr = [];
tList = "";
x = origx;
y = origy;

dlog('begin tArr SOUTH EAST with x =  ' + x + '; y = ' + y + '; pname = ' + pname);
//
for (i = x+1, j = y-1; (i < 8 && j > -1)  ; i++, j--) {
tItem = i + j.toString(); 
dlog('target list SE ' + tItem);
tList = tList + (tItem + ',');                                 
}

tList = tList.substr(0,tList.length - 1);  // remove the trailing comma
tArr = tList.split(',')                    // put the csv into an array...                        
dlog('end ' + pname + ' tArr SOUTH EAST');

if (tArr[0] != "") {
checkContent(tArr);  //fc
}
//================== qw or qb end of tArr SOUTH EAST ==============================================
//====================== qw or qb generate tArr SOUTH WEST ========================================
//initialise variables
tItem = "";
tArr = [];
tList = "";
x = origx;
y = origy;

dlog('begin tArr SOUTH WEST with x =  ' + x + '; y = ' + y + '; pname = ' + pname);
// 
for (i = x-1, j = y-1; (i > -1 && j > -1)  ; i--, j--) {
tItem = i + j.toString(); 
dlog('target list SW ' + tItem);
tList = tList + (tItem + ',');                                 
}                   

tList = tList.substr(0,tList.length - 1);  // remove the trailing comma
tArr = tList.split(',')                    // put the csv into an array...                        
dlog('end ' + pname + ' tArr SOUTH WEST');
if (tArr[0] != "") {
checkContent(tArr);  //fc
}
//================== qw or qb end of tArr SOUTH WEST ==============================================
break;
//=================== kw begin tArr EAST ===================================================
case "kw" :

dlog('piece name is ' + pname)
// initialise variables ..
tItem = "";
tArr = [];
tList = "";
x = origx;
y = origy;
// see if the king can castle
// first see if it has moved during the game
//  var ksqid = xy2sqid(originxy);
// var kgif = document.getElementById(ksqid).src;
//  var kgifm = kgif.substr(-5,1);
//  if (kgifm == 1 ) {
//  kwmoved = true ////
//  }
//===============================================================================================
// the king can move like a bishop AND a rook but only one square so we can use their modified code here...
//====================== kw generate tArr EAST ============================================
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
dlog('begin tArr EAST with x =  ' + x + '; y = ' + y + '; pname = ' + pname);
//
// normal 1 sq move
if (x<7) {
i = y;
tItem = x+1 + i.toString();         
dlog('target list east ' + tItem);
tList = tList + (tItem + ',');
}
// castling 2 sq move so king must be at original position = x=4 y=0;

//if (testCastleWhiteEast()) {
if (g_kwe) {
i = y;
tItem = x+2 + i.toString();         
dlog('target list east ' + tItem);
tList = tList + (tItem + ',');                                             
}

tList = tList.substr(0,tList.length - 1);  // remove the trailing comma
tArr = tList.split(',')                    // put the csv into an array...
          
dlog('end ' + pname + ' tArr EAST');

if (tArr[0] != "") {
checkContent(tArr);  //fc
}
//================== kw end of tArr EAST ==========================================================
//=================  kw generate tArr WEST ========================================================
// initialise variables
tItem = "";
tArr = [];
tList = "";
x = origx;
y = origy;
//
dlog('begin tArr WEST with  x =  ' + x + '; y = ' + y + '; pname = ' + pname);
//
// normal 1 sq move
i = y;
tItem = x-1 + i.toString();         
dlog('target list west ' + tItem);
tList = tList + (tItem + ',');

// castling 2 sq move so king must be at original position = x=4 y=0;
//if (testCastleWhiteWest()) {
if (g_kww) {
i = y;
tItem = x-2 + i.toString();         
dlog('target list west ' + tItem);
tList = tList + (tItem + ',');                                             
}

tList = tList.substr(0,tList.length - 1);  // remove the trailing comma
tArr = tList.split(',')                    // put the csv into an array...
          
dlog('end ' + pname + ' tArr WEST');

if (tArr[0] != "") {
checkContent(tArr);  //fc
}
//======================== kw end of tArr WEST =======================================================
//======================== kw generate tArr NORTH ===================================================
// initialise variables
tItem = "";
tArr = [];
tList = "";
x = origx;
y = origy;
//
dlog('begin tArr NORTH with x =  ' + x + '; y = ' + y + '; pname = ' + pname);
//
if (y<7) {
i = y+1;
tItem = x + i.toString();              
dlog('target list north ' + tItem);
tList = tList + (tItem + ',');                                         
}
tList = tList.substr(0,tList.length - 1);  // remove the trailing comma
tArr = tList.split(',')                    // put the csv into an array...
                  
dlog('end ' + pname + ' tArr NORTH');

if (tArr[0] != "") {
checkContent(tArr);  //fc
}
//====================== kw end of tArr NORTH =====================================================
//====================== kw generate tArr SOUTH ===================================================
//initialise variables
tItem = "";
tArr = [];
tList = "";
x = origx;
y = origy;
//
dlog('begin tArr SOUTH with x =  ' + x + '; y = ' + y + '; pname = ' + pname);
// 
if (y>0) {
i= y-1;
tItem = x + i.toString();              
dlog('target list south ' + tItem);
tList= tList + (tItem + ',');                                          
}
tList = tList.substr(0,tList.length - 1);  // remove the trailing comma
tArr  = tList.split(',')                   // put the csv into an array...
                  
dlog('end ' + pname + ' tArr SOUTH');

if (tArr[0] != "") {
checkContent(tArr);  //fc
}
//=================================== kw end of tArr South =========================================
//====================================kw kb end of tArr NORTH EAST ====================================
//initialise variables
tItem = "";
tArr = [];
tList = "";
x = origx;
y = origy;
//
dlog('begin tArr NORTH EAST with x =  ' + x + '; y = ' + y + '; pname = ' + pname);
//
if (x<7 && y<7) {
i = y+1;
tItem = x+1 + i.toString(); 
dlog('target list NE ' + tItem);
tList = tList + (tItem + ',');                                 
}
tList = tList.substr(0,tList.length - 1);  // remove the trailing comma
tArr = tList.split(',')                    // put the csv into an array...                        
dlog('end ' + pname + ' tArr NORTH EAST');

if (tArr[0] != "") {
checkContent(tArr);  //fc
}
//================== kw end of tArr NORTH EAST ==============================================
//====================== kw generate tArr NORTH WEST ========================================
//initialise variables
tItem = "";
tArr = [];
tList = "";
x = origx;
y = origy;

dlog('begin tArr NORTH WEST with x =  ' + x + '; y = ' + y + '; pname = ' + pname);
// 
if (x>0 && y<7) {
i=y+1;
tItem = x-1 + i.toString(); 
dlog('target list NW ' + tItem);
tList = tList + (tItem + ',');                                 
}                
tList = tList.substr(0,tList.length - 1);  // remove the trailing comma
tArr = tList.split(',')                    // put the csv into an array...                        
dlog('end ' + pname + ' tArr NORTH WEST');
if (tArr[0] != "") {
checkContent(tArr);  //fc
}
//================== kw end of tArr NORTH WEST ==============================================
//====================== kw generate tArr SOUTH EAST========================================
//initialise variables
tItem = "";
tArr = [];
tList = "";
x = origx;
y = origy;

dlog('begin tArr SOUTH EAST with x =  ' + x + '; y = ' + y + '; pname = ' + pname);
//
if (x<7 && y>0) {
i=y-1;
tItem = x+1 + i.toString(); 
dlog('target list SE ' + tItem);
tList = tList + (tItem + ',');                                 
}
tList = tList.substr(0,tList.length - 1);  // remove the trailing comma
tArr = tList.split(',')                    // put the csv into an array...                        
dlog('end ' + pname + ' tArr SOUTH EAST');

if (tArr[0] != "") {
checkContent(tArr);  //fc
}
//================== kw end of tArr SOUTH EAST ==============================================
//====================== kw generate tArr SOUTH WEST ========================================
//initialise variables
tItem = "";
tArr = [];
tList = "";
x = origx;
y = origy;

dlog('begin tArr SOUTH WEST with x =  ' + x + '; y = ' + y + '; pname = ' + pname);
// 
if (x>0 && y>0) {
i=y-1;
tItem = x-1 + i.toString(); 
dlog('target list SW ' + tItem);
tList = tList + (tItem + ',');                                 
}

tList = tList.substr(0,tList.length - 1);  // remove the trailing comma
tArr = tList.split(',')                    // put the csv into an array...                        
dlog('end ' + pname + ' tArr SOUTH WEST');
if (tArr[0] != "") {
checkContent(tArr);  //fc
}
//================== kw end of tArr SOUTH WEST ==============================================
break;
//=================================================================================================

//=================== kb begin tArr EAST ===================================================
case "kb" :

dlog('piece name is ' + pname)
// initialise variables ..
tItem = "";
tArr = [];
tList = "";
x = origx;
y = origy;
// see if the king can castle
// first see if it has moved during the game
//  var ksqid = xy2sqid(originxy);
// var kgif = document.getElementById(ksqid).src;
//  var kgifm = kgif.substr(-5,1);
//  if (kgifm == 1 ) {
//  kwmoved = true ////
//  }
//===============================================================================================
// the king can move like a bishop AND a rook but only one square so we can use their modified code here...
//====================== kb generate tArr EAST ============================================
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
dlog('begin tArr EAST with x =  ' + x + '; y = ' + y + '; pname = ' + pname);
//
// normal 1 sq move
if (x<7) {
i = y;
tItem = x+1 + i.toString();         
dlog('target list east ' + tItem);
tList = tList + (tItem + ',');
}
// castling 2 sq move so king must be at original position = x=4 y=0;

//if (testCastleBlackEast()) {
if (g_kbe) {
i = y;
tItem = x+2 + i.toString();         
dlog('target list east ' + tItem);
tList = tList + (tItem + ',');                                             
}

tList = tList.substr(0,tList.length - 1);  // remove the trailing comma
tArr = tList.split(',')                    // put the csv into an array...
      
dlog('end ' + pname + ' tArr EAST');

if (tArr[0] != "") {
checkContent(tArr);  //fc
}
//================== kb end of tArr EAST ==========================================================
//=================  kb generate tArr WEST ========================================================
// initialise variables
tItem = "";
tArr = [];
tList = "";
x = origx;
y = origy;
//
dlog('begin tArr WEST with  x =  ' + x + '; y = ' + y + '; pname = ' + pname);
//
// normal 1 sq move
if (x>0) {
i = y;
tItem = x-1 + i.toString();         
dlog('target list west ' + tItem);
tList = tList + (tItem + ',');
}

// castling 2 sq move so king must be at original position = x=4 y=0;
//if (testCastleBlackWest()) {
if (g_kbw) {
i = y;
tItem = x-2 + i.toString();         
dlog('target list west ' + tItem);
tList = tList + (tItem + ',');                                             
}

tList = tList.substr(0,tList.length - 1);  // remove the trailing comma
tArr = tList.split(',')                    // put the csv into an array...
      
dlog('end ' + pname + ' tArr WEST');

if (tArr[0] != "") {
checkContent(tArr);  //fc
}
//======================== kb end of tArr WEST =======================================================
//======================== kb generate tArr NORTH ===================================================
// initialise variables
tItem = "";
tArr = [];
tList = "";
x = origx;
y = origy;
//
dlog('begin tArr NORTH with x =  ' + x + '; y = ' + y + '; pname = ' + pname);
//
if (y<7) {
i = y+1;
tItem = x + i.toString();              
dlog('target list north ' + tItem);
tList = tList + (tItem + ',');                                         
}
tList = tList.substr(0,tList.length - 1);  // remove the trailing comma
tArr = tList.split(',')                    // put the csv into an array...
                
dlog('end ' + pname + ' tArr NORTH');

if (tArr[0] != "") {
checkContent(tArr);  //fc
}
//====================== kb end of tArr NORTH =====================================================
//====================== kb generate tArr SOUTH ===================================================
//initialise variables
tItem = "";
tArr = [];
tList = "";
x = origx;
y = origy;
//
dlog('begin tArr SOUTH with x =  ' + x + '; y = ' + y + '; pname = ' + pname);
// 
if (y>0) {
i= y-1;
tItem = x + i.toString();              
dlog('target list south ' + tItem);
tList= tList + (tItem + ',');                                          
}
tList = tList.substr(0,tList.length - 1);  // remove the trailing comma
tArr  = tList.split(',')                   // put the csv into an array...
                
dlog('end ' + pname + ' tArr SOUTH');

if (tArr[0] != "") {
checkContent(tArr);  //fc
}
//=================================== kb end of tArr South =========================================
//==================================== kb end of tArr NORTH EAST ====================================
//initialise variables
tItem = "";
tArr = [];
tList = "";
x = origx;
y = origy;
//
dlog('begin tArr NORTH EAST with x =  ' + x + '; y = ' + y + '; pname = ' + pname);
//
if (x<7 && y<7) {
i = y+1;
tItem = x+1 + i.toString(); 
dlog('target list NE ' + tItem);
tList = tList + (tItem + ',');                                 
}
tList = tList.substr(0,tList.length - 1);  // remove the trailing comma
tArr = tList.split(',')                    // put the csv into an array...                        
dlog('end ' + pname + ' tArr NORTH EAST');

if (tArr[0] != "") {
checkContent(tArr);  //fc
}
//================== kb end of tArr NORTH EAST ==============================================
//====================== kb generate tArr NORTH WEST ========================================
//initialise variables
tItem = "";
tArr = [];
tList = "";
x = origx;
y = origy;

dlog('begin tArr NORTH WEST with x =  ' + x + '; y = ' + y + '; pname = ' + pname);
// 
if (x>0 && y<7) {
i=y+1;
tItem = x-1 + i.toString(); 
dlog('target list NW ' + tItem);
tList = tList + (tItem + ',');                                 
}                
tList = tList.substr(0,tList.length - 1);  // remove the trailing comma
tArr = tList.split(',')                    // put the csv into an array...                        
dlog('end ' + pname + ' tArr NORTH WEST');
if (tArr[0] != "") {
checkContent(tArr);  //fc
}
//================== kb end of tArr NORTH WEST ==============================================
//====================== kb generate tArr SOUTH EAST========================================
//initialise variables
tItem = "";
tArr = [];
tList = "";
x = origx;
y = origy;

dlog('begin tArr SOUTH EAST with x =  ' + x + '; y = ' + y + '; pname = ' + pname);
//
if (x<7 && y>0) {
i=y-1;
tItem = x+1 + i.toString(); 
dlog('target list SE ' + tItem);
tList = tList + (tItem + ',');                                 
}
tList = tList.substr(0,tList.length - 1);  // remove the trailing comma
tArr = tList.split(',')                    // put the csv into an array...                        
dlog('end ' + pname + ' tArr SOUTH EAST');

if (tArr[0] != "") {
checkContent(tArr);  //fc
}
//================== kb end of tArr SOUTH EAST ==============================================
//====================== kb generate tArr SOUTH WEST ========================================
//initialise variables
tItem = "";
tArr = [];
tList = "";
x = origx;
y = origy;

dlog('begin tArr SOUTH WEST with x =  ' + x + '; y = ' + y + '; pname = ' + pname);
// 
if (x>0 && y>0) {
i=y-1;
tItem = x-1 + i.toString(); 
dlog('target list SW ' + tItem);
tList = tList + (tItem + ',');                                 
}

tList = tList.substr(0,tList.length - 1);  // remove the trailing comma
tArr = tList.split(',')                    // put the csv into an array...                        
dlog('end ' + pname + ' tArr SOUTH WEST');
if (tArr[0] != "") {
checkContent(tArr);  //fc
}
//================== kb end of tArr SOUTH WEST ==============================================
break;
//=================================================================================================

//=================================================================================================
case "pw" :
//====================== pw generate tArr NORTH ===================================================
// initialise variables ..
tItem = "";
tArr = [];
tList = "";
x = origx;
y = origy;

dlog('begin pw tArr NORTH with x =  ' + x + '; y = ' + y + '; pname = ' + pname);

switch (y) {
//-------------------------------------------------------------------------------------------------
case 1 :      // white pawn's first move
// 
i = y+1;
tItem = x + i.toString();         
dlog('target list north ' + tItem);
tList = tList + (tItem + ',');

i = y+2;
tItem = x + i.toString();         
dlog('target list north ' + tItem);
tList = tList + (tItem + ',');

//=================================================================================================
// see if a foe pawn is adjacent to (y + 2) square 
// (x + 1) OR (x - 1) 
// ================================================================================================
var epxy1 = "";
var epxy2 = "";
var epcheck1 = "";
var epcheck2 = "";

if (x<7) {
j = x+1;
epxy1 = j + i.toString();

var xy2ixkey = epxy1;
var ix = g_xy2ix_obj[xy2ixkey];
var tname = "n" + ix;
dlog('tname ' + tname)
var telement = document.getElementsByName(tname);
var tcontent = telement[0].src;
epcheck1 = tcontent.substr(-7,3)
}

if (x>0) {
j = x-1;
epxy2 = j + i.toString();

var xy2ixkey = epxy2;
var ix = g_xy2ix_obj[xy2ixkey];
var tname = "n" + ix;
dlog('tname ' + tname)
var telement = document.getElementsByName(tname);
var tcontent = telement[0].src;
epcheck2 = tcontent.substr(-7,3)
}
//-------------------------------------------------------------------------------------------------
//  if there is a black pawn in a square to left or right of white pawns file (x+1 or x-1)
//  and in white pawn's long first move square (y+2) then remember that factby setting g_pw1stmove
//  for reference in the 'putdown' pass of sq_clicked so that a vwhitepawn will also be
//  loaded into the y+1 square on white pawns file (x) if the pawn actually takes is long move to y+2
//  in the event the pawn takes the short move to y+1 we dont need the vwpawn
//-------------------------------------------------------------------------------------------------
if (epcheck1 == "pb0" || epcheck2 == "pb0") {
g_pw1stmove = true;
//document.getElementById('i9').style.backgroundColor = "Red";
}

break;        
//-------------------------------------------------------------------------------------------------
case 2 :      // not white pawn's first move 
case 3 : 
case 4 :
case 5 : 
i = y+1;
tItem = x + i.toString();         
dlog('target list north ' + tItem);
tList = tList + (tItem + ',');
break;
case 6 :
i = y+1;
tItem = x + i.toString();         
dlog('target list north ' + tItem);
tList = tList + (tItem + ',');
//clickmybutton();
showpromomenu();
g_promo_needed = true; // testtest newnew
break;
//-------------------------------------------------------------------------------------------------
default:
dlog('+++ ERROR should not occur');
}         //end of switch  (y)

tList = tList.substr(0,tList.length - 1);   // remove the trailing comma
tArr = tList.split(',')                     // put the csv into an array...
                  
dlog('end pw tArr NORTH');

if (tArr[0] != "") {
checkContentWhitePawnNorth(tArr);  //fc
}
//====================== pw end tArr NORTH ========================================================
//====================== pw generate tArr NORTH EAST ==============================================
// initialise variables ..
tItem = "";
tArr = [];
tList = "";
x = origx;
y = origy;

dlog('begin pw tArr NORTH EAST  with x =  ' + x + '; y = ' + y + '; pname = ' + pname);


i = y+1;
x = x+1;
if (x < 8) {
tItem = x + i.toString();         
dlog('target list north east ' + tItem);
tList = tList + (tItem + ',');
}

tList = tList.substr(0,tList.length - 1);   // remove the trailing comma
tArr = tList.split(',')                     // put the csv into an array...
                  
dlog('end pw tArr NORTH EAST');

if (tArr[0] != "") {
checkContentPawnDiag(tArr);  //fc
}
//====================== pw end tArr NORTH EAST ===================================================
//====================== pw generate tArr NORTH WEST ==============================================
// initialise variables ..
tItem = "";
tArr = [];
tList = "";
x = origx;
y = origy;

dlog('begin pw tArr NORTH WEST  with x =  ' + x + '; y = ' + y + '; pname = ' + pname);


i = y+1;
x = x-1;
if (x > -1) {
tItem = x + i.toString();         
dlog('target list north east ' + tItem);
tList = tList + (tItem + ',');
}

tList = tList.substr(0,tList.length - 1);   // remove the trailing comma
tArr = tList.split(',')                     // put the csv into an array...
                  
dlog('end pw tArr NORTH WEST');

if (tArr[0] != "") {
checkContentPawnDiag(tArr);  //fc
}
//====================== pw end tArr NORTH WESTT ===================================================

break;

//=================================================================================================
case "pb" :
//====================== pb generate tArr SOUTH ===================================================
// initialise variables ..
tItem = "";
tArr = [];
tList = "";
x = origx;
y = origy;

dlog('begin pb tArr SOUTH with x =  ' + x + '; y = ' + y + '; pname = ' + pname);

switch (y) {
//---------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------
case 6 :      // black pawn's first move
// 
i = y-1;
tItem = x + i.toString();         
dlog('target list south ' + tItem);
tList = tList + (tItem + ',');

i = y-2;
tItem = x + i.toString();         
dlog('target list south ' + tItem);
tList = tList + (tItem + ','); 
//---------------------------------------------------------------------------------------------  
// see if a foe pawn is adjacent to (y + 2) square 
// (x + 1) OR (x - 1) 
//---------------------------------------------------------------------------------------------
var epxy1 = "";
var epxy2 = "";
var epcheck1 = "";
var epcheck2 = "";

if (x<7) {
j = x+1;
epxy1 = j + i.toString();

var xy2ixkey = epxy1;
var ix = g_xy2ix_obj[xy2ixkey];

var tname = "n" + ix;
dlog('tname ' + tname)
var telement = document.getElementsByName(tname);
var tcontent = telement[0].src;
epcheck1 = tcontent.substr(-7,3)
}

if (x>0) {
j = x-1;
epxy2 = j + i.toString();

var xy2ixkey = epxy2;
var ix = g_xy2ix_obj[xy2ixkey];
var tname = "n" + ix;
dlog('tname ' + tname)
var telement = document.getElementsByName(tname);
var tcontent = telement[0].src;
epcheck2 = tcontent.substr(-7,3)

}

if (epcheck1 == "pw0" || epcheck2 == "pw0") {
g_pb1stmove = true;
}

break;               
//------------------------------------------------------------------------------------------------
case 5 :      // not black pawn's first move 
case 4 : 
case 3 :
case 2 :
i = y-1;
tItem = x + i.toString();         
dlog('target list south ' + tItem);
tList = tList + (tItem + ',');
break;
case 1 : 
i = y-1;
tItem = x + i.toString();         
dlog('target list south ' + tItem);
tList = tList + (tItem + ',');
//clickmybutton()
showpromomenu()
g_promo_needed = true; // testtest newnew
break;
//-------------------------------------------------------------------------------------------------
default:
dlog('+++ ERROR should not occur');
}        //end of switch (y) 
//-------------------------------------------------------------------------------------------------
tList = tList.substr(0,tList.length - 1);   // remove the trailing comma
tArr = tList.split(',')                     // put the csv into an array...
                  
dlog('end pw tArr SOUTH');

if (tArr[0] != "") {
checkContentBlackPawnSouth(tArr);  //fc
}
//====================== pb generate tArr SOUTH EAST ==============================================
// initialise variables ..
tItem = "";
tArr = [];
tList = "";
x = origx;
y = origy;

dlog('begin tArr SOUTH EAST  with x =  ' + x + '; y = ' + y + '; pname = ' + pname);

i = y-1;
x = x+1;
if (x < 8) {
tItem = x + i.toString();         
dlog('target list north east ' + tItem);
tList = tList + (tItem + ',');
}
tList = tList.substr(0,tList.length - 1);   // remove the trailing comma
tArr = tList.split(',')                     // put the csv into an array...
                  
dlog('end tArr SOUTH EAST');

if (tArr[0] != "") {
checkContentPawnDiag(tArr);  //fc
}
//====================== pb end tArr SOUTH EAST ===================================================
//====================== pb generate tArr SOUTH WEST ==============================================
// initialise variables ..
tItem = "";
tArr = [];
tList = "";
x = origx;
y = origy;

dlog('begin tArr SOUTH WEST  with x =  ' + x + '; y = ' + y + '; pname = ' + pname);

i = y-1;
x = x-1;
if (x > -1) {
tItem = x + i.toString();         
dlog('target list south west ' + tItem);
tList = tList + (tItem + ',');
}
tList = tList.substr(0,tList.length - 1);   // remove the trailing comma
tArr = tList.split(',')                     // put the csv into an array...
                  
dlog('end tArr SOUTH WEST');

if (tArr[0] != "") {
checkContentPawnDiag(tArr);  //fc
}
//====================== pb end tArr SOUTH WEST ==================================================
break;
//-------------------------------------------------------------------------------------------------
default:
dlog('piece type not found')
//-------------------------------------------------------------------------------------------------   
break; 
//=================================================================================================    
}    // end of switch (pname)

return g_tArrUnique;
}       // end of function genTargetList(pname,originxy)

// == end of genTargetList ===

//=================================================================================================
// This is version of checkContent is tailored for a PAWN NORTH mode only
// because PAWN diagonal move is ONLY possible is there is a FOE present in the NE or NW square
// this special code is only called by those particular events
//================================================================================================
function checkContentWhitePawnNorth(tArr) {
var elem;
dlog('*** begin checkContentPawnNorth');
for (elem = 0; elem<tArr.length; elem++) {
dlog('elem ' + elem)
var xy2ixkey = tArr[elem];
var ix = g_xy2ix_obj[xy2ixkey];
var xy = tArr[elem];
var tname = "n" + ix;
const index = tArr.indexOf(xy);
dlog('tname ' + tname)
var telement = document.getElementsByName(tname);
var tcontent = telement[0].src;
var tcolour = tcontent.substr(-6,1)
var mycolour = lsGet("mycolour");
var foecolour = lsGet("foecolour");

switch (tcolour) {
case "n" :
dlog('square xy ' + xy + ' is empty so allow pawn to move');
break; 

case foecolour :
dlog('square xy ' + xy + ' is foe so prevent pawn from move');
//console.log(tArr);
if (index > -1) {
tArr.splice(index, tArr.length);
//console.log(tArr);  
}
break;

case mycolour :
dlog('square xy ' + xy +  ' is friend so prevent pawn from move');
//console.log(tArr);
if (index > -1) {
tArr.splice(index, tArr.length);
//console.log(tArr); 
}
break;

default:
dlog('+++ ERROR xy colour is ' + tcolour + ' this should not occur');
}
dlog('1730 done one element') 
}
dlog('done all elements in tArr so save in g_tArrPruned')
g_tArrPruned = g_tArrPruned.concat(tArr);
dlog('>>>>> set g_tAttPruned to ' + g_tArrPruned.join());
g_tArrUnique = getUnique(g_tArrPruned);  //fc
dlog('<== checkContentBlackPawnNorth(tArr) g_tArrUnique = ' + g_tArrUnique.join());
// checkContentBlackPawnNorth(tArr)
}
//=================================================================================================
//=================================================================================================
// This is version of checkContent is tailored for a PAWN SOUTH mode only
// because PAWN diagonal move is ONLY possible is there is a FOE present in the NE or NW square
// this special code is only called by those particular events
//================================================================================================
function checkContentBlackPawnSouth(tArr) {
var elem;
dlog('*** begin checkContentWhitePawnSouth');
for (elem = 0; elem<tArr.length; elem++) {
dlog('elem ' + elem)
var xy2ixkey = tArr[elem];
var ix = g_xy2ix_obj[xy2ixkey];
var xy = tArr[elem];
var tname = "n" + ix;
const index = tArr.indexOf(xy);
dlog('tname ' + tname)
var telement = document.getElementsByName(tname);
var tcontent = telement[0].src;
var tcolour = tcontent.substr(-6,1)
var mycolour = lsGet("mycolour");
var foecolour = lsGet("foecolour");

switch (tcolour) {
case "n" :
dlog('square xy ' + xy + ' is empty so allow pawn to move');
break; 

case foecolour :
dlog('square xy ' + xy + ' is foe so prevent pawn from move');
//console.log(tArr);
if (index > -1) {
tArr.splice(index, tArr.length);
//console.log(tArr);  
}
break;

case mycolour :
dlog('square xy ' + xy +  ' is friend so prevent pawn from move');
//console.log(tArr);
if (index > -1) {
tArr.splice(index, tArr.length);
//console.log(tArr); 
}
break;

default:
dlog('+++ ERROR xy colour is ' + tcolour + ' this should not occur');
}
dlog('1730 done one element') 
}
dlog('done all elements in tArr so save in g_tArrPruned')
g_tArrPruned = g_tArrPruned.concat(tArr);
dlog('>>>>> set g_tAttPruned to ' + g_tArrPruned.join());
g_tArrUnique = getUnique(g_tArrPruned);  //fc
// end of checkContentBlackPawnSouth(tArr)
dlog('<== checkContentBlackPawnSouth(tArr) g_tArrUnique = ' + g_tArrUnique.join());
}

//=================================================================================================
//
//=================================================================================================
function getUnique(array){
var i;
dlog('*** getUnique');
var uniqueArray = [];
// Loop through array values
for(i=0; i < array.length; i++){
if(uniqueArray.indexOf(array[i]) === -1) {
uniqueArray.push(array[i]);
}
}
//console.log (uniqueArray);
dlog('end getUnique')
return uniqueArray;
}
//=================================================================================================
// This is version of checkContent is tailored for a PAWN diagonal mode only
// because PAWN diagonal move is ONLY possible is there is a FOE present in the NE or NW square
// this special code is only called by those particular events
//================================================================================================
function checkContentPawnDiag(tArr) {
var elem;
dlog('*** begin checkContentPawnDiag');
for (elem = 0; elem<tArr.length; elem++) {
dlog('elem ' + elem)
var xy2ixkey = tArr[elem];
var ix = g_xy2ix_obj[xy2ixkey];
var xy = tArr[elem];
var tname = "n" + ix;
const index = tArr.indexOf(xy);
dlog('tname ' + tname)
var telement = document.getElementsByName(tname);
var tcontent = telement[0].src;

if (tcontent.substr(-7,3) == "pw1") { 
// remember we saw a 'virtual pawn' in case player moves pawn 2 squares 
//g_epSpecial = true;
//g_vPawnXY = xy2ixkey; 
}

var tcolour = tcontent.substr(-6,1)
var mycolour = lsGet("mycolour");
var foecolour = lsGet("foecolour");

switch (tcolour) {
case "n" :
dlog('square xy ' + xy + ' is empty');
//console.log(tArr);
if (index > -1) {
tArr.splice(index, tArr.length); //this is the pawn diag code
//console.log(tArr);  
}
break; 

case foecolour :
dlog('square xy ' + xy + ' is foe');
//console.log(tArr);
if (index > -1) {
tArr.splice(index + 1, tArr.length);
//console.log(tArr);  
}
break;

case mycolour :
dlog('square xy ' + xy +  ' is friend');
//console.log(tArr);
if (index > -1) {
tArr.splice(index, tArr.length);
//console.log(tArr); 
}
break;

default:
dlog('+++ ERROR xy colour is ' + tcolour + ' this should not occur');
}
dlog('1730 done one element') 
}
dlog('done all elements in tArr so save in g_tArrPruned')
g_tArrPruned = g_tArrPruned.concat(tArr);
dlog('>>>>> set g_tAttPruned to ' + g_tArrPruned.join());
g_tArrUnique = getUnique(g_tArrPruned);  //fc
dlog('<== checkContentPawnDiag(tArr) g_tArrUnique = ' + g_tArrUnique.join());
// end of checkContentPawnDiag(tArr)
}
//================================================================================================
// item clicked is a diagnostic function for checking what a clicked object exposes
// so far only called by the 'red circle' button to see what can be done
//=================================================================================================
function ribbon1_item_clicked(obj) { // obj is passed by 'this' for clicked element
console.log('==> ribbon1_item_clicked ' + obj.name);
if (!g_logged_in) {
    //wlog('Please Login')
    wmsg('Please Login')
    return
}
switch (obj.name) {

// handle the buttons on div id="ribbon1"
//-----------------------------------------------------------------------------
case "wrook" :   // PLAY AS WHITE
console.log('==> wrook');
if (myClientId == "w") {
   wmsg('You are playing as white already')
   console.log('You are playing as white already')
   return -1
}
if (g_inhibit_white) {
  console.log('Other player chose White, please choose Black')
  g_inhibit_play_button = true;
  wmsg('Other player chose White, please choose Black');
  document.getElementById("login_msg").innerHTML = 'Other player chose White, please choose Black'
  return -1;
}
if (!g_clientIdSet) {
dlogX('wrook -- g_clientIdSet');
inhibit_other_from_selecting_white();
//document.getElementById("r9pw").style.backgroundColor = "#ff000080";
document.getElementById("r9pw").style.backgroundColor = "#81DD4D80";
setClientId('w');
//amsg('this would be shown on top line of screen mask ');
//display this at bottom of screen mask
bmsg('Black to Move. Click Green Tick');

wmsg('You are playing as White')
document.getElementById("login_msg").innerHTML = 'You are playing as White'
document.getElementById("info_msg").innerHTML = "*** Press Play Chess Button ***"
//document.getElementById("info1.msg").innerHTML = "If you see 'undefined is logged on' Click Login until you see 'b OR w is logged on"
lsSet("mycolour",'w');
lsSet("foecolour",'b');
lsSet("mydisplay_colour",'White');
lsSet("foedisplay_colour",'Black');
//-------------------------------------------------------------------------
var testmydisplaycolour = lsGet("mydisplay_colour");
//alert('mydisplaycolour: ' + testmydisplaycolour);
//-----------------------------------------------------------------------
testCastling(); 
}
break;
//--------------------------------------------------------------------------------
case "g_diag_mode" :   // DIAGNOSTIC MODE TOGGLE
dlog('g_diag_mode');
toggle_g_diag_mode();
break;
//-----------------------------------------------------------------------------
case "brook" :         // PLAY AS BLACK
console.log('==> brook');
if (myClientId == "b") {
   wmsg('You are playing as black already')
   console.log('You are playing as black already')
   return -1
}
if (g_inhibit_black) {
  wmsg('Other player chose Black, please choose White');
  console.log('Other player chose Black, please choose White')
  g_inhibit_play_button = true;
  document.getElementById("login_msg").innerHTML = 'Other player chose Black, please choose White'
  return -1;
}
if (!g_clientIdSet) { 
console.log('brook -- g_clientIdSet');
inhibit_other_from_selecting_black();
//document.getElementById("r9pb").style.backgroundColor = "#ff000080";
document.getElementById("r9pb").style.backgroundColor = "#81DD4D80";
setClientId('b');
wmsg('You are playing as Black')
document.getElementById("login_msg").innerHTML = 'You are playing as Black'
document.getElementById("info_msg").innerHTML = "*** Press Play Chess Button ***"
lsSet("mycolour",'b');
lsSet("foecolour",'w');
lsSet("mydisplay_colour",'Black');
lsSet("foedisplay_colour",'White');
h_order_black();
v_order_black();
testCastling(); 
}
break;
//-------------------------------------------------------------------------------------------------
case "help" :   //HELP
dlog('help');
pushImage("pw0.gif");
//document.getElementById("cap_pwa").src = "pw0.gif";
break;
//-------------------------------------------------------------------------------------------------
case "undo" :    //UNDO MOVE IF NOR SAVED
// add check for next_action here 
dlog('undo');
undo_move();  
dbread();      
dbread_ho();                                      
break;
//-----------------------------------------------------------------------------------------------
case "save" :    //SAVE GAME
dlog('save');
if (!g_allow_save) { wmsg("Save Not Active"); return;}

unscreen_white();
//------------------------------------------------
// new code
//----------------------------------------------
if (iskingincheck() ) {        // prevent save if king is in check
dlog('unable to save - king is in check');
dlog('undo');
undo_move();      //fc  <== this just puts the square backgrounds to original
dbread();         //fc  <== we need to re-read the database to get the 'before move' board image 
dbread_ho();  
return;
}
save_move();      // do the save if king is not in check
save_move_h();
//writelog() 
//    .then((results) => {
//    console.log('return from writelog ==> ' + JSON.stringify(results))
 //   })
g_realThreatArr = []; // added this line and commented out this line in checkRealThreats XXXXX
enable_other(g_from_sq_for_other,g_to_sq_for_other);  // FIXFIX
document.getElementById("next_action").innerHTML = lsGet("foedisplay_colour") + "'s move";
var nextUp = lsGet("foedisplay_colour")
if (nextUp == "White") {whiteToMove()}
if (nextUp == "Black") {blackToMove()}
lsSet("next_action","Await_foe_move")
g_allow_save = false // onlly allow to save once
break;
//-------------------------------------------------------------------------------------------------
case "refresh" :
dlog('refresh');
dbread();  
dbread_ho();
break;
//--------------------------------------------------------------------------------------------------
case "toff_w" :
dlog('toff_w');
break;
//-------------------------------------------------------------------------------------------------
case "rotateb" :
dlog('rotateb');
console.log('rotate_board started');
rotate_board();
break;
//-------------------------------------------------------------------------------------------------
case "vorderb" :
console.log('v order b started');
//v_order_black();
break;
//-------------------------------------------------------------------------------------------------
case "pingo" :
console.log('pingo');
//ping_other();
break;
//-------------------------------------------------------------------------------------------------
case "horderb" :
console.log('h order b started');
//h_order_black();
break;
//-------------------------------------------------------------------------------------------------
case "horderw" :
console.log('h order w started');
//h_order_white();
break;
//-------------------------------------------------------------------------------------------------
case "new" :
var shdBerw0;
dlog('new');
new_game();  // new board
new_game_1();  // empty hospital
shdBerw0 = document.getElementById('a1').src;
dlog('should be RW0 =' + shdBerw0);
dbread();
dbread_ho();
enable_other_after_new();
break;
//-------------------------------------------------------------------------------------------------
default:
dlog('unknown item clicked');   
}
dlog('<== ribbon1_item_clicked') 
}

//-------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------
// end of handling the gui buttons
//-----------------------------------------------------------------------------
// various handlers for other buttons e.g diagnostic
//-----------------------------------------------------------------------------
function item_clicked(obj) { // obj is passed by 'this' for clicked element
dlog('==> item_clicked');

switch (obj.name) {

case "rotate" :
dlog('rotate');
rotate_board();  
dbread();
dbread_ho();  
break;
//---
case "pause"  :
//console.log('start ' + Date.now());
pause(5000);
//console.log('stop  ' +  Date.now());
break
//---
case "rsget" :
dlog('==> rsGet')
var myget = rsGet("ravi")
dlog('rskey "ravi" ' + myget)
break;
//---
case "inhibit_other_white" :
dlog('inhibit_other_white');
inhibit_other_from_selecting_white(); 
break;
//---
case "inhibit_other_black" :
dlog('inhibit_other_black');
inhibit_other_from_selecting_black(); 
break;
//--- should not occur - no caller
//case "enable_other" :
//dlog('enable_other');
//enable_other(); 
//break;
//---
case "checkcontent" :
dlog('checkcontent');
checkContent([]);  
break;
//---
case "fp" :
dlog('fp');
$("#tabstrip").show();
break;
//---
case "dbread" :
dlog('dbread');
dbread(); 
dbread_ho(); // NEW
break;
//---
case "txA" :
dlog('txA');
txMsg('001,001,p1,p2,p3,p4,doNext');  
break;
//---
case "testthreats" :
dlog('testthreats pressed');
var pname = "zz0"
var pxy = document.getElementById("idxy").value;
g_threatTarget = pxy
dlog('calling isSqThreatened(' + pname + ' , ' + pxy );
isSqThreatened(pname,pxy); 
break;
//---
case "testthreats2" :
dlog('testthreats2 pressed');
var pname = "zz0"
var pxy = document.getElementById("idxy2").value;
g_threatTarget = pxy
dlog('calling isSqThreatened(' + pname + ' , ' + pxy );
var realThreats = [];
realThreats =  isSqThreatened(pname,pxy); 
dlog('returned value for isSqThreatened is ' +  realThreats.join());
break;
//---
case "iskingincheck" :
dlog('iskingincheck pressed');
iskingincheck();
var sf3 = 3;
break;
//---
case "testlog" :
dlog('*** --- test log --- ****');
break;
//---
case "clicksave" :
dlog('===> clicksave');
clicksave();
break;
//---
case "dbread_sync" :
var myresult = dbread_sync();
dlog('myresult ' + myresult);
var sf1 = 1;
break;
//---
case "setclientid_w" :
dlog('==> setclientid(w)');
setClientId('w')
dlog('<== setclientid(b)');
break;
//---
case "setclientid_b" :
dlog('==> setclientid(b)');
setClientId('b')
dlog('<== setclientid(b)');
break;
//---  
case "save" :
dlog('==> save');
g_bi_csv = g_bi_ar.join();
dbwrite_move_status(g_bi_csv);
//---
g_hi_csv = g_hi_ar.join();
dbwrite_move_hospital(g_hi_csv);
dlog('<== save')
break;
//---  
default:
dlog('unknown item clicked');   
}
dlog('<== item_clicked') 
}

function new_game() {
  dlog('==> new_game()');
  var uchoice;
  uchoice = popPrompt('This will set up the board for a new game', 'Please set up a new game')
  
  if (uchoice != 'Please set up a new game') {
  return -1;
  }
  // user is happy to reset game to new status so do it...
  // reset variables
  dlog('reset ==> g_validTargets_arr = []  g_tArrPruned = []  g_tArrUnique = []')
  g_validTargets_arr = [];
  g_tArrPruned = [];
  dlog('>>>>> set g_tAttPruned to ' + g_tArrPruned.join());
  g_tArrUnique = [];
  
  var row_id,row_data1,row_data2
  //=================================================================================================
  // hard code row_id
  row_id = 1;
  // hard code row_data
  var rd1 = "rw0.gif,nw0.gif,bw0.gif,qw0.gif,kw0.gif,bw0.gif,nw0.gif,rw0.gif," 
  var rd2 = "pw0.gif,pw0.gif,pw0.gif,pw0.gif,pw0.gif,pw0.gif,pw0.gif,pw0.gif," 
  var rd3 = "en0.gif,en0.gif,en0.gif,en0.gif,en0.gif,en0.gif,en0.gif,en0.gif,"
  var rd4 = "en0.gif,en0.gif,en0.gif,en0.gif,en0.gif,en0.gif,en0.gif,en0.gif,"
  var rd5 = "en0.gif,en0.gif,en0.gif,en0.gif,en0.gif,en0.gif,en0.gif,en0.gif,"
  var rd6 = "en0.gif,en0.gif,en0.gif,en0.gif,en0.gif,en0.gif,en0.gif,en0.gif,"
  var rd7 = "pb0.gif,pb0.gif,pb0.gif,pb0.gif,pb0.gif,pb0.gif,pb0.gif,pb0.gif,"
  var rd8 = "rb0.gif,nb0.gif,bb0.gif,qb0.gif,kb0.gif,bb0.gif,nb0.gif,rb0.gif,"
  row_data1 = rd1 + rd2 + rd3 + rd4 + rd5 + rd6 + rd7 + rd8;
  row_data2 = {"status":"NEW BOARD TEST","timestamp":"value2"}
  row_saver_uid = "n"  // set saver_uid to "n" to indicate freash board was saved to row id=1
  //=================================================================================================
  var data = {row_id: row_id, row_data1: row_data1, row_data2: row_data2, row_saver_uid: row_saver_uid }
  //---
  $.ajax( 
  {
  type: "POST",
  url:  "https://secret-shore-85438.herokuapp.com/updbim",
  async: false,  //  <================== sync request
  dataType : "json",
  contentType: "application/json; charset=utf-8",
  data : JSON.stringify(data),
  success : function(result) {
  //var resData = result;
  (function() { 
  dlog('*** new game write done');
  })()
  },
//If there was no resonse from the server
error: function(jqXHR, textStatus, errorThrown){
console.log('error ' + jqXHR +';'+ textStatus +';'+ errorThrown);
},
//capture the request before it was sent to server
beforeSend: function(jqXHR, settings){
console.log('before send  ' + jqXHR +';'+ settings);
},
//this is called after the response or error functions are finished
//so that we can take some action
complete: function(jqXHR, textStatus){
console.log('complete ' + jqXHR +';'+ textStatus);
}
});   // end of ajax call

dlog("new game ended");       
}

//=================================================================================================
// function new_game_1() - synchronous version
//=================================================================================================
// function new_game_1()
// *** WRITE initial data to database
// values hardcoded in the function...
//  row:    id=2 
//  column: board_image = newly set up hospital  (as CSV string)
//  column: board_status = status=NEW, timestamp=tod; (as JSON object)
// called by: 
//   item_clicked(obj) object.name case="new"
//=================================================================================================
//=================================================================================================
// function new_game_1()
//=================================================================================================
function new_game_1() {
  dlog('==> new_game_1()');
  var row_id,row_data1,row_data2
  //=================================================================================================
  // hard code row_id
  row_id = 2;
  // hard code row_data
  var ho1 = "hw0.gif,hw0.gif,hw0.gif,hw0.gif,hw0.gif,hw0.gif,hw0.gif," 
  var ho2 = "hw0.gif,hw0.gif,hw0.gif,hw0.gif,hw0.gif,hw0.gif,hw0.gif,hw0.gif," 
  var ho3 = "hb0.gif,hb0.gif,hb0.gif,hb0.gif,hb0.gif,hb0.gif,hb0.gif," 
  var ho4 = "hb0.gif,hb0.gif,hb0.gif,hb0.gif,hb0.gif,hb0.gif,hb0.gif,hb0.gif,"  
  row_data1 = ho1 + ho2 + ho3 + ho4;
  row_data2 = {"status":"NEW HOSPITAL","timestamp":"value2"}
  //=================================================================================================
  var data = {row_id: row_id, row_data1: row_data1, row_data2: row_data2}
  //---
  $.ajax( 
  {
  type: "POST",
  url:  "https://secret-shore-85438.herokuapp.com/updbim",
  async: false,  //  <================== sync request
  dataType : "json",
  contentType: "application/json; charset=utf-8",
  data : JSON.stringify(data),
  success : function(result) {
  //var resData = result;
  (function() { 
  dlog('*** new game write done');
  })()
  },
//If there was no resonse from the server
error: function(jqXHR, textStatus, errorThrown){
console.log('error ' + jqXHR +';'+ textStatus +';'+ errorThrown);
},
//capture the request before it was sent to server
beforeSend: function(jqXHR, settings){
console.log('before send  ' + jqXHR +';'+ settings);
},
//this is called after the response or error functions are finished
//so that we can take some action
complete: function(jqXHR, textStatus){
console.log('complete ' + jqXHR +';'+ textStatus);
}
});   // end of ajax call

dlog("new game ended");       
}
//=================================================================================================
// function dbread() - this uses synchronous ajax call
//=================================================================================================        
function dbread() {
dlog('==> dbread');

// reset variables
dlog('reset ==> g_validTargets_arr = []  g_tArrPruned = []  g_tArrUnique = []')
g_validTargets_arr = [];
g_tArrPruned = [];
g_tArrUnique = [];

var row_id = 1;
var data = {row_id: row_id}
var response_string;
//---
$.ajax( 
{
type: "POST",
url:  "https://secret-shore-85438.herokuapp.com/dbread",
async: false,  //  <================== sync request
dataType : "json",
contentType: "application/json; charset=utf-8",
data : JSON.stringify(data),
success : function(result) {
var resData = result;
var resDataArr = result.results;
var resDataArr_0_str = JSON.stringify(resDataArr[0]);
response_string = resDataArr_0_str
var resDataArr_0_obj = JSON.parse(resDataArr_0_str); 
dlog('res data array ' + resDataArr_0_str);
// 'current' means 'as read from data base'
//
//
var current_board_image =  resDataArr_0_obj.board_image;
//
//var current_board_status =  resDataArr_0_obj.board_status; <== may retire the board status code
//
g_bi_csv = current_board_image;
//
//var bs_csv = current_board_status; <== may retire the board status code
//load each csv into its own array with string.split
//
g_bi_ar = g_bi_csv.split(',');
//
//we now have the updated version of the board so we need to write that into Local Storage
//
//------------------------------
dlog('*** dbread - server return from POST');
dlog('*** dbread write board image into local storage');
//
//we now have the updated version of the board so we need to write that into Local Storage
//------------------------------
//var shdBerw0x = document.getElementById('a1').src;
//dlog('should be RW0 =' + shdBerw0x);
//
let g_bd_arr = g_bi_ar;     
//      
// set up local storage key:value e.g. --- 'a1' : 'rw.gif' ---
//
for (var i = 0; i<g_bd_arr.length; i++) {
lsSet(g_sq_arr[i],g_bd_arr[i]);
}
//-----------------------------------------------
// see if any pawn are exposed fo en passant 
//-----------------------------------------------
g_epW = g_bi_ar.indexOf("pw1.gif");
dlog('g_epW is ' + g_epW);

g_epB = g_bi_ar.indexOf("pb1.gif");
dlog('g_epB is ' + g_epB);
//-----------------------------------------------
//
//----------------------------------------------- 	    
(function() {
//var ct = 0; 
//
dlog('Current Board Image from DB is: ' + current_board_image);
//
update_board(); 
dlog('*** board update done');
})()
},


//If there was no resonse from the server
error: function(jqXHR, textStatus, errorThrown){
//console.log('error ' + jqXHR +';'+ textStatus +';'+ errorThrown);
},

//capture the request before it was sent to server
beforeSend: function(jqXHR, settings){
//console.log('before send  ' + jqXHR +';'+ settings);
},

//this is called after the response or error functions are finished
//so that we can take some action
complete: function(jqXHR, textStatus){
//console.log('complete ' + jqXHR +';'+ textStatus);
}

}

);
dlog('<== dbread()');
//console.log('2');
//console.log('response string is ' + response_string);
return response_string;
}

//==

//=================================================================================================
// function dbread_ho() - this uses synchronous ajax call
//=================================================================================================        
function dbread_ho() {
  dlog('==> dbread_ho');
  
  // reset variables
  dlog('reset ==> g_validTargets_arr = []  g_tArrPruned = []  g_tArrUnique = []')
  g_validTargets_arr = [];
  g_tArrPruned = [];
  g_tArrUnique = [];
  
  var row_id = 2;
  var data = {row_id: row_id}
  var response_string;
  //---
  $.ajax( 
  {
  type: "POST",
  url:  "https://secret-shore-85438.herokuapp.com/dbread",
  async: false,  //  <================== sync request
  dataType : "json",
  contentType: "application/json; charset=utf-8",
  data : JSON.stringify(data),
  success : function(result) {
  var resData = result;
  var resDataArr = result.results;
  var resDataArr_0_str = JSON.stringify(resDataArr[0]);
  response_string = resDataArr_0_str
  var resDataArr_0_obj = JSON.parse(resDataArr_0_str); 
  dlog('res data array ' + resDataArr_0_str);
  // 'current' means 'as read from data base'
  //
  //
  var current_hospital_image =  resDataArr_0_obj.board_image;
  //
  g_hi_csv = current_hospital_image;
  //
  //load each csv into its own array with string.split
  //
  g_hi_ar = g_hi_csv.split(',');
  //
  //we now have the updated version of the hospital so we need to write that into Local Storage
  //
  //------------------------------
  dlog('*** dbread_ho - server return from POST');
  dlog('*** dbread_ho write board image into local storage');
  //
  let g_hd_arr = g_hi_ar;     
  //      
  // set up local storage key:value e.g. --- 'a1' : 'rw.gif' ---
  //
  for (var i = 0; i<g_hd_arr.length; i++) {
  lsSet(g_sh_arr[i],g_hd_arr[i]);
  }
  // see how many empty hospital beds we have
//-----------------------------------------------
g_cap_w = g_hi_ar.indexOf("hw0.gif")
wlog('w after db read' + g_cap_w);

g_cap_z_unadjusted = g_hi_ar.indexOf("hb0.gif");
g_cap_z = g_cap_z_unadjusted - 15;
wlog('z after db read' + g_cap_z);
//-----------------------------------------------
//
//-----------------------------------------------
	    
  (function() {
  //var ct = 0; 
  //
  dlog('Current Hospital Image from DB is: ' + current_hospital_image);
  //
  update_hospital(); 
  dlog('*** hospital update done');
  })()
  },
  
  
  //If there was no resonse from the server
  error: function(jqXHR, textStatus, errorThrown){
  //console.log('error ' + jqXHR +';'+ textStatus +';'+ errorThrown);
  },
  
  //capture the request before it was sent to server
  beforeSend: function(jqXHR, settings){
  //console.log('before send  ' + jqXHR +';'+ settings);
  },
  
  //this is called after the response or error functions are finished
  //so that we can take some action
  complete: function(jqXHR, textStatus){
  //console.log('complete ' + jqXHR +';'+ textStatus);
  }
  
  }
  
  );
  dlog('<== dbread_ho()');
  //console.log('2');
  //console.log('response string is ' + response_string);
  return response_string;
  }
  
  //==

//=================================================================================================
// Utilities
//=================================================================================================
//=================================================================================================
// popPrompt is a utility - keep it
//=================================================================================================
function popPrompt(prmsg, prsug) {
dlog('*** begin popPrompt');
var txt;
var result = prompt(prmsg, prsug);
if (result == null || result == "") {
txt = "User cancelled the prompt.";
} else {
txt = "You selected " + result;
}
return result;
}

//=================================================================================================
// setClientId(myid) 
// Called by wrook or brook
// set up colour, rotate board for black, read the last saved board image from the data base
//=================================================================================================
function setClientId(myid) {
dlog('==> setclientid ' + myid)
socket.emit('change_clientid', {clientid : myid}) // tell socket server my id
g_clientIdSet = true;
document.getElementById("info_msg").innerHTML = "myid " + myid;
switch (myid) {
case "w" :
g_display_colour = "White";
break;
case "b" :
g_display_colour = "Black";
break;
case "u" :
g_display_colour = "Not Set";
break;
default :
break
}


var workClientId = myid;
myClientId = workClientId;
document.getElementById("myclientid").innerHTML = g_display_colour;

if (workClientId == "w") {
lsSet("next_action", "pickup");
document.getElementById("next_action").innerHTML = "White's move.";
whiteToMove(); 
dlog('next_action is ' + lsGet("next_action"));
dbread();
dbread_ho(); 


}
if (workClientId == "b") {
lsSet("next_action" , "initial");
document.getElementById("next_action").innerHTML = "White's move.";
whiteToMove();
dlog('next_action is ' + lsGet("next_action"));
rotate_board();
dbread();   
dbread_ho();
}

dlog('<== setclientid ' + myid)

}

//=================================================================================================
//
//=================================================================================================   
function update_board() {
var i;
dlog('==> update_board')
//var before_move_board_arr = g_bi_ar; 
for (i = 0; i<g_sq_arr.length; i++) {
var img = g_bi_ar[i]; 
document.getElementById(g_sq_arr[i]).src = img;
}
dlog('board update done')
dlog('************************************')
g_pih = "no";
dlog('<== update_board')
}

//=================================================================================================
//
//=================================================================================================   
function update_hospital() {
  var i;
  dlog('==> update_hospital')
  for (i = 0; i<g_sh_arr.length; i++) {
  var img = g_hi_ar[i]; 
  document.getElementById(g_sh_arr[i]).src = img;
  }
  dlog('hospital update done')
  dlog('************************************')
  g_pih = "no";
  dlog('<== update_hospital')
  }
//=================================================================================================
//=================================================================================================
// is the king in check
// find the xy location of the player's king
// call isSqThreatened() 
// results are posted in g_realThreatArr[]
//=================================================================================================
function iskingincheck() {
dlog('==> iskingincheck()');
var myk_locxy;
var kw0_loc;
var kw0_locxy;
var kw1_loc;
var kw1_locxy;
var kb0_loc;
var kb0_locxy;
var kb1_loc;
var kb1_locxy;
var mycolour = lsGet("mycolour")
var kingincheck = false;

if (mycolour == 'w') {

kw0_loc = g_bi_ar.indexOf('kw0.gif');
kw0_locxy = ix2xy(kw0_loc);
if (kw0_locxy > -1) {
dlog('white king 0' )
myk_locxy = kw0_locxy;
isSqThreatened('zz0',kw0_locxy);  
if (g_realThreatArr.length > 0) {
wmsg('white king is in check !!!')
hiLiteK(kw0_locxy,"red");
play("check");
kingincheck = true;
}else{
wmsg('.')
kingincheck = false;
}
}

kw1_loc = g_bi_ar.indexOf('kw1.gif');
kw1_locxy = ix2xy(kw1_loc);
if (kw1_locxy > -1) {
dlog('white king 1' )
myk_locxy = kw1_locxy;
isSqThreatened('zz0',kw1_locxy);  
if (g_realThreatArr.length > 0) {
wmsg('white king is in check !!!')
hiLiteK(kw1_locxy,"red");
play("check");
kingincheck = true;
}else{
  wmsg('.')
  kingincheck = false;
}
}
}

if (mycolour == 'b') {

var kb0_loc = g_bi_ar.indexOf('kb0.gif');
var kb0_locxy = ix2xy(kb0_loc);
if (kb0_locxy > -1) {
myk_locxy = kb0_locxy;
dlog('black king 0' )
isSqThreatened('zz0',kb0_locxy);  
if (g_realThreatArr.length > 0) {
wmsg('black king is in check !!!')
hiLiteK(kb0_locxy,"red");
play("check");
kingincheck = true;
}else{
  wmsg('.')
  kingincheck = false;
}
}

var kb1_loc = g_bi_ar.indexOf('kb1.gif');
var kb1_locxy = ix2xy(kb1_loc);
if (kb1_locxy > -1) {
dlog('black king 1' )
myk_locxy = kb1_locxy;
isSqThreatened('zz0',kb1_locxy)  
if (g_realThreatArr.length > 0) {
wmsg('black king is in check !!!')
hiLiteK(kb1_locxy,"red");
play("check");
kingincheck = true;
}else{
  wmsg('.')
  kingincheck = false;
}
}

}
dlog('<== iskingincheck()')
return kingincheck;
}

//================================================================================================
// function isSqThreatened
// this is almost the same as genTargetList but it acts as if the piece was a 'joker'
// with the abilities of every piece
// - actually only queen's (vertical and diagonal) and knight's moves are needed)
// - every possible square that could possibly reach the originxy square is put in g_threatArr[]
// - this fuction calls checkContestTest() for each 'pass' (north,south etc...) which 
// removes all but 'foe' squares from g_threatArr[]
//================================================================================================
function isSqThreatened(pname,originxy) {
dlog('==> isSqThreatened(' + pname + ' , ' + originxy );
dlog('generate list of possible threats on square' + originxy + ' and ' + pname);

var i;
var j;
var tItem = "";
var tArr = [];
var tList = "";
var x = origx;
var y = origy;
var origin = parseInt(originxy);                
var origx = parseInt(originxy.substr(0,1));    
var origy = parseInt(originxy.substr(1,1));    
var ptype = pname.substr(0,1);                  
var pcolour = pname.substr(1,1);                

dlog('piece name is ' + pname);
//====================== zz0 generate tArr EAST =====================================================
// initialise variables ..
tItem = "";
tArr = [];
tList = "";
x = origx;
y = origy;
g_threatArr = [];
g_threatArrUnique = [];
g_threatArrPruned = [];
dlog('>>>>> set g_threatArrPruned to ' + g_threatArrPruned.join());
//
//----------------------------------------------------------------------------
dlog('see if a square is threatened by foe')

//====================== tw0 generate tArr EAST==================================================
dlog('begin tArr EAST with x =  ' + x + '; y = ' + y + '; pname = ' + pname);
//
for (i=x+1;i<8;i++) {               
tItem = i + y.toString();           
dlog('target list east ' + tItem);
tList = tList + (tItem + ',');                                         
}

tList = tList.substr(0,tList.length - 1);  // remove the trailing comma
tArr = tList.split(',')                    // put the csv into an array...
          
dlog('end ' + pname + ' tArr EAST');

if (tArr[0] != "") {
checkContentTest(tArr);  //fc
}
//================== tw0 end of tArr EAST =========================================================
//==================  tw0 begin tArr WEST  ========================================================
// initialise variables
tItem = "";
tArr = [];
tList = "";
x = origx;
y = origy;
//
dlog('begin tArr WEST with  x =  ' + x + '; y = ' + y + '; pname = ' + pname);
//
for (i=x-1;i>-1;i--) {                       // get squares to west of origin
tItem = i + y.toString();                   // i = 3 ; decremeni i to 0 so x values are 2,1,0
dlog('target list west ' + tItem);
tList = tList + (tItem + ',');         // we get a a csv like this "25,15,05,"                                
}
tList = tList.substr(0,tList.length - 1);  // remove the trailing comma
tArr = tList.split(',')                     // put the csv into an array...
                                                        
dlog('end ' + pname + ' tArr WEST');

if (tArr[0] != "") {
checkContentTest(tArr);  //fc
}
//======================== tw0 end of tArr WEST ===================================================
//======================== tw0 begin tArr NORTH ===================================================
// initialise variables
tItem = "";
tArr = [];
tList = "";
x = origx;
y = origy;
//
dlog('begin tArr NORTH with x =  ' + x + '; y = ' + y + '; pname = ' + pname);
//
for (i=y+1;i<8;i++) {                       // get squares to north of origin
tItem = x + i.toString();                         // i = 6 ; increment i up to 7 - so y values are 6,7
dlog('target list north ' + tItem);
tList = tList + (tItem + ',');         // we get a a csv like this "36,37,"                                
}
tList = tList.substr(0,tList.length - 1);  // remove the trailing comma
tArr = tList.split(',')                    // put the csv into an array...
                  
dlog('end ' + pname + ' tArr NORTH');

if (tArr[0] != "") {
checkContentTest(tArr);  //fc
}
//====================== tw0 end of tArr NORTH ====================================================
//====================== tw0 begin tArr SOUTH  ====================================================
//initialise variables
tItem = "";
tArr = [];
tList = "";
x = origx;
y = origy;
//
dlog('begin tArr SOUTH with x =  ' + x + '; y = ' + y + '; pname = ' + pname);
// 
for (i=y-1;i>-1;i--) {                       // get squares on left of origin
tItem = x + i.toString();              // i = 5 ; decrement i  to 0 - so y values are 4,3,2,1,0
dlog('target list south ' + tItem);
tList= tList + (tItem + ',');          // we get a a csv like this"34,33,32,31,30,"                                
}
tList = tList.substr(0,tList.length - 1);  // remove the trailing comma
tArr  = tList.split(',')                   // put the csv into an array...
                  
dlog('end ' + pname + ' tArr SOUTH');

if (tArr[0] != "") {
checkContentTest(tArr);  //fc
}
//=================================== tw0 end of tArr South =======================================
//==================================== tw0 begin tArr North East===================================
//initialise variables
tItem = "";
tArr = [];
tList = "";
x = origx;
y = origy;
//

dlog('begin tArr NORTH EAST with x =  ' + x + '; y = ' + y + '; pname = ' + pname);
//
for (i = x+1, j = y+1; (i < 8 && j < 8)  ; i++, j++) {
tItem = i + j.toString(); 
dlog('target list NE ' + tItem);
tList = tList + (tItem + ',');                                 
}

tList = tList.substr(0,tList.length - 1);  // remove the trailing comma
tArr = tList.split(',')                    // put the csv into an array...                        
dlog('end ' + pname + ' tArr NORTH EAST');

if (tArr[0] != "") {
checkContentTest(tArr); //fc
}
//====================== tw0 end of tArr NORTH EAST ===============================================
//====================== tw0 begin tArr NORTH WEST ================================================
//initialise variables
tItem = "";
tArr = [];
tList = "";
x = origx;
y = origy;

dlog('begin tArr NORTH WEST with x =  ' + x + '; y = ' + y + '; pname = ' + pname);
// 
for (i = x-1, j = y+1; (i > -1 && j < 8)  ; i--, j++) {
tItem = i + j.toString(); 
dlog('target list NW ' + tItem);
tList = tList + (tItem + ',');                                 
}                   

tList = tList.substr(0,tList.length - 1);  // remove the trailing comma
tArr = tList.split(',')                    // put the csv into an array...                        
dlog('end ' + pname + ' tArr NORTH WEST');
if (tArr[0] != "") {
checkContentTest(tArr);  //fc
}
//====================== tw0 end of tArr NORTH WEST ===============================================
//====================== tw0 begin tArr SOUTH EAST=================================================
//initialise variables
tItem = "";
tArr = [];
tList = "";
x = origx;
y = origy;

dlog('begin tArr SOUTH EAST with x =  ' + x + '; y = ' + y + '; pname = ' + pname);
//
for (i = x+1, j = y-1; (i < 8 && j > -1)  ; i++, j--) {
tItem = i + j.toString(); 
dlog('target list SE ' + tItem);
tList = tList + (tItem + ',');                                 
}

tList = tList.substr(0,tList.length - 1);  // remove the trailing comma
tArr = tList.split(',')                    // put the csv into an array...                        
dlog('end ' + pname + ' tArr SOUTH EAST');

if (tArr[0] != "") {
checkContentTest(tArr);  //fc
}
//====================== tw0 end of tArr SOUTH EAST ===============================================
//====================== tw0 begin tArr SOUTH WEST ================================================
//initialise variables
tItem = "";
tArr = [];
tList = "";
x = origx;
y = origy;

dlog('begin tArr SOUTH WEST with x =  ' + x + '; y = ' + y + '; pname = ' + pname);
// 
for (i = x-1, j = y-1; (i > -1 && j > -1)  ; i--, j--) {
tItem = i + j.toString(); 
dlog('target list SW ' + tItem);
tList = tList + (tItem + ',');                                 
}                   

tList = tList.substr(0,tList.length - 1);  // remove the trailing comma
tArr = tList.split(',')                    // put the csv into an array...                        
dlog('end ' + pname + ' tArr SOUTH WEST');
if (tArr[0] != "") {
checkContentTest(tArr);  //fc
}
//================== tw0 end of tArr SOUTH WEST ===================================================

//=================================================================================================
// >>>>>>>  Knight's Move for tw0  <<<<<<<<<<<<<<<<<
//====================== tw0 generate tArr NORTH EAST =============================================
// initialise variables ..
tItem = "";
tArr = [];
tList = "";
x = origx;
y = origy;

dlog('begin tArr NORTH EAST with x =  ' + x + '; y = ' + y + '; pname = ' + pname);

//-------------------------------------------------------------------------------------------------
i = y+2;
x = x+1;
if (i < 8 && x < 8) {
tItem = x + i.toString();         
dlog('target list north east ' + tItem);
tList = tList + (tItem + ',');
}                  
//-------------------------------------------------------------------------------------------------

tList = tList.substr(0,tList.length - 1);   // remove the trailing comma
tArr = tList.split(',')                     // put the csv into an array...
                
dlog('end nw tArr NORTH EAST');

if (tArr[0] != "") {
checkContentTest(tArr);  //fc
}
//====================== tw0 end tArr NORTH EAST ===================================================
//====================== tw0 generate tArr NORTH WEST ==============================================
// initialise variables ..
tItem = "";
tArr = [];
tList = "";
x = origx;
y = origy;

dlog('begin tArr NORTH WEST with x =  ' + x + '; y = ' + y + '; pname = ' + pname);

//-------------------------------------------------------------------------------------------------
i = y+2;
x = x-1;
if (i < 8 && x > -1) {
tItem = x + i.toString();         
dlog('target list north west ' + tItem);
tList = tList + (tItem + ',');
}                    
//-------------------------------------------------------------------------------------------------

tList = tList.substr(0,tList.length - 1);   // remove the trailing comma
tArr = tList.split(',')                     // put the csv into an array...
                
dlog('end nw tArr NORTH WEST');

if (tArr[0] != "") {
checkContentTest(tArr);  //cf
}
//====================== tw0 end tArr NORTH WEST ===================================================
//====================== tw0 generate tArr EAST NORTH ==============================================
// initialise variables ..
tItem = "";
tArr = [];
tList = "";
x = origx;
y = origy;

dlog('begin tArr EAST NORTH with x =  ' + x + '; y = ' + y + '; pname = ' + pname);

//-------------------------------------------------------------------------------------------------
i = y+1;
x = x+2;
if (i < 8 && x < 8) {
tItem = x + i.toString();         
dlog('target list east north ' + tItem);
tList = tList + (tItem + ',');
}                    
//-------------------------------------------------------------------------------------------------

tList = tList.substr(0,tList.length - 1);   // remove the trailing comma
tArr = tList.split(',')                     // put the csv into an array...
                
dlog('end nw tArr EAST NORTH');

if (tArr[0] != "") {
checkContentTest(tArr);  //fc
}
//====================== tw0 end tArr EAST NORTH ===================================================
//====================== tw0 generate tArr EAST SOUTH ==============================================
// initialise variables ..
tItem = "";
tArr = [];
tList = "";
x = origx;
y = origy;

dlog('begin tArr EAST SOUTH with x =  ' + x + '; y = ' + y + '; pname = ' + pname);

//-------------------------------------------------------------------------------------------------
i = y-1;
x = x+2;
if (i > -1 && x < 8) {
tItem = x + i.toString();         
dlog('target list east south ' + tItem);
tList = tList + (tItem + ',');
}                    
//-------------------------------------------------------------------------------------------------

tList = tList.substr(0,tList.length - 1);   // remove the trailing comma
tArr = tList.split(',')                     // put the csv into an array...
                
dlog('end nw tArr EAST SOUTH');

if (tArr[0] != "") {
checkContentTest(tArr);  //fc
}
//====================== tw0 end tArr EAST SOUTH ===================================================
//====================== tw0 generate tArr SOUTH EAST ==============================================
// initialise variables ..
tItem = "";
tArr = [];
tList = "";
x = origx;
y = origy;

dlog('begin tArr SOUTH EAST with x =  ' + x + '; y = ' + y + '; pname = ' + pname);

//-------------------------------------------------------------------------------------------------
i = y-2;
x = x+1;
if (i > -1 && x < 8) {
tItem = x + i.toString();         
dlog('target list south east ' + tItem);
tList = tList + (tItem + ',');
}                   
//-------------------------------------------------------------------------------------------------

tList = tList.substr(0,tList.length - 1);   // remove the trailing comma
tArr = tList.split(',')                     // put the csv into an array...
                
dlog('end nw tArr SOUTH EAST');

if (tArr[0] != "") {
checkContentTest(tArr);  //fc
}
//====================== tw0 end tArr SOUTH EAST ===================================================
//====================== tw0 generate SOUTH WEST  ==================================================
// initialise variables ..
tItem = "";
tArr = [];
tList = "";
x = origx;
y = origy;

dlog('begin tArr SOUTH WEST with x =  ' + x + '; y = ' + y + '; pname = ' + pname);

//-------------------------------------------------------------------------------------------------
i = y-2;
x = x-1;
if (i > -1 && x > -1) {
tItem = x + i.toString();         
dlog('target list south west ' + tItem);
tList = tList + (tItem + ',');
}                    
//-------------------------------------------------------------------------------------------------

tList = tList.substr(0,tList.length - 1);   // remove the trailing comma
tArr = tList.split(',')                     // put the csv into an array...
                
dlog('end nw tArr SOUTH WEST');

if (tArr[0] != "") {
checkContentTest(tArr);  //fc
}
//====================== tw0 end tArr SOUTH WEST  ==================================================
//====================== tw0 generate tArr WEST SOUTH ==============================================
// initialise variables ..
tItem = "";
tArr = [];
tList = "";
x = origx;
y = origy;

dlog('begin tArr WEST SOUTH with x =  ' + x + '; y = ' + y + '; pname = ' + pname);

//-------------------------------------------------------------------------------------------------
i = y-1;
x = x-2;
if (i > -1 && x > -1) {
tItem = x + i.toString();         
dlog('target list west south ' + tItem);
tList = tList + (tItem + ',');
}                   
//-------------------------------------------------------------------------------------------------

tList = tList.substr(0,tList.length - 1);   // remove the trailing comma
tArr = tList.split(',')                     // put the csv into an array...
                
dlog('end nw tArr WEST SOUTH');

if (tArr[0] != "") {
checkContentTest(tArr);  //fc
}
//====================== tw0 end tArr WEST SOUTH  ==================================================
//====================== two generate tArr  WEST NORTH =============================================
// initialise variables ..
tItem = "";
tArr = [];
tList = "";
x = origx;
y = origy;

dlog('begin tArr WEST NORTH with x =  ' + x + '; y = ' + y + '; pname = ' + pname);

//------------------------------------------------------------------------------------------------
i = y+1;
x = x-2;
if (i < 8 && x > -1) {
tItem = x + i.toString();         
dlog('target list west north ' + tItem);
tList = tList + (tItem + ',');
}                   
//-------------------------------------------------------------------------------------------------

tList = tList.substr(0,tList.length - 1);   // remove the trailing comma
tArr = tList.split(',')                     // put the csv into an array...
                
dlog('end nw tArr WEST NORTH');

if (tArr[0] != "") {
checkContentTest(tArr);  //fc
}

dlog('*** g_threatArr = ' + g_threatArr.join());
dlog('*** calling checkRealThreats ' + g_threatTarget);
var realThreats = [];
g_threatTarget = originxy;
realThreats = checkRealThreats(g_threatTarget);  //fc
dlog('<== isSqThreatened') 
return realThreats;
} 
//==================== end of isSqThreatened() ======================================================

//=================================================================================================
// checkContentTest is called only from the isSqThreatened() function
// this version is only looking for squares that contain foe pieces so we...
// prune the potential list to remove all elements when a 'friend' is detacted
// so utimately we have an array called g_threatArr (which is global in scope) containing...
// the xy location of all foes type,colour and location.
// BUT ... g_threatArr contains POTENTIAL threats - we next call checkRealThreats() to remove
// and foe pieces that do not have them move capabilty yo reach the target
// e.g the g_threatArr may contain a foe pawn or a foe queen but whereas the queen
// will have the reach the pawn may not...
//================================================================================================
function checkContentTest(tArr) {
dlog('==> checkContentTest(tArr)');
dlog('tArr = ' + tArr.join() )
var elem;
for (elem = 0; elem<tArr.length; elem++) {
dlog('elem ' + elem)
var xy2ixkey = tArr[elem];
var ix = g_xy2ix_obj[xy2ixkey];
var xy = tArr[elem];
var tname = "n" + ix;
const index = tArr.indexOf(xy);
dlog('tname ' + tname)
var telement = document.getElementsByName(tname);
var tcontent = telement[0].src;
var tcolour = tcontent.substr(-6,1)
var mycolour = lsGet("mycolour");
var foecolour = lsGet("foecolour");

switch (tcolour) {
case "n" :
dlog('square xy ' + xy + ' is empty');
break; 
//------------------------------------------------------------------------------------------
case foecolour :
dlog('square xy ' + xy + ' is foe');
//console.log(tArr);
if (index > -1) {
tArr.splice(index + 1, tArr.length);
//console.log(tArr);
// code to detect foe -----
dlog('*THREAT* at sq ' + xy + ' from ' + tcontent);
//console.log('xy = ' + xy + ' , piece =' + tcontent);
// see if foe is capable if hitting us
dlog('see if foe ' + tcontent + ' at xy ' + xy + ' is capable if capturing us ');
// we are building 'g_threatArray' in which each element is in the format:
// piece name and colour and the xy coordinates  - e.g. pb,45
// we 'see' pieces by using the view from a hypothetical 'super-piece' which has the
// combined properties of a Queen , Rook , Bishop and Knight
// and only listing 'foecolour' pieces we see in this way. 
// so a white player will see black pieces and vice-versa
//
g_threatArr.push(tcontent.substr(-7,2) + ',' + xy)
let sf2 = 2;
// -------
dlog('g_threatArray ==> ' + g_threatArr.toString()) ;
// expected results with new board ...
// if origin xy is 45 -- g_threatArray ==> pb,46,pb,56,pb,36
// if origin xy is 55 -- g_threatArray ==> pb,56,pb,66,pb,46,nb,67,kb,47,pb,76,pb,36 
//-- when tw0 used for test piece on square xy45    
}
break;
//-------------------------------------------------------------------------------------------
case mycolour :
dlog('square xy ' + xy +  ' is friend');
//console.log(tArr);
if (index > -1) {
tArr.splice(index, tArr.length);
//console.log(tArr); 
}
break;

default:
dlog('+++ ERROR xy colour is ' + tcolour + ' this should not occur');
}
dlog('1730 done one element') 
}

dlog('done all elements in tArr so save in g_threatArrPruned')
g_threatArrPruned = g_threatArrPruned.concat(tArr);
g_threatArrUnique = getUnique(g_threatArrPruned);  //fc
dlog('>>>>> set g_threatAttPruned to ' + g_threatArrPruned.join());
dlog('<== checkContent(tArr) g_threatArrUnique = ' + g_threatArrUnique.join());

g_validTargets_arr = [];
dlog('g_threatArr ' + g_threatArr);
dlog('Potential Threats g_threatArr ' + g_threatArr.join());
var sf2 = 2;
dlog('<== checkContentTest(tArr)');   
}
//================= end of checkContentTest(tArr) =================================================
//================================================================================================
// checkRealThreats() 
// check each potential THREAT in g_threatArr[] 
// check the difference between king's square and the threat square
// check if the difference matches the piece type which is in the potential threat square
//================================================================================================
function checkRealThreats(target) {
dlog('==> checkRealThreats(' + target + ') with g_threatArr of ' + g_threatArr.join());
g_realThreatArr = [];
for (var i = 0; i<g_threatArr.length; i++) {
var elem_csv = g_threatArr[i];
var elem_ar = elem_csv.split(',');
//chpc2:1475 (8) ["52", "57", "37", "46", "56", "36", "66", "26"]

//get the next (piece,location) pair from g_threatArr
var thp = elem_ar[0];         // the piece type that can 'see' our test square e.g. "pb"
var thn = thp.substr(0,1);    // e.g. 

var thxy   = elem_ar[1];              // the square that the threatening piece is on e.g. "67"
var thx = thxy.substr(0,1);
var thy = thxy.substr(1,1);

var testxy = target;            //  we are investigating the safety of this square 
var testx = target.substr(0,1);
var testy = target.substr(1,1);

// get the next (x diff , y difference) pair from g_threatArr
var diffx = testx - thx;
var diffy = testy - thy;

// get the xy difference between thxy and textxy e.g. testxy=55 - thxy=44
var diffxy = testxy - thxy;
// knights
if (Math.abs(diffx) == 1 && Math.abs(diffy) == 2) {
dlog('piece at ' + thxy + ' if piece is a knight it is a real threat to ' + testxy)
if (thn == "n") {g_realThreatArr.push(thp + ',' +thxy)}
}
if (Math.abs(diffx) == 2 && Math.abs(diffy) == 1) {
dlog('piece at ' + thxy + '  if piece is a knight it is a real threat to ' + testxy)
if (thn == "n") {g_realThreatArr.push(thp + ',' +thxy)}
}
// pawns
if (Math.abs(diffx) == 1 && diffy == 1) {
dlog('piece at ' + thxy + '  if piece is a white pawn it is a real threat to ' + testxy)
if (thp == "pw") {g_realThreatArr.push(thp + ',' +thxy)}
}
if (Math.abs(diffx) == 1 && diffy == -1) {
dlog('piece at ' + thxy + '  if piece is a black pawn it is a real threat to ' + testxy)
if (thp == "pb") {g_realThreatArr.push(thp + ',' +thxy)}
}
// bishop or queen 
if (Math.abs(diffx) == Math.abs(diffy)) {
dlog('piece at ' + thxy + '  if piece is a bishop or a queen it is a real threat to ' + testxy)
if (thn == "q" || thn == "b") {g_realThreatArr.push(thp + ',' +thxy)}
}
// rook or queen
if (diffx == 0 ||  diffy == 0) {
dlog('piece at ' + thxy + '  if piece is a rook or a queen it is a real threat to ' + testxy)
if (thn == "q" || thn == "r") {g_realThreatArr.push(thp + ',' +thxy)}
} 
// king
if (Math.abs(diffxy) == Math.abs(9) || Math.abs(diffxy) == Math.abs(10)  || Math.abs(diffxy) == Math.abs11 || Math.abs(diffxy) == Math.abs(1)  ) {
dlog('piece at ' + thxy + '  if piece is a king it is a real threat to ' + testxy)
if (thn == "k") {g_realThreatArr.push(thp + ',' +thxy)}
}
}
dlog('REAL THREATS ARE ' + g_realThreatArr.join());
dlog('<== checkRealThreats');  
var realThreats = []
realThreats = g_realThreatArr;
return realThreats;
}   

//=================================================================================================
// save_move()
// - collects the board image into g_bi_csv
// - calls dbwrite_move_status which updates the data base 
//=================================================================================================
function save_move() {
dlog('begin save_move');
//save g_bi_ar to Local_Storage as csv
g_bi_csv = g_bi_ar.join();
lsSet("saved_board_image",g_bi_csv);
dbwrite_move_status(g_bi_csv);           //write to db
// clean up for end of move - reset variables
dlog('reset ==> g_validTargets_arr = []  g_tArrPruned = []  g_tArrUnique = []') 
g_validTargets_arr = [];
g_tArrPruned = [];
dlog('>>>>> set g_tAttPruned to ' + g_tArrPruned.join());
g_tArrUnique = [];
}

//=================================================================================================
// *** WRITE updated status to database
// row:   id=1 
// column: board_image  =  board image at end of move
//=================================================================================================
function dbwrite_move_status(ubi) {
  var row_saver_uid = myClientId;
  var row_id = 1;
  var data = {row_id: row_id, row_data1: ubi, row_saver_uid}
  //---
  $.ajax( 
  {
  type: "POST",
  url:  "https://secret-shore-85438.herokuapp.com/updbim",
  async: false,  //  <================== sync request
  dataType : "json",
  contentType: "application/json; charset=utf-8",
  data : JSON.stringify(data),
  success : function(result) {
  //var resData = result;
  (function() { 
  dlog('*** db test write done');
  })()
  },
  //If there was no resonse from the server
  error: function(jqXHR, textStatus, errorThrown){
  //console.log('error ' + jqXHR +';'+ textStatus +';'+ errorThrown);
  },
  //capture the request before it was sent to server
  beforeSend: function(jqXHR, settings){
  //console.log('before send  ' + jqXHR +';'+ settings);
  },
  //this is called after the response or error functions are finished
  //so that we can take some action
  complete: function(jqXHR, textStatus){
  //console.log('complete ' + jqXHR +';'+ textStatus);
  }
  });   // end of ajax call

  dlog("test write status ended");       
  }

//=================================================================================================
// save_move_h()
// - collects the hospital image into g_hi_csv
// - calls dbwrite_move_hospital which updates the data base 
//=================================================================================================
function save_move_h() {
  dlog('begin save_move');
  //save g_bi_ar to Local_Storage as csv
  g_hi_csv = g_hi_ar.join();
  lsSet("saved_hospital_image",g_hi_csv);
  dbwrite_move_hospital(g_hi_csv);           //write to db
}
   
//=================================================================================================
// *** WRITE updated hospital image to database
// row:   id=2 
// column: hospital_image  =  board image at end of move
//=================================================================================================
function dbwrite_move_hospital(uhi) {
  dlog('*** begin dbwrite_move_hospital');
  dlog('function dbwrite_move_hospital was called by save move');
  var row_id,row_data1;
  row_id = 2; // this row is ONLY UPDATED in THIS LINE OF CODE for hospital image
  row_data1 = uhi;
  $.post('https://secret-shore-85438.herokuapp.com/updbim',
  {
  row_id: row_id,
  row_data1: row_data1,
  },
  function(data){
  dlog("write hospital ended");        
  });
  }
  
//=================================================================================================
// enable_other() -- send message -- 
//=================================================================================================
function enable_other(xyfrom,xyto) {
var parm1 = xyfrom;
console.log(`hello ${parm1}`);
var parm2 = xyto;
console.log(`hello ${parm2}`);
dlog('*** begin enable_other');
dlog('enable other player to move');
txMsg(myClientId,`001,enable_other_player,${parm1},${parm2}`);
dlog('end enable_other');
}
//=================================================================================================
// enable_other_after_new() -- send message -- 
//=================================================================================================
function enable_other_after_new() {
dlog('==> begin enable_other_after_new');
dlog('reload other players board after new');
txMsg(myClientId,"001,enable_other_player_after_new");
dlog('<== end enable_other_after_new');
}
//=================================================================================================
// inhibit_other_from_selecting_white() -- send message -- 
//=================================================================================================
function inhibit_other_from_selecting_white() {
console.log('==> begin inhibit_other_from_selecting_white')
dlogX('==> begin inhibit_other_from_selecting_white');
dlogX('tell other player to select black');
txMsg(myClientId,"001,inhibit_other_from_selecting_white");
dlogX('<== end inhibit_other_from_selecting_white');
}
//=================================================================================================
// inhibit_other_from_selecting_black() -- send message -- 
//=================================================================================================
function inhibit_other_from_selecting_black() {
console.log('==> begin inhibit_other_from_selecting_black')
dlogX('==> begin inhibit_other_from_selecting_black');
dlogX('tell other player to select white');
txMsg(myClientId,"001,inhibit_other_from_selecting_black");
dlogX('<== end inhibit_other_from_selecting_black');
}
//=================================================================================================
// ping_other() -- send message -- 
//
// The purpose of this is to send a 'ping' meesage to the other browser.
// The other browser sends a 'reply' to the originator
//
//
//=================================================================================================
function ping_other() {
  //dlog('==> begin ping_other');
  console.log('==> ping other')
  txMsg(myClientId,"001,ping_other");
  //
  //
  //dlog('<== end ping_other');
  console.log('<== ping other')
  }
//=================================================================================================
function reply_other(target) {
  dlog('==> begin reply_other');
  txMsg(target,"001,reply_other");
  //
  dlog('<== end reply_other');
  }

//=================================================================================================
// touch_other() -- send message -- 
//
// The purpose of this is to send a 'touch' meesage to the other browser.
// The other browser sends a 'retouch' to the originator
//
//
//=================================================================================================
function touch_other() {
  //dlog('==> begin touch_other');
  console.log('==> touch other')
  txMsg(myClientId,"001,touch_other");
  //
  //
  //dlog('<== end touch_other');
  console.log('<== touch other')
  }
//=================================================================================================
function retouch_other(target) {
  dlog('==> begin retouch_other');
  txMsg(target,"001,retouch_other");
  //
  dlog('<== end retouch_other');
  }

//=================================================================================================
// general service functions end
//=================================================================================================

//=================================================================================================
// diagnosic and testing functions start
//=================================================================================================
function txMsg(clid, txMsg) {
console.log('function txMsg called with message... ' +  'txMsg: ' + txMsg  + ' clid: ' + clid + ' test_item: ' + g_myrandomid + ' end');
dlog('function txMsg called with message... ' + txMsg);
socket.emit('new_message2c', {message : txMsg, clientid : clid, unique_browserid: g_myrandomid})
}

function f001() {
dlog('function f001 called by socket message')
}

function f002() {
dlog('function f002 called by socket message')
dlog('should only run on OTHER client')
}

//=================================================================================================
// test castling whichever colour is the active client
//=================================================================================================
function testCastling() {
var mycolour = lsGet("mycolour")
//-------------------------------------------------------------------------------------------------
if (mycolour == 'w') {
dlogX('==> testCastling White');
dlogX('test castling white east');
if (testCastleWhiteEast()) {    //fc
g_kwe = true;
dlogX('OK test castling white east');
}else{
g_kwe = false;
dlogX('Not OK test castling white east');
}
dlogX('test castling white west');
if (testCastleWhiteWest()) {  //fc
g_kww = true;
dlogX('OK test castling white west');
}else{
g_kww = false;
dlogX('Not OK test castling white west');
}
dlogX('testcastling as white kwe: ' + g_kwe + ' kww: ' + g_kww + ' kbe: ' + g_kbe + ' kbw: ' + g_kbw);
} 
//-------------------------------------------------------------------------------------------------
if (mycolour == 'b') {
dlogX('test castling black east');
if (testCastleBlackEast()) {  //fc
g_kbe = true;
dlogX('OK test castling black east');
}else{
g_kbe = false;
dlogX('Not OK test castling black east');
}
dlogX('test castling black west');
if (testCastleBlackWest()) {  //fc
g_kbw = true;
dlogX('OK test castling black west');
}else{
g_kbw = false;
dlogX('Not OK test castling black west');
}
dlogX('testcastling as black kwe: ' + g_kwe + ' kww: ' + g_kww + ' kbe: ' + g_kbe + ' kbw: ' + g_kbw);
} 
g_threatArr = [];       // reset all the globals used XXXXXXXXXXXXXXXX
g_threatArrUnique = [];
g_threatArrPruned = [];
g_threatTarget = [];
}
//=================================================================================================
// test castling WHITE EAST
//=================================================================================================
function testCastleWhiteEast() {
var g_ok2castleKWE = false;
var f1Safe = false;
var g1Safe = false;
dlogX('==> testCastleWhiteEast')

//check that all square are empty between king and rook
var testgif1=  "https://secret-shore-85438.herokuapp.com/en0.gif"
var sqf1 = document.getElementById('f1').src;
var sqg1 = document.getElementById('g1').src;

// check if intermediate squares are empty
if (sqf1 == testgif1 && sqg1 == testgif1) {
var sqempty = true;
dlogX('f1 and g1 empty')
} else { 
dlogX('f1 and g1 NOT empty')
}

// check that rook has not moved
var testgif2 = "https://secret-shore-85438.herokuapp.com/rw0.gif"
var rwe = document.getElementById('h1').src;
if (rwe == testgif2) {
var r_notmoved = true;
}else { 
dlogX('White Rook East HAS MOVED')
}

// check that king has not moved
var testgif3 = "https://secret-shore-85438.herokuapp.com/kw0.gif"
var kwe = document.getElementById('e1').src;
if (kwe == testgif3) {
var kw_wenotmoved = true;
} else { 
dlogX('White King HAS MOVED')
}

//check that no squares between king and rook are threatened.
g_threatTarget = '50';
isSqThreatened('zz0','50'); {  //fc
if (g_realThreatArr.length == 0) {
f1Safe = true;
} 
}
// 
g_threatTarget = '60';
isSqThreatened('zz0','60'); {  //fc
if (g_realThreatArr.length == 0){
g1Safe = true
} 
}
//
if (sqempty==true && r_notmoved==true && kw_wenotmoved==true && f1Safe==true && g1Safe==true) {
var ok_to_castle_white_east = true;
//alert('ok to castle white king to east')
g_ok2castleKWE = true;
return true;
} else {
//alert('NOT ok to castle white king to east')
g_ok2castleKWE = false;
return false;
}
}
//=================================================================================================
// test castling WHITE WEST
//=================================================================================================
function testCastleWhiteWest() {
var g_ok2castleKWW = false;
var b1Safe = false;
var c1Safe = false;
var d1Safe = false;
dlogX('==> testCastleWhiteWest')

//check that all square are empty between king and rook
var testgif1 = "https://secret-shore-85438.herokuapp.com/en0.gif"
var sqb1 = document.getElementById('b1').src;
var sqc1 = document.getElementById('c1').src;
var sqd1 = document.getElementById('d1').src;

// check if intermediate squares are empty
if (sqb1 == testgif1 && sqc1 == testgif1 && sqd1 == testgif1) {
var sqempty = true;
dlogX('b1 and c1 and d1 empty');
} else { 
dlogX('b1 and c1 and d1 NOT empty');
}

// check that rook has not moved
var testgif2 = "https://secret-shore-85438.herokuapp.com/rw0.gif"
var rwe = document.getElementById('a1').src;
if (rwe == testgif2) {
var r_notmoved = true;
}else { 
dlogX('White Rook West HAS MOVED')
}

// check that king has not moved
var testgif3 = "https://secret-shore-85438.herokuapp.com/kw0.gif"
var kwe = document.getElementById('e1').src;
if (kwe == testgif3) {
var kw_wenotmoved = true;
} else { 
dlogX('White King HAS MOVED')
}

//check that no squares between king and rook are threatened
g_threatTarget = '10';
isSqThreatened('zz0','10'); {  //fc
if (g_realThreatArr.length == 0) {
b1Safe = true;
} 
}
// 
g_threatTarget = '20';
isSqThreatened('zz0','20'); {  //fc
if (g_realThreatArr.length == 0){
c1Safe = true
} 
}
//
g_threatTarget = '30';
isSqThreatened('zz0','30'); {  //fc
if (g_realThreatArr.length == 0){
d1Safe = true
} 
}
//
if (sqempty==true && r_notmoved==true && kw_wenotmoved==true && b1Safe==true && c1Safe==true && d1Safe==true) {
var ok_to_castle_white_west = true;
//alert('ok to castle white king to west')
g_ok2castleKWW = true;
return true;
} else {
//alert('NOT ok to castle white king to west')
g_ok2castleKWW = false;
return false;
}
}
//================================================================================================
// test castling BLACK EAST
//================================================================================================
function testCastleBlackEast() {
var g_ok2castleKBE = false;
var f8Safe = false;
var g8Safe = false;
dlogX('==> testCastleBlackEast')

//check that all square are empty between king and rook
var testgif1 = "https://secret-shore-85438.herokuapp.com/en0.gif"
var sqf8 = document.getElementById('f8').src;
var sqg8 = document.getElementById('g8').src;

// check if intermediate squares are empty
if (sqf8 == testgif1 && sqg8 == testgif1) {
var sqempty = true;
dlogX('f8 and g8 empty')
} else { 
dlogX('f8 and g8 NOT empty')
}

// check that rook has not moved
var testgif2 = "https://secret-shore-85438.herokuapp.com/rb0.gif"
var rwe = document.getElementById('h8').src;
if (rwe == testgif2) {
var r_notmoved = true;
}else { 
dlogX('Black Rook West HAS MOVED')
}

// check that king has not moved
var testgif3 = "https://secret-shore-85438.herokuapp.com/kb0.gif"
var kbe = document.getElementById('e8').src;
if (kbe == testgif3) {
var kw_wenotmoved = true;
} else { 
dlogX('Black King HAS MOVED')
}

//check that no squares between king and rook are threatened
g_threatTarget = '57';
isSqThreatened('zz0','57'); {  //fc
if (g_realThreatArr.length == 0) {
f8Safe = true;
} 
}
// 
g_threatTarget = '67';
isSqThreatened('zz0','67'); {  //fc
if (g_realThreatArr.length == 0){
g8Safe = true
} 
}
//
if (sqempty==true && r_notmoved==true && kw_wenotmoved==true && f8Safe==true && g8Safe==true) {
var ok_to_castle_white_east = true;
//alert('ok to castle black king to east')
g_ok2castleKBE = true;
return true;
} else {
//alert('NOT ok to castle black king to east')
g_ok2castleKBE = false;
return false;
}
}
//================================================================================================
// test castling BLACK WEST
//================================================================================================
function testCastleBlackWest() {
var g_ok2castleKBW = false;
var b8Safe = false;
var c8Safe = false;
var d8Safe = false;
dlogX('==> testCastleBlackWest')

//check that all square are empty between king and rook
var testgif1 = "https://secret-shore-85438.herokuapp.com/en0.gif"
var sqb8 = document.getElementById('b8').src;
var sqc8 = document.getElementById('c8').src;
var sqd8 = document.getElementById('d8').src;

// check if intermediate squares are empty
if (sqb8 == testgif1 && sqc8 == testgif1 && sqd8 == testgif1) {
var sqempty = true;
dlogX('b8 and c8 and d8 empty')
} else { 
dlogX('b8 and c8 and d8 NOT empty')
}

// check that rook has not moved
var testgif2 = "https://secret-shore-85438.herokuapp.com/rb0.gif"
var rwe = document.getElementById('h8').src;
if (rwe == testgif2) {
var r_notmoved = true;
}else { 
dlogX('Black Rook West HAS MOVED')
}

// check that king has not moved
var testgif3 = "https://secret-shore-85438.herokuapp.com/kb0.gif"
var kwe = document.getElementById('e8').src;
if (kwe == testgif3) {
var kw_wenotmoved = true;
} else { 
dlogX('Black King HAS MOVED')
}

//check that no squares between king and rook are threatened
g_threatTarget = '17';
isSqThreatened('zz0','17'); {  //fc
if (g_realThreatArr.length == 0) {
b8Safe = true;
} 
}
// 
g_threatTarget = '27';
isSqThreatened('zz0','27'); {  //fc
if (g_realThreatArr.length == 0){
c8Safe = true
} 
}
//
g_threatTarget = '37';
isSqThreatened('zz0','37'); {  //fc
if (g_realThreatArr.length == 0){
d8Safe = true
} 
}
//
if (sqempty==true && r_notmoved==true && kw_wenotmoved==true && b8Safe==true && c8Safe==true && d8Safe==true) {
var ok_to_castle_white_east = true;
//alert('ok to castle black king to west')
g_ok2castleKBW = true;
return true;
} else {
//alert('NOT ok to castle black king to west')
g_ok2castleKBW = false;
return false;
}
}
//=================================================================================================
// function messageHandler(id,msg)
// called from jslib.js ... 
// socket.on("new_message2c", (data) => { 
// messageHandler(data.clientid, data.message);
//=================================================================================================
function messageHandler(id,msg) {
dlogX('message handler recieved:  id = ' + id + ' , msg = ' + msg);
dlogX('myclientid is ' + myClientId);
// parse message
var msgStr = ""; // define as string
msgStr = msg;
var msgArr = msgStr.split(',');
var idOrigin = id;
var cmdCode = msgArr[0];
var fCode = msgArr[1];
var p1 = msgArr[2];
var p2 = msgArr[3];
var p3 = msgArr[4];
var p4 = msgArr[5];
var msgNext = msgArr[6];

if (cmdCode == "001") {  // if cmdCode is '001' execute function per fCode

if (idOrigin == myClientId) {  // message is from ourself

dlogX('we got a message from ourself')

// process message from ourself
switch (fCode) {
//
case "000" :
dlogX('msg from me');
dlogX('case fCode = 000');
dlogX('no action');
break;
//=================================================================================================
case "999" :
dlogX('msg from me');
dlogX('case fCode = 999');
break;
//=================================================================================================
default:
dlogX('msg from me');
dlogX('fcode not 000');
break
//=================================================================================================
}  // close switch

}  // end 'processing message from ourself'

if (idOrigin != myClientId) {  // message is from 'other'

dlogX('we got a message from other')

// process message from other
switch (fCode) {
//
case "000" :
dlogX('msg from other');
dlogX('case fCode = 000');
dlogX('no action')
break;
//=================================================================================================
case "001" :
dlogX('msg from other');
dlogX('case fCode = 001');
f001();
break;
//=================================================================================================
case "002" :
dlogX('msg from other');
dlogX('case fCode = 001');
f002();
break;
//=================================================================================================
case "999" :
dlogX('msg from other');
dlogX('case fCode = 999');
break;
//=================================================================================================
case "inhibit_other_from_selecting_white" :
dlogX('inhibit_other_from_selecting_white recieved');
console.log('inhibit_other_from_selecting_white recieved')
g_inhibit_white = true;
dlogX('g_inhibit_white: ' + g_inhibit_white);
console.log('g_inhibit_white = ' + g_inhibit_white)
// set white as choice
break;
//=================================================================================================
case "inhibit_other_from_selecting_black" :
dlogX('inhibit_other_from_selecting_black recieved');
console.log('inhibit_other_from_selecting_black recieved');
g_inhibit_black = true;
dlogX('g_inhibit_black; ' + g_inhibit_black);
console.log('g_inhibit_black = ' + g_inhibit_black)
// set black as choice
break;
//=================================================================================================
case "enable_other_player_after_new" :
dlogX('enable_other_player_after_new recieved');
dbread();
dbread_ho();
break;
//=================================================================================================
//=================================================================================================
case "ping_other" :
dlogX('ping_other recieved from ' + idOrigin);
//alert('ping other recieved from ' + idOrigin + ' by ' + myClientId);
//-------------
//FIXFIX
//-------------
if (idOrigin == "u") {
  //alert('idOrigin: ' + idOrigin);
}
  
if (idOrigin == "w") {
  reply_other("w");
}
if (idOrigin == "b") {
  reply_other("b");
}
//------------
break;
//=================================================================================================
case "reply_other" :
dlogX('reply_other recieved from ' + idOrigin);
//alert('reply other recieved from ' + idOrigin + 'by ' + myClientId);
document.getElementById("other_msg").innerHTML =  myClientId + " says... " + idOrigin + " is logged on"
if (idOrigin == "w" || idOrigin == "b") {
  unhide_openchess();
}
break;
//=================================================================================================
case "enable_other_player" :
dlogX('enable_other test recieved');
dbread();
dbread_ho();

dlogX('case fCode = enable_this_player test');
lsSet("next_action","pickup")
document.getElementById("next_action").innerHTML = g_display_colour+"'s move";
if (g_display_colour == "White") {whiteToMove()}
if (g_display_colour == "Black") {blackToMove()}
dlogX("next_action for player: " + myClientId + " is 'pickup' as a result of msg FROM = " + idOrigin )
//
//refresh board to reflect latest move by opponent 
//
dbread();
dbread_ho();
//-------------------------------------------------------------------------------------------------
// set bg colour to pink if message included them otherwise skip this
//-------------------------------------------------------------------------------------------------
if (p1 != undefined && p2 != undefined) {
//hiLite(p1,"lightgreen");
//hiLite(p2,"lightgreen");
hiLiteBfrom(p1);
hiLiteBto(p2);
}
//-----------------------
iskingincheck();
testCastling();
//
dlog('testcastling kwe:' + g_kwe + ' kww: '+ g_kww + 'kbe: ' + g_kbe + 'kbw: ' + g_kbw);
break;
//================================================================================================
case "dbread" : 
dbread();
dbread_ho();
break;
//=================================================================================================
//=================================================================================================
case "touch_other" :
dlogX('touch_other recieved from ' + idOrigin);
document.getElementById("other_msg").innerHTML =  myClientId + " says... " + idOrigin + " touched me"
retouch_other()
break;
//=================================================================================================
//=================================================================================================
case "retouch_other" :
dlogX('retouch_other recieved from ' + idOrigin);
document.getElementById("other_msg").innerHTML =  myClientId + " says... " + idOrigin + " my retouch"
if (idOrigin == "w" || idOrigin == "b") {
  //unhide_openchess();
}
break;
//=================================================================================================

//=================================================================================================
default:
dlog('msg from other');
dlog('fcode not 000');
break
//
}  // end switch (fCode) {

}  // end if (idOrigin != myClientId) {  //  if 3 from 'other'

}else{dlog('cmdCode not 001')};

}  // end function

//=================================================================================================
//                   end of socket message handler
//=================================================================================================  


//=================================================================================================
// (1) on entry to undo_move, if we our next_action is "save" it means we have moved a piece but not
// yet saved the new board image to the data base. 
// if we decide not to save we can reset the boardas it was before we made our move
// and our next_action is set back to "pickup".
// (2) on entry to undo_move, if our next action is not "save" we do a dbread and leave next_action as-is
//=================================================================================================
function undo_move() {
dlog('*** begin undo_move');

var next_action = lsGet("next_action")
  //this is the code path if next_action is "save" which means the move was not saved to db yet
for (var i=0; i<32; i++ )  {
document.getElementById(g_wsq_arr[i]).style.backgroundColor = "#fff8dcd8"
}
for (i=0; i<32; i++ )  {
document.getElementById(g_bsq_arr[i]).style.backgroundColor = "#a52a2ad8"
}
g_pih= "no";
// reset variables
dlog('reset ==> g_validTargets_arr = []  g_tArrPruned = []  g_tArrUnique = []')
g_validTargets_arr = [];
g_tArrPruned = [];
dlog('>>>>> set g_tAttPruned to ' + g_tArrPruned.join());
g_tArrUnique = [];
if (next_action == 'save') {
lsSet("next_action" , "pickup")
document.getElementById("next_action").innerHTML = g_display_colour + "'s Move";
if (g_display_colour == "White") {whiteToMove()}
if (g_display_colour == "Black") {blackToMove()}
dlog("next_action set to pickup");
}
dbread('called by undo_move()');  
dbread_ho();

}

//=================================================================================================
// change vertical order
//=================================================================================================
function v_order_black() {
//alert('v order b');
document.getElementById("v1").src = "no8.png";
document.getElementById("v2").src = "no7.png";
document.getElementById("v3").src = "no6.png";
document.getElementById("v4").src = "no5.png";
document.getElementById("v5").src = "no4.png";
document.getElementById("v6").src = "no3.png";
document.getElementById("v7").src = "no2.png";
document.getElementById("v8").src = "no1.png";
}
//=================================================================================================
// change vertical order
//=================================================================================================
function v_order_white() {
 //alert('v order w');
  document.getElementById("v1").src = "no1.png";
  document.getElementById("v2").src = "no2.png";
  document.getElementById("v3").src = "no3.png";
  document.getElementById("v4").src = "no4.png";
  document.getElementById("v5").src = "no5.png";
  document.getElementById("v6").src = "no6.png";
  document.getElementById("v7").src = "no7.png";
  document.getElementById("v8").src = "no8.png";
  }
//=================================================================================================
// change horizontal order
//=================================================================================================
function h_order_black() {
//alert('h order b');
document.getElementById("a9").src = "alh.png";
document.getElementById("b9").src = "alg.png";
document.getElementById("c9").src = "alf.png";
document.getElementById("d9").src = "ale.png";
document.getElementById("e9").src = "ald.png";
document.getElementById("f9").src = "alc.png";
document.getElementById("g9").src = "alb.png";
document.getElementById("h9").src = "ala.png";
document.getElementById("b9").className = "chSqHL";
document.getElementById("g9").className = "chSqH";
}
//=================================================================================================
// change horizontal order
//=================================================================================================
function h_order_white() {
  //alert('h order w');
  document.getElementById("a9").src = "ala.png";
  document.getElementById("b9").src = "alb.png";
  document.getElementById("c9").src = "alc.png";
  document.getElementById("d9").src = "ald.png";
  document.getElementById("e9").src = "ale.png";
  document.getElementById("f9").src = "alf.png";
  document.getElementById("g9").src = "alg.png";
  document.getElementById("h9").src = "alh.png";
  }
//=================================================================================================
// turn on/off diag mode
//=================================================================================================
function toggle_g_diag_mode() {
dlog('*** toggle_g_diag_mode');
switch (g_diag_mode) {
case false :
g_diag_mode = true;
dlog('diag mode = ' + g_diag_mode)
document.getElementById('aa').style.backgroundColor = "Red";
break;
//------------------------------------------------------------------------------------------------
case true :
g_diag_mode = false;
dlog('diag mode = ' + g_diag_mode)
document.getElementById('aa').style.backgroundColor = "Green";
break;
//-------------------------------------------------------------------------------------------------
default:
dlog('+++  ERROR should not occur');
}
}
//=================================================================================================
// rotate_board()
//=================================================================================================
function rotate_board() {
dlog('*** begin rotate_board');
for (var i=0; i<g_sq_arr1.length; i++) {
var myelementa  = document.getElementById(g_sq_arr1[i]);
var myelementb  = document.getElementById(g_sq_arr2[i]);
var myelementaIDsave = myelementa.id;
var myelementbIDsave = myelementb.id;
var myelementaNamesave = myelementa.name;
var myelementbNamesave = myelementb.name;
myelementa.id = myelementbIDsave;
myelementb.id = myelementaIDsave;
myelementa.name = myelementbNamesave;
myelementb.name = myelementaNamesave;
}
}
//=================================================================================================
// checkContent(tArr) 
//=================================================================================================
function checkContent(tArr) {
var elem;
dlog('*** begin checkContent');
for (elem = 0; elem<tArr.length; elem++) {
dlog('elem ' + elem)
var xy2ixkey = tArr[elem];
var ix = g_xy2ix_obj[xy2ixkey];
var xy = tArr[elem];
var tname = "n" + ix;
const index = tArr.indexOf(xy);
dlog('tname ' + tname)
var telement = document.getElementsByName(tname);
var tcontent = telement[0].src;
var tcolour = tcontent.substr(-6,1)
var mycolour = lsGet("mycolour");
var foecolour = lsGet("foecolour");

switch (tcolour) {
case "n" :
dlog('square xy ' + xy + ' is empty');
break; 

case foecolour :
dlog('square xy ' + xy + ' is foe');
//console.log(tArr);
if (index > -1) {
tArr.splice(index + 1, tArr.length);
//console.log(tArr);  
}
break;

case mycolour :
dlog('square xy ' + xy +  ' is friend');
//console.log(tArr);
if (index > -1) {
tArr.splice(index, tArr.length);
//console.log(tArr); 
}
break;

default:
dlog('+++ ERROR xy colour is ' + tcolour + ' this should not occur');
}
dlog('1730 done one element') 
}
g_tArrPruned = g_tArrPruned.concat(tArr);
dlog('>>>>> set g_tAttPruned to ' + g_tArrPruned.join());
g_tArrUnique = getUnique(g_tArrPruned); //fc
dlog('<== checkContent(tArr) g_tArrUnique = ' + g_tArrUnique.join());
// end of CheckContent(tArr)
}
//=================================================================================================
//
//=================================================================================================
function funcspare_1() {
  alert('f1')
}
//=================================================================================================
//
//=================================================================================================
function change_piece() {
  alert('cp')
}
//=================================================================================================
// put captured pieces in hospital and need to do - update hi_ar to match
//================================================================================================
function pushImage(iname) {
  var icolour = iname.substr(1,1)
  wlog("w on entry" + g_cap_w);
  wlog("z on entry" + g_cap_z);
  
  if (icolour == "w") {
    wlog("w" + g_cap_w);
    var ct_w_int = parseInt(g_cap_w);  // ct_w_int is set from g_cap_w  e.g "0"
    var ic = "w"
    var n = ct_w_int + 1;    //  e.g n = 0
    var w_elem = n - 1;          // e.g w element selector = 1
    var myid = ic + n;       // e.g element id = "w1"

    //-----------------------------------------------------------------------------
    if (iname == "pw1") {
      document.getElementById(myid).src = "pw0" + ".gif";
      g_hi_ar[w_elem] = "pw0" + ".gif"   // update the hi array so we can save it in the data base row 2
    }else{
      document.getElementById(myid).src = iname + ".gif";
      g_hi_ar[w_elem] = iname + ".gif"   // update the hi array so we can save it in the data base row 2
    }
    //-----------------------------------------------------------------------------

    //g_hi_ar[w_elem] = iname + ".gif"   // update the hi array so we can save it in the data base row 2

    if (ct_w_int < 15) {
    ct_w_int += 1;                 // make sure we keep it an an integer 
    g_cap_w = ct_w_int; 
    wlog("w" + g_cap_w);
    }
  }

  if (icolour == "b") {
    wlog("z" + g_cap_z);
    var ct_z_int = parseInt(g_cap_z);  // ct_b_int is set from g_cap_z  e.g "0"
    var ic = "z"
    var n = ct_z_int + 1;    //  e.g n = 0
    var z_elem = n - 1 + 15;        // e.g w element selector = 1
    var myid = ic + n;       // e.g element id = "z1"

    //-----------------------------------------------------------------------------
    if (iname == "pb1") {
      document.getElementById(myid).src = "pb0" + ".gif";
      g_hi_ar[z_elem] = "pb0" + ".gif"   // update the hi array so we can save it in the data base row 2
    }else{
      document.getElementById(myid).src = iname + ".gif";
      g_hi_ar[z_elem] = iname + ".gif"   // update the hi array so we can save it in the data base row 2
    }
    //-----------------------------------------------------------------------------
    
    //g_hi_ar[z_elem] = iname + ".gif"   // update the hi array so we can save it in the data base row 2

    if (ct_z_int < 15) {
    ct_z_int += 1;                 // make sure we keep it an an integer 
    g_cap_z = ct_z_int; 
    wlog("z" + g_cap_z);
    }
  }
}

//=================================================================================================
// TEST TEST TEST - check that the synchronous ajax calls work as expected
//=================================================================================================
// test db sync write/read/write
// STEP1 *** READ  current db test row id==99
// STEP2 *** modify the data read in step1 and WRITE the update to db test row id=99
// STEP3 *** READ  updated db test row id=99 jusr written in step2
// ensure step3 read the updated version 
//=================================================================================================
function test_sync_db_write_the_read() {
  var myread1 = dbread_test();
  console.log(myread1);
  dbwrite_test();
  var myread2 = dbread_test();
  console.log(myread2)
  var test1 = 1;  //diag
  }
  //=================================================================================================
  // function dbread_test() - this uses synchronous ajax call
  //=================================================================================================        
  function dbread_test() {
    var row_id = 99;
    var data = {row_id: row_id}
    var response_string;
    //---
    $.ajax( 
    {
    type: "POST",
    url:  "https://secret-shore-85438.herokuapp.com/dbread",
    async: false,  //  <================== sync request
    dataType : "json",
    contentType: "application/json; charset=utf-8",
    data : JSON.stringify(data),
    success : function(result) {
    var resData = result;
    var resDataArr = result.results;
    var resDataArr_0_str = JSON.stringify(resDataArr[0]);
    response_string = resDataArr_0_str
    var resDataArr_0_obj = JSON.parse(resDataArr_0_str); 
    dlog('res data array ' + resDataArr_0_str);
    //------------------------------
    dlog('*** dbread - server return from POST');
    dlog('*** dbread write board image into local storage');
    //
    //we now have the updated version of the board so we need to write that into Local Storage    
    (function() { 
    console.log('dbread_test');
    })()
    },
    //If there was no resonse from the server
    error: function(jqXHR, textStatus, errorThrown){
    //console.log('error ' + jqXHR +';'+ textStatus +';'+ errorThrown);
    },
    //capture the request before it was sent to server
    beforeSend: function(jqXHR, settings){
    //console.log('before send  ' + jqXHR +';'+ settings);
    },
    //this is called after the response or error functions are finished
    complete: function(jqXHR, textStatus){
    //console.log('complete ' + jqXHR +';'+ textStatus);
    }
    }
    );
    dlog('<== dbread_test()');
    return response_string;
    }
  //=================================================================================================
  //
  //=================================================================================================
  function dbwrite_test() {
    var test_ubi = "rw3.gif,nw0.gif,bw0.gif,qw0.gif,en0.gif,rw1.gif,kw1.gif,en0.gif,pw0.gif,pw0.gif,pw0.gif,en0.gif,en0.gif,pw0.gif,en0.gif,en0.gif,en0.gif,en0.gif,en0.gif,en0.gif,en0.gif,en0.gif,pw0.gif,en0.gif,en0.gif,en0.gif,en0.gif,pw0.gif,en0.gif,en0.gif,bb0.gif,en0.gif,en0.gif,en0.gif,pb0.gif,en0.gif,en0.gif,en0.gif,nw0.gif,en0.gif,nb0.gif,en0.gif,en0.gif,en0.gif,en0.gif,en0.gif,en0.gif,en0.gif,pb0.gif,en0.gif,en0.gif,en0.gif,pb0.gif,pb0.gif,pb0.gif,pb0.gif,rb0.gif,en0.gif,en0.gif,en0.gif,kb0.gif,bb0.gif,nb0.gif,rb0.gif,"
    var row_id = 99;
    var data = {row_id: row_id, row_data1: test_ubi}
    //---
    $.ajax( 
    {
    type: "POST",
    url:  "https://pure-basin-36825.herokuapp.com/updbim",
    async: false,  //  <================== sync request
    dataType : "json",
    contentType: "application/json; charset=utf-8",
    data : JSON.stringify(data),
    success : function(result) {
    var resData = result;
    (function() { 
    dlog('*** db test write done');
    })()
    },
    //If there was no resonse from the server
    error: function(jqXHR, textStatus, errorThrown){
    //console.log('error ' + jqXHR +';'+ textStatus +';'+ errorThrown);
    },
    //capture the request before it was sent to server
    beforeSend: function(jqXHR, settings){
    //console.log('before send  ' + jqXHR +';'+ settings);
    },
    //this is called after the response or error functions are finished
    //so that we can take some action
    complete: function(jqXHR, textStatus){
    //console.log('complete ' + jqXHR +';'+ textStatus);
    }
    });   // end of ajax call
  
    dlog("test write status ended");       
    }
//=================================================================================================
// function hiLite() turn 'from' and 'to' squares red for 3 seconds
//=================================================================================================
function hiLite(sqxy,hcol) {
if (sqxy == "undefined") {return -1}
//turn it pink
mysqid = xy2sqid(sqxy);
document.getElementById(mysqid).style.backgroundColor = hcol;
console.log('turn it pink')

//wait 2 secs then turn it off
setTimeout(function(){
mysqid = xy2sqid(sqxy);
document.getElementById(mysqid).style.backgroundColor = "";
console.log('turn it off')
}, 3000);

//turn it red
mysqid = xy2sqid(sqxy);
document.getElementById(mysqid).style.backgroundColor = hcol;
console.log('turn it red')

//wait 2 secs then turn it off
setTimeout(function(){
mysqid = xy2sqid(sqxy);
document.getElementById(mysqid).style.backgroundColor = "";
console.log('turn it off')
}, 3000);
}

//=================================================================================================
// function hiLiteBfrom() turn 'from' green for 3 seconds
//=================================================================================================
function hiLiteBfrom(sqxyfrom) {
  if (sqxyfrom == "undefined") {return -1}
  //turn border green
  mysqidfrom = xy2sqid(sqxyfrom);
  mysqidfrom = "#"+mysqidfrom
  $(mysqidfrom).addClass("show_border_color");

  //wait 1 secs then turn it off
  setTimeout(function(){
  //mysqid = xy2sqid(sqxy);
  $(mysqidfrom).removeClass("show_border_color");
  }, 1000);

}
//=================================================================================================
// function hiLiteB() turn 'to' green for 3 seconds
//=================================================================================================
function hiLiteBto(sqxyto) {
  if (sqxyto == "undefined") {return -1}
  //turn border green
  mysqidto = xy2sqid(sqxyto);
  mysqidto = "#"+mysqidto
  $(mysqidto).addClass("show_border_color");

  //wait 3 secs then turn it off
  setTimeout(function(){
  //mysqid = xy2sqid(sqxy);
  $(mysqidto).removeClass("show_border_color");
  }, 3000);

}

//====================================================================================================================================================
// *** wLog() ***
//  
//====================================================================================================================================================
function wLog(textToAppend) {
  var x = document.getElementById("log");
  var t = document.createTextNode(textToAppend + '\n');
  x.appendChild(t);
  x.scrollTop = x.scrollHeight;
} 

//=================================================================================================
// function unhiLite() turn a square pink
//=================================================================================================
function unhiLite(sqxy) {
  mysqid = xy2sqid(sqxy);
  document.getElementById(mysqid).style.backgroundColor = "";
  }
//=================================================================================================
//=================================================================================================
// function hiLiteK() turn king red for 5 sec when firste in check
//=================================================================================================
function hiLiteK(sqxy,hcol) {
  //turn it pink
  mysqid = xy2sqid(sqxy);
  document.getElementById(mysqid).style.backgroundColor = hcol;
  console.log('turn it red')
  
  //wait 5 secs then turn it off
  setTimeout(function(){
  mysqid = xy2sqid(sqxy);
  document.getElementById(mysqid).style.backgroundColor = "";
  console.log('turn it off')
  }, 5000);
  }

//===============================================================================================
// addClass() this will put a red border round the white pawn symbol in ribbon9
//=============================================================================================== 
function addClass() {
  $("#r9pw").addClass("show_border");
}
//
function whiteToMove() {
  $("#r9pw").addClass("show_border");
  $("#r9pb").removeClass("show_border");
}

function blackToMove() {
  $("#r9pb").addClass("show_border");
  $("#r9pw").removeClass("show_border");
}

function hiFromSq(fromxy) {
  frmsqid = "#"+xy2sqid(fromxy);
  $(frmsqid).addClass("show_border")
}

//---------------------------------------------------------------------------------
function clicksave() {
  console.log('mybutton was clicked');
  var mybutton = document.getElementById("save");
  mybutton.click(); // this will trigger the click event
  };
//---------------------------------------------------------------------------------

//---------------------------------------------------------------------------------
function showpromomenu() {
  console.log('mybutton was clicked');
  var mybutton = document.getElementById("promo");
  mybutton.click(); // this will trigger the click event
  };
//---------------------------------------------------------------------------------


function functionConfirm(text, queen, rook, knight, bishop, cancel_it) {
  console.log('===> functionConfirm()')
  var confirmation_box = $("#confirm");
  confirmation_box.find(".message").text(text);
  confirmation_box.find(".qu,.ro,.kn,.bi").unbind().click(function() {
     confirmation_box.hide();
  });
  confirmation_box.find(".qu").click(queen);
  confirmation_box.find(".ro").click(rook);
  confirmation_box.find(".kn").click(knight);
  confirmation_box.find(".bi").click(bishop);
  //confirmation_box.find(".bi").click(cancel_it);
  confirmation_box.show();
}
// end --------------------------------