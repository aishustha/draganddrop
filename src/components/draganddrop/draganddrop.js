import React, { Component } from 'react';
import dragandropStyle from './draganddrop.module.scss';
import Grid from '@material-ui/core/Grid';
import Column from './column';

export default class draganddrop extends Component {
    state = {
        tasks: [
            {id: "1", taskName:"Implement Dashboard Layout", type:"toDo"},
            {id: "2", taskName:"Add button to card header", type: "toDo"},
            {id: "3", taskName:"Allow users to remove tasks", type: "toDo"},
            {id: "4", taskName:"Allow users to add tasks", type:"inProgress"},
            {id: "5", taskName: "Implement Grid Card Layout", type: "Done"},
            {id: "6", taskName: "Drag and Drop Tasks", type: "Done"}
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
                <Grid container className={dragandropStyle.dragFlex} spacing={5}>

                    <Column 
                    dragOver={this.onDragOver} 
                    drop={this.onDrop} 
                    title="To Do" task={tasks.toDo} 
                    type="toDo"
                    dragStart={this.onDragStart}

                    />
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