import axios from 'axios';

export default () => {
  return axios.create({ 
    baseURL: "https://edocsapi.azurewebsites.net/",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": "Digest username='xikxafatwae' realm='_root_' password=''"
    }
  })
}