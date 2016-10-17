(function($, $watts) {

    class Ship {
        constructor(){
            this.reset();
        }

        reset() {
            this.unusedMatter = 100;
        }
    }

    $watts.ship = new Ship();
})($, $watts);