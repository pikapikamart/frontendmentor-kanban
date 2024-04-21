 
# Frontend Mentor - Kanban task management web app

This is a solution to the [Kanban task management web app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/kanban-task-management-web-app-wgQLt-HlbB). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 


## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [Continued development](#continued-development)
- [Installing the app](#running-the-app)
- [Author](#author)

## Overview

This challenge is all about task management where you can create different boards as well as task that are inside it.

### The challenge
Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Create, read, update, and delete boards and tasks
- Receive form validations when trying to create/edit boards and tasks
- Mark subtasks as complete and move tasks between columns
- Hide/show the board sidebar
- Toggle the theme between light/dark modes
-  **Bonus**: Allow users to drag and drop tasks to change their status and re-order them in a column
-  **Bonus**: Keep track of any changes, even after refreshing the browser (`localStorage` could be used for this if you're not building out a full-stack app)
-  **Bonus**: Build this project as a full-stack application

### Links

Live Site URL: [Live site of the challenge](https://frontendmentor-kanban.vercel.app/)

## My process

Hi! Been a while thanks for looking out this project!

This is my 26th project taken from [frontendmentor](https://www.frontendmentor.io/) and a long overdue project. There's a lot going on like different freelance projects, hackathons, school and just needed to finish those and also my ojt! Sorry for not being active at fem :>>

For this one, I used next.js 13 but using the page router since i'm still not opting on the app router. Next.js has been my go to whenever I build and it is really nice to use.

At first, I intended to use testing on this since I already had test runners setup as well as storybook which is a first for me. I written some test codes for the components but later on just opted out because typescript solves some of those problems that I imagined testing would fixed and oh boy, I should just continue with the tests.

While nearing completing the application, I refactored some structuring of the data and it causes errors on some components and I need to manually test the app again just to see where it created those issues. I did eventually finished it but I should just have stayed with testing even if it is simple.

### Built with

- Semantic HTML5 markup
- Next.js
- React
- Styled Components
- Framer-motion
- Typescript
- react-tracked
- tRPC
- MongoDB / Mongoose


### Continued development

Finishing this project is really nice but I need to make the codebase more structured and the code to be more concise and easy to read.

Right now, there are components and api's which codes are almost duplicate to one another. I am planning to do lots of refactoring on those codes so that it will be more manageable and importantly, reusable without having to sacrifice readability just to adapt.

There are also other places that I want to improve like some dropdowns that needs to be hidden when the user is not interacting on the elements that are inside it. Right now, I don't really know a way and change those and had tried many from the internet but can't do it.

## Running the app

First is to clone this repository to your local machine. After cloning it, `cd` to the project folder and run:
```bash
npm install
```

Then head over to the `.env.local.example` and rename it to just `.env.local`. Inside the file, add your mongodb connection uri so make sure  to have mongodb installed on your end.

Lastly, just run:
  
```bash
npm  run  dev
# or
yarn  dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result and have a try!


Thank you!

## Author

- Website - Well I haven't made my profile portfolio, gonna make it sooon when I know a lot of things.
- Frontend Mentor - [@pikapikamart](https://www.frontendmentor.io/profile/pikapikamart)
- Twitter - [@RaymartPamplona](https://twitter.com/RaymartPamplona)
