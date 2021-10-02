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
    //? Allow msg length of 0?
    var orig_msg_length = messageFieldInput.length;
    console.log("Original Message Length: " + orig_msg_length);

    //!
    //? Alert box or show html | could also turn this into a function.
    var error = document.getElementById("msgError");
    if (orig_msg_length == 0) {
        error.textContent = "Please enter a message";
        error.style.color = "red";
        //alert("Please enter a message.");
        return;
    } else {error.textContent = "";}
    //!

    var prepared_message = prepareMessage(messageFieldInput, orig_msg_length); // prepare msg func call.
    console.log("PREPARED MESSAGE: |" + prepared_message + "|"); // show prepared msg between |

    var pw_field_input = document.getElementById("passwordInput").value; // Get data from passwordInput box.
    console.log( "Password inputted = " + pw_field_input ); // Show data in F12 Console output.
    let validity = isPasswordValid(pw_field_input); // store T/F value whether password follows comprehensive8.
    console.log("Password Valid: " + validity); // output the result of password validity.

    //!
    error = document.getElementById("pwError");
    if (!validity) {
        error.textContent = "Please enter a valid password";
        error.style.color = "red";
        //alert("Please enter a valid password.");
        return;
    } else {error.textContent = "";}
    //!

    // set the formatting for text
    stroke(0);
    fill(255, 0, 0);
    textSize(17);
     // draw the text for each character in prepared_message.
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
function prepareMessage(message, length)
{
    if (message.length < 27) {message = (message + "                          ").substring(0,27);}

    // now prepare the message
    let block_one = "1" + message.substring(0,7);
    let block_two = "2" + message.substring(7,14);
    let block_three = "3" + message.substring(14,21);
    let block_four = "4" + message.substring(21,27);

    //TODO: append the ascii code of length + 32
    //? Not sure if this how this works
    let ascii_length_char = String.fromCharCode(length + 32); // get the ascii code from the length of message + 32.
    // https://www.asciitable.com/

    return (block_one + block_two + block_three + block_four + ascii_length_char);
}