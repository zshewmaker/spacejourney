(function($, $watts) {

    var playerLost = function() {
        log("Game lost.", "important");
        message("You died!", "important");
    };

    var factory = function(){
        var turn = 1;

        return {
            appendTurn: () => turn++,
            getTurn: () => turn,
            getNewGame: () => factory(),
            playerLost: playerLost
        };
    };

    $watts.game = factory();
})($, $watts);