//creo la variabile per l'input.
var input_chat = $('#chat_input');

$("#chat_input").focusin( function () {
  //recupero l'icona che deve scomparire
  var icona_mic = $('.footer_content .fa-microphone');
  var icona_send = $('.footer_content .fa-paper-plane');
  icona_mic.fadeOut( function(){
    icona_mic.addClass('disabled');
  });
  icona_send.fadeIn( function(){
    icona_send.removeClass('disabled');
  });
});


$("#chat_input").focusout( function (event) {
  //recupero l'icona che deve scomparire
  var icona_mic = $('.footer_content .fa-microphone');
  var icona_send = $('.footer_content .fa-paper-plane');
  icona_send.fadeOut( function(){
    icona_send.addClass('disabled');
  });
  icona_mic.fadeIn( function(){
    icona_mic.removeClass('disabled');
  });
});



//creo la funzione per scrivere il messaggio di invio preso dall input.
$('#send_action').mousedown(function (event) {
  event.preventDefault();
  //recupero cio che l'utente scrive nell input di input
  var input_chat_text = $('#chat_input:text').val();
  //prendo il nuovo elemento
  var new_message = $('.template .message_sent').clone();
  //controllo che l input di testo non sia vuoto altrimenti non faccio niente
  if (input_chat_text !== ("")) {
  //copio il testo dell input all'interno del p elemento.
  new_message.text(input_chat_text);
  //pusho l elemento con il nuovo testo nella chat
  $('.container_chat').append(new_message);
  //riprendo di nuovo il testo nell'input e lo svuoto
  $('#chat_input:text').val("");
  //faccio tornare il focus nell input
  }
});

//mando l'input di click icon anche con le key enter solo se si ha il focus nell input
$('#chat_input').on("keypress", function(e){
       if(e.which == 13){
           $('#send_action').mousedown()
       }
});
