(function($, $watts) {
    var factory = function(){
        var gameLog = $(".game-panel .log-output");
        var devLog = $(".developer-panel .log-output");
        var dayCounters = $(".day-counter");
        var playerHealthCounters = $(".player-health");
        var playerHungerCounters = $(".player-hunger");
        var shipUnusedMatter = $(".ship-unused-matter");

        return {
            dayCounters: dayCounters,
            devLog: devLog,
            gameLog: gameLog,
            playerHealthCounters: playerHealthCounters,
            playerHungerCounters: playerHungerCounters,
            shipUnusedMatter: shipUnusedMatter
        };
    };

    $watts.ui = factory();
})($, $watts);