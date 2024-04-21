import User from "./User";
import UserClass from "./UserClass";
import { Component } from "react";  

class About extends Component{

    constructor(props) {
      super(props);
    }

    componentDidMount() {
    }

    render() {
      return (
        <div>
          <h1>About Us:</h1>
          <h2>This is Namaste React</h2>
          <UserClass name={"Ujjwal  (Classbased Comp)"} location={"Alwar"} />
        </div>
      );
    }
}

export default About