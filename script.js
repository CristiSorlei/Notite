  let notes = JSON.parse(localStorage.getItem('notes')) || [];

  function addNote() {
    const noteText = document.getElementById('noteText').value;
    const noteImportance = document.getElementById('noteImportance').value;
    const note = { text: noteText, importance: noteImportance };
    notes.push(note);
    localStorage.setItem('notes', JSON.stringify(notes));
    saveNoteToLocalStorage(note);
    renderNotes();
  }

  function saveNoteToLocalStorage(note) {
    const allNotes = JSON.parse(localStorage.getItem('allNotes')) || [];
    const formattedNote = { text: note.text.replace(/\n/g, ' '), importance: note.importance };
    allNotes.push(formattedNote);
    localStorage.setItem('allNotes', JSON.stringify(allNotes));
  }

  function deleteNote(index) {
    if (notes[index].importance === 'important') {
      const confirmDelete = confirm("Aceasta notita este importanta. Esti sigur ca vrei sa o stergi?");
      if (!confirmDelete) {
        return; // Abort deletion
      }
    }

    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    deleteNoteFromLocalStorage(index);
    renderNotes();
  }

  function deleteNoteFromLocalStorage(index) {
    const allNotes = JSON.parse(localStorage.getItem('allNotes'));
    allNotes.splice(index, 1);
    localStorage.setItem('allNotes', JSON.stringify(allNotes));
  }

  function renderNotes() {
    const noteList = document.getElementById('noteList');
    noteList.innerHTML = '';

    for (let i = 0; i < notes.length; i++) {
      const note = notes[i];
      const noteElement = document.createElement('div');
      noteElement.classList.add('note');

      if (note.importance === 'important') {
        noteElement.classList.add('important-note');
      }

      const noteTextElement = document.createElement('div');
      noteTextElement.contentEditable = true;
      noteTextElement.innerHTML = note.text.replace(/\n/g, '<br>');

      noteTextElement.addEventListener('input', () => {
        note.text = noteTextElement.innerHTML.replace(/<br>/g, '\n');
        saveNotesToLocalStorage();
      });

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.classList.add('delete-button');
      deleteButton.addEventListener('click', () => {
        deleteNote(i);
      });

      noteElement.appendChild(noteTextElement);
      noteElement.appendChild(deleteButton);
      noteList.appendChild(noteElement);
    }
  }

  function saveNotesToLocalStorage() {
    localStorage.setItem('notes', JSON.stringify(notes));
  }

  renderNotes();
