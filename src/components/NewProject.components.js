import React from "react";

const NewProject = props => {
   
  return (
      <form id="text">
        {props.text} <br />
        <p id="question">Would you like to create a New Issue</p>
        <input className="btn" type="button" value="yes" id="yes" onClick={props.onClick} />
        <input className="btn" type="submit" value="no" id="no" />
      </form>
    );
  };

  export default NewProject