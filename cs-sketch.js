// cs-sketch.js; P5 key animation & input fcns.  // CF p5js.org/reference
// Time-stamp: <2021-09-28 16:54:18 Chuck Siska>

// Make global g_canvas JS 'object': a key-value 'dictionary'.
var g_canvas = { cell_size:20, wid:32, hgt:24 }; // JS Global var, w canvas size info.

function setup() // P5 Setup Fcn
{
    let sz = g_canvas.cell_size;
    let width = sz * g_canvas.wid;  // Our 'canvas' uses cells of given size, not 1x1 pixels.
    let height = sz * g_canvas.hgt;
    createCanvas(width, height);  // Make a P5 canvas.
    draw_grid(20, 20, 'white', 'blue');
}

// Callback to get Input-box data.
function retrieve_input()
{
    var messageFieldInput = document.getElementById("messageInput").value; // Get data from messageInput box.
    var passwordFieldInput = document.getElementById("passwordInput").value; // Get data from passwordInput box.

    console.log( "Password inputted = " + passwordFieldInput ); // Show data in F12 Console output.
    let validity = isPasswordValid(passwordFieldInput); // store T/F value whether password follows comprehensive8.
    console.log("Password Valid: " + validity); // output the result of password validity.

    stroke(0);
    fill(255, 0, 0);
    textSize(15);
    for (i in messageFieldInput)
    {
        text(messageFieldInput[i], (6+(i*20)), 15);
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