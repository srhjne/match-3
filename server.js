var express = require('express'),
   app = express(),
   bodyParser = require('body-parser'),
   fs= require('fs'),
   update_db = require('./update_db');

app.use(bodyParser.urlencoded({ extended: true }));

fs.readFile('./head.html', function (err, head) {
   if (err) {
       res.sendStatus(500).send('Couldn\'t read head!');
       res.end();
   }
   fs.readFile('./game.html', function (err, game) {
       if (err) {
           res.sendStatus(500).send('Couldn\'t read game!');
           res.end();
       }
       fs.readFile('./foot.html', function (err, foot) {
           if (err) {
               res.sendStatus(500).send('Couldn\'t read foot!');
        res.end();
           }

           app.get('/', function (req, res) {
               res.send(head + game + foot);
               res.end();

               console.log("Got a GET");
           });

           app.post('/', function (req, res) {
               var score = req.body.score;
               var size = req.body.size;
               var user = "Me";
               console.log(score);
               res.send('<tr><td>' + score+"</td><td>"+user + '</td></tr>');
               res.end();

               console.log("Got a POST");
           });
           app.use(express.static("./"))
           var server = app.listen(8081, function () {
           console.log("Example app listening at http://127.0.0.1:8081")
           });
           
       });
   });
});