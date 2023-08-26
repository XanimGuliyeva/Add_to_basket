import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-eeae8-default-rtdb.europe-west1.firebasedatabase.app/"
}


const app = initializeApp(appSettings);
const dataBase = getDatabase(app);
const booksInDB = ref(dataBase,"bookStore")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

addButtonEl.addEventListener('click',function(){
    if(inputFieldEl.value){
        let inputValue = inputFieldEl.value
        push(booksInDB,inputValue)
        clearInputFieald()
    }
    else {
        shoppingListEl.innerHTML = "Add an item"
    }
})

onValue(booksInDB,function(snapshot){
    if(snapshot.exists()){
        let booksArray = Object.entries(snapshot.val())
        
        clearShoppingList();
        
        for(let i=0;i<booksArray.length;i++){
            let currentVal = booksArray[i]
            appendToBookList(currentVal)
        }
    }
    else {
        shoppingListEl.innerHTML = "No items here... yet"
    }
})

function clearShoppingList(){
    shoppingListEl.innerHTML = ""
}
function clearInputFieald(){
    inputFieldEl.value = ""
}

function appendToBookList(item){
    let id = item[0];
    let value = item[1]
    
    const li = document.createElement("li")
    li.textContent = value
    
    li.addEventListener('click',function(){
        let exactLocationInDB = ref(dataBase,`bookStore/${id}`)
        remove(exactLocationInDB)
    })
    
    shoppingListEl.append(li)
}