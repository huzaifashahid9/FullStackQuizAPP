import {
  getDocs,
  getDoc,
  db,
  doc,
  collection,
  updateDoc,
  setDoc,
  addDoc,
} from "../../firebase.js";

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

const sumbitting = async () => {
  try {
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const message = document.getElementById("message");
    const user = localStorage.getItem("Users");
    const data = JSON.parse(user);
    console.log(data.id);

    if (!name.value || !email.value || !message.value) {
      alert("Please fill in all fields before submitting!");
      return;
    }
    const obj = {
      name: name.value,
      email: email.value,
      Feedback: message.value,
    };
    const savaData = await addDoc(collection(db, "Feedbacks"), obj);
    console.log(savaData);
    alert("🎉 Thank you for your feedback! We appreciate your time.");
    window.location.reload();
  } catch (error) {
    console.log(error.message);
  }
};

window.toggleMenu = toggleMenu;
window.authCheck = authCheck;
window.sumbitting = sumbitting;
