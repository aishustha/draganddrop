import React, { Component } from 'react';
import dragandropStyle from './draganddrop.module.scss';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

export default class Column extends Component {
  
    // state = {
    //     anchorEl: null
    // }


    // handleClick = (e) => {
    //     this.setState({ anchorEl: e.currentTarget });
    // }

    // handleClose = () => {
    //     this.setState({ anchorEl: null });
    // }

    state = {
        open: true,
        setOpen: true
    }


    render() {
      console.log(this.props.task);
        return (
            <Grid item xs={4}>
                <Card elevation={0}>
                    <CardActions className={dragandropStyle.dragRemove}>
                        <div className={dragandropStyle.flexCenter}>
                            <div className={dragandropStyle.dragTitle}>
                                {this.props.title}
                            </div>
                            {/* <div className={dragandropStyle.menuIcon}>
                                <i class="fas fa-plus"></i>
                            </div> */}
                            
                            <IconButton className={dragandropStyle.addIcon}>
                                <i class="fas fa-plus"></i>
                            </IconButton>
                        </div>

                        {/* <Button aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick}>
                            Open Menu
                        </Button> */}
                        {/* <Menu
                            id="simple-menu"
                            anchorEl={this.state.anchorEl}
                            keepMounted
                            open={Boolean(this.state.anchorEl)}
                            onClose={this.handleClose}
                        >
                            <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                            <MenuItem onClick={this.handleClose}>My account</MenuItem>
                            <MenuItem onClick={this.handleClose}>Logout</MenuItem>
                        </Menu> */}
                    </CardActions>
                    <CardContent 
                        className={dragandropStyle.cardBorder}
                        onDragOver={(event)=>this.props.dragOver(event)}
                        onDrop={(event)=>{this.props.drop(event, this.props.type)}}
                    >
                    
                        <Typography variant="body2" component="p">
                        
                            {this.props.task.map(t=>{
                               
                               return <div className={dragandropStyle.cardRelative}>
                               <div key={t.id}
                                    onDragStart = {(event) => this.props.dragStart(event, t.taskName)}
                                    draggable
                                    className={dragandropStyle.draggable}>
                                    {t.taskName}    
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