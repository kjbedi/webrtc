


var connection = new RTCMultiConnection();

// this line is VERY_important
connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';

// if you want text chat
connection.session = {
    data: true,
	video:true,
	
};
function a(){
	connection.send("hello");
}




connection.onmessage =  function(event) {
    var buffer = event.data;
	document.getElementById("abc").innerHTML = "users:"+buffer;
};
connection.open('your-room-id');


