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
  const humanChoice = prompt("Input your choices - Kéo, búa, bao (scissors, rock, paper)");
  if (!humanChoice) {
    return null;
  } else {
    return humanChoice.toLowerCase();
  }
}

function normalizeCheck(check) {
  if (check === "búa" || check === "bua") return "rock";
  if (check === "kéo" || check === "keo") return "scissors";
  if (check === "bao") return "paper";
}

//logic game búa > kéo - kéo > bao - bao > búa
// người chơi chọn -> máy tính chọn -> so sánh các trường hợp và đưa ra thông báo ai win
// ai win thì sẽ được cộng điểm vào biến tương ứng.

function playGame() {
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

  for (let i = 0; i < 5; i++) {
    const computerSelection = getComputerChoice();
    const rawInput = getHumanChoice();
    const humanSelection = normalizeCheck(rawInput);
    const result = playRound(humanSelection, computerSelection);
    if (rawInput === null) {
      console.log("Cancel Game !!! Input value to play rock-paper-scissors");
      return;
    }
    console.log(` Round ${i}: You choose: ${humanSelection} , computer choose: ${computerSelection}`);

    if (result === "human") {
      humanScore++;
      console.log("You won a point, lucky i guest");
    } else if (result === "computer") {
      computerScore++;
      console.log("You lose to computer, u suck xD");
    } else if (result === "draw") {
      console.log("Draw, unlucky no point for anyone");
    }
    console.log("--------------");
    console.log(`Your score: ${humanScore} - Computer score: ${computerScore}`);
    console.log("--------------");
  }

  if (humanScore > computerScore) {
    console.log("Congratulation!!! U a lucky guy <3");
  } else if (humanScore < computerScore) {
    console.log("Cant beat the computer huh ? Guest what ? Maybe try again, then u will lose again. XD");
  } else {
    console.log("🤝 DRAWWWWWWWWW");
  }
}
playGame();
