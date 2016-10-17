(function ($, $watts) {
    class Player {
        constructor() {
            this.reset();
        }

        eat(food) {
            this.satiety = Math.min(this.satiety + 30, 100);
        }

        hurt(amount) {
            this.health.overall -= amount;
        }

        processTurn(turn) {
            if (this.satiety <= 0) {
                this.health.overall -= 10;
            }
            if (this.health.overall <= 0) {
                $watts.game.playerLost();
                return;
            }

            this.satiety = Math.max(this.satiety - 10, 0);
        }

        reset() {
            this.health = {
                overall: 100
            };
            this.satiety = 100;
        }
    }

    $watts.player = new Player();
})($, $watts);