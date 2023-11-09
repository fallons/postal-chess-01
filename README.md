# secret-shore-85438

# This is the working version of the chess application.
# I think it is time to call this the final version - it is still a 
# bit clunky for the user to login and choose a colour 
# but making that better will need some fundemental restructuring
# which is probably not a good use of time.

# This was project was a way to learn this platform and it has been a great learing experience

# SF 08/03/2023

# 05/02/2023
#  file location moved to: secret-shore-37825/game.ejs .......
# 02/08/2022
#  file location moved to: pure-basin-37825/game.ejs .......
# bug list:
# (1) 
# able to select same colour as opponent if you close and re-open browser.
# proposed fix:
# none yet (24/04/2021).
# many fixes and new functions 08/12/2021..
----------------------------------------------------------------------------------
# Chess V4.1.0
# Migrated to pure-basin-37825 as previous servers are no longer supported by Heroku
# All calls to still-shelf have been chnaged to pure-basin
# There are some calls to other servers that are not used for the Chess playing Application
# these calls will fail is used because all servers other than pur-basin have been retired. 
----
# Chess V3.1.1
# This is the finished app. Will be save to OneDrive - 'Heroku-Apps' Folder
----
# Chess V3.0.1
# Prevent login as same colour as other player...
#  - does not work if player 1 has connects and logs in before player 2 has connected
# Pawn promotion works - can promote to queen,rook,bishop,knight
# colour of the last player is saved to the database
# if game is interrupted after white move then loaded:
# (a) the white player is inhibited form moving
# (b) the white player can
# 1. click the green tick icon to allow black to move and continue the intrrupted game
# OR
# 2. click new game icon to initialise the board and take the first move
# ----
# Chess V2.0.3
# full game test with Chris 23/04/2021 
# bug found (2) 
# when white logs in and selects white AND black logs in but forgets to select black
# then white can move and save move which causes black to see "unidentified's move"
# proposed fix (24/04/2021) 
# (a) white's browser code checks if black is there? if not...
# (b) if black is logged in then check if they have selected a colour
# ----
# Chess V2.0.2.
# added selection box to allow user to choose which piece to promote a pawn into 
# ----
# Chess V2.0.1
# minor changes to messages
# ----
# Chess V2.0.0
# Added next player indicator in the information bar just below the board.
# ---
# Chess V1.2.0
# This release provides an indicatation to the 'other' player of the move made by their 
# opponent which highlights the 'from' and 'to' squares with a background colour of red
# for a 3 second on period then returns to the original background colour
# ---
# Chess V1.1.1
# This release has all the data base calls done by ajax async = false - i.e. synchronous
# synchronous da cass a are deprecated as they hold up execution.
# In future releases I plan to use promises and async calls as this is good practice but in fact that
# will not improve performance for this applicaion but will avoid the browser tab running this app blocking code running in other tabs


