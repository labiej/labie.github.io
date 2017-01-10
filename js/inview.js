/*! inViewport 0.0.2
 *  jQuery plugin by Moob
 *  Edited by Joris Labie, adding throttle
 * ========================
 *  (requires jQuery)
 */

// comment for the sake of comments

var getTimestamp = Date.now || function() {
    return new Date().getTime();
  };

throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
      previous = options.leading === false ? 0 : getTimestamp();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function() {
      var now = getTimestamp();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };


(function ($) {

    var vph=0;
    function getViewportDimensions(){
        vph = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    }
    getViewportDimensions();
    //on resize/scroll
    $(window).on('resize orientationChanged', function(){
        getViewportDimensions();
    });

    $.fn.inViewport = function (whenInView, whenNotInView) {
        return this.each(function () {
            var el = $(this),
                inviewalreadycalled = false,
                notinviewalreadycalled = false;
            //on resize/scroll
						var throttledCheck = throttle( checkInView, 1000 );
            $(window).on('resize orientationChanged scroll', throttledCheck);
            function checkInView(){
                var rect = el[0].getBoundingClientRect(),
                    t = rect.top,
                    b = rect.bottom;
                if(t<vph && b>0){
                    if(!inviewalreadycalled){
                        whenInView.call(el);
                        inviewalreadycalled = true;
                        notinviewalreadycalled = false;
                    }
                } else {
                    if(!notinviewalreadycalled){
                        whenNotInView.call(el);
                        notinviewalreadycalled = true;
                        inviewalreadycalled = false;
                    }
                }
            }
            //initial check
            checkInView();
        });
    }
}(jQuery));
