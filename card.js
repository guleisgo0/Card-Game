var userStats = {};
var deck = [[],[],[]];
var player1Turn = true;
var canMoveOn = false;
var numberOfDrawnCards = 0;
var cardNums = [10,10,10];
var usedCards = [[],[],[]];
var userAccounts = {};
var finalcalc = true;

function pageLoad()
{
  gameStart();
  document.addEventListener('click', clickEvent);
}
function toggleButtons()
{
   var buttonz = document.getElementById("buttonz");
   var nameTags = document.getElementById("nameTags");

  if(buttonz.style.display === "inline")
  {
    buttonz.style.display = "none";
    nameTags.style.display="none";

  }
  else
  {
    buttonz.style.display = "inline";
    nameTags.style.display="block";
  }
}
function actualSave(playerName,score)
{
  if(localStorage.getItem('userData')!= null)
  {
    userAccounts = JSON.parse(localStorage.getItem('userData'));
  }
  if((userAccounts.hasOwnProperty(playerName)))
  {
    if(window.prompt("ENTER PASSWORD FOR: "+playerName+":") == userAccounts[playerName]["password"])
    {
      if(score > userAccounts[playerName]["highscore"])
      {
        userAccounts[playerName]["highscore"] = score;
        window.alert("HIGHSCORE: "+ score+ ". SAVED SUCCESSFULLY TO ACCOUNT '"+playerName+"'");
      }
      else
      {
        window.alert("COULD NOT SAVE SCORE: NOT HIGH SCORE");
      }
    }
    else
    {
      window.alert("INVALID PASSWORD");
    }
  }
  else
  {
    userAccounts[playerName] = {};
    userAccounts[playerName]["password"] = window.prompt("CREATE PASSWORD FOR: '"+ playerName+"'");
    userAccounts[playerName]["highscore"] = score;
    window.alert("HIGHSCORE: "+ score+ ". SAVED SUCCESSFULLY TO ACCOUNT '"+playerName+"'");
  }
  localStorage.setItem('userData',JSON.stringify(userAccounts));
}

function savePlayerScore()
{
  toggleButtons();
  savingOptions = document.getElementById("savingOptions");
  savingOptions.style.display = "block";

  player1option = document.getElementById("player1option");
  player2option = document.getElementById("player2option");

  player1option.innerHTML = ("Save "+userStats["player0"]["name"] +"'s Score")
  player2option.innerHTML = ("Save "+userStats["player1"]["name"] +"'s Score")
}

//Function which is called every time there is a click on the page
function clickEvent()
{
  //Boolean variable created which will be used to tell the program whether the main game is done
  var finished = false;
  //Checks if the main game is finsished by seeing how many cards have been used
  if(usedCards[0].length + usedCards[1].length + usedCards[2].length >= 30)
  {
    finished = true;
  }
  //Retrieves one of the elements on the page called 'turn' and assigns it a variable
  var turn = document.getElementById("turn");
  //Gets the border radius of an element on the page, this is used to determine whether the mouse is
  //hovering over said element.
  var c = window.getComputedStyle(document.getElementById('deck')).getPropertyValue('border-radius');
  //Checks for: if the number of cards drawn this round is less or equal to 2,
  //if the border is at the same size it would be if the mouse was hovering over interval
  //and the game isn't finished
  if(((numberOfDrawnCards >= 2) && (c==="26px")) && (!finished))
  {
    //Assigns the variables referencing the players hand to what's currently in the players
    //hand.
    player1hand = userStats["player0"]["currentHand"];
    player2hand = userStats["player1"]["currentHand"];

    //calls on the algorithm determine outcome to decide which card wins.
    determineOutcome(player1hand,player2hand);
    //Resets the number of cards that have been drawn this round
    numberOfDrawnCards = 0;
  }
  //Called if the game is finished
  else if(finished)
  {
    //Performs one final command before clicking the page becomes redundant
    if(finalcalc == true)
    {
      player1hand = userStats["player0"]["currentHand"];
      player2hand = userStats["player1"]["currentHand"];
      determineOutcome(player1hand,player2hand);

      //calls the function toggleButtons which toggles whether the user can see
      //the buttons used to save score etc
      toggleButtons();
      finalcalc = false;
    }
  }
  //If you don't need to determine the outcome of the current set of Cards
  // and the game isn't finished, you go here
  else
  {
    //if the element is being hovered over
    if (c === '26px')
    {
      //get a random value between 0 and 2
      random = Math.floor(Math.random() * 3);
      //Gets a random value between 0 and 9
      var other =(Math.floor(Math.random() * (cardNums[random])));
      //Calls a function to check whether this card has been drawn yet
      while (hasBeenDrawn([random,other]))
      {
        //If so, get another card
        random = Math.floor(Math.random() * 3);
        other =(Math.floor(Math.random() * (cardNums[random])));
      }
      //If its the first players turn
      if(player1Turn == true)
      {
        //Assign the first player the card that was previously picked out
          userStats["player0"]["currentHand"] = [random,other];
          //Push said card to usedCards
          usedCards[random].push(other);
          //Change it so it's player 2s turn next.
          player1Turn = false;
          //Increase number of drawn cards.
          numberOfDrawnCards = numberOfDrawnCards + 1;
      }
      //Do the same as before but for player 2
      else if(player1Turn == false)
      {
        userStats["player1"]["currentHand"] = [random,other];
        usedCards[random].push(other);
        player1Turn = true;
        numberOfDrawnCards = numberOfDrawnCards + 1;
      }
    }
    //Update the visuals
    updateCards();
  }
}

//function used for determining the outcome of a matchup
function determineOutcome(player2hand,player1hand)
{
  if(player2hand[0] == player1hand[0])
  {
    if(player1hand[1] > player2hand[1])
    {
      userStats["player0"]["score"] = userStats["player0"]["score"] + 2;
    }
    else
    {
        userStats["player1"]["score"] = userStats["player1"]["score"] + 2;
    }
  }
  else
  {
    if(player1hand[0] == 0)
    {
      if(player2hand[0] == 2)
      {
        userStats["player0"]["score"] = userStats["player0"]["score"] + 2;
      }
      else
      {
        userStats["player1"]["score"] = userStats["player1"]["score"] + 2;
      }
    }
    else if(player1hand[0] == 1)
    {
      if(player2hand[0] == 0)
      {
        userStats["player0"]["score"] = userStats["player0"]["score"] + 2;
      }
      else
      {
        userStats["player1"]["score"] = userStats["player1"]["score"] + 2;
      }
    }
    else if(player1hand[0]==2)
    {
      if(player2hand[0]==1)
      {
        userStats["player0"]["score"] = userStats["player0"]["score"] + 2;
      }
      else
      {
        userStats["player1"]["score"] = userStats["player1"]["score"] + 2;
      }
    }
  }
  userStats["player0"]["currentHand"] = [null,null];
  userStats["player1"]["currentHand"] = [null,null];
  updateCards();
}
//Function for detecting whether something has already been drawn from
//The deck or not
function hasBeenDrawn(list)
{
    //Loops through all cards that are the same colour as the
    //Current card
    for(var x=0;x!=usedCards[list[0]].length;x++)
    {
      //If the current has been used already return true
      if(usedCards[list[0]][x]== list[1])
      {
        return true;
      }
    }
    return false;
}

function generateDeck()
{
  deck = [[],[],[]];
  for(var x=0;x!=3;x++)
  {
    for(var y=0;y!=10;y++)
    {
      deck[x].push(y);
    }
  }
}

function shuffleCards(currentDeck)
{
  for(var x=0;x!=100;x++)
  {
    var rndColour = Math.floor(Math.random() * 3);
    var rndNumber = Math.floor(Math.random() * 10);
    currentVal = deck[rndColour][rndNumber];
    deck[rndColour].splice(rndNumber,1);
    deck[rndColour].push(currentVal);
  }
}

//Resets the game entirely by calling upon lots of different functions
//And resetting lots of different values
function reset()
{
  toggleButtons();
  numberOfDrawnCards = 0;
  finalcalc = true;
  generateDeck();
  shuffleCards();
  usedCards = [[],[],[]];
  initiatePlayers();
  updateCards();
}

function updateCards()
{
  if(usedCards)
  playerCurrent = document.getElementById("player1");
  player2Current = document.getElementById("player2");
  deck = document.getElementById("player1");
  discard1 = document.getElementById("playerdiscard");
  discard2 = document.getElementById("player2discard");
  var currentEl;

  for(var x=0;x!=2;x++)
  {
    if(x==0)
    {
      currentEl = playerCurrent;
    }
    else {
      currentEl = player2Current;
    }

    hand = userStats["player"+x]["currentHand"];
    if(hand[0]==0)
    {
      currentEl.style.backgroundColor = "red";
    }
    if(hand[0]==1)
    {
      currentEl.style.backgroundColor = "yellow";
    }
    if(hand[0]==2)
    {
      currentEl.style.backgroundColor = "black";
    }
    if(hand[0]==null)
    {
      currentEl.style.backgroundColor = "white";
    }
    if(hand[1] == null)
    {
      currentEl.style.visibility = "hidden";
    }
    else
    {
      currentEl.style.visibility = "visible";
    }
    currentEl.innerHTML = hand[1]+1;
  }
  discard1.innerHTML = userStats["player0"]["score"];
  discard2.innerHTML = userStats["player1"]["score"];
}

function initiatePlayers()
{
  userStats={};
  for(var x=0;x!=2;x++)
  {
    userStats["player"+x] = {};
    userStats["player"+x]["name"] = window.prompt("What's Player "+(x+1)+"'s Name?");
    userStats["player"+x]["currentHand"] = [null,null];
    userStats["player"+x]["player"] = x+1;
    userStats["player"+x]["score"] = 0;
  }
}

function gameStart()
{
  initiatePlayers();
  generateDeck();
  shuffleCards(deck);
  turn = document.getElementById("turn");
  turn2 = document.getElementById("turn2");

  turn.innerHTML=(userStats["player0"]["name"]+"'s Cards");
  turn2.innerHTML=(userStats["player1"]["name"]+"'s Cards");

  playGame();
}

function playGame()
{
  //while(true)
  //{
  //  if(player1Turn)
  //  {
  //    player1Turn = false;
  //    turn.innerHTML = "Player 2 Turn";
  //  }
  //  else
  //  {
  //    player1Turn = true;
  //    turn.innerHTML = "Player 1 Turn";
  //  }
  //  updateCards();
  //  }
}
