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
    // get msg input
    var messageFieldInput = document.getElementById("messageInput").value; // Get data from messageInput box.
    var orig_msg_length = messageFieldInput.length;

    // Display error message and exit func if no msg.
    if (orig_msg_length == 0) {
        show_error("msgError", "Please enter a message.");
        return; // don't execute rest of code if error.
    } else {
        show_error("msgError", ""); // clear txt if msg input fixed.
    }

    var prepared_message = prepareMessage(messageFieldInput, orig_msg_length); // prepare msg func call.
    console.log("Prepared MSG: " + prepared_message);

    // get pw input
    var pw_field_input = document.getElementById("passwordInput").value; // Get data from passwordInput box.
    let validity = isPasswordValid(pw_field_input); // store T/F value whether password follows comprehensive8.

    // Display error message and exit func if invalid pw.
    if (!validity) {
        show_error("pwError", "Please enter a valid password.");
        return;
    } else {
        show_error("pwError", ""); // clear txt if pw input fixed.
    }

    // set the formatting for text
    stroke(0);
    fill(255, 0, 0);
    textSize(17);
    // draw the text for each character in prepared_message.
    for (i in prepared_message)
    {
        text(prepared_message[i], (8+(i*25)), 20);
    }

    var encoded_msg = encrypt(prepared_message, pw_field_input);
    console.log("Encoded message: " + encoded_msg);

    for (i in encoded_msg) {
        text(encoded_msg[i], (8+(i*25)), 42);
    }

    var hook = document.getElementById("encodedMsg");
    hook.textContent = "Encoded message: " + encoded_msg;
    hook.style.color = "blue";
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

// Function to pad message with spaces and prepare str to encode.
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

// function to encode a single character with a single pw character.
function single_encrypt(msgChar, pwChar)
{
    // first 4 chars of message -> 1st char of password etc.
    let ax = msgChar;
    let px = pwChar;

    ax = ax.charCodeAt(0) - 32;
    px = px.charCodeAt(0) - 32;
    //console.log("ax: " + ax + " | px: " + px);

    let bx = (ax ^ px); // bitwise XOR on ax and px
    //console.log("bx: " + bx);
    let cx = bx + 32;
    //console.log("cx: " + cx);
    return String.fromCharCode(cx); // returns the character from ascii code.
}

// function to encode an entire 32 character string with a 8 char long pw.
function encrypt(message, password) 
{
    let indexC = 0;
    let cap = 0;
    let final_str = "";
    for (var p of password) {
        //console.log("P CHAR: " + p);
        while (cap < 4) { // Change the password character to encode with every 4 characters.
            //console.log("MESSAGE CHAR: " + message[indexC]);
            //console.log(single_encrypt(message[indexC], p));
            final_str = final_str.concat(single_encrypt(message[indexC], p));
            indexC++;
            cap++;
        }
        cap = 0;
    }
    //console.log("FINAL MESSAGE: ||" + final_str + "||");
    //console.log("FINAL LEN: " + final_str.length);
    return final_str; // the encoded message in a string.
}

function show_error(elem_id, msg)
{
    var error = document.getElementById(elem_id);
    error.textContent = msg;
    error.style.color = "red";
    return;
}