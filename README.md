# Task-Management

## Description
This application is a task management app made in React with TypeScript, Tailwind CSS, and Persistent Data. For an assessment with BOC bank in Amarillo, TX, USA.

## How To Run:
- Make sure you have Node installed on your device. If not, it can be installed from here https://nodejs.org/en/download/package-manager.
- Then, clone this repo using git clone.
- Launch the terminal at the root of this app and run the command **npm install**. This should install all the dependencies for the project.
- Then, to test it, run ***npm start***. This will launch the application on localhost:3000.
- To build the app for production, run ***npm run build***, which is not needed for this assessment.

## How To Use:
- When you start the application, you will see a left side panel with three pre-defined categories, "Personal", "Work", and "Urgent". Here, select a category to add a Task. Since these categories were supposed to be predefined, they are filtered by default.
  
  ![alt text](https://github.com/sparshrawlani/Task-Management/blob/main/images/select_category.jpg)
  
- After Picking a Category, you can add the task, only the name field is required, others are optional.

  ![alt text](https://github.com/sparshrawlani/Task-Management/blob/main/images/start_adding_task.jpg)

- This is how a task will look like once it gets added.

  ![alt text](https://github.com/sparshrawlani/Task-Management/blob/main/images/added_task.jpg)

- To Add Categories and Sub Categories, add the Category First, then add the sub category by selecting a category for it and entering a name. To see the sub-category and add tasks in it, make sure to **click on the category you just added**.

  ![alt text](https://github.com/sparshrawlani/Task-Management/blob/main/images/subCategory.jpg)
  
- The application uses persistant storage, so try to refresh the page few times at any stage, the data should stay. Also try closing and opening the browser while the application is running.
  
- Play around and you will get the hang of it pretty quick.
