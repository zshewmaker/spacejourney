(function ($, $watts) {

    class Game {
        constructor() {
           this.reset();
        }

        get turn() {
            return this._turn;
        }

        appendTurn() {
            this._turn++;
        }

        playerLost() {
            log("Game lost.", "important");
            message("You died!", "important");
        }

        reset() {
            this._turn = 1;
        }
    }

    $watts.game = new Game();
})($, $watts);