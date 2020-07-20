const gameSummary = {
    numbers: 0,
    wins: 0,
    losses: 0,
    draws: 0,
}

const game = {
    playerHand: "",
    aiHand: "",
}

const hands = [...document.querySelectorAll('.select img')];


function handSelection() {
    game.playerHand = this.dataset.option;
    hands.forEach(hand => hand.style.boxShadow = "");
    this.style.boxShadow = '0 0 0 4px yellow';
}

function aiChoice() {
    const aiHand = hands[Math.floor(Math.random() * 3)].dataset.option;
    return aiHand;
}

function checkResult(player, ai) {
    if (player === ai) {
        return 'remis';
    } else if ((player === 'papier' && ai === 'kamień') || (player === 'kamień' && ai === 'nożyczki') || (player === 'nożyczki' && ai === 'papier')) {
        return 'win';
    }
    return 'lose';
}

function publishResult(player, ai, result) {

    document.querySelector('[data-summary="your-choice"]').textContent = player;
    document.querySelector('[data-summary="ai-choice"]').textContent = ai;
    document.querySelector('p.numbers span').textContent = ++gameSummary.numbers;
    if (result === 'win') {
        document.querySelector('p.wins span').textContent = `${++gameSummary.wins}`;
        document.querySelector('[data-summary="who-win"]').textContent = 'Ty wygrałeś';
    }
    if (result === 'lose') {
        document.querySelector('p.losses span').textContent = `${++gameSummary.losses}`;
        document.querySelector('[data-summary="who-win"]').textContent = 'Komputer wygrał';
    } else

        document.querySelector('p.draws span').textContent = `${++gameSummary.draws}`;
    document.querySelector('[data-summary="who-win"]').textContent = 'Remis :(';


}

function endGame() {

    game.playerHand = ""
}


function startGame() {
    if (!game.playerHand) {
        return alert('wybierz dłoń');
    }
    game.aiHand = aiChoice();
    const gameResult = checkResult(game.playerHand, game.aiHand)
    publishResult(game.playerHand, game.aiHand, gameResult);
}


endGame();

document.querySelector('.start').addEventListener('click', startGame);
hands.forEach(hand => hand.addEventListener('click', handSelection));