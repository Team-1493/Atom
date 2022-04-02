var obj_csv = {
    size:0,
    dataFile:[]
};

function readFile(input) {

  sessionStorage.clear;
    console.log(input)
 if (input.files && input.files[0]) {

 let reader = new FileReader();
        reader.readAsBinaryString(input.files[0]);
 reader.onload = function (e) {
 console.log(e);
 obj_csv.size = e.total;
 obj_csv.dataFile = e.target.result
            console.log(obj_csv.dataFile)
            parseData(obj_csv.dataFile)

 }
 }
}

function parseData(data){
    let csvData = [];
    let lbreak = data.split("\n");
    lbreak.forEach(res => {
        csvData.push(res.split(","));
    });
    writeHeaders(csvData);

}


function writeHeaders(arr){
  var x;
  var plotdata=[];
   coldata = [];
  var table = document.getElementById("table");

  // clear previous table
  for(var i = table.rows.length - 1; i > 0; i--)
  {
      table.deleteRow(i);
  }

  var row;
  var labels=[];
  var box_X=[];
  var box_Y=[];
  var box_Y2=[];
  var i=0,j=0;
  var cell0,cell1,cell2,cell3;
  var nrows =arr.length;
  var nwidth=arr[0].length;
  var txt=" rows = "+nrows+ "   cols = "+nwidth;
    document.getElementById("demo").innerHTML=txt;


    row = table.insertRow(1);
    cell0 = row.insertCell(0);
    cell1 = row.insertCell(1);
    cell2 = row.insertCell(2);
    cell3 = row.insertCell(3);
    cell0.append("Variable");
    cell1.append("x");
    cell2.append("y1");
    cell3.append("y2");


  for(i = 0; i < nwidth; i++)
{
  row = table.insertRow(i+2);
  cell0 = row.insertCell(0);
  cell1 = row.insertCell(1);
  cell2 = row.insertCell(2);
  cell3 = row.insertCell(3);
 
  
  cell0.innerHTML = arr[0][i];
  labels[i]= arr[0][i];
  box_X[i] = document.createElement("INPUT");
  box_X[i].setAttribute("type", "checkbox");
  box_X[i].setAttribute("id","box_X"+i);
  box_X[i].setAttribute("value","yes");
  cell1.appendChild(box_X[i]);

  box_Y[i] = document.createElement("INPUT");
  box_Y[i].setAttribute("type", "checkbox");
  box_Y[i].setAttribute("id","box_Y"+i);
  box_Y[i].setAttribute("value","yes");
  cell2.appendChild(box_Y[i]);


  box_Y2[i] = document.createElement("INPUT");
  box_Y2[i].setAttribute("type", "checkbox");
  box_Y2[i].setAttribute("id","box_Y2"+i);
  box_Y2[i].setAttribute("value","yes");
  cell3.appendChild(box_Y2[i]);



  for(j = 0; j < nrows; j++) {
     coldata[j-1]=arr[j][i];
   }

   plotdata[i]=coldata;

   delete coldata;
   coldata=[];

     }



  localStorage.setItem("data", JSON.stringify(plotdata));
  localStorage.setItem("labels", JSON.stringify(labels));
   

  var graphDiv=document.getElementById("myPlot");

  while(graphDiv.data.length>0)
  {
      Plotly.deleteTraces(graphDiv, [0]);
  }

}
