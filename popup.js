(function () {
	var el,
		script = document.getElementsByTagName('script')[0],
		buttons,
		settings,
		settingOpen = false,
		saveEditBtn,
		widths,
		closeAfter = localStorage.close === "true" ? true : false;

	// load saved settings or configure new ones
	if (!closeAfter) {
		localStorage.close = false;
	}
	if (!localStorage.settings) {
		widths = [320, 640, 960, 'maximized', 'fullscreen'];
		localStorage.settings = widths;
	} else {
		widths = localStorage.settings.split(',');
	}

	el = document.createElement('a');
	el.className = 'close';
	el.addEventListener('click', function (e) {
		e.preventDefault();
		window.close();
	});
	script.parentNode.insertBefore(el, script);

	settings = document.createElement('textarea');
	settings.className = 'hidden';
	settings.value = widths;
	settings.title = 'Comma seperated list of sizes, can include "maximized" or "fullscreen"';
	script.parentNode.insertBefore(settings, script);

	saveEditBtn = document.createElement('a');
	saveEditBtn.className = 'save';
	saveEditBtn.innerHTML = 'Change widths';
	saveEditBtn.href = '#';
	saveEditBtn.addEventListener('click', function (e) {
		e.preventDefault();
		if (settingOpen) {
			saveEditBtn.innerHTML = 'Change widths';
			settingOpen = false;
			settings.className = 'hidden';
			// add new settings and replace current buttons
			widths = settings.value.split(',');
			localStorage.settings = widths;
			buttons.innerHTML = '';
			setButtons();
		} else {
			saveEditBtn.innerHTML = 'Save';
			settingOpen = true;
			settings.className = '';
		}
	});
	script.parentNode.insertBefore(saveEditBtn, script);


	buttons = document.createElement('div');
	script.parentNode.insertBefore(buttons, script);

	// populate buttons based on settings
	function setButtons () {
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
					view = { width: width + 16, height: 835, top: 10, left: 20 } // 16 is the difference between the browser size and the viewport
				} else {
					view = { state: this.dataset.width } 
				}
				chrome.windows.update(chrome.windows.WINDOW_ID_CURRENT, view);
				if (closeAfter) {
					window.close();
				}
			});
			buttons.appendChild(el);		
		}
	}
	setButtons();

	el = document.createElement('hr');
	script.parentNode.insertBefore(el, script);

	el = document.createElement('input');
	el.type = 'checkbox';
	el.checked = closeAfter;
	el.id = 'closeafter';
	el.title = 'Close this popup after resize';
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

