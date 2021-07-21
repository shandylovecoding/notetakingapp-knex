
class NoteService {
  constructor(knex) {
    this.knex = knex
  }

  // List note is a function which is very important for the application, it retrieves the notes for a specific user. The user is accessed via req.auth.user within our router.
  list(user){
    let query = this.knex
    .select("notes.id","notes.content")
    .from("notes")
    .innerJoin("users","notes.user_id","users.id")
    .where("users.username",user)
    .orderBy("notes.id","asc");
    return query.then((rows)=>{
     return rows.map((row)=>({
        id:row.id,
        content:row.content,
      }
      ));
      });
  }

  // This method add notes updates the users notes, by adding the new note to this.notes, it then calls this.write, to update our JSON file with the newest notes.
  async add(note,user){
    console.log("note>>>>>>>>",note);
    let query= await this.knex
    .select("id")
    .from("users")
    .where("users.username",user);
    console.log(query);
    if(query.length===1){
      await this.knex.insert({
        content:note,
        user_id:query[0].id,
      })
      .into("notes");
    }else{
      thrownewError(`Cannot add a note to a user that doesn't exist!`);
    }}

  // This method will be used to update a specific note in our application, it also handles some errors for our application. Then it calls this.write to update the JSON file.
  update(id,note,user){
    console.log("note>>>>>>>>",note);
    let query=this.knex
    .select("id")
    .from("users")
    .where("users.username",user);
    return query.then((rows)=>{
      if(rows.length===1){
        return this.knex("notes")
        .where("id",id)
        .update({content:note,});
      }else{
        thrownewError(`Cannot update a note if th user doesn't exist!`);
      }
    });
  }

  // This method will remove a particular note from our this.notes. Then it calls this.write to update our JSON file.
  remove(id,user){
    let query=this.knex
    .select("id")
    .from("users")
    .where("users.username",user);
    return query.then((rows)=>{
      if(rows.length===1){
        return this.knex("notes")
        .where("id",id).del();
      }else{
        thrownewError(`Cannot remove a note when the user doesn't exist!`);
      }
    });
    }
  }
module.exports = NoteService;