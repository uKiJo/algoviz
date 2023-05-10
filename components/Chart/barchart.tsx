import React, { useRef, useEffect, useState } from "react";
import { Data } from "./types";

import { scaleBand, scaleLinear } from "d3-scale";
import { max } from "d3-array";
import { select } from "d3-selection";
import { axisBottom, axisLeft } from "d3-axis";
import { swap } from "../../application/utils";
import "d3-transition";
import { useCreateBarChart } from "./hooks/useCreateBarChart";
import { useUpdateBarChart } from "./hooks/useUpdateBarChart";

const myData = [
  {
    name: "foo",
    units: 2,
  },
  {
    name: "bar",
    units: 3,
  },
  {
    name: "baz",
    units: 1,
  },
  {
    name: "hoge",
    units: 4,
  },
  {
    name: "piyo",
    units: 3,
  },
  {
    name: "hogera",
    units: 6,
  },
];

const BarChart: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [data] = useState(myData);

  useCreateBarChart(svgRef, data);
  const { handleSortClick, handlePlay, play } = useUpdateBarChart(svgRef, data);

  return (
    <div>
      <svg width={400} height={400} ref={svgRef}>
        <g className="x-axis" transform={`translate(0, ${300})`} />
        <g className="y-axis" />
      </svg>
      {/* <button onClick={handleSortClick}>Sort</button> */}
      <button onClick={handlePlay}> {play ? "Pause" : "Play"}</button>
    </div>
  );
};

export default BarChart;
