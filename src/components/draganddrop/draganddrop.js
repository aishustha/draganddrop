import React, { Component } from 'react';
import dragandropStyle from './draganddrop.module.scss';
import Grid from '@material-ui/core/Grid';
import Column from './column';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';


export default class draganddrop extends Component {
    state = {
        tasks: [
            {id: "1", taskName:"Implement Dashboard Layout", type:"toDo", add:"Added by aishustha"},
            {id: "2", taskName:"Add button to card header", type: "toDo", add:"Added by aishustha"},
            {id: "3", taskName:"Allow users to remove tasks", type: "toDo", add:"Added by aishustha"},
            {id: "4", taskName:"Allow users to add tasks", type:"inProgress", add:"Added by aishustha"},
            {id: "5", taskName: "Implement Grid Card Layout", type: "Done", add:"Added by aishustha"},
            {id: "6", taskName: "Drag and Drop Tasks", type: "Done", add:"Added by aishustha"}
        ],

    }


    onDragStart = (event, taskName) => {
        console.log('dragstart on div:', taskName);
        event.dataTransfer.setData("taskName", taskName);
    }

    onDragOver = (event) => {
        event.preventDefault();
    }

    onDrop = (event, cat) => {
        let taskName = event.dataTransfer.getData("taskName");
        let tasks = this.state.tasks.filter((task) => {
            if (task.taskName == taskName) {
                task.type = cat;
            }
            return task;
        });
        this.setState({
            ...this.state, // spread operator (...)
            tasks
        });   
    }
    render() {
        var tasks = {
            toDo: [],
            inProgress: [],
            Done: []
        }

        this.state.tasks.forEach ((task) => {
            tasks[task.type].push(
                task
            );
        });

        return (
            <div className={dragandropStyle.dragContainer}>
                <h2>Drag & Drop</h2>
                <Grid container className={dragandropStyle.dragFlex} spacing={3}>

                    <Column 
                    dragOver={this.onDragOver} 
                    drop={this.onDrop} 
                    title="To Do" task={tasks.toDo} 
                    type="toDo"
                    dragStart={this.onDragStart}
                    className={dragandropStyle.colorRed}
                    >
                    
                    </Column>

                    <Column 
                        dragOver={this.onDragOver} 
                        drop={this.onDrop} 
                        title="In Progress" 
                        task={tasks.inProgress} 
                        type="inProgress"
                        dragStart={this.onDragStart}
                    />
                    <Column 
                        dragOver={this.onDragOver} 
                        drop={this.onDrop} 
                        title="Done" 
                        task={tasks.Done} 
                        type="Done"
                        dragStart={this.onDragStart}
                    />
                </Grid>
         
            </div>
        );
    }
}