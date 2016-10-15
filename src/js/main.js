(function ($) {

    // ***************************************
    // Primary game components
    // ***************************************
    var $ui = uiFactory();
    var $current_game = gameFactory();
    var $player = playerFactory();

    // ***************************************
    // Game functions
    // ***************************************
    function startNewGame() {
        $current_game = $current_game.getNewGame();
        log("Starting new game...", "important");

        clearMessages();
        message("You were the captain of the Pilgrim, a spaceship.");
        message("A catastrophic accident occurred. Every crew member but yourself was killed.");
        message("The ship is badly damaged.");
        message("And you need to get home.");
    }

    function skipTurn() {
        $current_game.appendTurn();
        message("You did nothing.");
    }

    function gameWon() {
        log("Game won.", "important");
        message("You made it home, congrats!");
    }

    // ***************************************
    // Infrastructure
    // ***************************************
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

    function message(value) {
        $ui.gameLog.append("<li>" + value + "</li>");
        $ui.gameLog.scrollTop($ui.gameLog[0].scrollHeight);
    }

    function clearMessages() {
        $ui.gameLog.empty();
    }

    function log(value, level) {
        level = level || "info";

        console.log(value);
        $ui.devLog.append("<li class=\"log-level-" + level + "\">" + value + "</li>");
        $ui.devLog.scrollTop($ui.devLog[0].scrollHeight);
    }

    function profile(value, args) {
        var functionName = value.name;
        log(functionName + " starting.");
        var result = value.apply(this, args);
        log(functionName + " done.");
        return result;
    }

    // ***************************************
    // Factories
    // ***************************************
    function playerFactory() {
        return {};
    }

    function gameFactory() {
        var turn = 1;
        var updateDayCounter = () => $ui.dayCounters.text(turn);
        updateDayCounter();

        return {
            appendTurn: () => { 
                turn++; 
                updateDayCounter(); },
            getTurn: () => turn,
            getNewGame: () => gameFactory()
        };
    }

    function uiFactory() {
        var gameLog = $(".game-panel .log-output");
        var devLog = $(".developer-panel .log-output");
        var dayCounters = $(".day-counter");
        
        return {
            dayCounters: dayCounters,
            devLog: devLog,
            gameLog: gameLog
        };
    }

    // ***************************************
    // Bootstrap
    // ***************************************
    function wireEventHandlers() {
        var wire = {
            // wire.click(".action-new-game", handleStartNewGame, ["easy"]);
            click: (selector, handler, args) => $(selector).click(() => profile(handler, args || []))
        };

        wire.click(".action-new-game", handleStartNewGame);
        wire.click(".action-skip-turn", handleSkipTurn);
        wire.click(".action-go-home", handleGameWon);
    }

    function documentReady() {
        profile(wireEventHandlers);
        profile(startNewGame);
    }

    $().ready(() => {
        profile(documentReady);
    });

})($);