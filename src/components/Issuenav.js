import React from "react";

const IssueNav = (props) => {
 return (
 <ul id="issuenav">
        
        <li><a href="http://localhost:3000/"><input type="button" className="btn2" value="Back"/> </a></li>
        
        <li><input type="button" className="btn2" value="New Issue" onClick={props.showHideForm}  /></li>
    
    </ul>
 )
}
export default IssueNav