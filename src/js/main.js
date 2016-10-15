(function($){

    var $ui = uiFactory();

    function handleStartNewGame() {
        log("starting new game...");
    }

    function wireEventHandlers() {
        $("nav .new-game").click(handleStartNewGame);
    }

    function log(value){
        console.log(value);
        $ui.devLog.append(value);
    }

    function uiFactory() {
        return {
            devLog: $(".developer-panel .log-output")
        };
    };

    $().ready(function() {
        wireEventHandlers();
    });

})($);