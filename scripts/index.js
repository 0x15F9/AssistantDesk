$('#message_input').focus()

$(document).on('keypress',function(e) {
  if(e.which == 13) {
    SendMessage('#message_input', '#chat');
  }
});