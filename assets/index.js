const sect = document.createElement("section");
const div = document.createElement("div");
const pDiv = document.createElement("p");
const selections = document.createElement("p");
const h2Score = document.createElement("h2");
const final = document.createElement("h1");
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
        const humanChoice = e.target.value;
        resolve(humanChoice); // call resolve after human click a button to return value
      });
    });
  });
}

function normalizeCheck(check) {
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
      pDiv.textContent = `You won a point, lucky i guest`;
    } else if (result === "computer") {
      computerScore++;
      pDiv.textContent = `You lose to computer, u suck xD`;
    } else if (result === "draw") {
      pDiv.textContent = "Draw, unlucky no point for anyone";
    }
    h2Score.textContent = `Your score: ${humanScore} - Computer score: ${computerScore}`;

    // }

    if (humanScore === 5) {
      final.textContent = "Congratulation!!! U beat the machine <3";
      console.log("human");
      break;
    } else if (computerScore === 5) {
      final.textContent = "Cant beat the computer huh ? Guest what ? Maybe try again, then u will lose again. XD";
      console.log("comp");
      break;
    }
  }
}
playGame();
