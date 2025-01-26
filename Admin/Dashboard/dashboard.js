const authCheck = () =>{
  try {
    const user = localStorage.getItem("Users")
    const data  = JSON.parse(user)
    console.log(data);
    if(data === null){
      window.location.replace("../../index.html")
    }
    // if(data.type === "Admin"){
    //   window.location.replace("../../Admin/Dashboard/Dashboard.html");
    // }else if(data.type === "user"){
    //   window.location.replace("../../User/Dashboard/dashboard.html")
    //  }
  } catch (error) {
    console.log(error.message);
    //alert(error.code);
  }
}



  function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
  }  

window.toggleMenu = toggleMenu
window.authCheck = authCheck 