import { Fragment, useEffect, useState } from 'react';
import { AuthService } from '../../services/AuthService';
import Api from '../../services/Api';
import './Portfolio.css';

const Portfolio = () => {
  const [documents, setDocuments] = useState({});
  const [tasks, setTasks] = useState([]);
  const [filterText, setFilterText] = useState("");
  const auth = AuthService();

  useEffect(() => {
    const fetchSites = async () => {
      if(auth.user) {
        try {
          const response = await Api().get('Core6/api/Portfolio/ByUserId', { 
            headers: { "Authorization": `Digest username="xikxafatwae" realm="_root_" password="${auth.user.token}"` }
          });

          const docs = {};
          const sites = response.data.Result.sites;
          const sitesLength = sites.length;
          
          for(let i = 0; i < sitesLength; i++) {
            const projects = sites[i].projects;
            const projectsLength = projects.length;
            
            for(let j = 0; j < projectsLength; j++) {
              const documents = projects[j].documents;
              documents.forEach(doc => {
                const {id, ...newDoc} = {...doc};
                docs[doc.id] = { 
                  siteName: sites[i].name,
                  projectName: projects[j].name,
                  taskCount: 0,
                  ...newDoc
                }
              })
            }
          }

          setDocuments(docs)
        } catch (error) {
          console.error("Error fetching sites: ", error)
        }
      }
    }

    const fetchTasks = async () => {
      if(auth.user) {
        try {
          const response = await Api().get('Core6/api/Tasks/ByUser', { 
            headers: { "Authorization": `Digest username="2iqsvuylnqq" realm="_root_" password="${auth.user.token}"` }
          });

          const tasks = response.data.Result.tasks;
          const tasksLength = tasks.length;

          for(let i = 0; i < tasksLength; i++) {
            if(documents[tasks[i].documentId]) {
              setDocuments({ ...documents, ...documents[tasks[i].documentId]['taskCount'] += 1 })
            }
          }

          setTasks(tasks)
        } catch (error) {
          console.log("Error fetching tasks: ", error)
        }
      }
    }
    fetchSites();
    fetchTasks();
  }, [])

  const listOfDocuments = () => {
    if(!Object.values(documents)) {
      return;
    }

    return Object.values(documents).filter(doc => doc.name.toLowerCase().includes(filterText.toLowerCase())).map((doc, index) => (
      <tr key={index}>
        <td>{doc.name}</td>
        <td>{doc.taskCount}</td>
        <td>{doc.siteName}</td>
        <td>{doc.projectName}</td>
      </tr>
    ))
  }

  return (
    <Fragment>
    <h2>portfolio</h2>
    <input type="text" value={filterText} onChange={(e) => setFilterText(e.target.value)} placeholder="Search..." />
    <table>
      <thead>
        <tr>
          <th>Document Name</th>
          <th>Task Count</th>
          <th>Site Name</th>
          <th>Project Name</th>
        </tr>
      </thead>
      <tbody>
        { listOfDocuments() }
      </tbody>
    </table>
    </Fragment>
  )
}

export default Portfolio;