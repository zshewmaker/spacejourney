var $watts = {
    ui: null,
    game: null,
    player: null,
    ship: null
};

var $ui = () => $watts.ui;
var $game = () => $watts.game;
var $player = () => $watts.player;
var $ship = () => $watts.ship;

function message(value, level) {
    level = level || "normal";

    $ui().gameLog.append("<li class=\"message-" + level + "\">" + value + "</li>");
    $ui().gameLog.scrollTop($watts.ui.gameLog[0].scrollHeight);
}

function clearMessages() {
    $ui().gameLog.empty();
}

function log(value, level) {
    level = level || "info";

    console.log(value);
    $ui().devLog.append("<li class=\"log-level-" + level + "\">" + value + "</li>");
    $ui().devLog.scrollTop($watts.ui.devLog[0].scrollHeight);
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
        $game().reset();
        $player().reset();
        updateUi();
        log("Starting new game...", "important");

        clearMessages();
        message("You were the captain of the <em>Pilgrim</em>, a spaceship.");
        message("A catastrophic accident occurred. <strong>All crew members were killed.</strong>");
        $player().hurt(70);
        message("You are injured and the ship is badly damaged.");
        message("And you need to get home.");
        message("You are in the captain's quarters.", "strong");
        updateUi();
    }

    function playerFinishedTurn() {
        $game().appendTurn();
        $player().processTurn();
        updateUi();
    }

    function performAction(action) {
        action();
        playerFinishedTurn();
    }

    // ***************************************
    // Infrastructure
    // ***************************************
    function updateUi() {
        $ui().dayCounters.text($game().turn);
        $ui().playerHealthCounters.text($player().health.overall);
        $ui().playerHungerCounters.text($player().satiety);
        $ui().shipUnusedMatter.text($ship().unusedMatter);
        $ui().currentLocation.text($game().playerLocation);
    }

    function handleStartNewGame() {
        if (!confirm("Are you sure you wish to start a new game?")) {
            return;
        }
        startNewGame();
    }

    function handleSkipTurn() {
        performAction(() => message("You did nothing."));
    }

    function handleGameWon() {
        $game().playerWon();
    }

    function handleEat() {
        performAction(() => $player().eat());
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