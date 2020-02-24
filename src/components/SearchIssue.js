import React from "react";


const SearchIssue = (props, {match}) => { 
   


    return (
        <div>
            <h2>{props.match.params.project} Issue Search </h2>
          
            <h3>Search Issue:</h3>
        <form id="search" method="get" action="/api/">
          Issue Title:<input type="text" name="issue_title" id="form" placeholder="*Title" value={props.issue.title} onChange={props.issueTitle}   /><br></br>
          Description:<textarea type="text" name="issue_text" id="form" placeholder="*Text" value={props.issue.issue_text} onChange={props.issueTitle} /><br></br>
          Created By:<input type="text" name="created_by" id="form" placeholder="*Created by" value={props.issue.createdBy}  onChange={props.issueTitle}  /><br></br>
          Assigned To:<input type="text" name="assigned_to" id="form" placeholder="(opt)Assigned to" value={props.issue.AssignedTo}   onChange={props.issueTitle} /><br></br>
        
          <input type='button' value="Search" onClick={props.searchSubmit}/>
        </form>
      

            
        </div>
    )
}
export default SearchIssue