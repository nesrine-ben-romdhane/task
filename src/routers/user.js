
const express = require ('express')
const User = require('../models/user')


const router = express.Router()


router.post ('/users' , (req , res) => {
    console.log(req.body)

    const user = new User (req.body)

    user.save()
    .then ((user) => {res.status(200).send(user)})
    .catch((e)=>{ res.status(400).send(e)})
})
///////////////////////////////////////////////////////////////////////////////////////////


// to get by id 

router.get('/users/:id',(req,res)=>{
    console.log(req.params)
    const _id = req.params.id
    User.findById(_id).then((user)=>{
        if(!user){
           return res.status(404).send('Unable to find user')
        }
        res.status(200).send(user)
    }).catch((e)=>{
        res.status(500).send(e)
    })
})



/////////////////////////////////////////////////////////////////////////////////////////////

// login : 
router.post('/login',async(req,res)=>{
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password)
        
        res.status(200).send({user})
    }
    catch(e){
        res.status(400).send(e.message)
    }
})

/////////////////////////////////////////////////////////////////////////////////////////////

module.exports = router 
