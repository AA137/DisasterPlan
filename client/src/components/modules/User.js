import React, { Component } from "react";

class User extends Component {
  // makes props available in this component
  constructor(props) {
    super(props);
    this.state = {name: "Tim TheBeaver", age: 107, address: "292 Main St, Cambridge, MA 02142", 
        english: "Yes", phonenumber: "(617) 253-3400","conditions": "Beaveritis, Mascotonia", medication: ["beaveroxin"], 
        roommates: ["Petey,0", "Kellen,0", "Stu,0"], pets: "Yes", car: true, locations: ["The Stud", "The Dome"], iscontact_name: "Crimson",
        iscontact_phone: "(617) 495-1000", iscontact_address: "86 Brattle Street Cambridge, MA 02138", ooscontact_address:  "450 Serra Mall, Stanford, CA 94305",
        ooscontact_name:"Tree",ooscontact_number:"(650) 723-2300"};
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
