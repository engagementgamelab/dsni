(function() {

	var baseUrl = 'http://webservices.nextbus.com/service/publicXMLFeed?command=predictionsForMultiStops&a=mbta',
		updateInterval = 60000;
	//1485 dudley st @ langdon st
	//1498 dudley st @ dennis st
	function _getStatus(route) {
		var url = baseUrl + '&stops=' + route + '|1485&stops=' + route +  '|1498';
		$.get(url, function(xml) {

			var json = $.xml2json(xml);

			//go thru both stops
			for(var i = 0; i < json.predictions.length; i++) {
				var stop = json.predictions[i],
					stopId = stop.stopTag;

				// console.log(stop);
				//go thru each bus destination (make sure there is more than one before we iterate)
				var directions = [];
				if(stop.direction.length) {
					directions = stop.direction;
				} else {
					directions.push(stop.direction);
				}

				for(var d = 0; d < directions.length; d++) {
					var dir = directions[d],
						busTitle = dir.title.toLowerCase(),
						prediction;
					
					// console.log(busTitle);	
					//grab the upcoming prediction (there can be multiples)
					if(dir.prediction.length) {
						prediction = dir.prediction[0];
					} else {
						prediction = dir.prediction;
					}

					//get selector to update data
					var selText = busTitle.replace(/[^a-zA-Z]/g, '');
					selText = selText.replace(/ +?/g, '');
					
					var	selector = $('.' + selText + ' .minutes'),
						selectorNoData = $('.' + selText + ' .nodata');

					var text = 'arriving in ' + prediction.minutes + ' minutes';
					selector.text(text).show();
					selectorNoData.hide();
				}
			}
		});
	}

	function _update() {
		//put up no data available in case
		$('.nodata').show();
		$('.minutes').hide();

		_getStatus(15);
		_getStatus(41);
		setTimeout(_update, updateInterval);
	}
	
	_update();
   // $.ajax({
   //      url: ,
   //      dataType: 'json'
   //  }).done(function (source) {
   //      _countriesArray = source;
   //      $('#country1').autocomplete({
   //          lookup: _countriesArray,
   //          onSelect: function (suggestion) {
   //              _lookupCountryCode1 = suggestion.data.toLowerCase();
   //              console.log(_lookupCountryCode1);
   //          }
   //      });
    
})();

// backup http://proximobus.appspot.com/