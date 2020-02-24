import React from "react";

const ProjectCard = props => {
    return (
      <a href={`/${props.title}`}>
      <div id="card">
              <h4>{props.title}</h4>
        <p></p>
        <p></p>      
      </div>
      </a>
    );
  };
  export default ProjectCard