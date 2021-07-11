const fs = require('fs')
const path = require('path')

module.exports = function myAuthorizer(username, password, callback) {
    const USERS = fs.readFileSync(path.join(__dirname,'/stores/user.json'), 'utf-8', async (err, data) => {
        if (err) {
            throw err
        }
        return await data
    });
    let parsed = JSON.parse(USERS);
    let user = parsed.users.filter((user) => user.username == username);
    if (user[0].username === username && user[0].password === password) {
        return callback(null, true);
    } else {
        return callback(null, false);
    }
};
