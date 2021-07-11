class NoteService {
    constructor() {
      this.notes = {};
    }
  
    add(note, user) {
      if (this.notes[user] === undefined) {
        this.notes[user] = [note];
      } else {
        this.notes[user].push(note);
        console.log(this.notes[user], "<<< Add note done");
      }
    }
  
    edit(note, user, index) {
      this.notes[user][index] = note;
      console.log(this.notes[user], "<<< Edit note done");
    }
  
    delete(user, index) {
      this.notes[user].splice(index, 1);
  
      console.log(this.notes[user], "<<< Delete note done");
    }
  
    list(user) {
      if (this.notes[user] === undefined) {
        throw new Error("User note defined!");
      } else {
        console.log(this.notes[user]);
        return this.notes[user];
      }
    }
  }
  
  module.exports = NoteService;