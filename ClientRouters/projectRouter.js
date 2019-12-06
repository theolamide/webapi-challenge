const express = require('express');
const actions = require('../data/helpers/actionModel');
const projects = require('../data/helpers/projectModel');

const router = express.Router();

router.use(express.json());

//Get all Projects
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


//Post new Project
router.post('/', (req,res)=>{
    const newProject = req.body;

    projects.insert(newProject)
    .then(project=>{
        res.status(201)
        .json(project);
    })
    .catch(err => {
        console.log("Server Error", err);
        res.status(500)
        .json({error: "There was an error while saving the project to the database" });
    });

})


//Edit specific Project
router.put('/:id',(req,res)=>{
    const changes = req.body;
    const ProjectId = req.params.id;

    if(!changes.name || !changes.description){
        res.status(404)
        .json({message: "Please specify changes you want made"})
    } else {
        projects.update(ProjectId,changes)
        .then(project=>{
            if(project){
                res.status(200)
                .json(project)
            } else {
                res.status(404)
                .json({message: "The project with the specified ID does not exist."})
            }
        })
        .catch(error=>{
            console.log(error);
            res.status(500)
            .json({error: "The project information could not be modified."});
        });
    }
})


//Delete specific Project
router.delete('/:id',(req,res)=>{
    const toDelete = req.params.id;

    projects.remove(toDelete)
    .then(count =>{
        if(count > 0){
            res.status(200)
            .json({message: "This project was succesfully deleted"})
        } else {
            res.status(404)
            .json({message:'The post with the specified ID does not exist.'})
        }
    })
    .catch(error=>{
        console.log(error);
        res.status(500)
        .json({error:"The post could not be removed."})
    })
})

//Get all Project actions by providing specific ID of the Project
router.get('/:id/actions',(req,res)=>{
    const ProjectId = req.params.id;

    projects.getProjectActions(ProjectId)
    .then(actions=> {
        res.status(200)
        .json(actions)
    })
    .catch(error=>{
        console.log(error);
        res.status(500)
        .json({message:"The actions could not be retrieved."})
    })
})

//Post New action by specifying project id first
router.post('/:id/action',(req,res)=>{
    newAction = req.body;
    ProjectId = req.params.id;
    
    if(!newAction){
        res.status(400)
        .json({ errorMessage: "Please provide details for the action" })
    } else {
        projects.getProjectActions(ProjectId)
        .then(project=>{
            newAction.project_id = ProjectId
            actions.insert(newAction)
            .then(action=>{
                if(action.description.length > 128){
                    res.status(404)
                    .json({errorMessage:"Description has to be less than 128 characters"})
                } else {
                    res.status(201)
                    .json(action)
                }
            })
        })
    }
})

//Edit action by specifyin action ID
router.put('/:id/edit-action',(req,res)=>{
    editAction = req.body;
    ActiontId = req.params.id;

    if(!editAction.project_id || !editAction.description || !editAction.notes){
        res.status(404)
        .json({message: "You're missing some required fields. Please to to see if Project ID, description, and notes are populated."})
    } else {
        actions.update(ActiontId,editAction)
        .then(action=>{
            if(action){
                res.status(200)
                .json(action)
            } else {
                res.status(404)
                .json({message: "The action with the specified ID does not exist."})
            }
        })
        .catch(error=>{
            console.log(error);
            res.status(500)
            .json({error: "The project information could not be modified."});
        });
    }
})


//Delete specific action by providing action ID
router.delete('/:id/delete-action',(req,res)=>{
    const acToDelete = req.params.id;

    actions.remove(acToDelete)
    .then(count =>{
        if(count > 0){
            res.status(200)
            .json({message: "This action was succesfully deleted"})
        } else {
            res.status(404)
            .json({message:'The post with the specified ID does not exist.'})
        }
    })
    .catch(error=>{
        console.log(error);
        res.status(500)
        .json({error:"The post could not be removed."})
    })
})

module.exports=router;

// if(projects.getProjectActions(ProjectId) < 1){
//     res.status(404)
//     .json({message: "There are no actions to edit in the project"})
// } else {
//     projects.getProjectActions(ProjectId)
//     .then(project=>{
//         editAction.project_id = ProjectId
        

//         })
//     })
// }