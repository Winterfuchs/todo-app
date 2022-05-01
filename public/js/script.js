const toggle = document.getElementById("toggle");
const theme = window.localStorage.getItem("theme");
// Checks if the theme stored in localStorage is dark or light and applies the correct theme
if (theme === "dark") document.body.classList.add("dark");

// Event listener for the toggle button to toggle the theme between dark and light
toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    window.localStorage.setItem("theme", document.body.classList.contains("dark")? "dark" : "light");
});

// Opens the sidebar menu
function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
  }
  
// Closes the sidebar menu
function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
}

// Toggles between the open and closed sidebar menu
function toggleNav() {
    if (document.getElementById("mySidebar").style.width == "250px") {
        closeNav();
    } else {
        openNav();
    }
}