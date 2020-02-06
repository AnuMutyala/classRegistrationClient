import React, { Component } from 'react';
import styles from './Suspend.module.scss';

class Suspend extends Component {
  constructor() {
    super();
    this.state = {
      student: "",
    };
  }


  handleStudent = evt => {
    this.setState({ student: evt.target.value });
  };


  handleSubmit = async (evt) => {
    //show a success message if successful....
    //call the post method to suspend student
    const { student } = this.state;
    let data = { student: student }

    await fetch('http://localhost:4000/api/suspend', {
      method: 'post',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(data)
    }).then(function (response) {
      if (response.status === 200) {
        alert(`${student} is suspended`)
      }
      else if (response.status === 202) {
        alert(`${student} is already suspended`)
      }
      else {
        alert(`${student} is not registered`)
      }
      // return response.json();
    });
  };


  render() {
    const { student } = this.state;
    return (

      // <form onSubmit={this.handleSubmit}>
      <div className = {styles.SuspendRoot}
      >
        <input
          className = {styles.textArea}
          type="text"
          placeholder="Student mail id"
          value={student}
          onChange={this.handleStudent}
        />
        <button className = {styles.button} onClick={this.handleSubmit}>Suspend</button>
      </div>
      //   </form>
    )
  }

}

export default Suspend