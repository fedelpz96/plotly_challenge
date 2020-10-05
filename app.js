let path  = "samples.json";

d3.json(path).then(data=>{
// create values for filter  
  data.names.forEach(d=>{
    d3.select("#selDataset").append("option")
      .attr("value",d)
      .text(d)
      
// populate demographic info (or at least im trying to...)
  data.metadata.forEach(d=>  {
    d3.select("sample-metadata").append("script")
    .text(d);
  })
});

// get variables for the plots
var otu_ids = data.samples[0].otu_ids.slice(0,10).reverse().map(d =>"OTU" + d);
var sample_values = data.samples[0].sample_values.slice(0,10).reverse();
var otu_labels = data.samples[0].otu_labels.slice(0,10);

// create bar plot
var trace1 = {
x: sample_values,
y: otu_ids,
type: "bar",
orientation: "h",
labels: otu_labels
};

var data = [trace1];

var layout = {
title: "Bar Chart"
};

Plotly.newPlot("bar", data, layout);

// create bubble plot
var trace2 = {
  x: sample_values,
  y: otu_ids,
  mode: 'markers',
  marker: {
    size: sample_values
  },
  color: otu_ids
  };
  
  var data = [trace2];
  
  var layout = {
  title: "Bubble Chart"
  };
  
  Plotly.newPlot("bubble", data, layout);
});