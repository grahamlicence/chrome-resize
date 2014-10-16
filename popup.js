(function () {
	var el,
		script = document.getElementsByTagName('script')[0],
		buttons,
		settings,
		settingOpen = false,
		saveEditBtn,
		widths,
		isMax = true, // is the window maximised/fullscreen?
		defaultState = {
			top: 20,
			left: 20,
			height: 500
		},
		diff = parseFloat(localStorage.diff), // pixel difference between content (with scrollbars) and the actual window width
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

	// get stored difference
	if (!diff) {
        localStorage.diff = 16;
        diff = 16;
    }

	// add close button
	el = document.createElement('a');
	el.className = 'close';
	el.addEventListener('click', function (e) {
		e.preventDefault();
		window.close();
	});
	script.parentNode.insertBefore(el, script);

	// Add textarea for size editing
	settings = document.createElement('textarea');
	settings.className = 'hidden';
	settings.value = widths;
	settings.title = 'Comma seperated list of sizes, can include "maximized" or "fullscreen"';
	script.parentNode.insertBefore(settings, script);

	// Add button to save or edit widths
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

	// Add container for width buttons
	buttons = document.createElement('div');
	buttons.className = 'buttons';
	script.parentNode.insertBefore(buttons, script);

	// Change the window width
	function changeWidth (e) {
		e.preventDefault();
		var width = parseFloat(this.dataset.width),
			view,
			// window position
			winHeight,
			winTop,
			winLeft;

		// get current diff
		diff = parseFloat(localStorage.diff);

		// Check if width a number or fullscreen/maximised
		if (width) {
			// get current window object
			chrome.windows.get(chrome.windows.WINDOW_ID_CURRENT, function(win) {
				// console.log(win)
				
				// Get window position
				if (isMax) {
					// returning from maximised/fullscreen so use stored position
					winHeight = defaultState.height;
					winTop = defaultState.top;
					winLeft = defaultState.left;
				} else {
					winHeight = win.height;
					winTop = win.top;
					winLeft = win.left;
					// store window position 
					defaultState.top = win.top;
					defaultState.left = win.left;
					defaultState.height = win.height;
				}
				
				view = { width: width + diff, height: winHeight, top: winTop, left: winLeft };
				// resize window
				chrome.windows.update(chrome.windows.WINDOW_ID_CURRENT, view);

				if (closeAfter) {
					window.close();
				}
				isMax = false;
			});
		} else {
			// set window to fullscreen/maximised
			chrome.windows.update(chrome.windows.WINDOW_ID_CURRENT, { state: this.dataset.width });
			isMax = true;
		}

	}

	// populate buttons based on saved settings
	function setButtons () {
		for (var i = 0, l = widths.length; i < l; i += 1) {
			el = document.createElement('a');
			el.innerHTML = widths[i];
			el.href = '#';
			el.dataset['width'] = widths[i];
			d = widths[i];
			el.addEventListener('click', changeWidth);
			buttons.appendChild(el);
		}
	}
	setButtons();

	// Add option to close popup after width change
	el = document.createElement('input');
	el.type = 'checkbox';
	el.checked = closeAfter;
	el.id = 'closeafter';
	el.title = 'Close this popup after resize';
	el.addEventListener('click', function () {
		// Save change in setting
		localStorage.close = this.checked;
		closeAfter = this.checked;
	});
	script.parentNode.insertBefore(el, script);

	el = document.createElement('label');
	el.htmlFor = 'closeafter';
	el.innerHTML = 'Close after';
	script.parentNode.insertBefore(el, script);

	// find out what the current window state is and store the position
	chrome.windows.get(chrome.windows.WINDOW_ID_CURRENT, function(win) {
		if (win.state === 'normal') {
			isMax = false;
			// store window position
			defaultState.top = win.top;
			defaultState.left = win.left;
			defaultState.height = win.height;
		}
	});
})();



