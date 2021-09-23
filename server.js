const express = require('express')
const session = require('express-session');
const databaseConnection = require('./databaseConnection');
const MongoDBSession = require('connect-mongodb-session')(session);

const app = express();
const port=5000;
const MongoUri='mongodb://localhost:27017/cookiesandsession'

databaseConnection();
const store = new MongoDBSession({
    uri:MongoUri,
    collection:'mySessions'

})


app.set('view engine', 'ejs');
app.use(session({
secret:'sssh',
resave:false,
saveUninitialized:false,
store:store
}))




app.get('/',(req,res)=>{
req.session.isAuth=true
res.render('landing');    

console.log(req.session)
console.log(req.session.id)
})

app.get('/login',(req,res)=>{
    res.render('login')
})


app.listen(port,()=>{
    console.log('application running on '+port)
})