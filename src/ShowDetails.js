import React, { Component } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import styles from './ShowDetails.module.scss';

class ShowDetails extends Component {
  constructor() {
    super();
    this.state = {
      studentData: [],
      teachers: ['']
    };
    this.renderMyData = this.renderMyData.bind(this);
  }

  handleTeacherEmailChange = idx => evt => {
    //make sure that email consists of emailId
    const newTeachers = this.state.teachers.map((teacher, sidx) => {
      if (idx !== sidx) return teacher;
      this.state.teachers.splice(sidx, 1, evt.target.value);
      return teacher = evt.target.value
    });

    this.setState({ teachers: newTeachers });
  };
  handleAddTeacher = () => {
    this.setState({
      teachers: [...this.state.teachers, '']
    });
  };

  handleRemoveTeacher = idx => () => {
    this.setState({
      teachers: this.state.teachers.filter((s, sidx) => idx !== sidx)
    });
  };
  renderMyData = async (evt) => {
    let URL = 'http://localhost:4000/api/commonstudents/';
    let { teachers } = this.state;
    let teacherLength = teachers.length;
    if (teacherLength > 0) {
      for (let i = 0; i < teachers.length; i++) {
        if (i == 0) {
          URL = URL + "?teacher=" + teachers[i]
        }
        else {
          URL = URL + "&teacher=" + teachers[i]
        }
      }
    }
    else {
      alert("sorry no teacher is selected")
    }

    await fetch(URL)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ studentData: responseJson.students })
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const {studentData,teachers } = this.state;
    return (
      //if there are no students then show an error message saying no students for this teacher
      <div className = {styles.ShowDetailsRoot}>
        <h4>Teachers</h4>
        {teachers
          .map((teacher, idx) => (
            <div className="student" key={idx} >
              <input
                className = {styles.textArea}
                type="text"
                placeholder={`Teacher #${idx + 1} emailId`}
                value={teacher}
                onChange={this.handleTeacherEmailChange(idx)}
              />
              <button
                type="button"
                onClick={this.handleRemoveTeacher(idx)}
                className = {styles.button}
              >
                -
              </button>
            </div>
          ))}
        <button
          type="button"
          onClick={this.handleAddTeacher}
          className = {styles.button}
        >
          Add Teacher
        </button>
        <button className = {styles.button} onClick={this.renderMyData}>Retrieve Students</button>
        {studentData.length > 0 ?
          (
            <div  style={{ display: "flex", justifyContent: "center" }}>
              <table>
                <thead>
                  <tr>
                    <th />
                    <th>Common Students</th>
                  </tr>
                </thead>
                <tbody>
                    {studentData.map((row, index) => (
                    <TableRow key={index + 1}>
                      <TableCell key ={index + 1} className={styles.tableArrangment} align="right">{index + 1}</TableCell>
                      <TableCell key ={index} className={styles.tableArrangment} align="right">{row}</TableCell>
                    </TableRow>
                  ))}
                </tbody>
              </table>
            </div>
          ) :
          (
            <div></div>
          )}

      </div>
    )
  }

}


export default ShowDetails
