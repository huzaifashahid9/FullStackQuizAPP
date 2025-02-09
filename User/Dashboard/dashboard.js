const authCheck = () => {
  try {
    const user = localStorage.getItem("Users");
    const data = JSON.parse(user);
    console.log(data);
    if (data === null) {
      window.location.replace("../../index.html");
    }
    if (data.type === "Admin") {
      window.location.replace("../../Admin/Dashboard/Dashboard.html");
    }
  } catch (error) {
    console.log(error.message);
    //alert(error.code);
  }
};

function toggleMenu() {
  const navLinks = document.querySelector(".nav-links");
  navLinks.classList.toggle("active");
}



const displayUserProfile = () => {
  const user = localStorage.getItem("Users");
  if (user) {
      const data = JSON.parse(user);
      document.getElementById("user-name").innerText = data.Name;
      document.getElementById("father-name").innerText = data.fName ;
      document.getElementById("user-age").innerText = data.age ;
      document.getElementById("user-dob").innerText = data.date ;
      document.getElementById("user-email").innerText = data.email;
  } else {
      console.log("No user data found in local storage.");
  }
};


window.toggleMenu = toggleMenu;
window.authCheck = authCheck;
window.displayUserProfile = displayUserProfile
