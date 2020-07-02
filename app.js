const express = require('express');
const authenticator = require('./middlewares/authenticator');
const sendEmail = require('./middlewares/sendEmail');
const app = express();
const PORT = 5000;

app.use(express.json());


app.use(authenticator);
app.use(sendEmail);

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

app.get('/',(req,res)=> {
   res.send("Avengers Assemble")
});

app.get('/api/heroes',(req,res) =>{
    res.send(heroesArray);
});

app.get('/api/heroes/:heroId',(req,res) =>{
   let heroId = parseInt(req.params.heroId); // request paramter
  // let optionValue = req.query.showMore; // query parameter
   let hero = heroesArray.find(h => h.id === heroId);
  
  if (!hero){
    return res.status(404).send("Given Id does not exist on our server");
  }
   res.send(hero);  
});

app.post('/api/heroes', (req,res) => {
 
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

app.put('/api/heroes/:heroId', (req,res) => {
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

app.delete('/api/heroes/:heroId', (req,res) => {
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

app.listen(PORT, function(){

    console.log("Listening on port " + PORT);

});