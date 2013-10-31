//1485 dudley st @ langdon st
//1498 dudley st @ dennis st
(function() {
	var updateInterval = 65000;
	function _update() {
		$mbta.getPredictions(15, function(err,results) {
			if(err) {
				console.log(err);
			} else {
				var sortedLangdon = _sortByMinutes(results['1485']),
					sortedDennis = _sortByMinutes(results['1498']),
					nextLangdon = sortedLangdon[0],
					nextDennis = sortedDennis[0];

				var textL = nextLangdon.title + ' arriving in ' + nextLangdon.minutes + ' minutes',
					textD = nextDennis.title + ' arriving in ' + nextDennis.minutes + ' minutes';

				$('.stop1485 .bus15 .text').text(textL);
				$('.stop1498 .bus15 .text').text(textD);
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

				var textL = nextLangdon.title + ' arriving in ' + nextLangdon.minutes + ' minutes',
				textD = nextDennis.title + ' arriving in ' + nextDennis.minutes + ' minutes';

				$('.stop1485 .bus41 .text').text(textL);
				$('.stop1498 .bus41 .text').text(textD);
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
