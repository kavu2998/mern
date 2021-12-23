const router = require('express').Router()
let Contact = require('../models/contact.model')

router.route('/').get((req,res)=>{
    Contact.find()
    .then(contacts=>res.json(contacts))
    .catch(err=>res.status(400).json('Error : '+err))
})

router.route('/add').post((req,res)=>{
    const {name, phone, address, age} = req.body
    const newContact = new Contact({
        name,
        phone,
        address,
        age
    })
    newContact.save()
    .then(()=>res.json('Contact added'))
    .catch(err=>res.status(400).json('Error : '+err))
})

router.route('/:name').get((req,res)=>{
    Contact.findOne({name:req.params.name})
    .then(contact=>res.json(contact))
    .catch(err=>res.status(400).json('Error : '+err))
})

router.route('/update/:id').post((req,res)=>{
    Contact.findById(req.params.id)
    .then(contact=>{
        contact.name = req.body.name
        contact.phone = req.body.phone
        contact.address = req.body.address
        contact.age = req.body.age

        contact.save()
        .then(()=>res.json('Contact updated'))
        .catch(err=>res.status(400).json('Error : '+err))
    })
    .catch(err=>res.status(400).json('Error : '+err))
})

router.route('/:id').delete((req,res)=>{
    Contact.findByIdAndDelete(req.params.id)
    .then(()=>res.json('Contact removed'))
    .catch(err=>res.status(400).json('Error : '+err))
})

module.exports = router