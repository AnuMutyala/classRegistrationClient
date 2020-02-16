import React,{Component} from 'react';
import styles from './Register.module.scss';

class Register extends Component {
    constructor() {
        super();
        this.state = {
          teacher: "",
          students: [''],
          errors: {},
        };
        this.handleSubmit = this.handleSubmit.bind(this);
      }


  handleTeacher = evt => {
    this.setState({ teacher: evt.target.value });
  };

  handleStudentEmailChange = idx => evt => {
      //make sure that email consists of emailId
      let errors ={};
    const newStudents = this.state.students.map((student, sidx) => {
      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      if (idx !== sidx) {student = student}

      else{
        this.state.students.splice(sidx, 1, evt.target.value);
        student = evt.target.value
      }
      if(student != ""){
        if (!pattern.test(student)) {
          errors["students"] = "*Please enter valid email-ID.";
        }
      }
     
      return student
    });

    this.setState({ 
      errors: errors,
      students: newStudents });
  };

  validateForm() {
    let formIsValid = true;
    let errors = {};
    const { teacher, students } = this.state;
      if(teacher != ""){
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(teacher)) {
          formIsValid = false;
          errors["teacher"] = "*Please enter valid email-ID.";
        }
      }
      // students.forEach(student => {
      //   if (typeof student !== "undefined") {

      //     //regular expression for email validation
      //     var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      //     if (!pattern.test(student)) {
      //       formIsValid = false;
      //       errors["students"] = "*Please enter valid email-ID.";
      //     }
      //   }
      // });
    this.setState({
      errors: errors
    });
    return formIsValid;
  }

handleSubmit = async(evt) => {
//if there is no error from backend then show success message else throw error
      const { teacher, students,errors } = this.state;
        if(this.validateForm()){
          let data = {teacher: teacher, students : students};
          await fetch('http://localhost:4000/api/register', {
            method: 'post',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*'
            },
                body: JSON.stringify(data)
          }).then(function(response) {
                  if(response.status === 200){alert(`Registered successfully`)}
                  else{alert(`Please check there is some error`)}
                });
        }
        this.setState({ errors: {},students: [''],teacher: ""});
  };

  handleAddStudent = () => {
    this.setState({
        students : [...this.state.students, '']
    });
  };

  handleRemoveStudent = idx => () => {
    this.setState({
      students: this.state.students.filter((s, sidx) => idx !== sidx)
    });
  };
  render(){
    const { teacher, students,errors } = this.state;
      return (

    // <form onSubmit={this.handleSubmit}>
    <div className = {styles.RegisterRoot} > 
        <input
            type="text"
            placeholder="Add a Teacher"
            value={teacher}
            onChange={this.handleTeacher}
            required = {true}
            className = {styles.inputText}
        />
        <div className="errorMsg" style={{ color: "red" }}>{errors.teacher}</div>

        <h4>Students</h4>

        {students.map((student, idx) => (
          <div className="student" key= {idx}>
            <input
                className = {styles.inputText}
                type="text"
                placeholder={`Student #${idx + 1} emailId`}
                value={student}
                onChange={this.handleStudentEmailChange(idx)}
            />
            
            <button
                className = {styles.button}
                type="button"
                onClick={this.handleRemoveStudent(idx)}
                className = {styles.button}
            >
              -
            </button>
            
          </div>
          
        ))}
        <div className="errorMsg" style={{ color: "red" }}>{errors.students}</div>
        <button
            className = {styles.button}
            type="button"
            onClick={this.handleAddStudent}
            className = {styles.button}
        >
            Add Student
        </button>
        <button 
            className = {styles.button}
            onClick={this.handleSubmit}
        >Register</button>
    </div>
        // </form>
  )
}
  
}


export default Register
