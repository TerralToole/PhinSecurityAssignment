require("dotenv").config();
const path = require('path');
const { initializeApp } = require('firebase-admin/app');
const firebase = require("firebase/app");
const admin = require("firebase-admin");
const { uuid } = require('uuidv4');

const accPath = path.join('..', 'adminProfile.json');
const serviceAccount = require(accPath);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

// Initialize Firebase
firebase.initializeApp({
    apiKey: "AIzaSyB7SdwnzumlGGLC1m8gxitFhP_k2XLY460",
    authDomain: "phinsecurity-c88dc.firebaseapp.com",
    databaseURL: "https://phinsecurity-c88dc-default-rtdb.firebaseio.com",
    projectId: "phinsecurity-c88dc",
    storageBucket: "phinsecurity-c88dc.appspot.com",
    messagingSenderId: "299493923518",
    appId: "1:299493923518:web:bb18b9238be76a150b9cef",
    measurementId: "G-CEBM0L7XS6"
});

const db = admin.firestore();

//reference to collection
const docRef = db.collection("todoList");

// get todos
async function getTodos() {
    try {
        const query = await docRef.get();
        let todoList = [];
        query.forEach(doc => todoList.push(doc.data()));

        return todoList;
    } catch (err) {
        console.log(err);
    }
}

//get a todo by id
async function getTodo(idTodo) {
    try {
        let todo;
        const document = await docRef
            .doc(`${idTodo}`)
            .get()
            .then(doc => (todo = doc.data()));

        return todo;
    } catch (error) {
        console.log(error);
    }
}

// add todos
async function addTodo(todoOptions) {
    const theId = uuid();
    const todoData = {
        id: theId,
        title: todoOptions.title,
        completed: false,
    };
    return await docRef.doc(`${theId}`)
        .set(todoData);
}

// delete todos
async function deleteTodo(idTodo) {
    await docRef.doc(`${idTodo}`).delete();
}

//update todos
async function updateTodo(todoId, todoOptions) {
    let todo = await getTodo(todoId);
    todo = {...todo, ...todoOptions };

    console.log(`id: ${todoId}`);
    console.log(`todo:`);
    console.dir(todo)

    return await docRef.doc(`${todoId}`).set(todo);
}

module.exports.getTodos = getTodos;
module.exports.getTodo = getTodo;
module.exports.addTodo = addTodo;
module.exports.deleteTodo = deleteTodo;
module.exports.updateTodo = updateTodo;