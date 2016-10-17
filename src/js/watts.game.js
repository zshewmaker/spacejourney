(function ($, $watts) {

    class GameLocation {
        constructor(id, name, connectsTo) {
        }
    }

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
            this._playerLocation = "Captain's Quarters";
        }
    }

    $watts.game = new Game();
})($, $watts);