//1485 dudley st @ langdon st
//1498 dudley st @ dennis st
(function() {
	var updateInterval = 65000,
		numImages = 3,
		slideshowInterval = 10000,
		currentSlide,
		currentElement,
		touchInterval = 4000,
		languages = ['english','spanish','portuguese'],
		currentLanguage = 0,
		touchLeft,
		$allLanguages = $('.languages span'),
		$touchLeft = $('.touchLeft'),
		$touchRight = $('.touchRight'),
		touchShowing;

	function _update() {
		$mbta.getPredictions(15, function(err,results) {
			if(err) {
				console.log(err);
			} else {
				var sortedLangdon = _sortByMinutes(results['1485']),
					sortedDennis = _sortByMinutes(results['1498']),
					nextLangdon = sortedLangdon[0],
					nextDennis = sortedDennis[0];

				$('.stop1485 .bus15 .minutes span').text(nextLangdon.minutes);
				$('.stop1498 .bus15 .minutes span').text(nextDennis.minutes);
				$('.stop1485 .bus15 .text').text(nextLangdon.title);
				$('.stop1498 .bus15 .text').text(nextDennis.title);

				//add color
				$('.stop1485 .bus15 .minutes').removeClass('prox1 prox2 prox3 prox4 prox5');
				$('.stop1498 .bus15 .minutes').removeClass('prox1 prox2 prox3 prox4 prox5');
				if(nextLangdon.minutes < 3) {
					$('.stop1485 .bus15 .minutes').addClass('prox1');
				} else if(nextLangdon.minutes < 7) {
					$('.stop1485 .bus15 .minutes').addClass('prox2');
				} else if(nextLangdon.minutes < 13) {
					$('.stop1485 .bus15 .minutes').addClass('prox3');
				} else if(nextLangdon.minutes < 20) {
					$('.stop1485 .bus15 .minutes').addClass('prox4');
				} else {
					$('.stop1485 .bus15 .minutes').addClass('prox5');
				}
				if(nextDennis.minutes < 3) {
					$('.stop1498 .bus15 .minutes').addClass('prox1');
				} else if(nextDennis.minutes < 7) {
					$('.stop1498 .bus15 .minutes').addClass('prox2');
				} else if(nextDennis.minutes < 13) {
					$('.stop1498 .bus15 .minutes').addClass('prox3');
				} else if(nextDennis.minutes < 20) {
					$('.stop1498 .bus15 .minutes').addClass('prox4');
				} else {
					$('.stop1498 .bus15 .minutes').addClass('prox5');
				}
			}
		});
		$mbta.getPredictions(41, function(err, results) {
			if(err) {
				console.log(err);
			} else {
				var sortedLangdon = _sortByMinutes(results['1485']),
					sortedDennis = _sortByMinutes(results['1498']),
					nextLangdon = sortedLangdon[0],
					nextDennis = sortedDennis[0];

				$('.stop1485 .bus41 .minutes span').text(nextLangdon.minutes);
				$('.stop1498 .bus41 .minutes span').text(nextDennis.minutes);
				$('.stop1485 .bus41 .text').text(nextLangdon.title);
				$('.stop1498 .bus41 .text').text(nextDennis.title);

				$('.stop1485 .bus41 .minutes').removeClass('prox1 prox2 prox3 prox4 prox5');
				$('.stop1498 .bus11 .minutes').removeClass('prox1 prox2 prox3 prox4 prox5');
				if(nextLangdon.minutes < 3) {
					$('.stop1485 .bus41 .minutes').addClass('prox1');
				} else if(nextLangdon.minutes < 7) {
					$('.stop1485 .bus41 .minutes').addClass('prox2');
				} else if(nextLangdon.minutes < 13) {
					$('.stop1485 .bus41 .minutes').addClass('prox3');
				} else if(nextLangdon.minutes < 20) {
					$('.stop1485 .bus41 .minutes').addClass('prox4');
				} else {
					$('.stop1485 .bus41 .minutes').addClass('prox5');
				}
				if(nextDennis.minutes < 3) {
					$('.stop1498 .bus41 .minutes').addClass('prox1');
				} else if(nextDennis.minutes < 7) {
					$('.stop1498 .bus41 .minutes').addClass('prox2');
				} else if(nextDennis.minutes < 13) {
					$('.stop1498 .bus41 .minutes').addClass('prox3');
				} else if(nextDennis.minutes < 20) {
					$('.stop1498 .bus41 .minutes').addClass('prox4');
				} else {
					$('.stop1498 .bus41 .minutes').addClass('prox5');
				}
			}
		});
		setTimeout(_update, updateInterval);
	}

	function _sortByMinutes(buses) {
		buses.sort(function(a, b){
			return b.minutes - a.minutes;
		});
		return buses;
	}

	function _loadImage(num) {
		var img = new Image();
		img.onload = function() {
			$('.slideshow').append(img);
			num++;
			if(num >= numImages) {
				_startSlideshow();
			} else {
				_loadImage(num);
			}
		};

		// img.src = '../img/screensaver' + num + '.png';
		img.src = 'http://placehold.it/720x360.png';
	}

	function _startSlideshow() {
		//show first image
		$('.slideshow img').first().show();
		currentSlide = 0;
		currentElement = $('.slideshow img').eq(currentSlide);
		//begin transition timeout
		setTimeout(_transitionSlideshow, slideshowInterval);
	}

	function _transitionSlideshow() {
		//fade out current image
		currentElement.fadeOut(function() {
			$(this).hide();
			currentSlide++;
			if(currentSlide >= numImages) {
				currentSlide = 0;
			}
			currentElement = $('.slideshow img').eq(currentSlide);
			currentElement.fadeIn();
			setTimeout(_transitionSlideshow, slideshowInterval);
		});
	}

	function _updateTouch() {
		//if it was showing, hide it, switch them
		if(touchShowing) {
			_hideTouch();
		} else {
			_showTouch();
		}

		touchShowing = !touchShowing;
		setTimeout(_updateTouch, touchInterval);
	}

	function _hideTouch() {
		//transition off current one
		if(touchLeft) {
			$touchLeft.transition({x: 0, y: 0}, 1000 , 'ease');
		} else {
			$touchRight.transition({x: 0, y: 0}, 1000 , 'ease');
		}

		//swap for next time and change language
		touchLeft = !touchLeft;
		currentLanguage++;

		if(currentLanguage >= languages.length) {
			currentLanguage = 0;
		}
	}

	function _showTouch() {
		//show next language
		var languageSel = $('.' + languages[currentLanguage]);
		$allLanguages.hide();
		languageSel.show();

		if(touchLeft) {
			$touchLeft.transition({x: 100, y: -200}, 1000 , 'ease');
		} else {
			$touchRight.transition({x: -100, y: -200}, 1000 , 'ease');
		}
	}
	//start it up!
	_update();
	_updateTouch();
	_loadImage(0);

})();
