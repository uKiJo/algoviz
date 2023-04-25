import { max } from "d3-array";
import { scaleBand, scaleLinear } from "d3-scale";
import { select } from "d3-selection";
import React, { useEffect, useRef, useState } from "react";

const myData = [5, 3, 1, 4, 3, 6, 10];

const Chart: React.FC = () => {
  const dimensions = { width: 800, height: 500 };
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [data, setData] = useState(myData);

  let x = scaleBand<number>()
    .domain(data.map((_, i) => i + 1))
    .range([0, dimensions.width])
    .padding(0.1);
  let y = scaleLinear()
    .domain([0, max(data)])
    .range([dimensions.height, 0]);

  useEffect(() => {
    select(svgRef.current)
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (_, i) => x(i + 1))
      .attr("y", (d) => y(d))
      .attr("width", x.bandwidth())
      .attr("fill", "orange")
      .attr("height", (d) => dimensions.height - y(d));
  }, []);

  return (
    <>
      <svg ref={svgRef} width={dimensions.width} height={dimensions.height} />
    </>
  );
};

export default Chart;
