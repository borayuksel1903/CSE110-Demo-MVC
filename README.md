## Available Scripts

First, clone the repository into your machine:
`git clone https://github.com/borayuksel1903/CSE110-Demo-MVC.git`

Install all dependencies:
`yarn install`

You need connect this app to a database created by you. If you do not have have a firebase database, first you need to create a database on Firebase. 
Then, navigate to project settings (Gear icon right next to 'Project overview' -> Project Settings). From there click on "Service Accounts". Make sure you are on "Node.js", and click on "Generate new Private Key". Put this sdk file into the project repository. Then, navigate to model/tutorModel.js, and on line 5 add the path to the service account where specified. 

Run the code on localhost:3000 with the following command:
`npm start`

Run the server:
`npm run dev`