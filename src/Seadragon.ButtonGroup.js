require(["Seadragon.Button", "Seadragon.Utils", "Seadragon.MouseTracker"], 

    function( SeadragonButton, SeadragonUtils, SeadragonMouseTracker ) {

    
    return function SeadragonButtonGroup(buttons) {
        
       // Fields
        
        var group = SeadragonUtils.makeNeutralElement("span");
        var buttons = buttons.concat([]);   // copy
        var tracker = new SeadragonMouseTracker(group);
        
        // Properties
        
        this.elmt = group;
        
        // Tracker helpers
        
        function enterHandler(tracker, position, buttonDownElmt, buttonDownAny) {
            // somewhat office ribbon style -- we do this regardless of whether
            // the mouse is down from elsewhere. it's a nice soft glow effect.
            for (var i = 0; i < buttons.length; i++) {
                buttons[i].notifyGroupEnter();
            }
        }
        
        function exitHandler(tracker, position, buttonDownElmt, buttonDownAny) {
            if (!buttonDownElmt) {
                // only go to rest if the mouse isn't down from a button
                for (var i = 0; i < buttons.length; i++) {
                    buttons[i].notifyGroupExit();
                }
            }
        }
        
        function releaseHandler(tracker, position, insideElmtPress, insideElmtRelease) {
            if (!insideElmtRelease) {
                // this means was the mouse was inside the div during press, so
                // since it's no longer inside the div during release, it left
                // the div. but onDivExit() ignored it since the mouse was down
                // from the div, so we'll go out to rest state now.
                for (var i = 0; i < buttons.length; i++) {
                    buttons[i].notifyGroupExit();
                }
            }
        }
        
        // Methods
        
        this.emulateEnter = function() {
            enterHandler();
        };
        
        this.emulateExit = function() {
            exitHandler();
        };
        
        // Constructor
        
        (function() {
            group.style.display = "inline-block";
            
            for (var i = 0; i < buttons.length; i++) {
                group.appendChild(buttons[i].elmt);
            }
            
            tracker.enterHandler = enterHandler;
            tracker.exitHandler = exitHandler;
            tracker.releaseHandler = releaseHandler;
            
            tracker.setTracking(true);
        })();
        
    };
});