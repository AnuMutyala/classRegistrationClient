import React,{Component} from 'react';
import styles from './Notification.module.scss';
import Chip from '@material-ui/core/Chip';

class Notification extends Component {
    constructor() {
        super();
        this.state = {
            teacher: "",
            notification: "",
            chipData:[]
        };
      }


    handleTeacher = evt => {
        //make sure that teacher email consists of emailId
        this.setState({ teacher: evt.target.value });
    };

    handleNotification = evt => {
        console.log("evt.target.value:: ", evt.target.value)
        this.setState({ notification: evt.target.value });
    };
    handleNewNotification = evt =>{
        this.setState({teacher:"", notification: "", chipData: []})
    }
    handleSubmit = async(evt) => {
        //call the post method to suspend student
    const { teacher,notification } = this.state;
    console.log("notification ::", notification)

    let data = {teacher: teacher, notification : notification};
    await fetch('http://localhost:4000/api/retrievefornotifications', {
        method: 'post',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*'
        },
            body: JSON.stringify(data)
    }).then((response) => response.json())
        .then((responseData) => {
        let reciepients= responseData.reciepients;
        this.setState({chipData: reciepients});
        alert(`Notification successfully sent to ${this.state.chipData.length} students`)
        })
        .catch(err => alert('Teacher or student are invalid'))
    };

    handleStudentEmailChange = idx => evt => {
        //make sure that email consists of emailId
    const newStudents = this.state.students.map((student, sidx) => {
        if (idx !== sidx) return student;
        return { ...student, emailId: evt.target.value };
    });

    this.setState({ students: newStudents });
    };

    handleAddStudent = () => {
        this.setState({
            students: this.state.students.concat([{ emailId: "" }])
        });
    };

    handleRemoveStudent = idx => () => {
        this.setState({
        students: this.state.students.filter((s, sidx) => idx !== sidx)
        });
    };
    
    render(){
      const {teacher,notification,chipData } = this.state;
  return (

    // <form onSubmit={this.handleSubmit}>
    <div className = {styles.NotificationRoot}
    //  style={{paddingTop: "20px"}}
     >
        <input
          className = {styles.textArea}
          type="text"
          placeholder="teacher mail id"
          value={teacher}
          onChange={this.handleTeacher}
        />
        <button className = {styles.button} onClick={this.handleNewNotification}>New Notification</button>
        {/* <Button>New Notification</Button> */}
        <h3>Meassage to send</h3>

        <div className="input-group">
            <textarea 
            className={styles.textAreaLarge} 
            id="textArea1" 
            rows="5"
            cols = "100"
            placeholder="Type your message here"
            value={notification}
            onChange={this.handleNotification}
            > </textarea>
        </div>
        <div>
        </div>

        <div>
        <button className = {styles.button} onClick={this.handleSubmit}>Send</button>
        </div>
        <div>
            
            {chipData.length >0 ? 
            (
            <div className = "studentsTable" style={{ display: "flex" , justifyContent: "center"}}>
            <div className = {styles.sentTo}> Sent to </div>
            {chipData.map(data => {
                    let icon;

                    return (
                    <Chip
                        key={data.id}
                        icon={icon}
                        label={data.receipents}
                        // className={classes.chip}
                    />
                    );
                })}
            </div>
            ):
            (
                <div></div>
            )}
        </div>
    </div>
      // </form>
  )
}
  
}


export default Notification



