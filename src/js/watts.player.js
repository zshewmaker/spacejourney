(function ($, $watts) {
    class Player {
        constructor() {
            this.reset();
        }

        get health() {
            return this._health;
        }

        get satiety() {
            return this._satiety;
        }

        eat(food) {
            this._satiety = Math.min(this._satiety + 30, 100);
        }

        hurt(amount) {
            this._health.overall -= amount;
        }

        processTurn(turn) {
            if (this._satiety <= 0) {
                this._health.overall -= 10;
            }
            if (this._health.overall <= 0) {
                $watts.game.playerLost();
                return;
            }

            this._satiety = Math.max(this._satiety - 10, 0);
        }

        reset() {
            this._health = {
                overall: 100
            };
            this._satiety = 100;
        }
    }

    $watts.player = new Player();
})($, $watts);