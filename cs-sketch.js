// Author Information
    // Team Name: Temp
        // Name1 : email
        // Name2 : email
        // Name3 : email
        // Name4 : email

//TODO: Header information (author, description)

// File Information
    // File Name: cs-sketch.js
    /*
        This file contains the functions that handle the validation, encryption,
        display functions, etc. Most of the functionality behind this program
        comes from this file.
    */

//TODO: old text stays on grid after submitting without refresh
//TODO: don't execute with invalid password.
//TODO: ***ENCRYPTION FUNCTION***
//TODO: show encrypted message under prepared message
//TODO: check if decryption works. Should be the same method as encrypt.

var g_canvas = { cell_size:20, wid:40, hgt:20 }; // JS Global var, w canvas size info. //? wid:50 to make grid 5 sections of 8 cells.

function setup() // P5 Setup Fcn
{
    let sz = g_canvas.cell_size;
    let width = sz * g_canvas.wid;  // Our 'canvas' uses cells of given size, not 1x1 pixels.
    let height = sz * g_canvas.hgt;
    createCanvas(width, height);  // Make a P5 canvas.
    draw_grid(25, 8, 'white', 'yellow');
}


// Callback to get Input-box data.
function retrieve_input()
{
    var messageFieldInput = document.getElementById("messageInput").value; // Get data from messageInput box.
    var originalMessageLength = messageFieldInput.length;
    console.log("Original Message Length: " + originalMessageLength);

    let padded_message = pad_message(messageFieldInput); // pad message func call.
    console.log("PADDED MESSAGE: |" + padded_message + "|"); // show padded msg between |

    //? Can turn this into 1 function mixed into pad_message function? return prepared_messsage?
    let block_one = "1" + padded_message.substring(0,7);
    let block_two = "2" + padded_message.substring(7,14);
    let block_three = "3" + padded_message.substring(14,21);
    let block_four = "4" + padded_message.substring(21,27);
    
    //TODO: append the ascii code of length + 32
    //? Not sure if this how this works
    let ascii_length_char = String.fromCharCode(originalMessageLength + 32); // get the ascii code from the length of message + 32.
    // https://www.asciitable.com/

    var prepared_message = block_one + block_two + block_three + block_four + ascii_length_char;

    var passwordFieldInput = document.getElementById("passwordInput").value; // Get data from passwordInput box.
    console.log( "Password inputted = " + passwordFieldInput ); // Show data in F12 Console output.
    let validity = isPasswordValid(passwordFieldInput); // store T/F value whether password follows comprehensive8.
    console.log("Password Valid: " + validity); // output the result of password validity.
    
    // set the formatting for text
    stroke(0);
    fill(255, 0, 0);
    textSize(17);
     // draw the text for each character in message.
    for (i in prepared_message)
    {
        text(prepared_message[i], (8+(i*25)), 20);
    }
}

// Function to check validity of plaintext passwords
function isPasswordValid(plaintext)
{
    // RegEx character sets
    let upper_ptrn = new RegExp("[A-Z]");
    let lower_ptrn = new RegExp("[a-z]");
    let digit_ptrn = new RegExp("[0-9]");
    let symbol_ptrn = new RegExp("[!\"#$%&'()*+,-./:;<=>?@\\[\\]\\\\^_`{|}~]"); // double escape brackets. Triple escape backslash \ to match.
    
    invalid = 0;
    while (invalid == 0) 
    {
        if (plaintext.length != 8) {invalid++; break;} // Check if the length is the correct size. Must be 8.
        
        if (!upper_ptrn.test(plaintext)) {invalid++; break;} // Check if string contains uppercase.
        
        if (!lower_ptrn.test(plaintext)) {invalid++; break;} // Check if string contains lowercase.
        
        if (!digit_ptrn.test(plaintext)) {invalid++; break;} // Check if string contains a digit 0-9
        
        if (!symbol_ptrn.test(plaintext)) {invalid++; break;} // Check if string contains a symbol
        
        break; // passed all tests
    }
    
    return (invalid == 0); // True if valid. False if invalid.
}

// Function to pad message with spaces if length less than 27.
function pad_message(message)
{
    if (message.length == 27) return message; // no padding if 27 chars long

    //? Allow message length of 0?
    message = message + "                          "; // 26 spaces to pad if message is 1 char long. 
    return (message.substring(0,27)); // return the first 27 chars of the string.
}