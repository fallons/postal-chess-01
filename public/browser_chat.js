$(function(){
    console.log('browser_chat.js called');
	var socket = io.connect('https://secret-shore-85438.herokuapp.com/');

	//buttons and inputs
	var message = $("#message")
	var message2c = $("#message2c")
	var browserid = $("#browserid")
	var send_browserid = $("#send_browserid")
	var send_message = $("#send_message")
	var send_username = $("#send_username")
	var chatroom = $("#chatroom")
	var feedback_browser = $("#feedback_browser")

	//Emit message
	send_message.click(function(){
		socket.emit('new_message', {message : message.val()})
		console.log('new_message: ' + message.val() + ' end')
	})

	//Listen on new_message
	socket.on("new_message", (data) => {
		feedback.html('');
		message.val('');
		chatroom.append("<p class='message'>" + data.username + ": " + data.message + "</p>")
		if (data.username == 'steve') {
		alert('user msg ' + data.username + ' ' + data.message)
	} else { 	
		var a = 1;
		alert('not steve ' + a); 
	}
	})

		//Listen on new_message2c
		socket.on("new_message2c", (data) => {
			feedback.html('');
			message.val('');
			chatroom.append("<p class='message'>" + data.username + ": " + data.message + "</p>")
			if (data.username == 'steve') {
			alert('user msg ' + data.username + ' ' + data.message)
		} else { 	
			var a = 1;
			alert('not steve ' + a); 
		}
		})

	//Emit a username
	send_username.click(function(){
		socket.emit('change_username', {username : username.val()})
	})

	//Emit a username
	send_browserid.click(function(){
		socket.emit('change_browserid', {browserid : browserid.val()})
	})

	//Emit typing
	message.bind("keypress", () => {
		socket.emit('typing')
	})

	//Listen on typing
	socket.on('typing', (data) => {
		feedback.html("<p><i>" + data.username + " is typing a message..." + "</i></p>")
	})
});