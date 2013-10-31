//1485 dudley st @ langdon st
//1498 dudley st @ dennis st
(function() {
	var updateInterval = 65000;
	function _update() {
		$('.minutes').removeClass('prox1, prox2, prox3, prox4, prox5');
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
				if(nextLangdon.minutes < 3) {
					$('.stop1485 .bus15 .minutes').addClass('prox1');
				} else if(nextLangdon.minutes < 7) {
					$('.stop1485 .bus15 .minutes').addClass('prox2');
				} else if(nextLangdon.minutes < 11) {
					$('.stop1485 .bus15 .minutes').addClass('prox3');
				} else if(nextLangdon.minutes < 15) {
					$('.stop1485 .bus15 .minutes').addClass('prox4');
				} else {
					$('.stop1485 .bus15 .minutes').addClass('prox5');
				}
				if(nextDennis.minutes < 3) {
					$('.stop1498 .bus15 .minutes').addClass('prox1');
				} else if(nextDennis.minutes < 7) {
					$('.stop1498 .bus15 .minutes').addClass('prox2');
				} else if(nextDennis.minutes < 11) {
					$('.stop1498 .bus15 .minutes').addClass('prox3');
				} else if(nextDennis.minutes < 15) {
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

				if(nextLangdon.minutes < 3) {
					$('.stop1485 .bus41 .minutes').addClass('prox1');
				} else if(nextLangdon.minutes < 7) {
					$('.stop1485 .bus41 .minutes').addClass('prox2');
				} else if(nextLangdon.minutes < 11) {
					$('.stop1485 .bus41 .minutes').addClass('prox3');
				} else if(nextLangdon.minutes < 15) {
					$('.stop1485 .bus41 .minutes').addClass('prox4');
				} else {
					$('.stop1485 .bus41 .minutes').addClass('prox5');
				}
				if(nextDennis.minutes < 3) {
					$('.stop1498 .bus41 .minutes').addClass('prox1');
				} else if(nextDennis.minutes < 7) {
					$('.stop1498 .bus41 .minutes').addClass('prox2');
				} else if(nextDennis.minutes < 11) {
					$('.stop1498 .bus41 .minutes').addClass('prox3');
				} else if(nextDennis.minutes < 15) {
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

	_update();
})();
