THIS APP USES A LOCALLY DEPLOYED BACKEND SERVER WITH MONGO DB - AS SUCH YOU NEED TO SET UP A LOCAL DATABASE WITH MONGO DB FOR THIS APP TO FUNCTION.
  (Check the repository for a video demo of the app)
  
  
 
STEPS TO RUN LOCALLY:


1: Create an empty folder, and then initialize a git repository. Connect to the master branch of this repository, and pull.

2: Once you have pulled from the repository, in the main project folder, run the command: "npm i express dotenv mongoose". This installs the dependencies needed 
for the app to run. You should have a node_modules folder showing up in the main project folder.

3: If you haven't, create a MongoDB account and create a new project using MongoDB atlas @ https://cloud.mongodb.com/ , and create a new database cluster within the project (Or use an existing cluster).
	Here is a tutorial to do so: https://www.youtube.com/watch?v=0Pt7Kfh78Jg&ab_channel=FreelancingCult

4: Create a new database within the cluster by navigating to the Collections tab, and clicking Add My own Data, or the create database button ( if you have already created a cluster.

5: To get the connection string, navigate to the Overview tab within the cluster and click connect on the far right, which should bring up a page with 3 options. Choose the one
that says connect to application.

6: Copy the connection string shown.

7: Back in your project folder, create a new file named .env in the main directory.

8: Within the .env folder, create 3 variables:

	NODE_ENV = development

	PORT = 5000 (this can be whatever you want)

	MONGO_URI = (the copied connection string)


9: Modify the MONGO_URI variable so that: 
	Instead of <password>, it is your MongoDB password (special chars must be URL encoded)
	Place your database name within the string like so: .mongodb.net/<database name>?retryWrites=true&w=majority.
	
	The string should look something like this: 
	MONGO_URI = mongodb+srv://Matt_Sardinha:MyTestPassword@cluster0.r660b.mongodb.net/My_Database_name?retryWrites=true&w=majority



10: Now the backend should be configured to run. Change directory into the backend folder and run the command: "npm start" . You should get a "server started" message in the console.
	If you have problems, check to make sure you don't have any errors within your MongoDB connection string and that your username/password/database names are all correctly inputted.


11: In a new terminal, change directory into the frontend folder and run npm install.

12: Once that command finishes, from the frontend directory run the command: "npm start". 


13: This should start the web application. To get started, try and add some ingredients that you have stocked, to start creating meals and then adding them to your daily meals to get a semi accurate tracking of your calories ingested during the day.
