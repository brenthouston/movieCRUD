const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');

const PORT = process.env.PORT || 3002;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


const db = mysql.createConnection(
    {
      host: '127.0.0.1',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password
      password:'',
      database: 'movie_db'
    },
    console.log(`Connected to the movies_db database.`)
  );
  

  app.get("/api/movies",(req,res)=>{
     db.query(`SELECT * FROM movies`, (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).json({msg:"on noes!",err:err})
      }
      res.json(data);
    });
    })

    app.get("/api/reviews",(req,res)=> {
        db.query(`SELECT movie_name AS title,review FROM reviews JOIN movies ON reviews.movie_id=movies.id`, (err, data) => {
            if (err) {
              console.log(err);
              return res.status(500).json({msg:"on noes!",err:err})
            }
            res.json(data);
          });
          })
    
    app.post("/api/add-movie",(req,res)=> {
        db.query(`INSERT INTO movies(movie_name) VALUES(?)`,req.body.movie_name,(err,data)=>{
            if(err) {
                console.log(err);
                return res.status(500).json({msg:"on noes!", err:err})
            }
            res.json(data)
        }) 
    })


    app.put("/api/update-review/:id",(req,res)=> {
        db.query(`UPDATE reviews SET review=? WHERE id= ?;`,[req.body.review, req.params.id],(err,data)=>{
            if(err) {
                console.log(err);
                return res.status(500).json({msg:"on noes!", err:err})
            }
            res.json(data)
        }) 
    })



    app.delete("/api/movie/:id",(req,res)=> {
        db.query(`DELETE FROM movies WHERE id = ?;`,req.params.id,(err,data)=>{
            if(err) {
                console.log(err);
                return res.status(500).json({msg:"on noes!", err:err})
            }
            res.json(data)
        }) 
    })


        




app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  