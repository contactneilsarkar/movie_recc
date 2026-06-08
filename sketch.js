//goal of project: reccomend movies by calculating the sentiment score of reviews given to existing movies. once calculated, check which movies sentiment score matches the sentiment score of movies in our database
//we create the database where diff movies are. 
//here, sentiment score is from 1-10. 1 is lowest, 100 is highest
let movies=[]
let sentiment;
let comedy;
let action;
let thriller;
let kids;
let horror;
let romantic;
let result;
function setup() {
  noCanvas()
  sentiment=ml5.sentiment("movieReviews")
  action=select("#spiderman")
  horror=select("#fnaf")
  comedy=select("#freeguy")
  romantic=select("#titanic")
  thriller=select("#topgun")
  kids=select("#toystory")
  submitButton=select("#submitButton")
  paragraph=select("#paragraphTag")
  submitButton.mousePressed(calcScore)
  moviesDatabase()
  
}
function calculateDistance(a,b,p){
  //We will compare sentiment score of two movies
  //we will use a variable as a parameter
  let sum=0;
  for (let i=0; i<movies.length; i++){
    sum+=Math.pow(a[i]- b[i], 2)
  }
  return Math.sqrt(sum)
       //writing a for loop to compare sentiment score of the 5 movies with the sentiment score of the movies in database
}
function calcScore(){
  let a=comedy.value()
  let b=action.value()
  let c=thriller.value()
  let d=kids.value()
  let e=horror.value()
  let f=romantic.value()
  let inputScore=[
    10*sentiment.predict(a).value,
    10*sentiment.predict(b).value,
    10*sentiment.predict(c).value,
    10*sentiment.predict(d).value,
    10*sentiment.predict(e).value,
    10*sentiment.predict(f).value,
    
  ]
  let reccomend=""
  //we will use a loop to go thru the database and matchup the sentiment score and match it to the score we calculated. 
  let minimumDist=Infinity
  for (let i=0; i<movies.length; i++){
    let dist=calculateDistance(inputScore, movies[i].score)
    if(dist<minimumDist){
      minimumDist=dist
      reccomend=movies[i].name
    }
    
  }
  paragraph.html("Reccomended movies are: "+reccomend)
}
function moviesDatabase(){
  movies=[
    {
      "name":"Superman",
      "score":[10,3,6,6,8,7]
    },
    {
      "name":"M3GAN",
      "score":[4,9,1,1,8,1]
    },
    {
      "name":"Red Notice",
      "score":[6,3,8,6,5,2]
    },
    {
      "name":"John Wick",
      "score":[10,4,3,2,10,1]
    },
    {
      "name":"Minions",
      "score":[4,3,10,2,1,10]
    },
    {
      "name":"Monsters Inc",
      "score":[5,3,2,2,2,1]
    },
    {
      "name":"Ghostbusters",
      "score":[7,3,6,5,3]
    },
    {
      "name":"F1",
      "score":[10,3,3,4,7,6]
    },
    {
      "name":"Black Panther",
      "score":[9,3,4,4,8,8]
    },
    {
      "name":"Detective Pikachu",
      "score":[7,3,3,8,2,2]
    }
  ]
}

