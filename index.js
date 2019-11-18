// installing npm packages and defining global variables 
const axios = require("axios");
const inquirer = require("inquirer");
const pdf = require('html-pdf');
var options = { format: 'Letter' };


// using inquirer package to give user specific command-line prompts that will be variables used to generate output
inquirer
  .prompt([{
    message: "Enter your GitHub username:",
    name: "username"
  },
  {
    type: "input",
    message: "What is your favorite color?",
    name: "color"
  }]) 
  // using .then statement 
  .then(function(response) {
    const queryUrlOne = `https://api.github.com/users/${response.username}/repos`
    // using axios call to connect with GitHub API 
    // returning number of combined stars for users GitHub repos 
    axios.get(queryUrlOne).then(function(response) {
      return response.data.reduce((acc, curr) => {
        acc += curr.stargazers_count;
        return acc;
      }, 0);
      // passing `acc` so it can be used in the next .then block 
    }).then(acc => {
    // using axios call to connect with GitHub api. This links to a JSON file that displays info about user's profile. Username variable is from inquirer prompt
    const queryUrl = `https://api.github.com/users/${response.username}`;
    axios.get(queryUrl).then(async function(res) {
      // defining variables from axios response 
      const colorName = response.color;
      const profileImg = res.data.avatar_url;
      const userName = res.data.login;
      const profileUrl = res.data.html_url;
      const userBlog = res.data.blog;
      const userBio = res.data.bio;
      const publicRepos = res.data.public_repos;
      const followers = res.data.followers;
      const following = res.data.following;
      const userLocation = res.data.location;
      //passing variables into HTML string 
      return htmlStr = `
      <!DOCTYPE html>
<html lang="en">
<head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Document</title>
      
</head>
<style>
    .img {
        height: 50px;
        width: 50px;
    }
    .body {
        background-color: ${colorName}; 
        font-family: Georgia;
        padding: 10px;
    }
    .center {
      text-align: center;
    }
    .left {
      text-align: left; 
      font-size: 14px;
    }
    .username {
      color: white;
      font-weight: bold; 
    }
</style>
<body class="body">
      <div class="center">
        <img class="img" src="${profileImg}">
      <div>
      <div class="center">
        <div>Welcome to <span class="username">${userName}</span>'s GitHub info doc.</div>
        <div><a href="${profileUrl}">Click here</a> to visit ${userName}'s GitHub profile.</div>
    </div>
    <div class="left">
      <h3>About <span class="username">${userName}</span>: </h3>
      <div>Location: <a href="https://www.google.com/maps/place/${userLocation}">${userLocation}</a></div>
      <div>Personal blog: <a href="https://${userBlog}">click here.</a></div>
      <div>Bio: ${userBio}</div>
    </div>
    <div class="left">
    <h3>About <span class="username">${userName}</span>'s GitHub profile: </h3>
    <div>Number of public repositories: ${publicRepos} </div>
    <div>Number of followers: ${followers} </div>
    <div>Number following: ${following} </div>
    <div>Number of GitHub stars: ${acc}</div>
    </div>
</body>
</html>
`;
    })
    // passing HTML string variable into next .then, outputting pdf file using `html-pdf` package 
    .then(htmlStr => {
 
    pdf.create(htmlStr, options).toFile('./file.pdf', function(err, res) {
      if (err) return console.log(err);
      console.log(res); // { filename: '/app/businesscard.pdf' }
    })
        
    });
  })
})

