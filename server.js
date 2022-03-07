const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { use } = require('express/lib/application')

const database = [
    {
        username:'keval',
        email:'kevalcoder@gmail.com',
        password:'999'
    },
    {
        username:'kiya',
        email:'kiyacoder@gmail.com',
        password:'999'
    }
]

const app = express()

app.use(bodyParser.json())
app.use(cors())

app.get('/',(req,res) => {
    res.json((database))
})

app.post('/login',(req,res) => {
    const {username,password} = req.body
    let isFound = false

    database.map(data => {
        if (username == data.username && password == data.password){
            isFound = true
        }
    })

    if (isFound){
        res.json('Success')
    }
    else{
        res.status(400).json('Invalid credentials')
    }
})

app.post('/register',(req,res) => {
    const {username,email,password} = req.body

    // database will send error if another username with same name exist 
    // email will get validate in front end
    // for now im pushing it to array

    try{
        database.push({username,email,password})
        res.json("Success")
    }
    catch(error){
        res.status(400).json(error)
    }
})

app.post('/fetchemail',(req,res) => {
    const {username} = req.body
    let isFound = false
    let email = ""

    database.map(data => {
        if (data.username === username){
            isFound = true
            email = data.email
        }
    })

    if (isFound === true){
        res.json(email)
    }
    else{
        res.status(400).json("Failed")
    }
})

app.put('/changepassword',(req,res) => {
    const {username, password} = req.body
    let isFound = false

    console.log(password)
    database.map(data => {
        if (data.username == username){
            data.password = password
            isFound = true
        }
    })

    if (isFound){
        res.json("Success")
    }
    else{
        res.status(400).json("Failed")
    }
})

app.listen(300)

/*
/login-> post
/register -> post
/forgotpass -> put
*/