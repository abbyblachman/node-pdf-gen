### Node PDF generator

This is a functional command-line application built using Node.js.

The application takes in a user's GitHub repository and their favorite color as input. It uses an axios call to connect to the GitHub API, and pulls more details about the user from their GitHub repository. 

Using the npm package `html-pdf`, it dynamically outputs a PDF containing information about the user's GitHub profile. The PDF's background color will be the color the user entered into the command line prompt. 


## Starting the app locally

Start by installing front and backend dependencies. While in this directory, run the following command:

```
npm install
```

This should install node modules within the server and the client folder.

After both installations complete, run the following command in your terminal:

```
npm start
```

Your app should now be running on <http://localhost:3000>. The Express server should intercept any AJAX requests from the client.

## Deployment (Heroku)

To deploy, simply add and commit your changes, and push to Heroku. As is, the NPM scripts should take care of the rest.

