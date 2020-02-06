import React from 'react';
import { render } from '@testing-library/react';
import Register from './Register';
import ShowDetails  from './ShowDetails';
import Suspend from './Suspend';
import Notification  from './Notification';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import { Button, Divider} from '@material-ui/core';

const drawerWidth = 240;

  const useStyles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  appBarTypo:{
    fontWeight: "bold"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: {
    minHeight: "64px",
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: "18px",
  },
  drawerButton: {
    width: "100%"
  }
}
);
class App extends React.Component{
  
  constructor(props){
    super(props)
    this.state = {
      apiResponse: [{}],
      value:0,
      drawerVal: "Register",
      appBarVal: "Register teacher and students"
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  };
  async callApi(){
    await fetch("http://localhost:4000/users/1")
    .then(res=> {
      console.log("res:: ", res)
      res.text()})
    .then(res => this.setState({apiResponse: res}))
  }

  handleChange(event, newValue) {
    this.setState({value: newValue});
  }

  handleSubmit= param => event =>{
    if(param == "Register"){
      this.setState({drawerVal : "Register", appBarVal: "Register teacher and students"})
    }
    else if(param == "Common Students"){
      this.setState({drawerVal : "Common Students", appBarVal: "Retrieve the list of common students"})
    }
    else if(param == "Suspend"){
      this.setState({drawerVal : "Suspend", appBarVal: "Suspend a student"})
    }
    else{
      this.setState({drawerVal : "Notification", appBarVal: "Send Notification"})
    }

  }

render(){
  const { classes  } = this.props;
  const {drawerVal, appBarVal} = this.state;
  const renderAuthButton = ()=>{
    if(drawerVal == "Register"){
      return <Register />
    }
      else if(drawerVal == "Common Students"){
        return <ShowDetails />
      }
      else if(drawerVal == "Suspend"){
        return <Suspend />
      }
      else{
        return <Notification />
      }
  }
  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography className = {classes.appBarTypo} variant="h6" noWrap>
            {appBarVal}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {['Register', 'Common Students', 'Suspend'].map((text, index) => (
            <ListItem button key={text}>
            {/* <Icon name="facebook" style={styles.icon}>
   <Text style={styles.text}>{text}</Text>
</Icon> */}

            <Button className = {classes.drawerButton} onClick= {this.handleSubmit(text)}>{text}</Button>

              {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} /> */}
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['Send Notification'].map((text, index) => (
            <div>
            <Button className = {classes.drawerButton} onClick= {this.handleSubmit(text)}>{text}</Button>
            </div>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {renderAuthButton()}
    
      </main>
    </div>
  );
}
}

export default withStyles(useStyles)(App)
