import { collection, getDocs,db , query, where} from "../../firebase.js"









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





const quotes = [
    "Believe in yourself and all that you are. 🌟",
    "Every mistake is a lesson in disguise. 🔥",
    "Great things never come from comfort zones. 🚀",
    "Success is the sum of small efforts repeated daily. 💪",
    "Keep pushing forward, you're closer than you think! 🎯"
];

// Show a random motivational quote
const showMotivationalQuote = () => {
    const quoteText = document.getElementById("quote-text");
    const randomIndex = Math.floor(Math.random() * quotes.length);
    quoteText.innerText = quotes[randomIndex];
};

const fetchLeaderboard = async () => {
    try {
        const user = JSON.parse(localStorage.getItem("Users"));
        const q = query(collection(db, "Scores"), where("userId", "==", user.id))
        //const scoresRef = collection(db, "Scores");
        const snapshot = await getDocs(q);

        let leaderboardData = [];
        snapshot.forEach(doc => {
            leaderboardData.push(doc.data());
        });

        // Sort scores in descending order
        leaderboardData.sort((a, b) => b.score - a.score);

        const leaderboardBody = document.getElementById("leaderboard-body");
        leaderboardBody.innerHTML = "";

        leaderboardData.forEach((data, index) => {
            const row = document.createElement("tr");

            let rankClass = "";
            if (index === 0) rankClass = "gold";
            else if (index === 1) rankClass = "silver";
            else if (index === 2) rankClass = "bronze";

            row.innerHTML = `
                <td class="rank ${rankClass}">${index + 1}</td>
                <td>${data.userName}</td>
                <td>${data.quizTitle}</td>
                <td>${data.score}</td>
                <td>${data.totalQues}</td>
                <td>
                    <div class="progress-container">
                        <div class="progress-bar" style="width: ${(data.score / data.totalQues) * 100}%;"></div>
                    </div>
                    ${((data.score / data.totalQues) * 100).toFixed(2)}%
                </td>
            `;

            leaderboardBody.appendChild(row);
        });

        // Show a motivational quote
        showMotivationalQuote();

    } catch (error) {
        console.error("Error fetching leaderboard data:", error);
    }
};


fetchLeaderboard();

window.fetchLeaderboard = fetchLeaderboard
window.authCheck = authCheck;
window.toggleMenu = toggleMenu;
window.showMotivationalQuote = showMotivationalQuote
