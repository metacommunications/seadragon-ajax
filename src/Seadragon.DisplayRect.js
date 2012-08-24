//  This code is distributed under the included license agreement, also
//  available here: http://go.microsoft.com/fwlink/?LinkId=164943
define(["seadragon/Seadragon.Rect"], function(SeadragonRect) {


var SeadragonDisplayRect = function(x, y, width, height, minLevel, maxLevel) {
    
    // Inheritance
    
    SeadragonRect.apply(this, arguments);
    
    // Properties (extended)
    
    this.minLevel = minLevel;
    this.maxLevel = maxLevel;
    
};

SeadragonDisplayRect.prototype = new SeadragonRect();

return SeadragonDisplayRect;
});