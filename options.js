(function () {
    var diff = parseFloat(localStorage.diff),
        calcDiff = window.outerWidth - window.innerWidth,
        output = document.querySelectorAll('.diff')[0],
        inputDiff = document.getElementById('diff'),
        inputOptions = document.getElementById('options'),
        btnDiff = document.querySelectorAll('.btnDiff')[0],
        btnOptions = document.querySelectorAll('.btnOptions')[0],
        // The scrollbar on Windows affects the width, OSX doesn't have this problem
        isMac = (window.navigator.platform == "MacIntel") ? true : false;

    function savedText () {
        var saved = document.createElement('span');
        saved.innerText = 'saved';
        saved.className = 'saved';
        return saved;
    }

    if (isMac) {
        document.getElementsByTagName('body')[0].className = 'osx';
    }

    if (!diff) {
        // no scrollbar width on Mac
        if (isMac) {
            diff = 0;
        } else {
            diff = 16;
        }
        localStorage.diff = diff;
    }
    output.innerText = calcDiff;
    inputDiff.value = calcDiff;
    if (!localStorage.settings) {
        localStorage.settings = [320, 640, 960, 'maximized', 'fullscreen'];
    }
    inputOptions.value = '320,640,960,maximized,fullscreen';
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