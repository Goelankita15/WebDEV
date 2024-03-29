import React, { Component } from 'react'
import FormUserDetails from './FormUserDetails'
import FormPersonalDetails from './FormPersonalDetails'
import Confirm from './Confirm'
import Success from './Success'
export class UserForm extends Component {
    state = {
        step :1,
        firstName :'',
        lastName :'',
        occupation :'',
        city :'',
        email :'',
        bio :''
    }

    //Proceed to next step
    nextStep = () =>{
        const {step} = this.state;
        this.setState({
            step : step +1
        });
    }

    //Proceed to prev step
    prevStep = () =>{
        const {step} = this.state;
        this.setState({
            step : step - 1
        });
    }


    //Handlechange
    handleChange = input => (e) =>{
        this.setState({
            [input] :e.target.value
        });
    }
  render() {

    const {step} = this.state;
    const {firstName, lastName, email, city, bio, occupation} = this.state;
    const values = {firstName, lastName, email, city, occupation, bio};
    switch(step){
        case 1:
            return(
                <FormUserDetails 
                    nextStep = {this.nextStep}
                    values = {values}
                    handleChange = {this.handleChange}
                />
            )
        case 2:
            return(
                <FormPersonalDetails 
                    nextStep = {this.nextStep}
                    values = {values}
                    handleChange = {this.handleChange}
                    prevStep = {this.prevStep}
                />
            )
        case 3:
            return(
                <Confirm 
                    nextStep = {this.nextStep}
                    values = {values}
                    prevStep = {this.prevStep}
                />
            )
        case 4:
            return(
                <Success 
                />
            )
    }
  }
}

export default UserForm
