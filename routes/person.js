const express=require("express");
const router=express.Router();
const Person=require('../models/person');






//@Api http:localhost:6500/api/persons
//@desc Add new Person
//@access public

router.post("/", (req,res)=>{
    const newPerson = new Person({...req.body});
    newPerson
      .save()
      .then((person)=> res.send(person))
      .catch((err)=> res.send(err));
})


//@Api http:localhost:6500/api/persons
//@desc Get all Persons
//@access public

router.post("/", (req,res)=>{
  Person.find()
        .then((persons) => res.send(persons))
        .catch((err)=> res.send(err));
      })

//@Api http:localhost:6500/api/persons/:_id
//@desc Delete a Person by ID
//@access public

router.delete("/:_id", (req,res)=>{
  let {_id} = req.params;
  Person.findByIdAndDelete({_id})
        .then(() => res.send("this person has been deleted successfully"))
        .catch((err)=> res.send(err));
});



//@Api http:localhost:6500/api/persons/:_id
//@desc Update a Person by ID
//@access public


router.put("/:_id", (req,res)=>{
  let {_id} = req.params;
  Person.findByIdAndUpdate({_id},{$set: {...req.body}})
        .then(() => res.send("this person has been updated successfully"))
        .catch((err)=> res.send(err));
});


//----------------------
// create a document instance/record of person 
// And passing a person named Sami

let Person1 = new Person ({
  name:"Sami",
  age: 32,
  favoriteFoods :  ["Chocolate", "frites"],
  "email" : "sami3310@nokia.sw",
  "phone" : "+413310331020",
  });
  
  // saving it 
  Person1.save((err, data)=>{
    err?console.log('error :',err) : console.log(data)
   });

//---------------------------
//ArrayOfPeople   
const ArrayOfPeople = [
   {
      name:"Sami",
      age: 38,
      favoriteFoods :  ["Pizza", "Spaghetti"],
      email: "sami@edu.ca",
      phone: "+10000000",
    },

    { 
      name:"Klayton",
      age: 22,
      favoriteFoods :  ["Pizza", "Spaghetti"],
      email: "klayton@gmail.br",
      phone: "+5510000000",
      },
    {       
      name:"Sherry",
      age: 20,
      favoriteFoods :  ["Pizza", "Spaghetti"],
      email: "sherry@edu.us",
      phone: "+10000455000",
      
      },
    {
      name:"Sharapova",
      age: 38,
      favoriteFoods :  ["burrito", "hamburger", "fruits"],
      email: "sharap@tennisplanet.ru",
      phone: "+45106000080",
    },
    {
      name:"Mary",
      age: 23,
      favoriteFoods :  ["fast-food", "vegetebales"],
      email: "mary@chelsea.uk.co",
      phone: "+449030240000",
    } ,
    { 
      name:"Tarek",
      age: 30,
      favoriteFoods :  ["Pizza", "Salami"],
      email: "tarek1920@ca.tn",
      phone: "+21600770000",
            },
    {
      name:"Samir",
      age: 52,
      favoriteFoods :  ["Fish", "eggs"],
      email: "samir@myegy.eg",
      phone: "+2010000000",
              },
    {
      name:"Young",
      age: 28,
      favoriteFoods :  ["burrito", "Korean meals"],
      email: "l.young@samsung.org",
      phone: "+255355556",
    },
    {
      name:"Samira",
      age: 18,
      favoriteFoods :  [ "Couscous", "Panini", "Ojja Merguez"],
      email: "samira@notfound.tn",
      phone: "+2160000000",
                  },
    {
      name:"Sahin",
      age: 14,
      favoriteFoods :  ["vegetebales", "chicken", "burrito"],
      email: "sahin@edu.ge",
      phone: "+49123000000",
      },

    {
      name:"Emilia",
      age: 24,
      favoriteFoods :  ["vegetebales", "Pizza"],
      email: "emilia@channel.it",
      phone: "+39999000000",
    } 
  ];


//Create many records with Model.create(),
//using the function argument arrayOfPeople
//the data is saved in a collection named people of our db persons

Promise
    .all( ArrayOfPeople.map( el => {
        return Person.create( el ) 
                    .catch( error => ( { error } ) )
         }) )
    .then( ArrayOfPeople => {

          ArrayOfPeople.forEach( el => {
                  if ( el.error ) {
            console.log( "Item has failed with error :", el.error );
                  } else {
            console.log( "Item created successfully" );
                  }
        } );

} );

//Find all the people having a given name ("Sami" for e.g) using Model.find() -> [Person]

Person
   .find({"name": "Sami"})
   .then(doc => {
    console.log("Find all the people named Sami")
    console.log(doc)
  })
   .catch(err => {
    console.error(err)
  })

//Find just one person which has a certain food in the person's favorites, 
//using Model.findOne() -> Person. 
//for exemple one person which has Pizza in his favoriteFoods



Person
 .findOne({favoriteFoods: /Pizza/})
 .then(doc => {
  console.log("Find a person having Pizza in his favoriteFoods")
  console.log(doc)
})
 .catch(err => {
  console.error("ERROOOOR Pizzaaaaaaaaaa", err)
})

   

// using Model.findById() -> Person
Person.findById({ "_id" :"5facb7b8444008b438cc5432"} ,
      
(err,doc)=> {err ? console.log ("Unfound",err) : console.log ("found successfully",doc)}

);


//Find a person by _id . Add "hamburger" to the list of the person's favoriteFoods 
//(use Array.push()). Then - inside the find callback - save() the updated Person.
Person
   .findByIdAndUpdate({
      "_id" : "5facb7b8444008b438cc5432"
      },
       { 
        $push:{ favoriteFoods: "hamburger"},
      }, 
      {new:true,
      runValidators: true,
      useFindAndModify: false ,
      safe: true, upsert: false
    } ,
      
       (err)=> {  err? console.log("update failed with error:",err)     :     save() }    
      );
      
//Perform New Updates on a Document Using model.findOneAndUpdate()
//Find a person by Name and set the person's age to 20.
//to return the updated document, use { new: true } as the 3rd argument to findOneAndUpdate()      
Person
.findOneAndUpdate(
  {name:"Sahin"},
  {"age": 20},
{new:true,
  runValidators: true,
  useFindAndModify: false ,
  overwrite:true,
  safe: true, upsert: false
} ,
  
   (err,doc)=> {
     
    if (err ) {console.log ("failed to update",err)};
    { console.log ("updated successfully!",doc);
      }    }
  );

//Delete One Document Using model.findByIdAndRemove

Person
   .findByIdAndRemove({
      "_id" : "5facb7b8444008b438cc5433"
      },
  
      (err)=> {
        
       if (err ) {console.log ("failed to remove",err)};
       { console.log ("removed successfully!"); save()
          }    
      })


// MongoDB and Mongoose - Delete Many Documents with model.remove()

  Person.remove({name:"Mary"}, function (err, personFound) {
    if (err) return console.log(err);
    {console.log("All persons named Mary had been removed")
    done(null, personFound)};
  });





//Chain Search Query: Find people who like burrito. 
//Sort them by name, limit the results to two documents, and hide their age

  var foodToSearch = "burrito";
  Person
      .find({favoriteFoods:foodToSearch})
      .sort({name : "asc"})
      .limit(2).select("-age")
      .exec((err, data) => {
          err ?  console.log(err):  console.log("Chain Search Query successfull", data);
  });





















module.exports=router;