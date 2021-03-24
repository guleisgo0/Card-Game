var userAccounts = {};
var sorted;
function pageLoad()
{
  var leader = document.getElementById("leaderboard");

  if(localStorage.getItem('userData')!= null)
  {
    userAccounts = JSON.parse(localStorage.getItem('userData'));
  }
  window.alert("afterlocalstorage");
  var entries = Object.entires(userAccounts);

  window.alert(entries);
  
  window.alert("before insertion");
  var sortedlist = insertionSort(sorted);
  window.alert("after inserion");
  var finalString = "<b><strong>LEADERBOARD</strong></b><br><br>"
  for(var x=0;x!=10;x++)
  {
    if(sortedlist[x]!=null)
    {
      finalString = finalString + (x+1) +". "+ sortedlist[x][0]+": "+sortedlist[x][1]+"<br>";
    }
    else
    {
      finalString= finalString + (x+1) + ". N/A: 0<br>";
    }
  }
  leader.innerHTML = finalString;
}

function insertionSort(list)
{
  for(var x=1; x!=list.length ;x++)
  {
    var passed = false;
    var currentX = x;

    while(!passed)
    {
      if(list[currentX][1] > list[currentX-1][1])
      {
        var placeholder = list[currentX-1][1];
        list[currentX-1][1] = list[currentX][1];
        list[currentX][1] = placeholder;
      }
      else
      {
        passed = true;
      }
      currentX = currentX - 1;
    }
  }
  return(list);
}
