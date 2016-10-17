(function($, $watts) {

    class Ship {
        constructor(){
            this.reset();
        }

        get unusedMatter() {
            return this._unusedMatter;
        }

        reset() {
            this._unusedMatter = 100;
        }
    }

    $watts.ship = new Ship();
})($, $watts);