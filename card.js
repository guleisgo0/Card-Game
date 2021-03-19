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
    if(window.prompt("Enter the password for "+playerName+":") == userAccounts[playerName]["password"])
    {
      userAccounts[playerName]["highscore"] = score;
      window.alert("Highscore of: "+ score+ " saved successfully too account "+playerName);
    }
    else
    {
      window.alert("Invalid password");
    }
  }
  else
  {
    userAccounts[playerName] = {};
    userAccounts[playerName]["password"] = window.prompt("CREATE A PASSWORD");
    userAccounts[playerName]["highscore"] = score;
    window.alert("Highscore of: "+ score+ " saved successfully too account "+playerName)
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

function clickEvent()
{
  var finished = false;
  if(usedCards[0].length + usedCards[1].length + usedCards[2].length >= 30)
  {
    finished = true;
  }
  var turn = document.getElementById("turn");
  var c = window.getComputedStyle(document.getElementById('deck')).getPropertyValue('border-radius');
  if(((numberOfDrawnCards >= 2) && (c==="26px")) && (!finished))
  {
    player1hand = userStats["player0"]["currentHand"];
    player2hand = userStats["player1"]["currentHand"];

    determineOutcome(player1hand,player2hand);
    numberOfDrawnCards = 0;
  }
  else if(finished)
  {
    if(finalcalc == true)
    {
      player1hand = userStats["player0"]["currentHand"];
      player2hand = userStats["player1"]["currentHand"];
      determineOutcome(player1hand,player2hand);
      toggleButtons();
      finalcalc = false;
    }
  }
  else
  {
    if (c === '26px')
    {
      random = Math.floor(Math.random() * 3);
      var other =(Math.floor(Math.random() * (cardNums[random])));
      while (hasBeenDrawn([random,other]))
      {
        random = Math.floor(Math.random() * 3);
        other =(Math.floor(Math.random() * (cardNums[random])));
      }
      if(player1Turn == true)
      {
          userStats["player0"]["currentHand"] = [random,other];
          usedCards[random].push(other);
          player1Turn = false;
          numberOfDrawnCards = numberOfDrawnCards + 1;
      }
      else if(player1Turn == false)
      {
        userStats["player1"]["currentHand"] = [random,other];
        usedCards[random].push(other);
        player1Turn = true;
        numberOfDrawnCards = numberOfDrawnCards + 1;
      }
    }
    updateCards();
  }
}
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
function hasBeenDrawn(list)
{
    for(var x=0;x!=usedCards[list[0]].length;x++)
    {
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
