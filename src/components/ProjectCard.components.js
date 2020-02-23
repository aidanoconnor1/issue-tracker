import React from "react";

const ProjectCard = props => {
    return (
      <a href={`http://localhost:3000/${props.title}`}>
      <div id="card">
              <h4>{props.title}</h4>
        <p>Open Tickets:{props.openTickets}</p>
        <p>Last Updated:{props.update}</p>      
      </div>
      </a>
    );
  };
  export default ProjectCard