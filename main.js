const newNote = document.querySelector(".input-note");
const newNoteAddBtn = document.querySelector(".btn-note-add");
const noteList = document.querySelector(".note-list");

newNoteAddBtn.addEventListener("click", addNote);
noteList.addEventListener("click", deleteNote);
document.addEventListener("DOMContentLoaded", getFromLocalStorage);

function deleteNote(e) {
  e.preventDefault();

  const clickedElement = e.target;

  if (clickedElement.classList.contains("note-btn-completed")) {
    clickedElement.parentElement.classList.toggle("note-completed");
  }
  if (clickedElement.classList.contains("note-btn-delete")) {
    if (confirm("Are you sure?")) {
      // clickedElement.remove(); // this deletes only "delete button"
      clickedElement.parentElement.classList.toggle("becomeInvisible"); // not removing totally, can see it on browser
      // clickedElement.parentElement.remove(); // removing without animation

      const deletedNote = clickedElement.parentElement.children[0].innerHTML;
      deleteFromLocalStorage(deletedNote);

      clickedElement.parentElement.addEventListener(
        "transitionend",
        function () {
          clickedElement.parentElement.remove();
        }
      );
    }
  }
}

function addNote(e) {
  e.preventDefault();

  if (newNote.value.length > 0) {
    createNoteItem(newNote.value);

    // save to  localStorage
    savetoLocalStorage(newNote.value);

    // empty the value of input
    newNote.value = "";
  } else {
    alert("Please Enter Some Note");
  }
}

function convertLocalStorageToArray() {
  let notes;

  if (localStorage.getItem("notes") === null) {
    notes = [];
  } else {
    notes = JSON.parse(localStorage.getItem("notes"));
  }

  return notes;
}

function savetoLocalStorage(newNote) {
  let notes = convertLocalStorageToArray();
  notes.push(newNote);
  localStorage.setItem("notes", JSON.stringify(notes));
}

function getFromLocalStorage() {
  let notes = convertLocalStorageToArray();

  notes.forEach((note) => {
    createNoteItem(note);
  });
}

function createNoteItem(note) {
  // creating of div element
  const noteDiv = document.createElement("div");
  noteDiv.classList.add("note-item");

  // creating of li element
  const noteLi = document.createElement("li");
  noteLi.classList.add("note-definition");
  noteLi.innerText = note; // "newNote.value"
  noteDiv.appendChild(noteLi);

  // adding completed button
  const noteCompleted = document.createElement("button");
  noteCompleted.classList.add("note-btn");
  noteCompleted.classList.add("note-btn-completed");
  noteCompleted.innerHTML = '<i class="far fa-check-square"></i>'; // html code, difference between "innerText" and "innerHTML"
  noteDiv.appendChild(noteCompleted);

  // adding delete button
  const noteDelete = document.createElement("button");
  noteDelete.classList.add("note-btn");
  noteDelete.classList.add("note-btn-delete");
  noteDelete.innerHTML = '<i class="far fa-trash-alt"></i>'; // html code, difference between "innerText" and "innerHTML"
  noteDiv.appendChild(noteDelete);

  // created div adding to ul
  noteList.appendChild(noteDiv);
}

function deleteFromLocalStorage(note) {
  // we can make here reusable, not rewrited more than once
  let notes = convertLocalStorageToArray();

  // splice, delete, filter
  const deletedNoteIndex = notes.indexOf(note);
  console.log(deletedNoteIndex);
  notes.splice(deletedNoteIndex, 1);

  localStorage.setItem("notes", JSON.stringify(notes));
}
