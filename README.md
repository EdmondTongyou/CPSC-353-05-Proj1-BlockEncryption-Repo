CPSC 335-03 Algorithm Engineering
Project-1 Lark's Ant
Team: 
  Suffering IRL = Spencer DeMera, Edmond Tongyou, Joshua Elmer, Kevin La, Abhinav Arora

Intro:
  - This project draws a grid and runs an invisible bot from cell to cell on the grid. As the bot moves it randomly changes the colors of the previously entered cell. When it reaches a cell with a color it completes an action (turn left/right or goes striaght for a designated amount of time) based on the color it touches.

Zip Contents:
  File README.txt. This file.
  File index.html. Main HTML file and Front-End of project.
  File styles.css. Main CSS file.
  File drawing.js. Includes basic P5 drawing utilies functions.
  File sketching.js. Includes all user defined functions for I/O, ant control and logic, and various 
      supporting functions / controls.
  File p5.js. P5.js Library file.

Setup and Installation:
  1. Extract the .zip file into a (new) folder.
  2. Drag the index.html file into a web broswer window. 
      2a. The P5 program should start immediately and draw a 600x400 grid and begin moving our bot.

Sample Invocation / Credits:
  - Some code was borrowed and modified from Professor Siska's original example project. 
  - P5.js : https://p5js.org/

Features:
  - This project uses HTML/CSS, Javascript, and the P5.js library.
  - The P5.js library is crucial because it allows for ease of drawing the grid and bot functions.

Known Bugs / Issues:
 -- Warnings:
    - When going straight as yellow, it might turn around and quickly over paint itself so it appears as if it is going straight much further than it should be.
    
