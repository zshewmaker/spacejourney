var $watts = {
    ui: null,
    game: null,
    player: null
};

function message(value, level) {
    level = level || "normal";

    $watts.ui.gameLog.append("<li class=\"message-" + level + "\">" + value + "</li>");
    $watts.ui.gameLog.scrollTop($watts.ui.gameLog[0].scrollHeight);
}

function clearMessages() {
    $watts.ui.gameLog.empty();
}

function log(value, level) {
    level = level || "info";

    console.log(value);
    $watts.ui.devLog.append("<li class=\"log-level-" + level + "\">" + value + "</li>");
    $watts.ui.devLog.scrollTop($watts.ui.devLog[0].scrollHeight);
}

function withProfile(value, args) {
    var functionName = value.name;
    log(functionName + " starting.");
    var result = value.apply(this, args);
    log(functionName + " done.");
    return result;
}

(function($, $watts) {

    // ***************************************
    // Game functions
    // ***************************************
    function startNewGame() {
        $watts.game = $watts.game.getNewGame();
        $watts.player = $watts.player.factory();
        updateUi();
        log("Starting new game...", "important");

        clearMessages();
        message("You were the captain of the <em>Pilgrim</em>, a spaceship.");
        message("A catastrophic accident occurred. <strong>All crew members were killed.</strong>");
        message("The ship is badly damaged.");
        message("And you need to get home.");
    }

    function playerFinishedTurn() {
        $watts.game.appendTurn();
        $watts.player.processTurn();
        updateUi();
    }

    function skipTurn() {
        message("You did nothing.");
        playerFinishedTurn();
    }

    function gameWon() {
        log("Game won.", "important");
        message("You made it home, congrats!", "important");
    }

    function eat() {
        $watts.player.eat();
        playerFinishedTurn();
    }

    // ***************************************
    // Infrastructure
    // ***************************************
    function updateUi() {
        $watts.ui.dayCounters.text($watts.game.getTurn());
        $watts.ui.playerHealthCounters.text($watts.player.getHealth().overall);
        $watts.ui.playerHungerCounters.text($watts.player.getSatiety());
    }

    function handleStartNewGame() {
        if (!confirm("Are you sure you wish to start a new game?")) {
            return;
        }
        startNewGame();
    }

    function handleSkipTurn() {
        skipTurn();
    }

    function handleGameWon() {
        gameWon();
    }

    function handleEat() {
        eat();
    }

    // ***************************************
    // Bootstrap
    // ***************************************
    function wireEventHandlers() {
        var wire = {
            // wire.click(".action-new-game", handleStartNewGame, ["easy"]);
            click: (selector, handler, args) => $(selector).click(() => withProfile(handler, args || []))
        };

        wire.click(".action-new-game", handleStartNewGame);
        wire.click(".action-skip-turn", handleSkipTurn);
        wire.click(".action-go-home", handleGameWon);
        wire.click(".action-eat", handleEat);
    }

    function documentReady() {
        withProfile(wireEventHandlers);
        withProfile(startNewGame);
    }

    $().ready(() => {
        withProfile(documentReady);
    });

})($, $watts);