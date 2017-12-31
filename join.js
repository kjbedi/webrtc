var connection = new RTCMultiConnection();

// this line is VERY_important
connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';

// if you want text chat
connection.session = {
    data: true,
	video:true,	
};

// connection.language = 'fr';
// connection.autoTranslateText = true;

function get_users(){
	connection.getAllParticipants().forEach(function(participantId) {
        var user = connection.peers[participantId];
        var hisUID = user.userid;
    });

    var numberOfUsers = connection.getAllParticipants().length;
	var arrayOfUserIds = connection.getAllParticipants();
	var return_arr = {num_users:numberOfUsers,all_users:arrayOfUserIds};
	return return_arr;
}

function send_msg_for_new_connection_to_others(){
	var data = {type:"update_num_of_users"};
	connection.send(data);
}


connection.onstream = function(event) {
    var video = event.mediaElement;
    document.body.appendChild(video);
	send_msg_for_new_connection_to_others();
	
	var user_data = get_users();
		
	var numberOfUsers = user_data.num_users;
	var arrayOfUserIds = user_data.all_users;
	update_users(arrayOfUserIds);
};

function update_users(users){
	document.getElementById("ids").innerHTML = "";
	users.forEach(function(id) {	
		var userid = document.createElement("p");    
		userid.innerHTML = id;
		document.getElementById("ids").appendChild(userid);
	});
}


connection.onmessage =  function(event) {
    var buffer = event.data;
	if(buffer.type == "update_num_of_users"){
		var user_data = get_users();
		
		var numberOfUsers = user_data.num_users;
		var arrayOfUserIds = user_data.all_users;
		update_users(arrayOfUserIds);
	}
};

connection.onclose = function(e) {
	var user_data = get_users();
		
	var numberOfUsers = user_data.num_users;
	var arrayOfUserIds = user_data.all_users;
	setTimeout(update_users(arrayOfUserIds), 3000);
};




connection.join('kjbedi');



