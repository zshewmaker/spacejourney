(function ($, $watts) {
    "use strict";

    class Game {
        constructor() {
            this.reset();
        }

        get playerLocation() {
            return this._playerLocation;
        }

        appendTurn() {
            this.turn++;
        }

        playerLost() {
            log("Game lost.", "important");
            message("You died!", "important");
        }

        playerWon() {
            log("Game won.", "important");
            message("You made it home, congrats!", "important");
        }

        reset() {
            this.turn = 1;
            this._playerLocation = $data.getLocation("bridge");
        }
    }

    $watts.game = new Game();

    class GameLocation {
        constructor(id, name, connectsTo) {
            this.id = id || "";
            this.name = name || "";
            this.connectsTo = connectsTo || [];
        }
    }

    $data.locations = [
        new GameLocation("bridge", "Command Bridge", ["hall", "quarters.captain"]),
        new GameLocation("hall", "Hallway", ["bridge", "quarters.crew", "hatch.ship", "maintenance.ship"]),
        new GameLocation("quarters.crew", "Crew's Quarters", ["bridge", "medical"]),
        new GameLocation("quarters.captain", "Captain's Quarters", ["bridge"]),
        new GameLocation("medical", "Medical Center", ["quarters.crew"]),
        new GameLocation("hatch.ship", "Hatch to Space", ["bridge"]),
        new GameLocation("maintenance.ship", "Maintenance Room", ["bridge", "engine.ship"]),
        new GameLocation("engine.ship", "Engine Room", ["maintenance.ship"])
    ];

})($, $watts);