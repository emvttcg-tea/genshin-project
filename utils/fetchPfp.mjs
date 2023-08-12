//importing modules
import fetch from 'node-fetch'
// const axios = require("axios")

const apiLink = 'https://young-tea.github.io/genshin-master-pictures/api/pfp.json'

// function that is fetching data
const fetchLink = async (apiLink) => {
  const response = await fetch(apiLink)
  const data = await response.json()

  // console.log(data)

  return(data)
}

const datad = await fetchLink(apiLink)
console.log(datad)

// const response = await axios(apiLink);
// console.log(response.data);

//exporting data


//this is file that fetches avatars links