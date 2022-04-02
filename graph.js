function graph(){

var table = document.getElementById("table");
var xArray;
var yArray;
var data=[];
var layout;
var xid;
var axisnames=[];
var axisname1="",axisname2="";

tempdata = localStorage.getItem("data");
templabels= localStorage.getItem("labels");
rawdata = JSON.parse(tempdata);
labels=JSON.parse(templabels);


// determine which column is the x-axis data
xid=-1;
len=rawdata.length;
var xid;
for(var i=0;i<len;i++){
    if( (document.getElementById("box_X"+i)).checked)  {
            xArray = rawdata[i];
            xid=i;
    }
}



// determine the colums for the y1 and y2 axis
var numseries=0;var numy1=0,numy2=0;
i=0;
for(i=0; i<len; i++){
    if( (document.getElementById("box_Y"+i)).checked  ){
        yArray = rawdata[i];
        if(numy1>0) axisname1=axisname1+"  ,  "; 
        axisname1=axisname1+labels[i];
        data[numseries] = {
            x:xArray,
            y:yArray,
            name:labels[i],
            mode:"markers"
        };
        numseries=numseries+1;
        numy1=numy1+1; 
    }
    if( (document.getElementById("box_Y2"+i)).checked  ){
        yArray = rawdata[i];
        if(numy2>0) axisname2=axisname2+"  ,  "; 
        axisname2=axisname2+labels[i];

        data[numseries] = {
            x:xArray,
            y:yArray,
            yaxis: 'y2',
            name:labels[i],
            mode:"markers"
        }; 
        numseries=numseries+1;
        numy2=numy2+1;
    }

}

document.getElementById("notes").innerHTML="numseries = "+numseries;


// Define Layout
layout = {
    autosize: true,
    width: 1000,
    height: 550,
    xaxis: { title: labels[xid]},
     yaxis: { title: axisname1,
                side:'left'},
     yaxis2: {  title: axisname2,
                anchor: 'free',
                overlaying: 'y',
                side: 'right',
                position: 1},
      title: "Robot Data"
    };

// Display using Plotly
Plotly.newPlot("myPlot", data, layout,{editable: true});
}