/* global $ */
'use strict';
(function($) {
  var NotesManager = function NotesManager() {
    // assume this data came from the database
    var notes = [
      "This is the first note I've taken!",
      "Now is the time for all good men to come to the aid of their country.",
      "The quick brown fox jumped over the moon."
    ];

    function addNote(note) {
      $("#notes").prepend(
        $("<a href='#'></a>")
        .addClass("note")
        .text(note)
      );
    }

    function addCurrentNote() {
      var current_note = $("#note").val();

      if (current_note) {
        notes.push(current_note);
        addNote(current_note);
        $("#note").val("");
      }
    }

    function showHelp() {
      $("#help").show();

      document.addEventListener("click",function __handler__(evt){
        evt.preventDefault();
        evt.stopPropagation();
        evt.stopImmediatePropagation();

        document.removeEventListener("click",__handler__,true);
        hideHelp();
      },true);
    }

    function hideHelp() {
      $("#help").hide();
    }

    function handleOpenHelp(evt) {
      if (!$("#help").is(":visible")) {
        evt.preventDefault();
        evt.stopPropagation();

        showHelp();
      }
    }

    function handleAddNote() {
      addCurrentNote();
    }

    function handleEnter(evt) {
      if (evt.which == 13) {
        addCurrentNote();
      }
    }

    function handleDocumentClick() {
      $("#notes").removeClass("active");
      $("#notes").children(".note").removeClass("highlighted");
    }

    function handleNoteClick(evt) {
      evt.preventDefault();
      evt.stopPropagation();

      $("#notes").addClass("active");
      $("#notes").children(".note").removeClass("highlighted");
      $(evt.target).addClass("highlighted");
    }

    var PublicApi = {
      init: function init() {
        // build the initial list from the existing `notes` data
        var html = "";
        for (var i=0; i<notes.length; i++) {
          html += "<a href='#' class='note'>" + notes[i] + "</a>";
        }
        $("#notes").html(html);

        // listen to "help" button
        $("#open_help").bind("click",handleOpenHelp);
        // listen to "add" button
        $("#add_note").bind("click",handleAddNote);
        // listen for <enter> in text box
        $("#new_note").bind("keypress",handleEnter);
        // listen for clicks outside the notes box
        $(document).bind("click",handleDocumentClick);
        // listen for clicks on note elements
        $("#notes").on("click",".note",handleNoteClick);
      }
    };
    return PublicApi;
  };

  var notesManager = NotesManager();
  // We pass to document.ready a function reference, not the execution of the
  // function() in order to make sure that we're calling the function when the
  // dom is ready. If we were to call the function inside ready we would
  // acutally defer the result of the function, which is not what we want. We
  // want to defer the actual call of the function, for when the DOM is ready
  $(document).ready(notesManager.init);

}($));
