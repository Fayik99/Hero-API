const express = require('express');
const router = express.Router();

let heroesArray = [{
    id: 1,
    name: 'Captain America'
}, {
    id: 2,
    name: 'Iron Man' 
}, {
    id: 3,
    name: 'Black Window'

}];


router.get('/',(req,res) =>{
    res.send(heroesArray);
});

router.get('/:heroId',(req,res) =>{
   let heroId = parseInt(req.params.heroId); 
   let hero = heroesArray.find(h => h.id === heroId);
  
  if (!hero){
    return res.status(404).send("Given Id does not exist on our server");
  }
   res.send(hero);  
});

router.post('/', (req,res) => {
 
   if(!req.body.heroName) {
    return res.status(400).send("Not all mandatory values have been set!");
   }

    let newHeroObj = {
        id: heroesArray.length +1, 
        name: req.body.heroName
    };
    heroesArray.push(newHeroObj);
    console.log(heroesArray);
    res.send(newHeroObj); 
});

router.put('/:heroId', (req,res) => {
    let heroId = parseInt(req.params.heroId);
    let hero = heroesArray.find(h => h.id === heroId);

    if (!hero){
        return res.status(404).send("Given Id does not exist on our server");
      }
    
    if (!req.body.heroName) {
        return res.status(400).send("Not all mandatory values have been set!");
      }
      hero.name = req.body.heroName;
      console.log(heroesArray);
      res.send(hero);
});

router.delete('/:heroId', (req,res) => {
    let heroId = parseInt(req.params.heroId);
    let hero = heroesArray.find(h => h.id === heroId);

    if (!hero){
        return res.status(404).send("Given Id does not exist on our server");
      }
   // heroesArray.splice(0,1);
     let indexofHero = heroesArray.indexOf(hero);
     heroesArray.splice(indexofHero,1);
     console.log(heroesArray);
     res.send(hero);
});

module.exports = router;