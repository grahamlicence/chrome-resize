(function () {
    var diff = parseFloat(localStorage.diff),
        calcDiff = window.outerWidth - window.innerWidth,
        output = document.querySelectorAll('.diff')[0],
        inputDiff = document.getElementById('diff'),
        inputOptions = document.getElementById('options'),
        btnDiff = document.querySelectorAll('.btnDiff')[0],
        btnOptions = document.querySelectorAll('.btnOptions')[0];

    function savedText () {
        var saved = document.createElement('span');
        saved.innerText = 'saved';
        saved.className = 'saved';
        return saved;
    }

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
        var saved = savedText();
        diff = inputDiff.value;
        output.innerText = diff;
        localStorage.diff = diff;
        // add saved notification
        btnDiff.parentNode.appendChild(saved);
        setTimeout(function () {
            saved.style.opacity = 0;
            saved.addEventListener('transitionend', function () {
                saved.remove();
            }, false);
        }, 500);
    });
    // Save options
    btnOptions.addEventListener('click', function (e) {
        e.preventDefault();
        var saved = savedText();
        localStorage.settings = inputOptions.value.split(',');
        // add saved notification
        btnOptions.parentNode.appendChild(saved);
        setTimeout(function () {
            saved.style.opacity = 0;
            saved.addEventListener('transitionend', function () {
                saved.remove();
            }, false);
        }, 500);
    });
})();