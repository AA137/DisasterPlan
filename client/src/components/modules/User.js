import React, { Component } from "react";

class User extends Component {
  // makes props available in this component
  constructor(props) {
    super(props);
    this.state = {
        name: String,
        googleid: String,
        age: Number,
        address: String,
        english: Boolean,
        phone: String,
        //for formatting stuff etc. -- no reason to keep as number
        conditions: String,
        disabilities: String,
        medication: String,
        healthcare: String,
        dietary: String,
        allergies: String,
        considerations: String,
        roommates: String,
        ages: Array,
        //accurate???
        pets: String,
        car: Boolean,
        locations: Array,
        //is this right??
        iscontact_name: String,
        iscontact_phone: String,
        iscontact_address: String,
        ooscontact_name: String,
        ooscontact_number: String,
        ooscontact_address: String,
      };
  }

  render() {
    return (
      <div>
        <b>{this.state.name }</b>
      </div>
    );
  }
}

export default Message;