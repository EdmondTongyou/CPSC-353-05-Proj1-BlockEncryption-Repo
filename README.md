CPSC 353-05 Introduction to Computer Security
Project-1 Block Encryption
Team: 
  C.U.H. = Edmond Tongyou, Clemente Solorio, Chukwudi Ikem, Daniel Lopez

Intro:
  - This project takes a string submitted by the user and encrypts it given a password which meets the comprehensive8 guidelines. The original and encrypted string are then    
    displayed on a grid via html

Zip Contents:
  File README.txt. This file.
  File index.html. Main HTML file and Front-End of project.
  File styles.css. Main CSS file.
  File cs-sketch.js. Includes all logic used for encryption as well as the display functions.
  File p5.js. P5.js Library file.

Setup and Installation:
  1. Extract the .zip file into a (new) folder.
  2. Drag the index.html file into a web broswer window. 

Sample Invocation / Credits:
  - P5.js : https://p5js.org/

Features:
  - This project uses HTML/CSS, Javascript, and the P5.js library.
  - The P5.js library is crucial because it allows for ease of drawing the grid.

Known Bugs / Issues:
    Warnings:
    - According to guidelines of the project, there is no need to decrypt from an encrypted message thus implimentation of it through the use of the encrypted string as a new 
      original string with the same password used to encrypt the string will not work
