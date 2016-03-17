$(function() {

	var start = moment(date_start, 'YYYY-MM-DD');
	var stop  = moment(date_stop, 'YYYY-MM-DD');

	var start_month = start.month();

	var stop_month = stop.month();

	var drw_start = moment({
		year: start.year(),
		month: start_month, 
		day: 1
	});

	var drw_stop = moment({
		year: stop.year(),
		month: stop_month
	});

	drw_stop = drw_stop.endOf('month');

	var loop_counter = moment(drw_start);

	// First year label
	var start_year = start.year();
	$('.cal').append('<h1>'+start_year+'</h1><hr>');

	// Month loop
	while (loop_counter.isBefore(drw_stop)) {
		if(loop_counter.year() != start_year){
			start_year = loop_counter.year();
			$('.cal').append('<h1>'+start_year+'</h1><hr>')
		}
		$('.cal').append(createMonth(loop_counter))
		loop_counter.add(1, 'M');
	}

	jsonx= null;


	// Month
	function createMonth(d){
		var start_date = moment(d);
		var start_fill = start_date.day();
		var num_days = start_date.daysInMonth();
		var post_fill  = 42-(num_days+start_fill)
		var month_name = start_date.format('MMM').toUpperCase();

		var r = '<div class="c_col">';
		r += '<h2>'+month_name+'</h2>';
		for (var i = 0; i < start_fill; i++) {
			r += '<div class="lb">&nbsp;</div>';			
		}
		for (var i = 1; i <= num_days; i++) {

			r += dayData(i, moment({
				year: start_date.year(),
				month: start_date.month(), 
				day: i
			}).format('YYYYMMDD'));
		
		}
		for (var i = 0; i < post_fill; i++) {
			r += '<div class="lb">&nbsp;</div>';			
		}
		r += '</div>';
		return r;
	}

	function dayData(day, x){
		var rin = '';
		var bk='';
		var ch='';
		if(jsonx[x]){
			bk = ' style="background-image: url(//i.ytimg.com/vi/'+jsonx[x][0].i+'/mqdefault.jpg); background-size: cover;"';
			ch=' class="in"';
			for (var i = 0; i < jsonx[x].length; i++) {
				rin+= '<p><a href="http://youtu.be/'+jsonx[x][i].i+'">'+jsonx[x][i].t+'</a></p>'
			}
		}
		var r = '<div class="lb"'+bk+'>';
		r += '<h3'+ch+'>'+day+'</h3>';
		r+= rin;
		r += '</div>';
		return r;
	}


	
});
