### Node PDF generator

This is a functional command-line application built using Node.js.

The application takes in a user's GitHub repository and their favorite color as input. It uses an axios call to connect to the GitHub API, and pulls more details about the user from their GitHub repository. 

Using the npm package `html-pdf`, it dynamically outputs a PDF containing information about the user's GitHub profile. The PDF's background color will be the color the user entered into the command line prompt. 

