(function($){

    var $ui = uiFactory();

    function handleStartNewGame() {
        log("starting new game...starting new game...starting new game...starting new game...starting new game...starting new game...starting new game...starting new game...starting new game...starting new game...starting new game...starting new game...starting new game...starting new game...starting new game...");
    }

    function wireEventHandlers() {
        $("nav .new-game").click(handleStartNewGame);
    }

    function log(value){
        console.log(value);
        $ui.devLog.append("<li>" + value + "</li>");
        $ui.devLog.scrollTop($ui.devLog[0].scrollHeight);
    }

    function uiFactory() {
        var devLog = $(".developer-panel .log-output");
        return {
            devLog: devLog
        };
    };

    $().ready(function() {
        wireEventHandlers();
    });

})($);