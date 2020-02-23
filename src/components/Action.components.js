import React from "react";
import "./styles.css";

const Action = (props) => {
    const className = props.action ? "example" : "example.hide"
    return (
 <div id="actionbox"  >
            <img id="actionimg"  src="https://cdn.pixabay.com/photo/2014/04/02/10/24/checkmark-303752_960_720.png" width="30" height="30"/>
            <h4 id="actiontxt">{props.action}</h4>
    </div>
 )
}
export default Action