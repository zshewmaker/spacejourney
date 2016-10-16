(function($, $watts) {
    var factory = function(){
        var health = {
            overall: 100
        };

        var satiety = 100;

        var processTurn = function (turn) {
            if (satiety <= 0) {
                health.overall -= 10;
            }
            if (health.overall <= 0) {
                $watts.game.playerLost();
                return;
            }

            satiety = satiety <= 0 ? 0 : satiety - 10;
        };

        return {
            eat: (food) => satiety += 30,
            factory: () => factory(),
            getHealth: () => health,
            getSatiety: () => satiety,
            processTurn: processTurn
        };
    };

    $watts.player = factory();
})($, $watts);