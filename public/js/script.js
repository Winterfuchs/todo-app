// Here goes the JS code
const toggle = document.getElementById("toggle");
const theme = window.localStorage.getItem("theme");

/* checks if the theme stored in localStorage is dark
if yes apply the dark theme to the body */
if (theme === "dark") document.body.classList.add("dark");

// event listener stops when the change theme button is clicked
toggle.addEventListener("click", () => {
   document.body.classList.toggle("dark");
   if (theme === "dark") {
     window.localStorage.setItem("theme", "light");
   } else window.localStorage.setItem("theme", "dark");
});

function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  }
  
function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
}

function toggleNav() {
    if (document.getElementById("mySidebar").style.width == "250px") {
        closeNav();
    } else {
        openNav();
    }
}