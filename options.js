(function () {
    var diff = parseFloat(localStorage.diff),
        calcDiff = window.outerWidth - window.innerWidth,
        output = document.querySelectorAll('.diff')[0],
        input = document.getElementById('diff'),
        btn = document.querySelectorAll('.btn')[0];

    if (!diff) {
        localStorage.diff = 16;
        diff = 16;
    }
    output.innerText = calcDiff;
    input.value = calcDiff;
    btn.addEventListener('click', function (e) {
        e.preventDefault();
        diff = input.value;
        if (diff) {
            output.innerText = diff;
            localStorage.diff = diff;
        }
    });
})();