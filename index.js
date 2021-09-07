// function towerOfHanoi(n, source,  destination,  helper)
// {
//         if (n == 1)
//         {
//             document.write("Move disk 1 from rod " + source +
//             " to rod " + destination+"<br/>");
//             return;
//         }
//         towerOfHanoi(n - 1, source, helper, destination);
//         document.write("Move disk " + n + " from rod " + source +
//         " to rod " + destination+"<br/>");
//         towerOfHanoi(n - 1, helper, destination, source);
//     }
 
//     // Driver code
//     var n = 5; // Number of disks
//     towerOfHanoi(n, 'A', 'C', 'B')

const input = document.getElementById('input-value')
const steps = document.getElementById('steps')

const discsModel = [[], [], []];
const getDiscsState = () => discsModel.map((tower) => tower.length).join();
let discsState = getDiscsState();
const discParamUpdates = [];

function showDisc(){
    const discParams = [];
    discsModel && discsModel.forEach((tower, towerIdx) => {
      tower.forEach((disc, discIdx) => {
        discParams.push({ disc, towerIdx, discIdx });
      });
    });
    discParamUpdates.push(discParams);
}

function discsView() {
  const currentDiscsState = getDiscsState();
  if (currentDiscsState !== discsState) {
    showDisc()
    discsState = currentDiscsState;
  }
}

function solve(num, from = 0, via = 1, to = 2) {
  if (num) {
    solve(num - 1, from, to, via);
    discsModel[to].push(discsModel[from].pop());
    discsView();
    solve(num - 1, via, from, to);
    discsView();
  }
}


function renderPuzzle(intervalTime) {
  let interval;
  let index = 0;
  const domDiscs = document.querySelector(".discs");
  const drawPuzzle = () => {
    domDiscs.innerHTML = discParamUpdates[index]
      .map((update) => {
        return `<div class="disc${update.disc} tower${update.towerIdx} level${
          update.discIdx + 1
        }"></div>`;
      })
      .join("");
    if (++index === discParamUpdates.length) {
      clearInterval(interval);
    }
  };
  interval = setInterval(drawPuzzle, intervalTime);
}


function run(){
    num = parseInt(input.value)
    if(num > 10 ||num <= 0){
        alert('Number of discs should be between 1 to 10')
    }else{
        for(let i = num; i>0; i--){
            discsModel[0].push(i)
        }
    }
    showDisc()
    steps.innerHTML = ` <p>tower of hanoi with ${num} discs can be solved in ${Math.pow(2, num) - 1} steps</p>`
    solve(discsModel["flat"](2).length);
    renderPuzzle(700);
}