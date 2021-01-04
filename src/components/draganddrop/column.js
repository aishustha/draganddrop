import React, { Component } from 'react';
import dragandropStyle from './draganddrop.module.scss';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';

export default class Column extends Component {
  
    state = {
        anchorEl: null
    }

    handleClick = (e) => {
        this.setState({ anchorEl: e.currentTarget });
    }

    handleClose = () => {
        this.setState({ anchorEl: null });
    }


    render() {
      console.log(this.props.task);
        return (
            <Grid item sm={12} md={4} lg={4}>
                <Card elevation={0}>
                    <CardActions className={dragandropStyle.dragRemove}>
                        <div className={dragandropStyle.flexCenter}>
                            <div className={dragandropStyle.dragTitle}>
                                {this.props.title}
                            </div>
                           
                            <IconButton className={dragandropStyle.addIcon} aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick}>
                                <i class="fas fa-plus"></i>
                            </IconButton>
                        </div>
                    </CardActions>
                    <CardContent 
                        className={dragandropStyle.cardBorder}
                        onDragOver={(event)=>this.props.dragOver(event)}
                        onDrop={(event)=>{this.props.drop(event, this.props.type)}}
                    >
                    
                    <Typography className={dragandropStyle.columnContainer}>
                        <Menu
                            id="simple-menu"
                            getContentAnchorEl={null}
                            anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                            }}
                            transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                            }}
                            anchorEl={this.state.anchorEl}
                            open={Boolean(this.state.anchorEl)}
                            onClose={this.handleCose}
                            className={dragandropStyle.newTaskField}
                        >
                            <TextareaAutosize aria-label="minimum height" rowsMin={5} placeholder="Enter a note" className={dragandropStyle.newTaskFieldForm}/>   
                            <div className={dragandropStyle.btnFlex}>
                                <Button className={dragandropStyle.addButton}>
                                    Add
                                </Button>
                                <Button className={dragandropStyle.cancelButton} onClick={this.handleClose}>
                                    Cancel
                                </Button>
                            </div>
                        </Menu>
        
                            {this.props.task.map(t=>{
                               
                               return <div className={dragandropStyle.cardRelative}>
                               <div key={t.id}
                                    onDragStart = {(event) => this.props.dragStart(event, t.taskName)}
                                    draggable
                                    className={dragandropStyle.draggable}>
                                    {t.taskName} 
                                </div>

                                <div  className={dragandropStyle.addedUser}>
                                {t.add}   
                                </div>

                                <IconButton className={dragandropStyle.closeIcon}>
                                    <i class="fas fa-times"></i>
                                </IconButton>
                               </div>
                            }  
                            )}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>

        );
    }
}