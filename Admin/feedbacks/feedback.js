import { getDocs, db, doc, collection, updateDoc } from "../../firebase.js";
const parent = document.querySelector(".parent")
const authCheck = () => {
  try {
    const user = localStorage.getItem("Users");
    const data = JSON.parse(user);
    console.log(data);
    if (data === null) {
      window.location.replace("../../index.html");
    }
    if (data.type === "user") {
      window.location.replace("../../User/Dashboard/dashboard.html");
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

const allfeed = async () => {
  try {
    const data = await getDocs(collection(db, "Feedbacks"));
    data.forEach((doc) => {
      const dataa = doc.data();
      console.log(dataa);
      parent.innerHTML+=`<div class="feedback-container">
        <div class="feedback-card">
            <h3 class="feedback-name">${dataa.name}</h3>
            <p class="feedback-email">${dataa.email}</p>
            <p class="feedback-message">${dataa.Feedback}</p>
        </div>`
      
    });
  } catch (error) {
    console.log(error.message);
  }
};

window.toggleMenu = toggleMenu;
window.authCheck = authCheck;
window.allfeed = allfeed
