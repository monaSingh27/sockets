var name =getQueryVariable('name') || 'Anonymous';
// var room =getQueryVariable('room');
console.log(name);
console.log(typeof name);

var room;

// console.log(typeof room);

var socket = io();

// console.log(name + ' wants to join '+ room);

if(name.substring( name.indexOf('@'))=='@gmail.com')
 {
  
   room= 'GmailRoom';
  
 console.log(room);

  console.log('gmail.com')

 
 jQuery('.room-title').text(room);
  
}
else if(name.substring( name.indexOf('@'))=='@workscripts.in')
{

     room= 'WorkscriptsRoom';
  
 console.log(room);

  console.log('workscripts.com')

 
 jQuery('.room-title').text(room);

}
else
{

  room='GeneralRoom';

 console.log(room);

  console.log('General')

 
 jQuery('.room-title').text(room);

}

console.log(name + ' wants to join '+ room);

socket.on('connect',function()
{
	 console.log('connected to socket io server');
      socket.emit('joinRoom',{

        name: name,
        room: room
      });


});

socket.on('message',function(message)
{ 
	  var momentTimestamp = moment.utc(message.timestamp);
	  var $message = jQuery('.messages');

    console.log('new message:');
    console.log(message.text);


  $message.append('<p><strong>'+ message.name + ' ' + momentTimestamp.local().format('h:mm a') +'</strong</p>')
   $message.append('<p>'+message.text +'</p>')
});

var $form = jQuery('#message-form');

$form.on('submit', function(event)
{
  event.preventDefault();

  var $message = $form.find('input[name=message]');

  socket.emit('message',{
  	name: name,
  	text: $message.val()
  });

$message.val('');

});