var numNotes = 0;
var loadNoteNum = 0;
var r = 0;
var g = 0;
var b = 0;
var color = null;

var namesOfColumnsIds = ["#todo","#inprogress","#done"];




$(document).ready(function() {

  Setup();

 
  //create yellow note
  $("#yellowBox").click(function()
  {
    color = $(this).css("background-color");
    NewNote();
    $("#overlay_form").fadeOut(500);
    return false;
  });
  //create red note
  $("#redBox").click(function()
  {
    color = $(this).css("background-color");
    NewNote();
    $("#overlay_form").fadeOut(500);
    return false;
  });
  //create blue note
  $("#blueBox").click(function()
  {
    color = $(this).css("background-color");
    NewNote();
    $("#overlay_form").fadeOut(500);
    return false;
  });

  //create green note
  $("#greenBox").click(function()
  {
    color = $(this).css("background-color");
    NewNote();
    $("#overlay_form").fadeOut(500);
    return false;
  });


  //create note
  $("#createNote").click(function()
  {
    Note();
    $("#overlay_form").fadeOut(500);
    return false;
  });

  //close popup
  $("#close").click(function(){
    $("#overlay_form").fadeOut(500);
  });

  $("#overlay_form").css({
    left: ($(window).width() - $('#overlay_form').width()) / 2,
    top: ($(window).width() - $('#overlay_form').width()) / 7,
    position:'absolute'
  });

  $("#overlay_form2").css({
    left: ($(window).width() - $('#overlay_form').width()) / 2,
    top: ($(window).width() - $('#overlay_form').width()) / 7,
    position:'absolute'
  });

  //maintain the popup at center of the page when browser resized
  $(window).bind('resize',positionPopup);
  $(window).bind('resize',positionPopup2);

  $('#clearStorage').click(function()
  {
    localStorage.clear();
    alert("Local Storage Cleared")
    return false;
  });

  $("#newNote").click(function()
  {
    $("#overlay_form").fadeIn(1000);
    positionPopup();
  });

  $('#editLayout').click(function () {
      $("#overlay_form2").fadeIn(1000);
      positionPopup2();
  });

  $('#closeCol').click(function() {
      $("#overlay_form2").fadeOut(500);
       return false;
  });

  $('#createBoard').click(function() {
      var nameOfCol = $('#addCol').val();
      AddColumn(nameOfCol);
       $("#overlay_form2").fadeOut(500);
       return false;
  });


  $('#addColumn').click(function() {

    $('.boxheaders').append('<div id ="done-header"><h1>New</h1></div>');
    $('.box').append('<div id ="done"></div>');
  });


}); //End Document.ready

function Setup() {

  for (var i = 0; i < namesOfColumnsIds.length; i++)
  {

    $( namesOfColumnsIds[i] ).droppable({

      hoverClass: "ui-state-active",
      drop: function(event, ui) {
        
        var targetElem = $(this).attr("id");
        ui.draggable.clone().appendTo($(this));
       //alert(targetElem);
        var d = new Date();
        $('.note #todoDate').html('<p id= ' +  targetElem + 'Date>' + d + '</p>');
        $('.note #todoDate').css('display', 'none');
        $( ".note" ).draggable({ containment: "container", revert: "invalid", helper: "clone", scroll: false });
        MoveNote(ui.draggable, $('div ' + namesOfColumnsIds[i]));

      }
    });
    //return false;
  }

};



function SetupNewColumn($num) {
  var i = $num;
    $( "div " + namesOfColumnsIds[i] ).droppable({

      hoverClass: "ui-state-active",
      drop: function(event, ui) {
       var targetElem = $(this).attr("id");
        $(ui.draggable).clone().appendTo($(this));
        var d = new Date();
        $('.note #todoDate').html('<p id= ' +  targetElem + 'Date>' + d + '</p>');
        $('.note #todoDate').css('display', 'none');
        $( ".note" ).draggable({ containment: "container", revert: "invalid", helper: "clone", scroll: false });
        MoveNote(ui.draggable, $('div ' + namesOfColumnsIds[i]));
      }
    });
   
};

function AddColumn($name) {
    $('.boxheaders').append('<div id = ' + $name +' class="generic-header"><h1>' + $name  + '</h1></div>');
    $('.box').append('<div id =' + $name + ' class="generic ui-droppable" ></div>');
    $('.box' + $name).droppable();
    //get number of current array elements
    var number = namesOfColumnsIds.length;
    namesOfColumnsIds.push('#' + $name);
    //alert(namesOfColumnsIds.length);
    SetupNewColumn(number);
};


//function MoveNote($item,$target)
function MoveNote2($item)
{
  var targetElem = $(this).attr("id");
  $item.appendTo(this);
    
  //$item.remove();
  
}

function MoveNote($item , $target)
{
  // $item.fadeOut('fast');
  $item.fadeOut('fast');
  
}

function addText()
{
}

function NewNote()
{
  var d = new Date();
  var noteId = document.forms[0].idText.value;
  var noteDesc = document.forms[0].noteDescription.value;
  var selectedDiv = $('div #todo');
  //  var stickynote = $('<div class="note" />').appendTo($(selectedDiv));
  var stickynote = document.createElement("div");
  $(stickynote).addClass("note");
  stickynote.setAttribute("style", "background-color:" + color);
  // stickynote.style.cssText('background-colour:' + color);
  $(selectedDiv).append($(stickynote));
  var textHead = $('<h1 class = "noteHead ">' + noteId + '</h1>').appendTo($(stickynote));
  var textDesc = $('<p>' + noteDesc + '</p>').appendTo($(stickynote));

  $('.note').append('<p id="todoDate">Date ToDo: ' + d + '</p>');
  $('.note').append('<p id="inProgressDate">Date inProgress: ' + d + '</p>');
  $('.note').append('<p id="doneDate">Date done: ' + d + '</p>');
  $('.note #todoDate').css('display', 'none');
  $('.note #inProgressDate').css('display', 'none');
  $('.note #doneDate').css('display', 'none');
  $( ".note" ).draggable({ containment: "container", revert: "invalid", helper: "clone", scroll: false });
  numNotes++;
  localStorage.setItem('numNotes', JSON.stringify(numNotes));
};

//position the popup at the center of the page
function positionPopup()
{
  if(!$("#overlay_form").is(':visible'))
  {
    return;
  }
}
//position the popup at the center of the page
function positionPopup2()
{
  if(!$("#overlay_form2").is(':visible'))
  {
    return;
  }
}



