	// LINE AND BARS CHARTS

$(function () {
  
  function generateNumber(min, max) {
    min = typeof min !== 'undefined' ? min : 1;
    max = typeof max !== 'undefined' ? max : 100;
    
    return Math.floor((Math.random() * max) + min);
  }

  var chart;
  

  
  
 
  
  $(document).ready(function() {
    let categories = ['Categorie 1', 'Categorie 2', 'Categorie 3', 'Categorie 4', 'Categorie 5','Categorie 6', 'Categorie 7', 'Categorie 8', 'Categorie 9', 'Categorie 10', 'Categorie 11', 'Categorie 12', 'Categorie 13', 'Categorie 14', 'Categorie 15', 'Categorie 16', 'Categorie 17', 'Categorie 18', 'Categorie 19','Categorie 20', 'Categorie 21','Categorie 22', 'Categorie 23', 'Categorie 24', 'Categorie 25', 'Categorie 26', 'Categorie 27', 'Categorie 28', 'Categorie 29', 'Categorie 30'],
    $aapls;
    //let serie3 = [13, 13, 46, 61, 23,12, 24, 16, 14, 12, 12, 24, 19, 13, 11, 11, 14, 11, 11, 11, 11, 13, 22, 10, 18, 15, 24, 31, 19, 10]
    let serie2 = [52, 41, 58, 63, 55, 46, 45, 41, 38, 54, 50, 39, 48, 70, 63, 60, 58, 63, 83, 89, 83, 79, 83, 100, 104, 108, 52, 46, 83, 89];
    let serie1=[];

   

    database.ref("alltemp").limitToLast(30).on("value",function(snap){
      let avg=0;
      let i=1;
      snap.forEach(element => {
        //console.log(element.val());
        serie1.push(parseInt(element.val()));
        avg=avg+parseInt(element.val());
        i++;
      });

      $("#avg-bit").text(parseInt(avg/i)+".00");

      chartPrint(serie1,serie2,categories);

      serie1=[];
      chart.series[0].addPoint(generateNumber(), true, true);
      chart.series[1].addPoint(generateNumber(50, 150), true, true);
    })
    
    setInterval(function() {
      $('.info-aapl span').each(function(index, elem) {
        $(elem).animate({
          height: generateNumber(1, 40)
        });
      });

    }, 3000);
  });
  
});

function chartPrint(serie1,serie2,categories){
  chart = new Highcharts.Chart({
    chart: {
      renderTo: 'importantchart',
      type: 'column',
      backgroundColor: 'transparent',
      height: 140,
      marginLeft: 3,
      marginRight: 3,
      marginBottom: 0,
      marginTop: 0
    },
    title: {
      text: ''
    },
    xAxis: {
      lineWidth: 0,
      tickWidth: 0,
      labels: { 
        enabled: false 
      },
      categories: categories
    },
    yAxis: {
      labels: { 
        enabled: false 
      },
      gridLineWidth: 0,
      title: {
        text: null,
      },
    },
    series: [{
      name: 'Awesomness',
      data: serie1
    }, {
      name: 'More Awesomness',
      color: '#E8394F',
      type: 'line',
      data: serie2
    }],
    credits: { 
      enabled: false 
    },
    legend: { 
      enabled: false 
    },
    plotOptions: {
      column: {
        borderWidth: 0,
        color: '#b2c831',
        shadow: false
      },
      line: {
        marker: { 
          enabled: false 
        },
        lineWidth: 3
      }
    },
    tooltip: { 
      enabled: false
    }
  });
}
