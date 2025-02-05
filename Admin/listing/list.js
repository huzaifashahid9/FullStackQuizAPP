import { getDocs, db, doc, collection, updateDoc } from "../../firebase.js";
// console.log(getDocs,db,doc);

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

const parent = document.querySelector(".parent");
console.log(parent);

const dataHandler = async () => {
  try {
    const data = await getDocs(collection(db, "quizQue"));
    parent.innerHTML = " ";
    data.forEach((doc) => {
      const quizQue = { ...doc.data(), id: doc.id };
      console.log(quizQue);
      parent.innerHTML += `
      <div class="quiz-card-admin">
  <div class="quiz-card-admin-header">
    <h2>Quiz Title: ${doc.data().title}</h2>
    <p>Category: ${doc.data().category}</p>
  </div>
  <div class="quiz-card-admin-body">
    <p>Manage this quiz by activating or deactivating it. Check its status below:</p>
    <div class="quiz-status">
      <span class="status-label">Status:</span>
      ${
        quizQue.isActive == true
          ? `<span class="status-badge active">Active</span>`
          : `<span class="status-badge active">Inactive</span>`
      }
    </div>
    <div class="quiz-actions">
     ${
       quizQue.isActive == true
         ? `<button id=${doc.id} class="btn activate-btn" onclick="toggling(this , 'active')">Active</button>`
         : `<button id=${doc.id} class="btn activate-btn" onclick="toggling(this , 'inactive')">Inactive</button>`
     }
    </div>
  </div>
</div>
`;
    });
  } catch (error) {
    console.log(error.message);
    alert(error.code);
  }
};

const toggling = async (ele, status) => {
  try {
    console.log(ele.id, status);
    await updateDoc(doc(db, "quizQue", ele.id), {
      isActive: status == "active" ? false : true,
    });
    dataHandler();
  } catch (error) {
    console.log(error.message);
    alert(error.code);
  }
};

window.toggleMenu = toggleMenu;
window.dataHandler = dataHandler;
window.toggling = toggling;
window.authCheck = authCheck;
