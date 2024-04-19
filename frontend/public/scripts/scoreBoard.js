import { getScoreboard} from "./api.js";


function drawTable(items) {
  const table = document.getElementById("main-table-body");

  // Clear all elements
  //table.innerHTML = "";
    console.log(items)
    console.log(table)
    let i=1
  for (const item of items) {
    console.log(item)
    const row = table.insertRow();
    row.insertCell().innerText=i
    row.insertCell().innerText = item.name;
    row.insertCell().innerText = item.score;
    //console.log(item.time)
    i+=1
    const timeSplited=item.time.split(" ");
    //console.log(timeSplited)
    row.insertCell().innerText = timeSplited[0]+" "+timeSplited[1]+" "+timeSplited[2]+" "+timeSplited[3];
  }
}

export async function fetchAndDrawTable() {
  const items = await getScoreboard();

  drawTable(items);
}


document.getElementById('changePage').onclick = clickTochange1;
function clickTochange1()
{
  location.href="index.html"
}

await fetchAndDrawTable();


