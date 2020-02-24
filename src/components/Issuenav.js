import React from "react";

const IssueNav = (props) => {
 return (
 <ul id="issuenav">
        
        <li><a href="/"><input type="button" className="btn2" value="Back"/> </a></li>
        
        <li><input type="button" className="btn2" value="New Issue" onClick={props.showHideEditForm}  /></li>
        <li><input type="button" className="btn2" value="Search" onClick={props.showHideSearchForm}  /></li>
    
    </ul>
 )
}
export default IssueNav