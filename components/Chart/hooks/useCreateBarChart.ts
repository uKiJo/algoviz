import { max } from "d3-array";
import { axisBottom, axisLeft } from "d3-axis";
import { scaleBand, scaleLinear } from "d3-scale";
import { select } from "d3-selection";
import { useEffect } from "react";

import { Data } from "../types";

export const useCreateBarChart = (
  svgRef: React.MutableRefObject<SVGSVGElement>,
  data: Data[]
) => {
  useEffect(() => {
    const svg = select(svgRef.current);

    // Set up scales and axes
    const xScale = scaleBand()
      .domain(data.map((d) => d.name))
      .range([0, 400])
      .padding(0.2);

    const yScale = scaleLinear()
      .domain([0, max(data, (d) => d.units)])
      .range([300, 0]);

    const xAxis = axisBottom(xScale);
    svg.select<SVGSVGElement>(".x-axis").call(xAxis);

    const yAxis = axisLeft(yScale);
    svg.select<SVGSVGElement>(".y-axis").call(yAxis);

    // Create initial bars
    svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(d.name))
      .attr("y", (d) => yScale(d.units))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => 300 - yScale(d.units))
      .attr("fill", "steelblue");
  }, []);
};
