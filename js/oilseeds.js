var svg = d3.select("svg"),
	margin = {top: 50, right: 50, bottom: 400, left: 200},
	width = +svg.attr("width") - margin.left - margin.right,
	height = +svg.attr("height") - margin.top - margin.bottom;

	var x = d3.scaleBand().range([0, width]).padding(0.2),
	y = d3.scaleLinear().range([height, 0]);

	var g = svg.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	function compare(a,b) {
		  if (parseFloat(a["3-2013"]) > parseFloat(b["3-2013"]))
		    return -1;
		  if (parseFloat(a["3-2013"]) < parseFloat(b["3-2013"]))
		    return 1;
		  return 0;
		}

	d3.json("data/oilseeds.json", function(error, data) {
		if (error) throw error;

		var temp;
		/*for(var i=0;data.length;i++)
		{
			if(compare(data[i],data[i+1]))
			{
				temp = data[i];
				data[i] = data[i+1];
				data[i+1] = temp;
			}
			//console.log(data[i]);
		}*/

		data.sort(function(a,b)
      {
        return b["3-2013"]-a["3-2013"];
      });


		

		console.log(data);

		x.domain(data.map(function(d) { return d.Particulars; }));
		y.domain([0, d3.max(data, function(d) { return parseFloat(d["3-2013"]); })]);

		g.selectAll('text')
		.data(data)
		.enter()
		.append('text')
		.text(function (d) {return parseFloat(d["3-2013"])})
		.attr('x',function(d){return x(d.Particulars)+50})
		.attr('y',function(d){return y(parseFloat(d["3-2013"]))})
		.style("fill","#5b5b5b")
		.style("text-anchor","middle");

		//console.log(d["3-2013"]);

		g.append("g")
		.attr("class", "x_axis")
		.attr("transform", "translate(0," + height + ")")
		.call(d3.axisBottom(x))
		.selectAll("text")
		.attr("transform", "rotate(-65)")
		.attr("text-anchor","end");


		g.append("g")
		.attr("class", "y_axis")
		.call(d3.axisLeft(y).ticks(10))
		.append("text")
		.attr("transform", "rotate(-90)")
		.attr("text-anchor", "middle")
		.attr("y", 6)
		.attr("dy", "0.71em");
		

		g.selectAll(".bar")
		.data(data)
		.enter().append("rect")
		.attr("class", "bar")		
		.attr("x", function(d) { return x(d.Particulars); })
		.attr("y", function(d) { return y(parseFloat(d["3-2013"])); })
		.attr("width", x.bandwidth())
		.attr("height", function(d) { return height -y(parseFloat(d["3-2013"])) })
		.style("fill","olive")
		.transition().duration(1000)
		.delay(function(d,i){return i*200});

	});