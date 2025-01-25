import {
  app,
  doc,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  setDoc,
  getDoc,
  auth,
  db,
} from "../../firebase.js";

console.log(app);

// console.log(app,doc,createUserWithEmailAndPassword,signInWithEmailAndPassword,setDoc,getFirestore,getDoc,auth,db);

const email = document.querySelector("#inputEmail");
const pass = document.querySelector("#inputPass");

const authCheck = () =>{
  try {
    const data = localStorage.getItem("Users")
    if(data.type === "Admin"){
      window.location.replace("../../Admin/Dashboard/Dashboard.html");
    }else if(data.type === "user"){
      window.location.replace("../../User/Dashboard/dashboard.html")
    }
  } catch (error) {
    console.log(error.message);
    //alert(error.code);
  }
}

const loginHandle = async () => {
  console.log("hello");
  try {
    if (!email.value || !pass.value) {
      alert("Please Enter Email or password");
      return;
    }
    const response = await signInWithEmailAndPassword(
      auth,
      email.value,
      pass.value
    );
    console.log(response);
    const id = response.user.uid;
    console.log(id);
    
    const data  = await getDoc(doc(db, "myUsers", id));
    console.log(data.data());
    
    
    const userData = {
      ...data.data(),
      id
    }

    localStorage.setItem("Users",JSON.stringify(userData));

    alert("Account Login Successfully");

    if(data.data().type === "Admin"){
      window.location.replace("../../Admin/Dashboard/Dashboard.html");
    }else{
      window.location.replace("../../User/Dashboard/dashboard.html")
    }
    
    
    // const uid = localStorage.setItem("Uid", id);
    // const userData = await getDoc(doc(db, "myUsers", id));
    // console.log(userData.data());

  } catch (error) {
    console.log(error.message);
    alert(error.code);
  }
};




window.loginHandle = loginHandle
window.authCheck = authCheck