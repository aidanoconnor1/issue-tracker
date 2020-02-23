import React from "react";


const IssueForm = (props, {match}) => { 
   


    return (
        <div>
            <h2>{props.match.params.project} Issues </h2>
          
            <h3>Submit a new issue:</h3>
        <form id="newIssue" method="post" action="/api/">
          Issue Title:<input type="text" name="issue_title" id="form" placeholder="*Title" value={props.issue.title} onChange={props.issueTitle}   required=''/><br></br>
          Description:<textarea type="text" name="issue_text" id="form" placeholder="*Text" value={props.issue.issue_text} onChange={props.issueTitle} required=''/><br></br>
          Created By:<input type="text" name="created_by" id="form" placeholder="*Created by" value={props.issue.createdBy}  onChange={props.issueTitle}  required=''/><br></br>
          Assigned To:<input type="text" name="assigned_to" id="form" placeholder="(opt)Assigned to" value={props.issue.AssignedTo}   onChange={props.issueTitle} /><br></br>
        
          <input type='button' onClick={props.issueSubmit} value="Submit Issue"/>
        </form>
      

            
        </div>
    )
}
export default IssueForm