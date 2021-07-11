const NoteService = require("./noteService");

describe("note service tests", () => {
  //   beforeEach(() => {
  //   });

  test("list note returns an error if the user is not defined", () => {
    const noteService = new NoteService();
    expect(() => noteService.list("John")).toThrow();
  });

  test("If the user is defined it has a note", () => {
    const noteService = new NoteService();
    noteService.add("Hello", "Pumba");
    expect(noteService.list("Pumba")).toEqual(["Hello"]);
  });

  test("If you edit a note it is edited", () => {
    const noteService = new NoteService();
    noteService.add("Hello", "Pumba");
    noteService.edit("Edited hello", "Pumba", 0);
    expect(noteService.list("Pumba")).toEqual(["Edited hello"]);
  });

  // add a test for delete note

  // Add multiple users and notes, test to see if this.notes contains the correct values
});