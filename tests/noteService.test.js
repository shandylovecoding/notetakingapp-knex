
const NoteService = require('../Service/NoteService');
const fs = require('fs');
const file = `${__dirname}/test.json`;

describe("note service tests", () => {
    beforeEach((done) => {
      fs.unlink(file, (err) => {
        if (err) {
            console.log(err)
            };
            this.noteService = new NoteService(file);
            done();
        });
    });
  test('At first it should list empty notes', () => {
    return this.noteService.list()
        .then((notes) => expect(notes).toEqual({}))
  });
  test('note add function', () => {
    return this.noteService.add('first note', 'sam')
        .then(() => this.noteService.read()) 
        .then((notes) => {
            expect(notes).toEqual({
                sam: ['first note']
            });
        });
});

  test("a note update function", () => {
    return this.noteService.add("Hello", "Kitty")
    .then(() => this.noteService.update(0,'Edited hello', 'Kitty'))
    .then(() => this.noteService.read()) 
    .then((notes) => 
    expect(notes).toEqual({Kitty:['Edited hello']}))
  });

  test("a note delete function", () => {
    return this.noteService.add("Hello", "Kitty")
    .then(() => this.noteService.remove(0, 'Kitty'))
    .then((notes) => expect(notes).toEqual({Kitty: []}))
  })

  test("Error when remove a nonexisting note", () => {
    return this.noteService.add("Hello", "Kitty")
    .then(() => this.noteService.remove(3, 'Kitty'))
    .catch((err) => {
      expect(err).toEqual(new Error("Cannot remove a note that doesn't exist"))
    })
})

})
