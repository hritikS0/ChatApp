import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, set, remove, onChildAdded, onChildRemoved } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import { getFirestore, collection, addDoc, getDocs, onSnapshot, query, orderBy } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
const firebaseConfig = {
apiKey: "AIzaSyAgI4VQ0yUlcJOm_X7OHkeQ9L3BVlW1wyc",
authDomain: "app-application-f73b9.firebaseapp.com",
databaseURL: "https://app-application-f73b9-default-rtdb.firebaseio.com",
projectId: "app-application-f73b9",
storageBucket: "app-application-f73b9.appspot.com",
messagingSenderId: "127997162999",
appId: "1:127997162999:web:69da92f7a4c8b02631aaf2",
measurementId: "G-VEWJTWJ710"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const createRoomForm = document.getElementById('create-room-form');

// variables
var msgTxt = document.getElementById('msgTxt');
var sender;
if(sessionStorage.getItem('sender')){
    sender = sessionStorage.getItem('sender');
} else {
    sender = prompt('PASSWORD');
    sender = prompt('Please Enter Your Username')
    sessionStorage.setItem('sender',sender);
}

// TO SEND MESSAGES
module.sendMsg = function sendMsg(){
    var msg = msgTxt.value;
    var timestamp = new Date().getTime();
    set(ref(db,"messages/"+timestamp),{
        msg : msg,
        sender : sender
    })

    msgTxt.value="";
}

// TO RECEIVE MSG
onChildAdded(ref(db,"messages"), (data)=>{
    if(data.val().sender == sender){
        messages.innerHTML += "<div style=justify-content:end class=outer id="+data.key+"><div id=inner class=me>you : "+data.val().msg+"<button id=dltMsg onclick=module.dltMsg("+data.key+")>DELETE</button></div></div>";
    } else {
        messages.innerHTML += "<div class=outer id="+data.key+"><div id=inner class=notMe>"+data.val().sender+" : "+data.val().msg+"</div></div>";
    }
})

// TO DELETE MSG
module.dltMsg = function dltMsg(key){
    remove(ref(db,"messages/"+key));
}

// WHEN MSG IS DELETED
onChildRemoved(ref(db,"messages"),(data)=>{
    var msgBox = document.getElementById(data.key);
    messages.removeChild(msgBox);
})