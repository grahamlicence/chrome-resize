(function () {
	var el,
		script = document.getElementsByTagName('script')[0],
		widths = [320, 640, 960, 'maximized', 'fullscreen'], //TODO configure options and save in localStorage
		closeAfter = localStorage.close === "true" ? true : false;

	if (!closeAfter) {
		closeAfter = false;
		localStorage.close = false;
	}

	el = document.createElement('a');
	el.className = 'close';
	el.addEventListener('click', function (e) {
		e.preventDefault();
		window.close();
	});
	script.parentNode.insertBefore(el, script);

	for (var i = 0, l = widths.length; i < l; i += 1) {
		el = document.createElement('a');
		el.innerHTML = widths[i];
		el.href = '#';
		el.dataset['width'] = widths[i];
		d = widths[i];
		el.addEventListener('click', function (e) {
			e.preventDefault();
			var width = parseFloat(this.dataset.width),
				view;

			if (width) {
				view = { width: width, height: 835, top: 10, left: 20 }
			} else {
				view = { state: this.dataset.width }
			}
			chrome.windows.update(chrome.windows.WINDOW_ID_CURRENT, view);
			if (closeAfter) {
				window.close();
			}
		});
		script.parentNode.insertBefore(el, script);		
	}

	el = document.createElement('hr');
	script.parentNode.insertBefore(el, script);

	el = document.createElement('input');
	el.type = 'checkbox';
	el.checked = closeAfter;
	el.id = 'closeafter';
	el.addEventListener('click', function () {
		localStorage.close = this.checked;
		closeAfter = this.checked;
		return false;
	});
	script.parentNode.insertBefore(el, script);

	el = document.createElement('label');
	el.htmlFor = 'closeafter';
	el.innerHTML = 'Close after';
	script.parentNode.insertBefore(el, script);
})();

