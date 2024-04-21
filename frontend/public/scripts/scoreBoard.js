import { getScoreboard, clearScore, deleteItem} from "./api.js";

document.getElementById('clearScoreboard').addEventListener('click', async ()=>{
  await clearScore();
  document.getElementById("main-table-body").innerHTML = ""
})
async function drawTable(items) {
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
    row.insertCell().innerText = await item.name;
    row.insertCell().innerText = await item.score;
    //console.log(item.time)
    i+=1
    // const btn = document.createElement('button');
    // btn.width = "70px"
    // btn.height = "30px"
    // btn.innerText = "Delete"
    // // btn.id = item.name;
    // btn.onclick = async () => {
    //   // console.log(this.id)
    //   await deleteItem(await item.name)
    //   await fetchAndDrawTable();
    //   // await fetchAndDrawTable()
    // }
    const timeSplited=item.time.split(" ");
    //console.log(timeSplited)
    row.insertCell().innerText = timeSplited[0]+" "+timeSplited[1]+" "+timeSplited[2]+" "+timeSplited[3];
    // row.insertCell().appendChild(btn)
  }
}

export async function fetchAndDrawTable() {
  const items = await getScoreboard();
  // document.getElementById("main-table-body").innerHTML = ""

  drawTable(items);
}


document.getElementById('changePage').onclick = clickTochange1;
function clickTochange1()
{
  location.href="index.html"
}

await fetchAndDrawTable();


