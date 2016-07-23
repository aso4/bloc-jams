var animatePoints = function () {
    //"use strict";
    var i, points = document.getElementsByClassName('point'),
        revealPoint = function () {
            for (i = 0; i < points.length; i++) {

                points[i].style.opacity = 1;
                points[i].style.transform = "scaleX(1) translateY(0)";
                points[i].style.msTransform = "scaleX(1) translateY(0)";
                points[i].style.WebkitTransform = "scaleX(1) translateY(0)";
                points[i].style.transitionDelay = ".5s";
                points[i].style.backgroundColor = "rgba(255, 255, 255, .1)";
                points[i].style.borderRadius = "5%";
            }
        };
    revealPoint(points);
};
