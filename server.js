// require express
const express = require('express');
// registering the body-parser
const bodyParser = require('body-parser');
// get the express app
const app = express();
// requires mongodb
const MongoClient = require('mongodb').MongoClient;
// using body-parser
app.use(bodyParser.urlencoded({extend: true}));

// setting up the view engine
app.set('view engine', 'ejs');

// setting the port address
const port = process.env.PORT || 3000;

// connecting to mongodb
MongoClient.connect('your-database-credentials', (err, database) =>
{
	// checking for err in connection
	if(err){
		return console.log(err);
	}else{
		db = database;
	}
	// setting up the port for our application
	app.listen(port, function(){
		console.log('Server running on port : 3000');
	})
})


// setting up routing
// app.get('/', function(req, res){
//    res.send('landing page');
// })

app.get('/', (req, res) => {
		// getting datas from the database in mlab.
	db.collection('name').find().toArray( (err, results) => {
		
		// passing datas from the database to the views
		res.render('index.ejs', { gottenResults : results});
	});
	
   //res.sendFile(__dirname + '/index.html');
})

// post request routing
app.post('/cars', (req, res) => {
	db.collection('name').save(req.body, (err, result) => {
		
		if(err){
			return console.log(err);
		}else{
			return console.log('successfuly saved to database');
		}

		// redirects our user back to our landing page
		res.redirect('/');
	});
})