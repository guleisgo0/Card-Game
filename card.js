var userStats = {};
var deck = [[],[],[]];
var player1Turn = true;
var canMoveOn = false;
var numberOfDrawnCards = 0;s

function pageLoad()
{
  gameStart();
  document.addEventListener('click', clickEvent);
}

function clickEvent()
{
  var turn = document.getElementById("turn");
  var c = window.getComputedStyle(document.getElementById('deck')).getPropertyValue('border-radius');
  if (numberOfDrawnCards ==0)
  {
    turn.innerHTML=(userStats["player0"]["name"]+"'s Turn");
  }
  if(numberOfDrawnCards == 1)
  {
    turn.innerHTML=(userStats["player1"]["name"]+"'s Turn");
  }
  if(numberOfDrawnCards >= 2)
  {
    player1hand = userStats["player0"]["currentHand"];
    player2hand = userStats["player1"]["currentHand"];
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
    numberOfDrawnCards = 0;
  }
  else
  {
    if (c === '26px')
    {
      if(player1Turn == true)
      {
        userStats["player0"]["currentHand"] = [Math.floor(Math.random() * 3),Math.floor(Math.random() * 10)];
        player1Turn = false;
        numberOfDrawnCards = numberOfDrawnCards + 1;
      }
      else
      {
        userStats["player1"]["currentHand"] = [Math.floor(Math.random() * 3),Math.floor(Math.random() * 10)];
        player1Turn = true;
        numberOfDrawnCards = numberOfDrawnCards + 1;
      }
    }
    updateCards();
  }
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
    currentEl.innerHTML = hand[1];
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
    userStats["player"+x]["numberOfCards"] = 0;
    userStats["player"+x]["player"] = x+1;
    userStats["player"+x]["score"] = 0;
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
