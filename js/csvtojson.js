const readline = require("readline");
const fs = require('fs');


var rowN = ["Agricultural Production Oilseeds",
"Agricultural Production Oilseeds Kharif",
"Agricultural Production Oilseeds Rabi",
"Agricultural Production Oilseeds Groundnut",
"Agricultural Production Oilseeds Groundnut Kharif",
"Agricultural Production Oilseeds Groundnut Rabi",
"Agricultural Production Oilseeds Castorseed Kharif",
"Agricultural Production Oilseeds Sesamun Kharif",
"Agricultural Production Oilseeds Nigerseed Kharif",
"Agricultural Production Oilseeds Rapeseed and Mustard Rabi",
"Agricultural Production Oilseeds Linseed Rabi",
"Agricultural Production Oilseeds Safflower Rabi",
"Agricultural Production Oilseeds Sunflower",
"Agricultural Production Oilseeds Sunflower Kharif",
"Agricultural Production Oilseeds Sunflower Rabi",
"Agricultural Production Oilseeds Soyabean Kharif"
];

var obj1 = {colIndex:[0,23,24],rowName: rowN,aggrigate:false};
var inputFile = '../data/Production-Department_of_Agriculture_and_Cooperation_1.csv'; 
var outputFile1 = "../data/oilseeds.json";

var rowNFood = [
"Agricultural Production Foodgrains Kharif",
"Agricultural Production Foodgrains Rabi",
"Agricultural Production Foodgrains Rice",
"Agricultural Production Foodgrains Rice Kharif",
"Agricultural Production Foodgrains Rice Rabi",
"Agricultural Production Foodgrains Wheat Rabi",
"Agricultural Production Foodgrains Jowar",
"Agricultural Production Foodgrains Jowar Kharif",
"Agricultural Production Foodgrains Jowar Rabi",
"Agricultural Production Foodgrains Bajra Kharif",
"Agricultural Production Foodgrains Maize",
"Agricultural Production Foodgrains Maize Kharif",
"Agricultural Production Foodgrains Maize Rabi",
"Agricultural Production Foodgrains Ragi Kharif",
"Agricultural Production Foodgrains Small Millets Kharif",
"Agricultural Production Foodgrains Barley Rabi",
"Agricultural Production Foodgrains Coarse Cereals",
"Agricultural Production Foodgrains Coarse Cereals Kharif",
"Agricultural Production Foodgrains Coarse Cereals Rabi",
"Agricultural Production Foodgrains Cereals",
"Agricultural Production Foodgrains Cereals Kharif",
"Agricultural Production Foodgrains Cereals Rabi",
"Agricultural Production Foodgrains Tur Kharif",
"Agricultural Production Foodgrains Other Kharif Pulses Kharif",
"Agricultural Production Foodgrains Gram Rabi",
"Agricultural Production Foodgrains Other Kharif Pulses Rabi",
"Agricultural Production Foodgrains Pulses",
"Agricultural Production Foodgrains Pulses Kharif",
"Agricultural Production Foodgrains Pulses Rabi"];

var obj2 = {colIndex:[0,23],rowName: rowNFood,aggrigate:false};
var outputFile2 = "../data/foodgrains.json";

var rowNCorps = [
"Agricultural Production Commercial Crops Cotton",
"Agricultural Production Commercial Crops Jute",
"Agricultural Production Commercial Crops Mesta",
"Agricultural Production Commercial Crops Jute and Mesta",
"Agricultural Production Commercial Crops Sugarcane"
];

var obj3 = {colIndex:["all"],rowName: rowNCorps,aggrigate:true};
var outputFile3 = "../data/commercialcorpsaggricate.json";


var rowNArea =[
"Agricultural Production Foodgrains Rice Area Andhra Pradesh",
"Agricultural Production Foodgrains Rice Area Karnataka",
"Agricultural Production Foodgrains Rice Area Kerala",
"Agricultural Production Foodgrains Rice Area Tamil Nadu"
];

var obj4 = {colIndex:["all"],rowName: rowNArea,aggrigate:false};
var outputFile4 = "../data/riseproductionsouthstates.json";


var funBind1 = convert.bind(obj1,inputFile,outputFile1);
funBind1();
//foodgrains
var funBind2 = convert.bind(obj2,inputFile,outputFile2);
setTimeout(funBind2, 4000);
//aggricated of commercial corps
var funBind3 = convert.bind(obj3,inputFile,outputFile3);
setTimeout(funBind3, 4000);
//southern states rice production
var funBind4 = convert.bind(obj4,inputFile,outputFile4);
setTimeout(funBind4, 4000);

//sampleobj1={colIndex:["all"],rowName: [null],aggrigate:false}
//sampleobj2={colIndex:[0,26],rowName: [null],aggrigate:false}
//sampleobj3={colIndex:["all"],rowName: ["oildseeds","foodgrains"],aggrigate:false}
//sampleobj4={colIndex:[0,26],rowName: ["oildseeds","foodgrains"],aggrigate:false}
//sampleobj5={colIndex:[0,26],rowName: [null],aggrigate:true}

function convert(inputFileLocal,outputFileLocal)
{
	//object data copy
	var colIndex = this.colIndex;
	var rowName = this.rowName;
	var aggrigate = this.aggrigate;
	//value resetting
	var header =[];
	var jsonData=[];
	var tempData={};
	var isHeader=true;
	var colAgg = {};
	
	//interface for the file communication
	const rl = readline.createInterface({
	 input: fs.createReadStream(inputFileLocal)
	});
	rl.on('line', function(line) {
	var lineRecords= line.trim().split(',');
	if(isHeader)//column assigning for all to all column input
	{
		if(colIndex[0] == "all")
		{
			colIndex[0] = 0;
			for(var i=1;i<lineRecords.length;i++)
			{
				colIndex.push(i);
			}
		}
	}
	if(rowName!= "null")
	{	//for specific row
		
		for(var i=0;i<colIndex.length;i++){
		    if(isHeader){       
		        header[colIndex[i]]=lineRecords[colIndex[i]].trim();//header setting
		        if(aggrigate)//initialize the aggrigate column value
		        {
		        	colAgg[header[colIndex[i]]] = 0;//console.log("aggrigate initialization");
		        }
		    }
		    else{
		    	for(var k=0;k<rowName.length;k++)
				{
					//console.log(lineRecords[0]==(rowName[k]));
			    	if(lineRecords[0]==(rowName[k]))//operation for specific row
					{
						if(!aggrigate)//not aggricated value
						{
							tempData[header[colIndex[i]]]=lineRecords[colIndex[i]];
						}
				        
				        if(aggrigate && i!=0)//aggrigate value addition operation
				        {	
				        	if(lineRecords[colIndex[i]]!="NA")//if value is not not applicable dont consider it
				        	{
				        		colAgg[header[colIndex[i]]] = colAgg[header[colIndex[i]]] + parseFloat(lineRecords[colIndex[i]]) ;//console.log("aggrigate increment");
				        	}
				        }
				    }
				}
				
		    }  

		    //console.log(colAgg[header[colIndex[i]]]);    
		}
		if(tempData[header[colIndex[0]]])//push the object in jsondata array for non aggricate input
		{
			jsonData.push(tempData);
		}
	}
	else
	{	//for all row
		for(var i=0;i<colIndex.length;i++){
		    if(isHeader){       
		        header[colIndex[i]]=lineRecords[colIndex[i]];
		    }
		    else{
			        tempData[header[colIndex[i]]]=lineRecords[colIndex[i]];
			        jsonData.push(tempData);
			}
		}        	
	}
	 
	tempData={};
	if(aggrigate)//set the object to array for aggricate input
		{
			jsonData=colAgg;
		}
	   
	isHeader=false;
	   fs.writeFileSync(outputFileLocal,JSON.stringify(jsonData),encoding="utf8");
	});

}//end of the convertion function
//oilseeds 
