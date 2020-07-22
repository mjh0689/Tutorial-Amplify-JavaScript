import Amplify, { API, graphqlOperation } from "@aws-amplify/api";

import awsconfig from "./aws-exports";
import { createTodo } from "./graphql/mutations";
import { deleteTodo } from "./graphql/mutations";
import { createUser } from "./graphql/mutations";
import { listTodos } from "./graphql/queries";
import { listUsers } from "./graphql/queries";
import { onCreateTodo } from "./graphql/subscriptions";


var loggedIn = false;


Amplify.configure(awsconfig);

async function createNewTodo() {
  const todo = {
    name: "Use AppSync",
    description: `Realtime and Offline (${new Date().toLocaleString()})`,
  };

  return await API.graphql(graphqlOperation(createTodo, { input: todo }));
}

async function createNewUser(un, pw) {
  const user = {
    username: un,
    password: pw
  };

  return await API.graphql(graphqlOperation(createUser, { input: user }));
}

async function deleteNewTodo(ID)
{
  const delInput = {
    id : ID
  };

  return await API.graphql(graphqlOperation(deleteTodo, {input : delInput}));
}

async function deleteAll() {
  API.graphql(graphqlOperation(listTodos)).then((evt) => {
      evt.data.listTodos.items.map((todo, i) => {
        deleteNewTodo(`${todo.id}`);
      });
  });
}

async function getData() {
  API.graphql(graphqlOperation(listTodos)).then((evt) => {
    QueryResult.innerHTML = '';
    evt.data.listTodos.items.map((todo, i) => {
      QueryResult.innerHTML += `<p>${todo.name} - ${todo.description}</p>`;
    });
  });
}

const QueryResult = document.getElementById("QueryResult");

const MutationButton = document.getElementById("MutationEventButton");
const MutationResult = document.getElementById("MutationResult");

const MutationButton2 = document.getElementById("MutationEventButton2");
const MutationResult2 = document.getElementById("MutationResult2");

const SubscriptionResult = document.getElementById("SubscriptionResult");

const UserName = document.getElementById("username");
const PassWord = document.getElementById("password");

const UserNameLabel = document.getElementById("usernameLabel");
const PassWordLabel = document.getElementById("passwordLabel");

const LoginForm = document.getElementById("Form1");

const LoginButton = document.getElementById("loginbutton");

var loggedInAs;

LoginButton.addEventListener("click", (evt) => {
  API.graphql(graphqlOperation(listUsers)).then((evt) => {
    evt.data.listUsers.items.map((user, i) => {
        if(UserName.value == `${user.username}` && PassWord.value == `${user.password}` && loggedIn == false)
        {
            loggedInAs = `${user.username}`;
            loggedIn = true;
        }
    })
    if(loggedIn)
    {
        LoginButton.innerText = `Logged In As ${loggedInAs}`;
        
        UserName.remove();
        PassWord.remove();
        
        UserNameLabel.remove();
        PassWordLabel.remove();

        LoginForm.remove();
    }
  })
});

MutationButton.addEventListener("click", (evt) => {
    if(loggedIn)
    {
        createNewTodo().then((evt) => {
            MutationResult.innerHTML += `<p>${evt.data.createTodo.name} - ${evt.data.createTodo.description}</p>`;
            getData();
        });
    }
});

MutationButton2.addEventListener("click", (evt) => {
  if(loggedIn)
  {
    createNewTodo().then((evt) => {
        MutationResult2.innerHTML += `<p>${evt.data.createTodo.name} - ${evt.data.createTodo.description}</p>`;
        getData();
    });
  }
    
});

API.graphql(graphqlOperation(onCreateTodo)).subscribe({
  next: (evt) => {
    const todo = evt.value.data.onCreateTodo;
    SubscriptionResult.innerHTML += `<p>${todo.name} - ${todo.description}</p>`;
  },
});