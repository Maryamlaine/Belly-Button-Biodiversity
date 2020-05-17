// create the function for the initial data rendering
function init() {
    // select dropdown menu 
    var dropdown = d3.select("#selDataset");

    // read the data 
    d3.json("samples.json").then((data)=> {
        console.log(data)
        var sample_id = data.names;
        // get the id data to the dropdwown menu
        sample_id.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });
        //getting the default id
        var first_id = sample_id[0];
        // call the functions to display the data and the plots to the page
        getPlots(first_id);
        getDemoInfo(first_id);
    });
}
function getPlots(id) {
//Read samples.json
    d3.json("samples.json").then (sampledata =>{
        console.log(sampledata)
        var ds = sampledata.samples
        var ids = ds[0].otu_ids;
        console.log(ids);
        var sampleValues =  ds[0].sample_values.slice(0,10).reverse();
        console.log(sampleValues);
        var labels =  ds[0].otu_labels.slice(0,10);
        console.log (labels);
    // get only top 10 otu ids for the plot OTU and reversing it. 
        var OTU_top = ( ds[0].otu_ids.slice(0, 10)).reverse();
    // get the otu id's to the desired form for the plot
        var OTU_id = OTU_top.map(d => "OTU " + d);
        console.log(`OTU IDS: ${OTU_id}`);
     // get the top 10 labels for the plot
        var labels =  ds[0].otu_labels.slice(0,10);
        console.log(`OTU_labels: ${labels}`);
        var trace1 = {
            x: sampleValues,
            y: OTU_id,
            text: labels,
            marker: {
            color: 'blue'},
            type:"bar",
            orientation: "h",
        };
        // create data variable
        var chartData = [trace1];

        // create layout variable to set plots layout
        var layout1 = {
            title: `Top 10 Operational Taxonomic Units `,
            yaxis:{
                tickmode:"linear",
            },
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 30
            },
            width: 500,
            height: 600
        };

        // create the bar plot
    Plotly.newPlot("bar", chartData, layout1);
        // The bubble chart
        var trace2 = {
            x: ds[0].otu_ids,
            y: ds[0].sample_values,
            mode: "markers",
            hoverinfo:"text",
            marker: {
                size: ds[0].sample_values,
                color: ds[0].otu_ids,
                colorscale: "Portland"
            },
            text:  ds[0].otu_labels

        };

        // set the layout for the bubble plot
        var layout2 = {
            xaxis:{title: "OTU ID"},
            yaxis:{ title: "OTU Sample Values"},
            width: 1250,
            height: 500
        };

        // creating data variable 
        var bubbleData = [trace2];

    // create the bubble plot
    Plotly.newPlot("bubble", bubbleData, layout2); 
    
    });
}  
// create the function to get the necessary data
function getDemoInfo(id) {
// read the json file to get data
    d3.json("samples.json").then((data)=> {
// get the metadata info for the demographic panel
        var metadata = data.metadata;
        console.log(metadata)

      // filter meta data info by id
       var result = metadata.filter(meta => meta.id.toString() === id)[0];
      // select demographic panel to put data
       var demographicInfo = d3.select("#sample-metadata");
        
     // empty the demographic info panel each time before getting new id info
       demographicInfo.html("");

     // grab the necessary demographic data data for the id and append the info to the panel
        Object.entries(result).forEach((key) => {   
            demographicInfo.append("h5").text(key[0].toLowerCase() + ": " + key[1] + "\n");    
        });
    });
}
// create the function for the change event
function optionChanged(id) {
    getPlots(id);
    getDemoInfo(id);
}

init();