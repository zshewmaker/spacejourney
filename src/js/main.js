(function($){

    var $ui = uiFactory();

    function handleStartNewGame() {
        log("Starting new game...", "important");
    }

    function wireEventHandlers() {
        $("nav .new-game").click(handleStartNewGame);
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
        return {
            devLog: devLog
        };
    };

    function documentReady(){
        profile(wireEventHandlers);
    }

    $().ready(function() {
        profile(documentReady);
    });

})($);