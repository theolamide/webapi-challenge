import React from 'react';
// import {axiosWithAuth} from '../utils/AxiosWithAuth';
import axios from 'axios';

class ProjectList extends React.Component{

    constructor(){
        super();
        this.state={
            projects:[]
        }
    }    

    getData = () =>{
        axios.get('http://localhost:5000/api/projects')
            .then(res =>{
                console.log(res)
                this.setState({projects: res.data})
            })
            .catch(err => console.log(err));
    }

    componentDidMount(){
        this.getData();
    }

    trueOrFalse = (status) =>{
            if (status === "false"){
                return "In Progress"
            } else {
                return "Project Completed"
            }
    }

    render(){
        const projects = this.state.projects;
        console.log(projects)
        return(
            <div className="CardsContainer">
                {/* {this.state.color} */}
                {projects.map(item=>(
                    <div className="IndividualCards" key={item.id}>
                        <h2>Project Name: <br /> {item.name} </h2>
                        <h3>Project Description: {item.description} </h3>
                        <h3>Project Status: {this.trueOrFalse(String(item.completed))} </h3>
                    </div>
                ))}
            </div>
        )
    }
}

export default ProjectList;