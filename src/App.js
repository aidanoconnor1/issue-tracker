import React from "react";
import {useState, useEffect} from 'react'
import { BrowserRouter as Router, Route} from "react-router-dom"

import "./styles.css";
import SearchBar from "./components/SearchBar.components.js"
import ProjectCard from "./components/ProjectCard.components.js"
import NewProject from "./components/NewProject.components"
import IssueForm from "./components/IssueForm.components"
import IssueComp from "./components/Issue.components"
import axios from 'axios'
import ActionBar from "./components/Action.components"
import SearchIssue from "./components/SearchIssue"
import IssueNav from "./components/Issuenav"
import { CSSTransition } from 'react-transition-group';



export default function App({match}) {

  const [search, setSearch] = useState("");
  const [results, setResults] = React.useState([]);
  const [projectIssues, setProjectIssues] = useState([])
  const [issue, setIssue] = useState({
    title:"",
    issue_text:"",
    createdBy:"",
    assignedTo:"",
    open:""
  })
  const [editIssue, setEditIssue] = useState("")
  const [action, setAction] = useState(false)
  const [editForm, setEditForm] = useState(false)
  const [searchForm, setSearchForm] = useState(false)
  const [searchIssueList, setSearchIssueList] = useState([])

  const showHideEditForm = () => {
    setIssue({
      title:"",
      issue_text:"",
      createdBy:"",
      assignedTo:"",
      open:issue.open
    })
    setEditIssue("")  
    setEditForm(!editForm)
    setSearchForm(false)
    console.log(editForm)
  }

  const showHideSearchForm = () => {
    setIssue({
      title:"",
      issue_text:"",
      createdBy:"",
      assignedTo:"",
      open:issue.open
    })
    setEditIssue("") 
    setEditForm(false)
    setSearchForm(!searchForm)
  }

  useEffect( () => {
    setTimeout(function() {setAction(false); }, 5000);
  },[action])

  const searchOnChange = e => {
    setSearch(e.target.value);
  
  };

  const issueTitle = e => {
  console.log(e.target.name === "issue_text")
  console.log(issue.issue_text)
    switch(e.target.name){
      case "issue_title":
      setIssue({...issue, title:e.target.value})
    break;
    case "issue_text":
      setIssue({...issue, issue_text:e.target.value})
    break;
    case "created_by":
      setIssue({...issue, createdBy:e.target.value})
      break;
      case "assigned_to":
        setIssue({...issue, assignedTo:e.target.value})
    }
  }

const issueSubmit = () => {
  const param =  window.document.URL.substr(22)
  const newIssue = {
    issue_title:issue.title,
    issue_text:issue.issue_text,
    createdBy:issue.createdBy,
    assignedTo:issue.assignedTo,
    created_on:new Date(),
    updated_on:new Date(),
    open:true,
    
  }
  axios.post(`http://localhost:5000/api/issues/${param}`, newIssue)
      .then( (res) => console.log("issue Sent"))
      setAction('Issue Created')
      setIssue({
      title:"",
      issue_text:"",
      createdBy:"",
      assignedTo:"",
      open:""})
      setEditForm(!editForm)
  }

  const searchSubmit = () => {
    const param =  window.document.URL.substr(22)
    const searchObj = {
      issue_title:issue.title,
      issue_text:issue.issue_text,
      createdBy:issue.createdBy,
      assignedTo:issue.assignedTo,      
    }
    if (searchObj.issue_title === ""){
      delete searchObj.issue_title
    }
    if (searchObj.issue_text === ""){
      delete searchObj.issue_text
    }
    if (searchObj.createdBy === ""){
      delete searchObj.createdBy
    }
    if (searchObj.assignedTo === ""){
      delete searchObj.assignedTo
    }
    let queryString = JSON.stringify(searchObj)
    queryString = queryString.replace(/:/g , '=')
    queryString = queryString.replace(/,/g, "&")
    queryString = queryString.replace(/}/g, "")
    queryString = queryString.replace(/{/g, "")
    queryString = queryString.replace(/"/g, "")

    axios.get(`http://localhost:5000/api/issues/${param}?${queryString}`)
        .then(res => setSearchIssueList(res.data.map(x => {
          return x
        }) 
      ) )
        
        setIssue({
        title:"",
        issue_text:"",
        createdBy:"",
        assignedTo:"",
        open:""})
        setEditForm(false)
        setSearchForm(false)
    }

  const showEdit = (key, issue) => {
    setEditForm(false)
    setSearchForm(false)
    setEditIssue(key)
    setIssue({
      title:issue.issue_title,
      issue_text:issue.issue_text,
      createdBy:issue.createdBy,
      assignedTo:issue.assignedTo,
      open:issue.open
    })
  }

  const submitEdit = (id) => {
    const param =  window.document.URL.substr(22)
    const issueEdit = {
      "_id":id,
      issue_title:issue.title,
      issue_text:issue.issue_text,
      createdBy:issue.createdBy,
      assignedTo:issue.assignedTo,
      updated_on:new Date(),
      open:issue.open
    }
    setIssue({
      issue_title:"",
      issue_text:"",
      createdBy:"",
      assignedTo:"",
      open:""
    })
 
    axios.put(`http://localhost:5000/api/issues/${param}`, issueEdit)
    .then( (res) => console.log('issue Updated!'))
    setEditIssue("")
    setAction('Issue Updated')
  }

  const hideEdit = () => {
    setEditIssue("")
    setIssue({
      issue_title:"",
      issue_text:"",
      createdBy:"",
      assignedTo:"",
      open:""
    })
  }


  const issueDelete = (id) => {
    const param =  window.document.URL.substr(22)
    const issueDelete = {
      "_id":id
    }
  
      axios.delete(`http://localhost:5000/api/issues/${param}`, {headers:{},data:{"_id":id}})
        .then((res) => console.log('Issue Deleted!'))
        setAction('Issue Deleted')

  }

  const issueStatusToggle = () => {
    console.log('issue.open:',issue.open)
    setIssue({...issue, open:!issue.open})
  }

  const onClick = () => {
   const project = search
     axios.post(`http://localhost:5000/${project}/new`)
          .then(res => console.log('pc') )  
          setAction('Project Created')
         setSearch("") 
                
    }

    useEffect( () => {
      const param =  window.document.URL.substr(22)
      axios.get(`http://localhost:5000/api/issues/${param}`)
      .then(res => setProjectIssues(res.data.map(x => {
        return x
      })  ) )
    })
 
  // working home page get requestr for collections
  useEffect( () => {
    axios.get('http://localhost:5000/')
    .then(res => setResults(res.data.map(x => {
      return x.name
    })  ) )
  },[])


  let projects = results
    .filter(x => {
      return x.match(search);
    })
    .map(x => {
      return (
        <Route exact path='/'  render={(props) => <ProjectCard title={x} openTickets={x.open} update={x.updated} key={x}/>} />
      );
    });
  let text;

  let issues = projectIssues.map((x,i) => {
    return (
     
      <Route exact path='/:project'  render={(props) =>
        <IssueComp issue={x} issueState={issue} id={'issue' + i} editFunction={issueTitle} showEdit={showEdit} hideEdit={hideEdit} submitEdit={submitEdit} issueDelete={issueDelete} issueStatusToggle={issueStatusToggle} editIssue={editIssue} key={i}/>}/>
    )
  })

  let sIssues = searchIssueList.map((x,i) => {
    return (
     
      <Route exact path='/:project'  render={(props) =>
        <IssueComp issue={x} issueState={issue} id={'issue' + i} editFunction={issueTitle} showEdit={showEdit} hideEdit={hideEdit} submitEdit={submitEdit} issueDelete={issueDelete} issueStatusToggle={issueStatusToggle} editIssue={editIssue} key={i}/>}/>
    )
  })
  
  if (projects.length === 0) {
    text = search + " Project not Found";
  } else {
    text = projects;
  }



  return (
    <Router className="App">
      <div className="navbar">
      <Route exact path="/" render={(props) => <SearchBar search={search} searchOnChange={searchOnChange} />} />
     
      </div>
      <div />
      <div>
     
        <CSSTransition
          classNames="my-node"
          in={action}
          timeout={500}
        >
       {action ?  <ActionBar action={action} /> : <p></p> }     
      </CSSTransition>
   
      </div>
      <div className="results" id="resultBox">
        {projects.length === 0 ? (
           <Route exact path='/' render={(props) => <NewProject id="text" text={text} onClick={onClick}/>} />
        ) : (
          projects
        )}
        <div id="flex">
        <Route  exact path='/:project' render={(props) => <IssueNav showHideEditForm={showHideEditForm} showHideSearchForm={showHideSearchForm}/>}/>
       {editForm ?  <Route exact path="/:project" render={(props) => <IssueForm {...props} issueTitle={issueTitle} issueSubmit={issueSubmit}  issue={issue}/>} /> : <p></p> }
       {searchForm ?  <Route exact path="/:project" render={(props) => <SearchIssue {...props} issueTitle={issueTitle} searchSubmit={searchSubmit}  issue={issue}/>} /> : <p></p> }
        {searchIssueList.length === 0 ? issues : sIssues}
       
        </div>
      </div>
    </Router>
  );
}
