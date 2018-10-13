function doubleSlider() {

    var width = 100;
    var valueL = 0.0;
    var valueR = 1.0;
    var event;
    var x = 0;
    var y = 0;

    function slider(selection) {
        function drawLine(x1, x2, strokeColor, selection) {
            return selection.append("line")
                .attr("x1", x1)
                .attr("x2", x2)
                .attr("y1", y)
                .attr("y2", y)
                .style({
                    "stroke": strokeColor,
                    "stroke-linecap": "round",
                    "stroke-width": 6
                });
        }

        // 現在の値を表す線
        var valueLine = drawLine(
            x + (width * valueL),
            x + (width * valueR),
            "#00FF00",
            selection
        );

        var emptyLineL = drawLine(
            x,
            x + (width * valueL),
            "#ECECEC",
            selection
        );

        var emptyLineR = drawLine(
            x + (width * valueR),
            x + (width * 1.0),
            "#ECECEC",
            selection
        );


        // ドラッグできる
        var dragL = d3.behavior.drag().on("drag", function () {
            var newX = d3.mouse(this)[0];
            if (newX < x) {
                newX = x;
            }
            else if (newX > x + width) {
                newX = x + width;
            }

            valueL = (newX - x) / width;
            valueCircleL.attr("cx", newX);
            valueLine.attr("x1", x + (width * valueL));
            emptyLineL.attr("x2", x + (width * valueL));

            if (event) {
                event();
            }

            d3.event.sourceEvent.stopPropagation();
        })

        function drawCircle(x, y, strokeColor, selection) {
            return selection.append("circle")
                .attr("cx", x)
                .attr("cy", y)
                .attr("r", 15)
                .style({
                    "stroke": strokeColor,
                    "stroke-width": 1.0,
                    "fill": "white"
                });
        }

        // 要素を作り、それをドラッグ可能に指定
        var valueCircleL = drawCircle(
            x + (width * valueL), y, "black", selection
        ).call(dragL);

        // ドラッグできる
        var dragR = d3.behavior.drag().on("drag", function () {
            var newX = d3.mouse(this)[0];
            // 上下除去
            if (newX < x) {
                newX = x;
            }
            else if (newX > x + width) {
                newX = x + width;
            }

            valueR = (newX - x) / width;
            valueCircleR.attr("cx", newX);
            valueLine.attr("x2", x + (width * valueR));
            emptyLineR.attr("x1", x + (width * valueR));

            if (event) {
                event();
            }

            d3.event.sourceEvent.stopPropagation();
        })

        var valueCircleR = drawCircle(
            x + (width * valueR), y, "black", selection
        ).call(dragR);

    }


    slider.x = function (val) {
        x = val;
        return slider;
    }

    slider.y = function (val) {
        y = val;
        return slider;
    }

    slider.value = function (valL, valR) {
        if (valL != null && valR != null) {
            valueL = valL;
            valueR = valR;
            return slider;
        } else {
            return { l: valueL, r: valueR };
        }
    }

    slider.width = function (val) {
        width = val;
        return slider;
    }

    slider.event = function (val) {
        event = val;
        return slider;
    }

    return slider;
}
