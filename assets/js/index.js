const sect = document.createElement("section");
const div = document.createElement("div");
const pDiv = document.createElement("p");
const selections = document.createElement("p");
const h2Score = document.createElement("h2");
const final = document.createElement("h1");
const selectionButton = document.querySelector(".selection-button");

sect.setAttribute("class", "game-log");
sect.style.display = "none";
sect.style.opacity = 0;
sect.style.transition = "opacity 0.5s ease";

div.setAttribute("class", "log-container");
pDiv.setAttribute("class", "game-stats");
selections.setAttribute("class", "game-selection");
final.setAttribute("class", "final");

div.appendChild(pDiv);
div.appendChild(selections);
div.appendChild(h2Score);
div.appendChild(final);
sect.appendChild(div);

const container = document.querySelector(".container");
container.appendChild(sect);

function getComputerChoice() {
  let computerChoice = Math.floor(Math.random() * 3);
  if (computerChoice === 0) {
    return "rock";
  } else if (computerChoice === 1) {
    return "paper";
  } else {
    return "scissors";
  }
}

function getHumanChoice() {
  // const keo = document.querySelector("#keo");
  // const bua = document.querySelector("#bua");
  // const bao = document.querySelector("#bao");
  // keo.addEventListener("click", (e) => {
  //   console.log(e.target.id);
  // });
  // bua.addEventListener("click", (e) => {
  //   console.log(e.target.id);
  // });
  // bao.addEventListener("click", (e) => {
  //   console.log(e.target.id);
  // });
  // use promise for processing asynchronous
  return new Promise((resolve) => {
    const buttons = document.querySelectorAll(".btn");
    buttons.forEach((button) => {
      button.addEventListener("click", (e) => {
        console.log("Button clicked:", e.target); // Kiểm tra element được click
        const humanChoice = e.target.value;
        console.log("Human choice:", humanChoice); // kiểm tra value
        resolve(humanChoice); // call resolve after human click a button to return value
        sect.style.display = "block";
        setTimeout(() => {
          sect.style.opacity = 1;
        }, 10);
        // Use timeout to make transition work with display
      });
    });
  });
}

function normalizeCheck(check) {
  console.log(check);
  if (check === "bua") return "rock";
  if (check === "keo") return "scissors";
  if (check === "bao") return "paper";
}

//logic game búa > kéo - kéo > bao - bao > búa
// người chơi chọn -> máy tính chọn -> so sánh các trường hợp và đưa ra thông báo ai win
// ai win thì sẽ được cộng điểm vào biến tương ứng.

async function playGame() {
  let humanScore = 0;
  let computerScore = 0;

  // Restart Game
  const restartButton = document.querySelector("#restart-btn");
  restartButton.addEventListener("click", () => {
    location.reload(); // Reload webpage when click this button
  });

  function playRound(humanSelection, computerSelection) {
    if (
      (humanSelection === "rock" && computerSelection === "scissors") ||
      (humanSelection === "paper" && computerSelection === "rock") ||
      (humanSelection === "scissors" && computerSelection === "paper")
    ) {
      return "human";
    } else if (humanSelection === computerSelection) {
      return "draw";
    }
    return "computer";
  }

  while (humanScore < 5 && computerScore < 5) {
    // for (let i = 0; i < 5; i++) {
    const computerSelection = getComputerChoice();
    const rawInput = await getHumanChoice(); // wait for human make a choice
    const humanSelection = normalizeCheck(rawInput);
    const result = playRound(humanSelection, computerSelection);
    if (rawInput === null) {
      return;
    }
    selections.textContent = `  You choose: ${humanSelection} , computer choose: ${computerSelection}`;

    if (result === "human") {
      humanScore++;
      pDiv.textContent = `You WON a point, lucky I guest 😏😏😏`;
    } else if (result === "computer") {
      computerScore++;
      pDiv.textContent = `You LOSE to a computer, U suck 🤣🤣🤣`;
    } else if (result === "draw") {
      pDiv.textContent = "DRAWWW, no point for anyone 🙈🙈🙈";
    }
    h2Score.textContent = `Your score: ${humanScore} - Computer score: ${computerScore}`;

    // }

    if (humanScore === 5) {
      final.textContent = "Congratulation!!! U beat the machine 😎😎😎";
      selectionButton.style.display = "none";
      restartButton.style.display = "block";
      break;
    } else if (computerScore === 5) {
      final.textContent =
        "Can't beat the computer huh ? Guest what ? Maybe try again, then u will LOSE again. MUH...HA...HA...HA 🤖💀🤖";
      selectionButton.style.display = "none";
      restartButton.style.display = "block";
      break;
    }
  }
}
playGame();
