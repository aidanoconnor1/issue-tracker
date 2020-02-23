import React from "react";


const IssueComponent = (props) => {
   
    return (
      <div>
     
     
      <div id="issuecard" >

        {props.editIssue !== props.id ?
        <div> 
              <h4>{props.issue.issue_title}</h4>
              <p>{props.issue.issue_text}</p>
              <p>Created By: {props.issue.createdBy}</p>
              <p>Assigned To: {props.issue.assignedTo}</p>
              <p>Created On: {props.issue.created_on}</p>
              <p>Last Updated: {props.issue.updated_on}</p>
              <p>Issue Status: {props.issue.open ? "Open" : "Closed" }</p>     
              <input type='button' value='Update' id="form2" onClick={() => props.showEdit(props.id, props.issue)}/>
              <input type='button' value='Delete' id="form2" onClick={() => props.issueDelete(props.issue._id)}/>
            
        </div>
              : 
           <div>   
              <form id="editform" method="post" action="/api/">
              Title: <input type="text" name="issue_title" value={props.issueState.title} onChange={props.editFunction} id="form2" /> <br/>
              Description: <input type="text" name="issue_text" value={props.issueState.issue_text} onChange={props.editFunction} id="form2" /><br/>
              <p>Created On: {props.issue.created_on}</p>
              <p>Last Updated: {props.issue.updated_on}</p><br/>
              Assigned To: <input type="text" name="assigned_to" value={props.issueState.assignedTo} onChange={props.editFunction} id="form2" /><br/>
              Issue Status: {props.issueState.open ? "Open" : "Closed"} <input type="button" id="form2" value={props.issueState.open  ? "Close" : "Open"} onClick={props.issueStatusToggle}/><br/>
              <input type='button' value="Accept" id="form2" onClick={() => props.submitEdit(props.issue._id)}/><input type='button' value="Cancle" onClick={props.hideEdit} id="form2" />
              </form>
          </div>
        }  
      </div>
      </div>
    );
  };
  export default IssueComponent