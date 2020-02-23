import React from "react";
import { BrowserRouter as Router, Route} from "react-router-dom"
import ReactDOM from 'react-dom'
import "./styles.css";
import SearchBar from "./components/SearchBar.components.js"
import ProjectCard from "./components/ProjectCard.components.js"
import NewProject from "./components/NewProject.components"




export default function App() {
  const allRegex = /[\s\S]*/;

  const [search, setSearch] = React.useState("");
  const [results, setResults] = React.useState([
    { title: "fakeProject", open: 4, updated: " 3/4/2020" },
    { title: "AlsoFakeProject" },
    { title: "AlsoFakeProject" },
    { title: "AlsoFakeProject" },
    { title: "AlsoFakeProject" },
    { title: "AlsoFakeProject" },
    { title: "AlsoFakeProject" },
    { title: "AlsoFakeProject" },
    { title: "AlsoFakeProject" },
    { title: "AlsoFakeProject" }
  ]);

  const searchOnChange = e => {
    setSearch(e.target.value);
  };

  const projects = results
    .filter(x => {
      return x.title.match(search);
    })
    .map(x => {
      return (
        <Route path='/' exact render={(props) => <ProjectCard title={x.title} openTickets={x.open} update={x.updated}/>} />
      );
    });
  let text;
  console.log(projects);
  if (projects.length === 0) {
    text = search + " Project not Found";
  } else {
    text = projects;
  }

  return (
    <Router className="App">
      <div className="navbar">
      <Route Path="/" render={(props) => <SearchBar search={search} searchOnChange={searchOnChange}/>} />
      </div>
      <div />
      <div className="results" id="resultBox">
        {projects.length === 0 ? (
           <Route path="/" render={(props) => <NewProject id="text" text={text}/>} />
        ) : (
          projects
        )}
      </div>
    </Router>
  );
}
