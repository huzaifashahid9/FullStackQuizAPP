import { getDocs, db, doc, collection, updateDoc } from "../../firebase.js";

const parent = document.querySelector(".parent");

function toggleMenu() {
  const navLinks = document.querySelector(".nav-links");
  navLinks.classList.toggle("active");
}

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

const dataHandler = async () => {
  try {
    console.log("Hello");
    const data = await getDocs(collection(db, "quizQue"));
    console.log(data);
    data.forEach((doc) => {
      const quiz = doc.data();
      if (quiz.isActive == true) {
        parent.innerHTML += `
      <div class="quiz-card-admin">
  <div class="quiz-card-admin-header">
    <h2>Quiz Title: ${quiz.title}</h2>
    <p>Category: ${quiz.category}</p>
  </div>
  <div class="quiz-card-admin-body">
    <p>Get ready to test your knowledge! Click the button below to start your quiz.</p>
    <div class="quiz-status">
      <span class="status-label">Status:</span>
      ${
        quiz.isActive == true
          ? `<span class="status-badge active">Active</span>`
          : `<span class="status-badge active">Inactive</span>`
      }
    </div>
    <div class="quiz-actions">
     <button id=${
       doc.id
     } class="btn activate-btn" onclick="startquiz(this)">Start Quiz</button>
    </div>
  </div>
</div>
`;
      }
    });
  } catch (error) {
    console.log(error.message);
    alert(error.message);
  }
};

const startquiz = (ele) => {
  try {
    const id = ele.id;
    sessionStorage.setItem("quizId", id);
    window.location.replace("../quizApp/quizapp.html");
  } catch (error) {
    console.log(error.message);
    alert(error.message);
  }
};

window.authCheck = authCheck;
window.startquiz = startquiz;
window.dataHandler = dataHandler;
window.toggleMenu = toggleMenu;
