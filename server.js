const express = require('express')
const session = require('express-session');
const databaseConnection = require('./databaseConnection');
const User = require('./models/User');
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
app.use(express.urlencoded({extended:true}))
app.use(session({
secret:'sssh',
resave:false,
saveUninitialized:false,
store:store
}))




app.get('/',(req,res)=>{
req.session.isAuth=true
res.render('landing');    
})

app.get('/login',(req,res)=>{
    res.render('login')
})
app.post('/login',(req,res)=>{})

app.get('/register',(req,res)=>{
    res.render('register')
})
app.post('/register', async (req,res)=>{
    const {username,email,password} = req.body;
    let user = await User.findOne({email:email})
    if(!null){
        user = await User.create({username:username, email:email, password:password})
    }


    res.send(user);
    console.log(user);
})
app.listen(port,()=>{
    console.log('application running on '+port)
})