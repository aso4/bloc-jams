var animatePoints = function () {
    "use strict";
    var i, points = document.getElementsByClassName('point'),
        revealPoint = function (point) {
            point.style.opacity = 1;
            point.style.transform = "scaleX(1) translateY(0)";
            point.style.msTransform = "scaleX(1) translateY(0)";
            point.style.WebkitTransform = "scaleX(1) translateY(0)";
            point.style.transitionDelay = ".5s";
            //points.style.backgroundColor = "rgba(255, 255, 255, .1)";
            //points.style.borderRadius = "5%";
        };
    for (i = 0; i < points.length; i++) {
        revealPoint(points[i]);
    }
};
