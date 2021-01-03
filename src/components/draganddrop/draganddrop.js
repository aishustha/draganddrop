import React, { Component } from 'react';
import dragandropStyle from './draganddrop.module.scss';


export default class draganddrop extends Component {
    state = {
        tasks: [
            {id: "1", taskName:"hike", type:"toDo", backgroundColor:"pink"},
            {id: "2", taskName:"travel", type: "toDo", backgroundColor: "pink"},
            {id: "3", taskName:"Read book", type:"inProgress", backgroundColor:"yellow"},
            {id: "4", taskName:"Pay bills", type: "inProgress", backgroundColor: "yellow"},
            {id: "5", taskName: "Go to the gym", type: "Done", backgroundColor: "blue"},
            {id: "6", taskName: "Play baseball", type: "Done", backgroundColor: "blue"}
        ]
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
            ...this.state,
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
                <div key={task.id}
                    onDragStart = {(event) => this.onDragStart(event, task.taskName)}
                    draggable
                    className={dragandropStyle.draggable}
                    style={{backgroundColor: task.backgroundColor}}>
                    {task.taskName}    
                </div>
            );
        });
        return (
            <div className={dragandropStyle.dragContainer}>
                <h2 className={dragandropStyle.header}>To Do List Drag & Drop</h2>
                <div className={dragandropStyle.toDo}
                    onDragOver={(event)=>this.onDragOver(event)}
                    onDrop={(event)=>{this.onDrop(event, "toDo")}}
                >
                    <span className={dragandropStyle.groupHeader}>
                        To Do
                    </span>
                    {tasks.toDo}
                </div>
                <div className={dragandropStyle.inProgress}
                    onDragOver={(event)=>this.onDragOver(event)}
                    onDrop={(event)=>{this.onDrop(event, "inProgress")}}
                >
                    <span className={dragandropStyle.groupHeader}>
                        In Progress
                    </span>
                    {tasks.inProgress}
                </div>
                <div className={dragandropStyle.droppable}
                    onDragOver={(event)=>this.onDragOver(event)}
                    onDrop={(event)=>this.onDrop(event, "Done")}>
                    <span className={dragandropStyle.groupHeader}>
                        Done
                    </span>
                    {tasks.Done}
                </div>
                
            </div>
        );
    }
}