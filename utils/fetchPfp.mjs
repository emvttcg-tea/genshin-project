//importing modules
import fetch from 'node-fetch'

const apiLink = 'https://young-tea.github.io/genshin-master-pictures/api/pfp.json'

// function that is fetching data
const fetchLink = async (apiLink) => {
  const response = await fetch(apiLink)
  const data = await response.json()

  // console.log(data)

  return(data)
}

const data = await fetchLink(apiLink)

//exporting data
module.exports = data

//this is file that fetches avatars links