//creo la variabile per l'input.
var input_chat = $('#chat_input');
//variabile per l'input per ricercare tra le chat
var input_ricercachat = $('#ricercachat_input');
//titolo di ogni chat
var chat_di_un_utente = $('.users_messages .utente h3')
//variabile icona delete message
var arrow = $("#arrow");

//parto con il focus sulla chat di default
$('#chat_input').focus();

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
  $('.container_chat > div.active').append(new_message);
  //riprendo di nuovo il testo nell'input e lo svuoto
  $('#chat_input:text').val("");
  //creo il messaggio di risposta
  setTimeout(response, 1000)
  }
});

// FUNZIONE CLICK SU CHAT E CAMBIARE LE CHAT DA APRIRE IN MAIN CONTAINER
$('.users_messages .utente').click( function (){
  //prendo il div utente nell html e lo clono
  var utente_cliccato = $(this).clone();
  //faccio sparire l'utente presente di default
  $(".header_main .container_active .utente_active").addClass("disabled");
  //modifico l'elemento clonato togliendo la classe utente e mettendo la classe utente_active con le rispettive regole css
  utente_cliccato.addClass("utente_active");
  utente_cliccato.removeClass("utente");
  //pusho il nuovo div nell header
  $(".header_main .container_active").append(utente_cliccato);
  // tolgo il background grigio e  lo metto sul selezionato
  $('.users_messages .utente.gray_background').removeClass("gray_background");
  $(this).addClass("gray_background")
  //prendo l'elemento cliccato e vado a prenderne il titolo ovvero lh3 ovvero il nome utente
  var utente_cliccato = $(this).index();
  var nome_utente_cliccato = $(".users_messages .utente h3").index();
  //faccio in modo che l'utente cliccato diventa rappresentato solo dal nome dell h3
  utente_cliccato == nome_utente_cliccato;
  var nome = $(".users_messages .utente h3").eq(utente_cliccato).text().toLowerCase();
  //prendo l'elemento della chat corrispondente tramite l attributo data
  var chat_grande_main = $(".chat[data-chat='" + nome + "']");
  //faccio sparire le altre chat e lascio aperta solo quella selezionata a sinistra tra gli utenti
  $(".container_chat .chat.active").removeClass("active");
  chat_grande_main.addClass("active")
  //al click a sinistra il focus passa sull'input di chat per essere gia pronto a scrivere
  $('#chat_input').focus();
});


//CREO UNA FUNZIONE PER LA QUALE QUANDO CAMBIO CHAT CLICCANDO A SINITRA NEGLI UTENTI IL FOCUS RIMANGA NELL INPUT TESTO
//E NON FA CAMBIARE L'ICONA IN BASSO ALTRIMENTI IL SEMPLICE CLICK FUNGEREBBE COME FOCUSOUT
$('.users_messages .utente').on("mousedown" , function() {
  event.preventDefault();
});

// CREO LA FUNZIONE PER CANCELLARE O AVERE INFORMAZIONI SU UN MESSAGGIO
$(".container_chat .chat p").mouseenter( function(){
  $(this).append(arrow);
  arrow.removeClass("disabled");
});

$(".container_chat .chat  p").mouseleave( function(){
  arrow.addClass("disabled");
});








//!!!!!!!!!!!!!!!!"""""""""""""""""" CHIEDERE""""!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!"""""""""""""""""" CHIEDERE""""!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!"""""""""""""""""" CHIEDERE""""!!!!!!!!!!!!!!!!!!!!!!

$(".container_chat").delegate(".new_chat",  "mouseenter" , function (){
  $(this).append(arrow);
  arrow.removeClass("disabled");
})

$(".container_chat").delegate(".new_chat",  "mouseleave" , function (){
  arrow.addClass("disabled");
})


//!!!!!!!!^^^^^^^^^^^^"""""""""" CHIEDERE""^^^^^^^^^^^""!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!"""""""""""""""""" CHIEDERE""""!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!"""""""""""""""""" CHIEDERE""""!!!!!!!!!!!!!!!!!!!!!!








//CERCO TRA LE CHAT CHE GIA HO
input_ricercachat.click(function () {
     cercatralechat();
});


// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!DA CONTROLLARE SE HA SENSO METTERLO !!!!!!!!!!!!
input_ricercachat.focusin(function () {
    input_chat_text = $('#ricercachat_input:text').val("");
    $('.users_messages .utente').show();
});
//!!!!!!!!!!!!DA CONTROLLARE SE HA SENSO METTERLO !!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

//CON IL TASTO ENTER FACCIO ....
$('#chat_input').on("keypress", function(e){
       if(e.which == 13){
           $('#send_action').mousedown();
       }
});


//AGGIORNO CONSTANTEMENTE L'INPUT CHAT COSI CHE SIA "LIVE"
$('#ricercachat_input').on("keyup", function(){
           input_ricercachat.click();
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
  $('.container_chat > div.active').append(new_message);
  }
