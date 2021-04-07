sessionStorage.setItem("max", "0");
        alert("higest score is " + sessionStorage.getItem("max"));
        // var btn = document.getElementById('start');
        var r1 = document.getElementById('r1');
        var r2 = document.getElementById('r2');
        var bar = document.getElementById('bar');
        var box = document.getElementById('box');
        var score = document.getElementById('score');
        bar.style.left = "350px";
        var stop;
        window.addEventListener("keypress", function (event) {
            if (event.keyCode == 13) {
                stop = setInterval(move, 20);
            }
            if (event.keyCode == 65 || event.keyCode == 97) {
                var left = parseInt(bar.style.left);
                if (left == "") {
                    left = 0;
                }
                if (left >= 5) {
                    left = left - 10;
                }
                bar.style.left = left + "px";
            }

            if (event.keyCode == 68 || event.keyCode == 100) {
                var left = parseInt(bar.style.left);
                var wide = box.offsetWidth;
                if (left < wide - 5 - bar.offsetWidth) {
                    left = left + 10;
                }
                bar.style.left = left + "px";
            }
        })

        var ball = document.getElementById('ball');
        var bcord = box.getBoundingClientRect();
        var bal = {
            x: 5,
            y: 5,
        }
        ball.style.left = "450px";
        ball.style.top = (box.offsetHeight - 48) + "px";

        function reset() {
            ball.style.left = "450px";
            ball.style.top = (box.offsetHeight - 48) + "px";
            bal.x = 5;
            bal.y = 5;
            bar.style.left = "350px";
            alert("higest score is " + sessionStorage.getItem("max"));
            score.innerHTML = "0";
        }

        function move() {
            var cord = ball.getBoundingClientRect();
            var barc = bar.getBoundingClientRect();
            if ((cord.top <= bcord.top + 34) || (cord.top >= box.offsetHeight - 34)) {
                var flag = 0;
                if (cord.left == barc.left) {
                    bal.x = -5;
                    flag = 1;
                }
                if (cord.left == barc.left + 200) {
                    bal.x = 5;
                    flag = 1;
                }
                if (cord.left > barc.left && cord.left < barc.left + 200) {
                    bal.y *= -1;
                    flag = 1;
                }
                if (flag == 1) {
                    var point = parseInt(score.innerHTML);
                    score.innerHTML = point + 10;
                }
            }
            if ((cord.left - 10 <= bcord.left) || (cord.right + 10 >= bcord.right)) {
                bal.x *= -1;
            }
            if (cord.top - 10 <= bcord.top || cord.bottom - 10 >= bcord.bottom) {
                clearInterval(stop);
                alert("game up player 1 won");
                var point = parseInt(score.innerHTML);
                if (point > sessionStorage.getItem("max")) {
                    sessionStorage.setItem("max", point);
                }
                reset();
                return;
            }

            var left = parseInt(ball.style.left);
            var top = parseInt(ball.style.top);
            top -= bal.y;
            left += bal.x;
            ball.style.top = top + "px";
            ball.style.left = left + "px";
        }