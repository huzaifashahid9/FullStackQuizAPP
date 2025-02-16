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

console.log(supabase);
const supabaseClient = supabase.createClient(
  "https://wdbhldlsgfubhkzzylqg.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkYmhsZGxzZ2Z1Ymhrenp5bHFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk2OTEwNjMsImV4cCI6MjA1NTI2NzA2M30.skGWV9Qe0u-ug45GwIxkaGLnyZBVwHU4cg5eTOuXxLY"
);

// console.log(app,doc,createUserWithEmailAndPassword,signInWithEmailAndPassword,setDoc,getFirestore,getDoc,auth,db);

const email = document.querySelector("#inputEmail");
const pass = document.querySelector("#inputPass");
const name = document.querySelector("#name");
const age = document.querySelector("#age");
const Fname = document.querySelector("#Fname");
const date = document.querySelector("#date");
const picture = document.querySelector("#picture");

// console.log(email,pass,age,name);

const authCheck = () => {
  try {
    const user = localStorage.getItem("Users");
    const data = JSON.parse(user);
    console.log(data);
    if (data.type === "Admin") {
      window.location.replace("../../Admin/Dashboard/Dashboard.html");
    } else if (data.type === "user") {
      window.location.replace("../../User/Dashboard/dashboard.html");
    }
  } catch (error) {
    console.log(error.message);
    //alert(error.code);
  }
};

const creating = async () => {
  console.log("Hello");
  try {
    if (!email.value || !pass.value) {
      alert("Please Enter Email or password");
      return;
    }
    if (!name.value || !age.value) {
      alert("Please Enter Name or Age");
      return;
    }

    if (!Fname.value || !date.value) {
      alert("Please Enter Fname or Date");
      return;
    }

    const response = await createUserWithEmailAndPassword(
      auth,
      email.value,
      pass.value
    );
    console.log(response);
    const id = response.user.uid;
    console.log(id);

    const file = picture.files[0];
    console.log(file);
    const { data, error } = await supabaseClient.storage
      .from("profilepics")
      .upload(file.name + new Date().getMilliseconds(), file);
    console.log("data", data);
    console.log("error", error);

    const { data: url } = supabaseClient.storage
      .from("profilepics")
      .getPublicUrl(data.path);

    console.log("URL", url);

    await setDoc(doc(db, "myUsers", id), {
      Name: name.value,
      age: age.value,
      email: email.value,
      pass: pass.value,
      fName: Fname.value,
      date: date.value,
      picUrl : url,
      type: "user", // user/admin
      isBlock: false,
      isDeleted: false,
    });
    alert("Account Created Succesfully");
    window.location.href = "../../index.html";
  } catch (error) {
    console.log(error.message);
    alert(error.code);
  }
};

window.creating = creating;
window.authCheck = authCheck;
