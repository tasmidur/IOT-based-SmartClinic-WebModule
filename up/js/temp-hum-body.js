/*** First Chart in Dashboard page ***/

$(document).ready(function() {
	
//printTempeature(50);
		// temperature
database.ref('temp').on('value',(snap)=>{
	// console.log(snap.val());
	//let data=parseInt(snap.val());
	printTempeature(snap.val());
	
  });


  // humidity
  //printHumidity(50);
  database.ref('hum').on('value',(snap)=>{
	// console.log(snap.val());
	printHumidity(snap.val());
	
  });
  

//printBodyTempeature(30);
  database.ref('bodytemp').on('value',(snap)=>{
	// console.log(snap.val());
	printBodyTempeature(snap.val());
  });	

});

	function printTempeature(temp){
		let rest_temp=100-parseInt(temp);

		$("#temp").text(temp+" C");

		info = new Highcharts.Chart({
			chart: {
				renderTo: 'temp-graph',
				margin: [0, 0, 0, 0],
				backgroundColor: null,
                plotBackgroundColor: 'none',
							
			},
			
			title: {
				text: null
			},

			tooltip: {
				formatter: function() { 
					return this.point.name +': '+ this.y +' %';
						
				} 	
			},
		    series: [
				{
				borderWidth: 2,
				borderColor: '#F1F3EB',
				shadow: false,	
				type: 'pie',
				name: 'Income',
				innerSize: '55%',
				data: [
					{ name: 'temp-graph percentage', y: temp, color: '#b6d861'},
					{ name: 'rest', y: rest_temp, color: '#3d3d3d' }
				],
				dataLabels: {
					enabled: false,
					color: '#000000',
					connectorColor: '#000000'
				}
			}]
		});
	}

	function printHumidity(hum){

		let rest_hum=100-parseInt(hum);
		$("#hum").text(hum+" %");

		info = new Highcharts.Chart({
			chart: {
				renderTo: 'hum-graph',
				margin: [0, 0, 0, 0],
				backgroundColor: null,
                plotBackgroundColor: 'none',
							
			},
			
			title: {
				text: null
			},

			tooltip: {
				formatter: function() { 
					return this.point.name +': '+ this.y +' %';
						
				} 	
			},
		    series: [
				{
				borderWidth: 2,
				borderColor: '#F1F3EB',
				shadow: false,	
				type: 'pie',
				name: 'SiteInfo',
				innerSize: '65%',
				data: [
					{ name: 'Used', y: hum, color: '#FFCB2C' },
					{ name: 'Rest', y: rest_hum, color: '#3d3d3d' }
				],
				dataLabels: {
					enabled: false,
					color: '#000000',
					connectorColor: '#000000'
				}
			}]
		});
	}

	function printBodyTempeature(bodytemp){
		let rest_bodytemp=100-parseInt(bodytemp);
		$("#patient-body-temp").text(bodytemp+" F");

		info = new Highcharts.Chart({
			chart: {
				renderTo: 'patient-body-temp-graph',
				margin: [0, 0, 0, 0],
				backgroundColor: null,
                plotBackgroundColor: 'none',
							
			},
			
			title: {
				text: null
			},

			tooltip: {
				formatter: function() { 
					return this.point.name +': '+ this.y +' %';
						
				} 	
			},
		    series: [
				{
				borderWidth: 2,
				borderColor: '#F1F3EB',
				shadow: false,	
				type: 'pie',
				name: 'SiteInfo',
				innerSize: '65%',
				data: [
					{ name: 'Used', y: bodytemp, color: '#2CA8D2' },
					{ name: 'Rest', y: rest_bodytemp, color: '#3d3d3d' }
				],
				dataLabels: {
					enabled: false,
					color: '#000000',
					connectorColor: '#000000'
				}
			}]
		});
	}


