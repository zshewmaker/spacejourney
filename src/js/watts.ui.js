(function($, $watts) {
    var factory = function(){
        var gameLog = $(".game-panel .log-output");
        var devLog = $(".developer-panel .log-output");
        var dayCounters = $(".day-counter");
        var playerHealthCounters = $(".player-health");
        var playerHungerCounters = $(".player-hunger");

        return {
            dayCounters: dayCounters,
            devLog: devLog,
            gameLog: gameLog,
            playerHealthCounters: playerHealthCounters,
            playerHungerCounters: playerHungerCounters
        };
    };

    $watts.ui = factory();
})($, $watts);