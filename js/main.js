var main = (function(){
    var initModule = function($container){
        main.navigation.initModule($container);
    };

    return { initModule: initModule };
    
}());