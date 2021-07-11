const express = require('express');
const notes = {
    note: [
        {
        "title": "Hello",
        "content": "is me"
        },
    ]
};
module.exports =  class ViewRouter{


router(){
        const router = express.Router();
        router.get('/',(req,res)=>res.render('index', notes));
        return router
    }
}