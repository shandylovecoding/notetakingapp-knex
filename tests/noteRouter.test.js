const NoteRouter = require('../routers/noteRouter')
const NoteService = require('../service/noteService')
const file = `${__dirname}/test.json`
const noteService = new NoteService(file)
const noteRouter = new NoteRouter(noteService);
describe("note router tests", () => {
    beforeEach(() => {
        response = {
            status: jest.fn().mockResolvedValue(200),
            json: () => {
                return "Error?";
            },
        }
    })

    test("testing get method and the note service list", (done) => {
        let listSpy = jest.spyOn(noteService, "list");

        noteRouter.get(
            { auth: { user: "Joyce" } },
            response
        );
        expect(listSpy).toHaveBeenCalled();
        expect(listSpy).toHaveBeenCalledWith("Joyce");
        done();
    });

    test("testing post method and the note service add", (done) => {
        let addSpy = jest.spyOn(noteService, "add");
        let listSpy = jest.spyOn(noteService, "list");

        noteRouter.post(
            {
                auth: { user: "Joyce" },
                body: { note: "happy" }
            },
            response
        );
        expect(addSpy).toHaveBeenCalled()
        expect(addSpy).toHaveBeenCalledWith("happy", "Joyce");
        expect(listSpy).toHaveBeenCalled()
        expect(listSpy).toHaveBeenCalledWith("Joyce")
        done()
    })

    test("testing put method and the note service update", (done) => {
        let updateSpy = jest.spyOn(noteService, "update");
        let listSpy = jest.spyOn(noteService, "list");
        noteRouter.put(
            {
                auth: { user: "Joyce" },
                body: { note: "happy" },
                params: { id :0}
            },
            response
        );
        expect(updateSpy).toHaveBeenCalledWith(0,"happy", "Joyce");
        expect(listSpy).toHaveBeenCalled()
        done()
    })

    test("testing delete method and the note service delete", (done) => {
        let deleteSpy = jest.spyOn(noteService, "remove");
        let listSpy = jest.spyOn(noteService, "list");
        noteRouter.delete(
            {
                auth: { user: "Joyce" },
                params: { id :0}
            },
            response
        );
        expect(deleteSpy).toHaveBeenCalledWith(0, "Joyce");
        expect(listSpy).toHaveBeenCalled()
        done()
    })

    
})