var Graph = function(data) {
  
  var heights = data.votes || [150, 30, 40, 10, 51, 70, 100, 140];
  var data = {x: 40, heights: heights};

  var bars = [];
  var $barGraph = $('.barGraph');
  var barGraphHeight = $barGraph.innerHeight();
  var maxDataHeight  = Math.max.apply(null, data.heights);
  var multFactor     = (barGraphHeight - 30) / maxDataHeight;
  
  function Bar(height, left) {
    this.height = Math.floor(height * multFactor / barGraphHeight * 100);
    this.left   = left;
    this.el = $('<div class="bar">');    
  }
  
  data.heights.forEach(function(height, idx) {
    var b = new Bar(height, data.x * idx);
    bars.push(b);
    $barGraph.append(b.el); 
  });
  
  return function() {
    for(var i = 0; i < bars.length; i++) {
      setTimeout(function(bar) {
        return function() {
          $(bar.el).css({left: bar.left + 'px'})
            .animate({height: bar.height + '%'},500);
        };
      }(bars[i]),200*i);
    }
  };
};    