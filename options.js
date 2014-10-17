(function () {
    var diff = parseFloat(localStorage.diff),
        calcDiff = window.outerWidth - window.innerWidth,
        output = document.querySelectorAll('.diff')[0],
        inputDiff = document.getElementById('diff'),
        inputOptions = document.getElementById('options'),
        btnDiff = document.querySelectorAll('.btnDiff')[0],
        btnOptions = document.querySelectorAll('.btnOptions')[0];

    if (!diff) {
        localStorage.diff = 16;
        diff = 16;
    }
    output.innerText = calcDiff;
    inputDiff.value = calcDiff;
    inputOptions.value = localStorage.settings.split(',');
    // Save width diff
    btnDiff.addEventListener('click', function (e) {
        e.preventDefault();
        diff = inputDiff.value;
        if (diff) {
            output.innerText = diff;
            localStorage.diff = diff;
        }
    });
    // Save options
    btnOptions.addEventListener('click', function (e) {
        e.preventDefault();
        localStorage.settings = inputOptions.value.split(',');
    });
})();