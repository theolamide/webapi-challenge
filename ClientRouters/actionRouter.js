const express = require('express');
const actions = require('../data/helpers/actionModel');
const projects = require('../data/helpers/projectModel');

const router = express.Router();

router.use(express.json());

router.get('/', (req,res)=>{
    projects.get()
        .then(projects =>{
            res.status(200)
            .json(projects);
        })
        .catch(err => {
            console.log("error on GET /projects", err);
            res.status(500)
            .json({ error: "The projects information could not be retrieved." });
        });
})



module.exports=router;