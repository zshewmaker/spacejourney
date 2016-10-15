(function($){

    var $ui = uiFactory();
    var $current_game = gameFactory();

    function handleStartNewGame() {
        if (!confirm("Are you sure you wish to start a new game?")) {
            return;
        }
        $current_game = $current_game.getNewGame();
        $ui.dayCounters.text($current_game.getTurn());
        log("Starting new game...", "important");
    }

    function handleSkipTurn(){
        $current_game.appendTurn();
        $ui.dayCounters.text($current_game.getTurn());
    }

    function handleGameWon() {
        log("You win, congrats!", "important");
    }

    function wireEventHandlers() {
        $(".action-new-game").click(() => profile(handleStartNewGame));
        $(".action-skip-turn").click(() => profile(handleSkipTurn));
        $(".action-go-home").click(() => profile(handleGameWon));
    }

    function log(value, level){
        level = level || "info";

        console.log(value);
        $ui.devLog.append("<li class=\"log-level-" + level + "\">" + value + "</li>");
        $ui.devLog.scrollTop($ui.devLog[0].scrollHeight);
    }

    function profile(value, args){
        args = args || [];

        var functionName = value.name;
        log(functionName + " starting.");
        var result = value();
        log(functionName + " done.");
        return result;
    }

    function uiFactory() {
        var devLog = $(".developer-panel .log-output");
        var dayCounters = $(".day-counter");
        return {
            dayCounters: dayCounters,
            devLog: devLog
        };
    };

    function gameFactory() {
        var turn = 1;
        return {
            appendTurn: () => turn++,
            getTurn: () => turn,
            getNewGame: () => gameFactory()
        };
    };

    function documentReady(){
        profile(wireEventHandlers);
    }

    $().ready(() => {
        profile(documentReady);
    });

})($);