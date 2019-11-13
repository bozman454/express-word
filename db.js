const { Client } = require('pg');

const client = new Client({
  user: 'tcsuser',
  host: 'localhost',
  database: 'tcsuser',
  password: 'root',
  port: 5432,
})


client.connect()
.then(()=>console.log("connected to db"))
.catch((err)=>console.log(err))


exports.getTickets = new Promise((resolve,reject) => {
  client.query('SELECT * FROM tickets', (err, res) => {
    if (err) console.log(err.stack)
    else
    resolve(res.rows)
  })
})

exports.insertTicket = (name, email, message)=>{
  const query = {
    text: 'INSERT INTO tickets(name, email, message) VALUES ($1, $2, $3)',
    values: [name, email, message]
  }
  client.query(query,(err,res)=>{
    if (err) console.log(err.stack)
    else
    console.log('values inserted')
    
  })
}
