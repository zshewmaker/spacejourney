(function($, $watts) {

    class Hud {
        constructor() {
        }

        get gameLog() {
            return $(".game-panel .log-output");
        }

        get devLog() {
            return $(".developer-panel .log-output");
        }

        get dayCounters() {
            return $(".day-counter");
        }

        get playerHealthCounters() {
            return $(".player-health");
        }

        get playerHungerCounters() {
            return $(".player-satiety");
        }

        get shipUnusedMatter() {
            return $(".ship-unused-matter");
        }
    }

    $watts.ui = new Hud();
})($, $watts);