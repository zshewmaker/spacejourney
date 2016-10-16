(function($, $watts) {

    var factory = function(){
        var unusedMatter = 100;

        return {
            getUnusedMatter: () => unusedMatter
        };
    };

    $watts.ship = factory();
})($, $watts);