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
        if (!confirm("Are you sure you wish to start a new game?")) {
            return;
        }
        $current_game = $current_game.getNewGame();
        log("Starting new game...", "important");
    }

    function skipTurn() {
        $current_game.appendTurn();
    }

    function gameWon() {
        log("You win, congrats!", "important");
    }

    // ***************************************
    // Infrastructure
    // ***************************************
    function handleStartNewGame() {
        startNewGame();
    }

    function handleSkipTurn() {
        skipTurn();
    }

    function handleGameWon() {
        gameWon();
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
            appendTurn: () => { turn++; updateDayCounter(); },
            getTurn: () => turn,
            getNewGame: () => gameFactory()
        };
    }

    function uiFactory() {
        var devLog = $(".developer-panel .log-output");
        var dayCounters = $(".day-counter");
        
        return {
            dayCounters: dayCounters,
            devLog: devLog
        };
    }

    // ***************************************
    // Bootstrap
    // ***************************************
    function wireEventHandlers() {
        var wire = {
            click: (selector, handler, args) => { $(selector).click(() => profile(handler, args || [])); }
        };

        wire.click(".action-new-game", handleStartNewGame, []);
        wire.click(".action-skip-turn", handleSkipTurn);
        wire.click(".action-go-home", handleGameWon);
    }

    function documentReady() {
        profile(wireEventHandlers);
    }

    $().ready(() => {
        profile(documentReady);
    });

})($);