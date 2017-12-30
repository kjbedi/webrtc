


var connection = new RTCMultiConnection();

// this line is VERY_important
connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';

// if you want text chat
connection.session = {
    data: true,
	video:true,	
};



function get_users(){
	connection.getAllParticipants().forEach(function(participantId) {
        var user = connection.peers[participantId];
        var hisUID = user.userid;
       // alert(hisUID + ' connected with you.');
    });

    var numberOfUsers = connection.getAllParticipants().length;
    //alert(numberOfUsers + ' users connected with you.');
	connection.send(numberOfUsers);
	document.getElementById("abc").innerHTML = "users:"+numberOfUsers;
	
}


connection.onmessage =  function(event) {
    var buffer = event.data;
	
	document.getElementById("abc").innerHTML = "users:"+buffer;
};

connection.join('your-room-id');


