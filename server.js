const express = require('express');
const app = express();
const PORT = 7878;
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({exended : false}));
app.use((req,res,next)=>{
	res.set('Access-Control-Allow-Origin', '*');
	res.set('Access-Control-Allow-Headers','content-type');
	res.set('Access-Control-Allow-Methods','GET, POST, DELETE');
	return next();
});


const { Client } = require('pg');

const client = new Client({
	user: 'tcsuser',
	host: 'localhost',
	database: 'tcsuser',
	password: 'root',
	port: 5432,
})

client.connect()

app.post('/api/v1/ticketgen',(req,expressres)=>{
	if(req.body){
		console.log(`requested recieved`);
		const query = {
			text: 'INSERT INTO tickets(name, email, message) VALUES ($1, $2, $3)',
			values: [req.body.name, req.body.email, req.body.message]
		}
		client.query(query,(err,res)=>{
			if (err) expressres.status(500).send({message: 'failure, query broke it'});
			else
			console.log('values inserted')
		})
		expressres.status(200).send({message: 'success'});
	}

});


app.get('/api/v1/gettickets', (req,expressres)=>{
		console.log("sending data...")
		client.query('SELECT * FROM tickets', (err, res) => {
	    if (err) res.status(500).send({message: 'failure, query broke it'});
	    else
	    expressres.status(200).send(res.rows)
	  })
	});




app.listen(PORT, () => {console.log(`Express up at port ${PORT}`)})
