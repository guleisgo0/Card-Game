var userStats = {};
var deck = [[],[],[]];
var player1Turn = false;
var moveOn = false;

function pageLoad()
{
  gameStart();
  document.addEventListener('click', clickEvent);
}

function clickEvent()
{
  var a = window.getComputedStyle(document.getElementById('player1')).getPropertyValue('border-radius');
  var b = window.getComputedStyle(document.getElementById('player2')).getPropertyValue('border-radius');
  var c = window.getComputedStyle(document.getElementById('deck')).getPropertyValue('border-radius');

  if (a === '26px')
  {

  }
  if (b === '26px')
  {

  }
  if (c === '26px')
  {
    if(player1Turn == true)
    {
      userStats["player0"]["currentHand"] = [Math.floor(Math.random() * 3),Math.floor(Math.random() * 10)];
      player1Turn = false;
    }
    else
    {
      userStats["player1"]["currentHand"] = [Math.floor(Math.random() * 3),Math.floor(Math.random() * 10)];
      player1Turn = true;
    }
  }
  updateCards();
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

function updateCards()
{
  playerCurrent = document.getElementById("player1");
  player2Current = document.getElementById("player2");
  deck = document.getElementById("player1");
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
    currentEl.innerHTML = hand[1];
  }
}

function initiatePlayers()
{
  userStats={};
  for(var x=0;x!=2;x++)
  {
    userStats["player"+x] = {};
    userStats["player"+x]["name"] = window.prompt("What's Player "+(x+1)+"'s Name?");
    userStats["player"+x]["currentHand"] = [null,null];
    userStats["player"+x]["numberOfCards"] = 0;
    userStats["player"+x]["player"] = x+1;
  }
}

function gameStart()
{
  initiatePlayers();
  generateDeck();
  shuffleCards(deck);
  playGame();
}

function playGame()
{
  var turn = document.getElementById("turn");
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
