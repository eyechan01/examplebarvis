var data1;
var data2;

var chartLeft = 180;
var chartRight = 620;
var chartTop = 200;
var chartBottom = 450;

var barWidth = 40;
var rowCount;

var selection;
var count = 0;

function preload() {
  data1 = loadTable("data/example1.csv", "csv");
  data2 = loadTable("data/example2.csv", "csv");
  }
 
function setup() {
  createCanvas(1000,1000)
  noLoop();

  fill(51);
  line(10, 125, 10, 285);
  stroke(51);

  textAlign(LEFT);
  background(200);
  sel = createSelect();
  sel.position(30,20);
  sel.option("Example 1");
  sel.option("Example 2");
  
  sel.changed(draw);
  }
 
function draw(){
  background(255);
  noStroke();
  textSize(10);

  selection = sel.value();

    fill(0);
  textAlign(CENTER);
  textSize(15);
  text(selection, 330, chartTop -15);
  if(selection == "Example 1"){
    stackedBar(data1);
  }
  else if (selection == "Example 2"){
    stackedBar(data2);
  }
  
  var counter = [];

  function stackedBar(data){
    fill(51);
    textSize(15);
    text("Key", chartRight+20, chartTop+10);

    for(var i = 0; i < data.getColumnCount()-1; i++){
         count = 0;
                for(var j = 1; j < data.getRowCount(); j++){
                    var width = map(i, 0, data.getColumnCount(), chartLeft, chartRight);
                    var x = map(data.get(j, i+1), 0, 100, chartTop-200, chartBottom-200);

                    fill(color(j, 28*j, 28*j));
                    rect(width, chartTop+count, barWidth, x);
                    counter[i] = width;

                    count += x;

                    fill(color(j, 28*j, 28*j));
                    rect(chartRight+10, chartTop+j*40, 20, 20);

                    var y = map(j, 0, data.getRowCount(), chartTop-100, chartBottom-100);

                    fill(color(j, 28*j, 28*j));
                    textSize(9);
                    textStyle(BOLD);
                    text(data.get(j, i+1) + '%', (width-13)+(65*((j+1)%2)), chartTop+count-x/2);

                }
                fill(51);
                textSize(10);
                textStyle(NORMAL);
                text(data.get(0, i+1), counter[i]+12, chartBottom + 15);

       }

    for(var k = 0; k < data.getRowCount(); k++){
       fill(51);
       textSize(10);
       text(data.get(k+1, 0), chartRight+20, chartTop+ 33+ (k+1)*40);

  }
  }
