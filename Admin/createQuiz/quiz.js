// {
//     title :"JS QUIZ CHAP#1 to CHAP#20",
//     category :"Javascript",
//     questions : [
//         {
//             question : "html Stand for",
//             options : ["1" , "2" , "3" , "4"],
//             correctAns : "1",
//         },
//         {
//             question : "CSS Stand for",
//             options : ["1" , "2" , "3" , "4"],
//             correctAns : "1",
//         }
//     ],

// }

import { collection, db, addDoc } from "../../firebase.js";
// console.log(collection,db,addDoc);

const quizTitle = document.getElementById("quizTitle");
const quizCategory = document.getElementById("quizCategory");
const questionText = document.getElementById("questionText");
const option1 = document.getElementById("option1");
const option2 = document.getElementById("option2");
const option3 = document.getElementById("option3");
const option4 = document.getElementById("option4");
const correctAnswer = document.getElementById("correctAnswer");
const quesArr = [];

// console.log(quizTitle,
//   quizCategory,
//   questionText,
//   option1,
//   option2,
//   option3,
//   option4,
//   correctAnswer);

const createQuiz = async () => {
  try {
    console.log(quizTitle);
    console.log(quizCategory);
    console.log(quesArr);

    const obj = {
      title: quizTitle.value,
      category: quizCategory.value,
      questions: quesArr,
      isActive: false,
    };

    const res = await addDoc(collection(db, "quizQue"), obj);
    console.log(res);

    alert("Quiz created successfully");

    window.location.reload();
  } catch (error) {
    console.log(error.message);
    alert(error.message);
  }
};

const addQuestion = () => {
  try {
    console.log("Hello");

    if (
      !questionText.value ||
      !option1.value ||
      !option2.value ||
      !option3.value ||
      !option4.value ||
      !correctAnswer.value
    ) {
      alert("All fields are required.");
      return;
    }
    const queObj = {
      questionText: questionText.value,
      options: [option1.value, option2.value, option3.value, option4.value],
      correctAns: correctAnswer.value,
    };

    console.log(queObj);

    quesArr.push(queObj);

    questionText.value = "";
    option1.value = "";
    option2.value = "";
    option3.value = "";
    option4.value = "";
    correctAnswer.value = "";

    alert("Question add successfully");
  } catch (error) {
    console.log(error.message);
    alert(error.message);
  }
};

function toggleMenu() {
  const navLinks = document.querySelector(".nav-links");
  navLinks.classList.toggle("active");
}

window.toggleMenu = toggleMenu;
window.createQuiz = createQuiz;
window.addQuestion = addQuestion;
