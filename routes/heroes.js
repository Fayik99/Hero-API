const express = require('express');
const Hero = require('../models/hero');
const jwt = require('jsonwebtoken');
const router = express.Router();

const SECRET_KEY = "123456789"


router.get('/', async (req,res) =>{
    //res.send(heroesArray);
    let heroes = await Hero.find();
// let heroes = await Hero.find().countDocuments(); // res.send("" + heroes)
// let heroes = await Hero.find().or([{ likeCount: 5200}, { likeCount: 5500}])
// let heroes = await Hero.find({likeCount : {$nin : [5200,5500]} });  // not in 
// let heroes = await Hero.find().limit(3);
// let heroes = await Hero.find().skip(1).limit(1);
// let heroes = await Hero.find().sort({name: 'asc'}) //ascending order
// let heroes = await Hero.find().sort({name: 'asc'}).select({name: 1,deceased: 1})
// let heroes = await Hero.find({deceased: true, name: ''}); //filter by deceased
   res.send(heroes);
});

router.get('/:heroId', async(req,res) =>{
   let hero = await Hero.findById(req.params.heroId);
  
  if (!hero){
    return res.status(404).send("Given Id does not exist on our server");
  }
   res.send(hero);
});

router.post('/', async (req,res) => {
 
     const token = req.header("x-jwt-token");

     if(!token) return res.status(401).send("Access denied. No token");


    try { 
        jwt.verify(token, SECRET_KEY);
    } catch (e) {
        return res.status(400).send("Invalid token");
    }
   

   if(!req.body.heroName) {
    return res.status(400).send("Not all mandatory values have been set!"); }

   try{
    let heroToBeAddedToDb = new Hero({
        name: req.body.heroName,
        birthname : req.body.birthName,
        movies: req.body.movies,
        likeCount: req.body.likeCount,
        imgUrl: req.body.imgUrl,
        deceased: req.body.deceased
    });
    heroToBeAddedToDb = await heroToBeAddedToDb.save();
    res.send(heroToBeAddedToDb);  
   } catch(e){
       return res.status(500).send(e.message);
   }
});

router.put('/:heroId', async (req,res) => {
    // let hero = await Hero.findById(req.params.heroId);

    // if (!hero){
    //     return res.status(404).send("Given Id does not exist on our server");
    //   }
    
    // if (!req.body.heroName) {
    //     return res.status(400).send("Not all mandatory values have been set!");
    //   }
    //   hero.set({name : req.body.heroName})
    //   hero = await hero.save();
    //   res.send(hero);

    //  method 2
    let hero = await Hero.findByIdAndUpdate(
        {_id: req.params.heroId },
        { $set: { likeCount: req.body.likeCount}},
        {new: true, useFindAndModify: false}
    );
    res.send(hero);
});

router.delete('/:heroId', async (req,res) => {
  
    // let hero = Hero.findById(req.params.heroId)

    // if (!hero){
    //     return res.status(404).send("Given Id does not exist on our server");
    //   }
    
    //  let result = await Hero.remove(hero);  // deleteOne, deleteMany recommended
    //  res.send(result);

     //method 2 

     
     const token = req.header("x-jwt-token");

    if(!token) return res.status(401).send("Access denied. No token");

    try { 
        jwt.verify(token, SECRET_KEY);
    } catch (e) {
        return res.status(400).send("Invalid token");
    }

    let decoded = jwt.decode(token, SECRET_KEY);
    if(!decoded.isAdmin)
      return res.status(403).send("Forbidden- You have no authorization to delete");

     let hero = await Hero.findByIdAndDelete({ _id: req.params.heroId});
     if (!hero){
        return res.status(404).send("Given Id does not exist on our server");
        }
     res.send(hero);   
}); 

module.exports = router;