//creo la variabile per l'input.
var input_chat = $('#chat_input');
//variabile per l'input per ricercare tra le chat
var input_ricercachat = $('#ricercachat_input');
//titolo di ogni chat
var chat_di_un_utente = $('.users_messages .utente h3')

//FOCUS SU INPUT MAIN
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

//FOCUS OUT SU INPUT MAIN
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
  //creo il messaggio di risposta
  setTimeout(response, 2000)
  }
});



//CERCO TRA LE CHAT CHE GIA HO
input_ricercachat.click(function () {
     cercatralechat();
});




// $('#ricercachat_input').on("keypress", function(e){
//             console.log("hello");
//            cercatralechat(e);
//
// });





//CON IL TASTO ENTER FACCIO ....
$('#chat_input').on("keypress", function(e){
       if(e.which == 13){
           $('#send_action').mousedown();
       }
});

$('#ricercachat_input').on("keypress", function(e){
       if(e.which == 13){
           input_ricercachat.click();
       }
});


//CERCARE TRA LE CHAT
function  cercatralechat() {
  //prendo il testo scritto dall'utente togliendo gli spazi e trasformandolo in lettere minuscole
  var input_chat_text = $('#ricercachat_input:text').val().trim().toLowerCase();
  //il testo nell input non puo essere vuoto
    if (input_chat_text !== ("")) {
      //prendo ogni h3
      chat_di_un_utente.each(function (){
        //prendo il testo scritto dentro l h3 e lo transformo in lettere minuscole
        var nome_utente = $(this).text().toLowerCase();
        //se la chat scritta é uguale ad un elemeento in html allora
        if (nome_utente == input_chat_text || nome_utente.includes(input_chat_text)) {
          $(this).parents(".utente").show();
        } else {
          var utente = $('.users_messages .utente');
          $(this).parents(".utente").hide();
        }
      })
  } //se l input torna ad essere vuoto
   else {
    $(".utente").show();
  }
};


//MAIN CHAT RISPOSTA AUTOMATICA COMPUTER
function response() {
  var input_chat_text = ('ok');
  var new_message = $('.template .message_received').clone();
  new_message.text(input_chat_text);
  $('.container_chat').append(new_message);
  }
