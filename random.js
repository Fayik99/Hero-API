console.log("1 : Before calling db.... ");

function getMovieDataFromDb(){

   return new Promise((resolve, reject) => {
        setTimeout(() => {
         console.log("2 : Reading movie data from our db....... ");
         let dbData =  {id: 30, name: 'Avengers : End Game'};
         resolve(dbData.name);
      }, 4000);
     });
}

async function printMovieDetails() {
let movieDataFromDB = await getMovieDataFromDb();
console.log("3 : Movie data : " +movieDataFromDB);
}

printMovieDetails();

/*  -- Using Resolved Promise

getMovieDataFromDb().then((result) => {
     let movieDataFromDB = result;
     console.log("3 : Movie data : " +movieDataFromDB);
}) */

console.log("4 : Doing some other works.... ");