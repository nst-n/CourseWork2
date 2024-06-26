const Datastore = require("gray-nedb");
const bcrypt = require("bcrypt");
const saltRounds = 10;

class UserDAO{
    constructor(dbFilePath){
        if(dbFilePath){
            this.db = new Datastore({filename: dbFilePath, autoload: true});
        }else{
            this.db = new Datastore();
        }
    }

    // for the demo the password is the bcrypt of the username
    init(){
        this.db.insert({
            user: 'tester',
            password: '$2b$10$I82WRFuGghOMjtu3LLZW9OAMrmYOlMZjEEkh.vx.K2MM05iu5hY2'
        });
        return this;

        
    }
    
    //creates new user and salts password
    create(username, password) {
        const that = this;
        bcrypt.hash(password, saltRounds).then(function(hash) {
            var entry = {
                user: username,
                password: hash,
            };
            that.db.insert(entry, function(err) {
                if (err) {
                    console.log("Can't insert user: ", username);
                }
            });
        });
    }

    // identifies if a user already exists
    lookup(user, cb) {
        this.db.find({'user': user}, function(err, entries) {
            if (err) {
                return cb(null, null);
            } else {
                if (entries.length == 0) {
                    return cb(null, null);
                }
                return cb(null, entries[0]);
            }
        });
    }



}

const dao = new UserDAO();
dao.init();
module.exports = dao;