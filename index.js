// express => web server
// tradition js => common js

const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')

const app = express();
app.use(express.json());

app.use(cors({
  origin : "http://localhost:5173"
}))

// async, await => asyncrhonous operation => kei time lagna sakxa => promise return garxa.

async function connectDatabase() {
  await mongoose.connect(
    "mongodb+srv://buildandrun464_db_user:movie@cluster0.gv2cvyo.mongodb.net/?appName=Cluster0",
  );
  console.log("mongo database connected succesfully");
}

connectDatabase();

// model create => movie
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  name: String,
  poster: String,
  rating: String,
  genere: String,
});

const Movie = mongoose.model("Movie", movieSchema);

// api => /movies

// mongoose ORM le deko method hai

// create movies
app.post("/movies", (req, res) => {
  console.log(req.body);

  const movie = Movie.create(req.body);
  res.status(201).json({
    data: movie,
  });
});

// get all movies ko end point
app.get("/movies", async (req, res) => {
  const movies = await Movie.find();
  res.status(200).json({
    data: movies,
  });
});

// get movies by id - findById(id)
app.get("/movies/:id", async (req, res) => {
  // console.log(req);
  // console.log(req.params);
  // req.params = {
  //   id : '123'
  // }
  // const id = req.params.id;
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Invalid movie ID",
    });
  }

  const movie = await Movie.findById(id);
  if (!movie) {
    return res.status(404).json({
      message: "movie not found",
    });
  }

  res.status(200).json({
    data: movie,
  });
});


// delete movie endpoint
app.delete('/movies/:id',async(req,res)=>{

  const { id } = req.params;
  console.log('movie id',id);
  const movie = await Movie.findByIdAndDelete(id);

  if(!movie){
    return res.status(404).json({
      message: 'movie not found'
    })
  }

  res.status(200).json({
    message : 'movie deleted successfully'
  })

})

// update movie endpoint
app.put('/movies/:id',async(req,res)=>{

  const {id} = req.params;
  const data = req.body;
  console.log('data',data)

  const movie = await Movie.findByIdAndUpdate(id,data);
  if(!movie){
    return res.status(404).json({
      message : 'movie not found'
    })
  }
  res.status(200).json({
    message : 'movie updated successfully'
  })

})




app.get("/", (req, res) => {
  return res.status(200).json({
    message: "movie_server is running....",
  });
});

app.listen(5000, () => {
  console.log("server is running on port 5000");
});
