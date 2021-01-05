import React, { Component } from 'react';
import dragandropStyle from './draganddrop.module.scss';
import IconButton from '@material-ui/core/IconButton';

export default class CardTask extends Component {
  
    state = {
        anchorEl: null
    }

    handleClick = (e) => {
        this.setState({ anchorEl: e.currentTarget });
    }

    handleClose = () => {
        this.setState({ anchorEl: null });
    }

    handleclick = (e) =>{
        const {task} = this.props;
        console.log(task, 'handleClick');
        this.props.deleteCard(task.id);
    }

    render() {
        console.log(this.props);
      const { task, dragStart } = this.props; // object destructuring
        return (
           
                <div className={dragandropStyle.cardRelative}>
                    <div
                        onDragStart = {(event) => dragStart(event, task.taskName)}
                        draggable
                        className={dragandropStyle.draggable}>
                        {task.taskName} 
                    </div>

                    <div  className={dragandropStyle.addedUser}>
                    {task.add}   
                    </div>

                    <IconButton className={dragandropStyle.closeIcon} onClick={this.handleclick}>
                        <i class="fas fa-times"></i>
                    </IconButton>
                </div>
          
        );
    }
}