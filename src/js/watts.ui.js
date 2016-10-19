(function($, $watts) {

    class Hud {
        constructor() {
        }

        get moveActions() {
            return $(".actions-move");
        }

        get currentLocation() {
            return $(".current-location");
        }

        get dayCounters() {
            return $(".day-counter");
        }

        get devLog() {
            return $(".developer-panel .log-output");
        }

        get gameLog() {
            return $(".game-panel .log-output");
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