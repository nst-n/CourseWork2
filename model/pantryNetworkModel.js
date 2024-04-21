const nedb = require('gray-nedb');

class PantryNetwork{
    constructor(dbFilePath){

        if(dbFilePath){
            this.db = new nedb({filename: dbFilePath, autoload: true});
            console.log('DB connected to ' + dbFilePath);
        }else{
            this.db = new nedb();
        }
        
    }

    //Sample seed data 
    init(){
        this.db.insert({
            name: "Sample Item 1",
            description: "This is a sample item",
            useByDate: "2024-05-01",
            isSelected: false
        })
        //for later debugging
        console.log("db entry 'Sample Item 1' inserted");

        this.db.insert({
            name: "Sample Item 2",
            description: "This is a sample item",
            useByDate: "2024-05-03",
            isSelected: false
        })
        //for later debugging
        console.log("db entry 'Sample Item 2' inserted");

        this.db.insert({
            name: "Sample Item 3",
            description: "This is a sample item",
            useByDate: "2024-07-01",
            isSelected: false
        })
        //for later debugging
        console.log("db entry 'Sample Item 3' inserted");
        
        this.db.insert({
            name: "Sample Item 4",
            description: "This is a sample item",
            useByDate: "2024-06-01",
            isSelected: false
        })
        //for later debugging
        console.log("db entry 'Sample Item 4' inserted");

        this.db.insert({
            name: "Sample Item 5",
            description: "This is a sample item",
            useByDate: "2024-05-22",
            isSelected: false
        })
        //for later debugging
        console.log("db entry 'Sample Item 5' inserted");

        this.db.insert({
            name: "Sample Item 6",
            description: "This is a sample item",
            useByDate: "2024-08-01",
            isSelected: false
        })
        //for later debugging
        console.log("db entry 'Sample Item 6' inserted");

        this.db.insert({
            name: "Sample Item 7",
            description: "This is a sample item",
            useByDate: "2024-05-30",
            isSelected: false
        })
        //for later debugging
        console.log("db entry 'Sample Item 7' inserted");
        this.db.insert({
            name: "Sample Item 8",
            description: "This is a sample item",
            useByDate: "2024-05-01",
            isSelected: false
        })
        //for later debugging
        console.log("db entry 'Sample Item 8' inserted");

        this.db.insert({
            name: "Sample Item 9",
            description: "This is a sample item",
            useByDate: "2024-06-01",
            isSelected: false
        })
        //for later debugging
        console.log("db entry 'Sample Item 9' inserted");

     

  

    }

    //returns all db entries
    getAllEntries(){
        //return a Promise object
        return new Promise((resolve, reject)=>{
            //use find() to get the data,
            //error first c.b function, err for error, entries for data
            this.db.find({}, (err, entries)=>{
                //if err -> reject Promise
                if(err){
                    reject(err);
                    
                }//otherwise, resolve promise & return data
                else{
                    resolve(entries);
                    //view what the returned data looks like
                    console.log('function all() returns: ', entries);
                }
            })
        })
    }


    //adds single item to db
    addItem(name, description, useByDate) {
        const entry = {
            name: name,
            description: description,
            useByDate: useByDate
        };
    
        return new Promise((resolve, reject) => {
            this.db.insert(entry, function(err, newItem) {
                if (err) {
                    reject(err);
                } else {
                    resolve(newItem);
                }
            });
        });
    }
}

module.exports = PantryNetwork;