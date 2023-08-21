let theme = localStorage.getItem('data-theme');

const changeThemeToDark = () => {
  document.documentElement.setAttribute("data-theme", "dark") // set theme to dark
  localStorage.setItem("data-theme", "dark") // save theme to local storage
}

const changeThemeToLight = () => {
  document.documentElement.setAttribute("data-theme", "light") // set theme light
  localStorage.setItem("data-theme", 'light') // save theme to local storage
}

const toggle = document.getElementById('toggleDark')

// Apply retrived them to the website
toggle.addEventListener('change', () => {
  let theme = localStorage.getItem('data-theme'); // Get current theme
  if (theme ==='dark'){
      changeThemeToLight()
  }else{
      changeThemeToDark()
  }   
});