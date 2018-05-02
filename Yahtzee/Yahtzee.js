// JavaScript source code
$(document).ready(function () {
    d = new Array(0, 0, 0, 0, 0); //array for random numbers 1 through 6
    opened = new Array(true, true, true, true, true); //f[0] true means dice will roll else no roll
    var count = 0; //determines how many rolls there have been
    var score;
    var finalScore = 0;
    var bonus = 0;

    $(".roll").on("click", roll);
    function roll() { //rolls dice
        count++; //adds 1 to count
        if (count <= 3) { //if the count is less than 3
            for (var i = 0; i < 5; i++) { //if dice iss clicked, don't roll
                if (opened[i]) { //roll if dice are not clicked
                    d[i] = Math.floor(Math.random() * 6) + 1; //generate random number 1 through 6
                    $("#d" + i).attr("src", "dice" + d[i] + ".gif"); //display the dice for face value
                }
            }
        } else {
            count = 0; //reset count
            opened = new Array(true, true, true, true, true); //reset dice to true
            for (var i = 0; i < 5; i++) { //resets the visible dice
                $("#d" + i).attr("src", "dice0.gif");
            }
        }
    }

    $("img").click(function () { //change the image to appeared unclickable
        var num = $(this).attr("id").substr(1); //gets the id value for that box (1-6)
        opened[num] = !opened[num]; //if the dice is clicked, disable its ability to roll
        if (opened[num]) { //if it is not clicked, the die is blue
            $("#d" + num).attr("src", "dice" + d[num] + ".gif");
        } else { //if the die is clicked, the die is purple
            $("#d" + num).attr("src", "diceX" + d[num] + ".gif");
        }
    });

    //enter total area and it will display tallied count
    $("td.total1").on("mouseenter", numEnter);
    function numEnter() { //enter area
        var n = parseInt($(this).attr("id").substr(1)); //get the id number (1-6)
        score = 0; //set score to 0
        for (var i = 0; i < 5; i++) { //calculate score
            if (d[i] == n) {
                score += n;
            }
            $("#c" + n).text(score);
        }
    };

    //will remove text when leaving area
    $("td.total1").on("mouseleave", numLeave);
    function numLeave() { //function to show blank space if not clicked
        var n = parseInt($(this).attr("id").substr(1));
        $("#c" + n).text("");
    };

    //when total1 area is clicked
    $("td.total1").on("click", totalNum);
    function totalNum() {
        var n = parseInt($(this).attr("id").substr(1));
        $("#c" + n).text(score);
        $("#c" + n).off("mouseenter"); //turns off mouseeenter event for that text box
        $("#c" + n).off("mouseleave"); //turns off mouseleave event for that text box
        $("#c" + n).off("click"); //turns off click event for that text box
        bonus += score; //add score to bonus 
        finalScore += score; //add to total score
        reset();
    };


    //enter score if 3 of a kind, 4 of a kind, or Yahtzee!
    $("td.total2").on("mouseenter", kindEnter);
    function kindEnter() {
        var s = d.slice();
        s.sort();
        score = 0;
        var n = parseInt($(this).attr("id").substr(4));
        var total = 1;
        for (var i = 0; i < 4; i++) {
            var sec = i + 1; 
            if (s[sec] == s[i]) {
                total += 1; //tally how many duplicates there are
            } else {
                total = total;
            }
        }
        //determine if there is a three of a kind or 4 of a kind
        if ((total >= n) && ((s[1] == s[3]) || ((s[0] == s[2]) || (s[2] == s[4])) || ((s[0] == s[3]) || (s[1] == s[4])))) {
            score = s[0] + s[1] + s[2] + s[3] + s[4]; //totals all dice and adds to score
            $("#kind" + n).text(score);
        } else {
            $("#kind" + n).text(score); //else score is 0
        }
    };

    //leave 3 of a kind, 4 of a kind
    $("td.total2").on("mouseleave", kindLeave);
    function kindLeave() {
        var n = parseInt($(this).attr("id").substr(4)); //sets n to determine if box is 3 or 4 of a kind
        $("#kind" + n).text("");
    };

    //get for loop to get the kind number then create if statement to compare
    //when 3 of a kind or 4 of a kind is chosen
    $("td.total2").on("click", kind);
    function kind() {
        var n = parseInt($(this).attr("id").substr(4));
        if ((n >= 3) && (n < 5)) { //if 3 or 4 of a kind
            $("#kind" + n).text(score); 
            $("#kind" + n).off("mouseenter"); //turns off mouseeenter event for that text box
            $("#kind" + n).off("mouseleave"); //turns off mouseeleave event for that text box
            $("#kind" + n).off("click"); //turns off click event for that text box
            finalScore += score; //add score to total score
        }
        reset();
    };

    //yahtzee functions
    $("#yahtzee").on("mouseenter", yahtzeeEnt);
    function yahtzeeEnt() {
        var s = d.slice();
        s.sort();
        score = 0;
        var total = 1;
        for (var i = 0; i < 4; i++) {
            var sec = i + 1;
            if (s[sec] == s[i]) {
                total += 1; //increment if two dice are the same
            }
        }
        if ((total == 5) && (s[0] != 0)) { //if there are 5 of a kind and no dice are set to zero
            score = 50; //set score to 50 
            $("#yahtzee").text(score);
        } else {
            $("#yahtzee").text(score); //show 0 if no yahtzee
        }
    }

    $("#yahtzee").on("mouseleave", yahtzeeLeave);
    function yahtzeeLeave() {
        $("#yahtzee").text("");
    }

    $("#yahtzee").on("click", yahtzee);
    function yahtzee() {
        $("#yahtzee").text(score);
        $("#yahtzee").off("mouseenter"); //turns off mouseeenter event for that text box
        $("#yahtzee").off("mouseleave"); //turns off mouseleave event for that text box
        $("#yahtzee").off("click"); //turns off click event for that text box
        finalScore += score; //add score to finalScore
        reset();
    }

    //full house functions
    $("#full").on("mouseenter", fullEnter);
    function fullEnter() {
        var s = d.slice(); //copy of array d
        s.sort(); //sort copied array
        score = 0; //set score to 0

        if ((s[0] == s[1] && s[0] == s[2] && s[3] == s[4] && s[2] != s[3])) { //if 3 of a kind and 2 of a kind
            score = 25; //score will be 25
            $("#full").text(score); //display score 
        } else if ((s[0] == s[1] && s[2] == s[3] && s[2] == s[4] && s[1] != s[2])) {
            score = 25; //score will be 25
            $("#full").text(score); //display score 
        } else {
            $("#full").text(score); //display 0 if false
        }
    };

    $("#full").on("mouseleave", fullLeave);
    function fullLeave() { //leave full house
        $("#full").text(""); //leave text area blank
    };

    //when full house is chosen
    $("#full").on("click", full);
    function full() {
        $("#full").text(score); //display score
        $("#full").off("mouseenter"); //turns off mouseenter event for that text box
        $("#full").off("mouseleave"); //turns off mouseleave event for that text box
        $("#full").off("click"); //turns off click event for that text box
        finalScore += score; //add score to final score
        reset();
    };

    //small straight functions
    $("#smallStr").on("mouseenter", SmallStrEnt);
    function SmallStrEnt() {
        var s = d.slice();
        s.sort();
        var tally = 0; //set tally to 0
        for (var i = 0; i < 4; i++) {
            var diff = s[i + 1] - s[i];
            if (diff == 1) {
                tally += 1; //increment tally if 2 neighboring dice have a difference of 1
            }
        }
        if (tally >= 3) { //if tally is three
            score = 30;
        } else {
            score = 0;
        }
        $("#smallStr").text(score);
    };

    //leave small straight empty when text box is left unclicked
    $("#smallStr").on("mouseleave", SmallStrLeave);
    function SmallStrLeave() {
        $("#smallStr").text("");
    };

    //display small straight score when clicked
    $("#smallStr").on("click", SmallStr);
    function SmallStr() {
        $("#smallStr").text(score);
        $("#smallStr").off("mouseenter"); //turns off mouseenter event for that text box
        $("#smallStr").off("mouseleave"); //turns off mouseleave event for that text box
        $("#smallStr").off("click"); //turns off click event for that text box
        finalScore += score; //add score to total score
        reset();
    };

    //large straight functions
    $("#largeStr").on("mouseenter", LStrEnt);
    function LStrEnt() {
        var s = d.slice();
        s.sort();
        var tally = 0; //set tally to zero
        for (var i = 0; i < 4; i++) {
            var diff = s[i + 1] - s[i];
            if (diff == 1) {
                tally += 1; //increment if neighboring dice have a difference of one
            }
        }
        if (tally == 4) { //if tally is 4 then large straight
            score = 40;
        } else {
            score = 0; //else score is zero
        }
        $("#largeStr").text(score); //display score
    };

    $("#largeStr").on("mouseleave", LStrLeave);
    function LStrLeave() {
        $("#largeStr").text("");
    };

    //
    $("#largeStr").on("click", LStraight);
    function LStraight() {
        $("#largeStr").text(score);
        $("#largeStr").off("mouseenter"); //turns off mouseenter event for that text box
        $("#largeStr").off("mouseleave"); //turns off mouseleave event for that text box
        $("#largeStr").off("click"); //turns off click event for that text box
        finalScore += score; //add score to final score
        reset();
    };

    //chance functions
    $("#chance").on("mouseenter", chanceEnt);
    function chanceEnt() {
        score = d[0] + d[1] + d[2] + d[3] + d[4]; //adds all the dice together
        $("#chance").text(score); //displays score
    }; 

    $("#chance").on("mouseleave", chanceLeave);
    function chanceLeave() {
        $("#chance").text("");
    };

    //when chance is clicked
    $("#chance").on("click", chance);
    function chance() {
        $("#chance").text(score);
        $("#chance").off("mouseenter"); //turns off mouseenter event for that text box
        $("#chance").off("mouseleave"); //turns off mouseleave event for that text box
        $("#chance").off("click"); //turns off click event for that text box
        finalScore += score; //add score to final score
        reset();
    };

    $("#total").on("mouseenter", finEnter);
    function finEnter() {
        $("#total").text(finalScore); //show total score
    }

    $("#total").on("mouseleave", finLeave);
    function finLeave() {
        $("#total").text("");
    }

    $("#total").on("click", finish);
    function finish() {
        if (bonus >= 63) { //if the lower half scoring totals 63 or more
            finalScore += 35; // add 35 to total score
        }
        //set of commands to turn off mouseenter, mouseleave, and click events for all boxes even if not filled
        $("#total").text(finalScore);
        $("#total").off("mouseenter");
        $("#total").off("mouseleave");
        $("#total").off("click");
        $("#full").off("mouseenter");
        $("#full").off("mouseleave");
        $("#full").off("click");
        $("#smallStr").off("mouseenter");
        $("#smallStr").off("mouseleave");
        $("#smallStr").off("click");
        $("#largeStr").off("mouseenter");
        $("#largeStr").off("mouseleave");
        $("#largeStr").off("click");
        $("#chance").off("mouseenter");
        $("#chance").off("mouseleave");
        $("#chance").off("click");
        $("#yahtzee").off("mouseenter");
        $("#yahtzee").off("mouseleave");
        $("#yahtzee").off("click");
        $(".roll").off("click");
        for (var i = 1; i <= 6; i++) {
            $("#c" + i).off("mouseenter");
            $("#c" + i).off("mouseleave");
            $("#c" + i).off("click");
        }
        for (var i = 3; i <= 4; i++) {
            $("#kind" + i).off("mouseenter");
            $("#kind" + i).off("mouseleave");
            $("#kind" + i).off("click");
        }
        $("#message").text("Game Over. Play again?"); //display a game over message
    };

    //function to reset the arrays and number of rolls after a box is clicked
    function reset() {
        $("img").attr("src", "dice0.gif");
        count = 0;
        opened = new Array(true, true, true, true, true);
        d = new Array(0, 0, 0, 0, 0);
    }

    //function to turn on all mouse events for a new game and sets all boxes to appear empty
    function activate() {
        for (var i = 1; i <= 6; i++) {
            $("#c" + i).text("");
            $("#c" + i).on("mouseenter", numEnter);
            $("#c" + i).on("mouseleave", numLeave);
            $("#c" + i).on("click", totalNum);
        }
        for (var i = 3; i <= 4; i++) {
            $("#kind" + i).text("");
            $("#kind" + i).on("mouseenter", kindEnter);
            $("#kind" + i).on("mouseleave", kindLeave);
            $("#kind" + i).on("click", kind);
        }
        $("#full").text("");
        $("#full").on("mouseenter", fullEnter);
        $("#full").on("mouseleave", fullLeave);
        $("#full").on("click", full);
        $("#smallStr").text("");
        $("#smallStr").on("mouseenter", SmallStrEnt);
        $("#smallStr").on("mouseleave", SmallStrLeave);
        $("#smallStr").on("click", SmallStr);
        $("#largeStr").text("");
        $("#largeStr").on("mouseenter", LStrEnt);
        $("#largeStr").on("mouseleave", LStrLeave);
        $("#largeStr").on("click", LStraight);
        $("#chance").text("");
        $("#chance").on("mouseenter", chanceEnt);
        $("#chance").on("mouseleave", chanceLeave);
        $("#chance").on("click", chance);
        $("#yahtzee").text("");
        $("#yahtzee").on("mouseenter", yahtzeeEnt);
        $("#yahtzee").on("mouseleave", yahtzeeLeave);
        $("#yahtzee").on("click", yahtzee);
        $("#total").text("");
        $("#total").on("mouseenter", finEnter);
        $("#total").on("mouseleave", finLeave);
        $("#total").on("click", finish);
        $(".roll").on("click", roll);
    }

    //function to restart the game and set everything back to zero
    $("#restart").click(function () {
        reset(); //call function to reset arrays and number of rolls
        score = 0
        finalScore = 0;
        bonus = 0; 
        activate(); //call function to turn all mouse event on for boxes
        $("#message").text(""); //remove game over message
    });
});
