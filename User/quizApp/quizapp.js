import {
  getDocs,
  getDoc,
  db,
  doc,
  collection,
  updateDoc,
  addDoc,
} from "../../firebase.js";

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

const question_ele = document.getElementById("quest-ele");
const option_ele = document.getElementById("option-ele");
const counting = document.getElementById("count");
let questions = [];
let quizTitle = "";
let indexNum = 0;
let count = 1;
let score = 0;
let wrong = 0;
const nextBtn = document.getElementById("nextBtn");
let isOptionSelected = false; // Track if user has selected an option
nextBtn.disabled = true;
console.log(nextBtn);

const checkQuizID = async () => {
  try {
    const quizID = sessionStorage.getItem("quizId");
    console.log("quizID", quizID);
    if (quizID === null) {
      window.location.replace("../Dashboard/dashboard.html");
      return;
    }
    const data = await getDoc(doc(db, "quizQue", quizID));
    console.log("data", data.data());
    quizTitle = data.data().title;
    return data.data().questions;
  } catch (error) {
    return error.message;
  }
};
checkQuizID()
  .then((response) => {
    console.log("response", response);
    questions = response;
    console.log("questions", questions);
    handleQuest();
  })
  .catch((error) => {
    console.log("error", error);
  });

const handleQuest = () => {
  try {
    var optionsObj = questions[indexNum].options;
    var questionTitle = count + ". " + questions[indexNum].questionText;
    console.log(optionsObj);
    console.log(questionTitle);
    question_ele.innerHTML = questionTitle;
    option_ele.innerHTML = " ";
    nextBtn.disabled = false;
    isOptionSelected = false;
    for (var key in optionsObj) {
      option_ele.innerHTML += `<li onclick="checking(this)" >${optionsObj[key]}</li>`;
    }
    counting.innerHTML = `${count}/${questions.length}`;
  } catch (error) {
    console.log("error", error);
  }
};

const nextQue = () => {
  try {
    if (!isOptionSelected) {
      alert("Please select an option before proceeding.");
      return; // Stop execution if no option is selected
    }

    if (indexNum < questions.length - 1) {
      indexNum++; // Move to the next question
      count++;
      counting.innerHTML = `${count}/${questions.length}`;
      handleQuest();

      if (indexNum === questions.length - 1) {
        nextBtn.innerHTML = "Submit";
      }
    } else {
      console.log("Submit");
      submitQuiz();
    }
  } catch (error) {
    console.error("Error moving to next question:", error);
  }
};

const checking = (ele) => {
  try {
    const allEle = option_ele.children;
    const correctAns = questions[indexNum].correctAns;
    if (ele.innerHTML === correctAns) {
      ele.style.background = "#90EE90";
      score++;
    } else {
      ele.style.background = "#F08080";
      wrong++;

      for (i = 0; i < allEle.length; i++) {
        if (allEle[i].innerHTML === correctAns) {
          allEle[i].style.border = "3px solid green";
        }
      }
    }

    for (var i = 0; i < allEle.length; i++) {
      console.log(allEle[i]);
      allEle[i].style.pointerEvents = "none";
    }

    nextBtn.disabled = false;
    isOptionSelected = true;
  } catch (error) {
    console.log("error", error);
  }
};

const submitQuiz = async () => {
  try {
    console.log(questions.length);
    console.log(score);
    console.log(wrong);
    const user = localStorage.getItem("Users");
    const data = JSON.parse(user);
    console.log(data);
    
    const scoreObj = {
      totalQues: questions.length,
      score: score,
      wrongAns: wrong,
      quizId: sessionStorage.getItem("quizId"),
      userId: data.id,
      userName: data.Name,
      quizTitle: quizTitle
    };
    
    console.log("scoreObj", scoreObj);

    const response = await addDoc(collection(db, "Scores"), scoreObj);
    console.log(response);
    alert("Quiz submitted successfully");

    // Hiding quiz container
    document.querySelector(".quiz-container").style.display = "none";
    
    // Showing result container
    document.querySelector(".result-box").style.display = "block";

    // Setting result values
    document.getElementById("quizName").innerText = quizTitle;
    document.getElementById("totalQues").innerText = questions.length;
    document.getElementById("correctAns").innerText = score;
    document.getElementById("wrongAns").innerText = wrong;

    let percentage = (score / questions.length) * 100;
    document.getElementById("percentage").innerText = percentage.toFixed(2);

    let message = document.getElementById("message");

    if (percentage >= 80) {
        message.innerText = "Excellent! You are a quiz master! 🔥";
        message.classList.add("success");
    } else if (percentage >= 50) {
        message.innerText = "Good Job! Keep improving! 💪";
        message.classList.add("average");
    } else {
        message.innerText = "Don't Give Up! Try Again! 🚀";
        message.classList.add("fail");
    }
    
  } catch (error) {
    console.log("error", error);
  }
};

window.submitQuiz = submitQuiz;
window.checking = checking;
window.nextQue = nextQue;
window.toggleMenu = toggleMenu;
window.handleQuest = handleQuest;
window.checkQuizID = checkQuizID;
window.authCheck = authCheck;
