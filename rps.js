const prompt = require('prompt-sync')();

const rps ={
    playerScore: 0,
    computerScore: 0,

    getComputerChoice(){
        const choice = ['rock','paper','scissors'];
        const randomIndex = Math.floor(Math.random()*3);
        return choice[randomIndex];
    },

    playRound(playerChoice){
        const computerChoice = this.getComputerChoice();

        console.log(`Player: ${playerChoice}`);
        console.log(`Computer: ${computerChoice}`);

    if(playerChoice === computerChoice){
        return "It's a tie!";
    }
    if((playerChoice === 'rock' && computerChoice === 'scissors') ||
       (playerChoice === 'paper' && computerChoice === 'rock') ||
       (playerChoice === 'scissors' && computerChoice === 'paper')){
        this.playerScore++;
        return "You win this round!";
    } else {
        this.computerScore++;
        return "Computer wins this round!";
    }
},

    getWinner(){
    if (this.playerScore>this.computerScore){
        return "Congratulations! You win the game!";
    }else if(this.computerScore>this.playerScore){
        return "Computer wins the game! Better luck next time!";
    } else{
        return "its a tie game!";
    }
},

    reset(){
    this.playerScore=0;
    this.computerScore=0;
    }   
};
console.log("Game Start\n");

for (let i = 0; i < 3; i++) {
  const userInput = prompt("Enter rock, paper, or scissors: ");

  console.log("\n" + rps.playRound(userInput));
  console.log("Score:", rps.playerScore, "-", rps.computerScore);
}

console.log("\nFinal:", rps.getWinner());

 