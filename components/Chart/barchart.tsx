import React, { useRef, useEffect, useState } from "react";
import { useCreateBarChart } from "./hooks/useCreateBarChart";
import { useBubbleSort } from "./hooks/useBubbleSort";

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
    units: 6,
  },
  {
    name: "piyo",
    units: 3,
  },
  {
    name: "hogera",
    units: 4,
  },
];

const BarChart: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [data] = useState(myData);

  useCreateBarChart(svgRef, data);
  const { handleStepForward, handlePlay, play } = useBubbleSort(svgRef, data);

  return (
    <div>
      <svg width={400} height={400} ref={svgRef}>
        <g className="x-axis" transform={`translate(0, ${300})`} />
        {/* <g className="y-axis" /> */}
      </svg>
      <button onClick={handleStepForward}>Step</button>
      <button onClick={handlePlay}> {play ? "Pause" : "Play"}</button>
    </div>
  );
};

export default BarChart;
