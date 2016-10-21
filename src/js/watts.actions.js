(function($, $watts, _) {
    "use strict";

    // name = function ([k,v]) {} **OR** string (or whatever)
    // actionExecutor = function ([k,v]) {}
    class Action {
        constructor(id, name, actionExecutor) {
            this.id = id;
            this._name = name;
            this.actionExecutor = actionExecutor;
        }

        get name() {
            if (_.isFunction(this._name)) {
                return this._name();
            }

            return this._name;
        }
    }

    $data.actions = [
        new Action("move", (x) => "Move to " + x.location, (x) => message("Moved to " + x.location)),
        new Action("skip", "Skip", () => performAction(() => message("You did nothing.")))
    ];

})($, $watts, _);