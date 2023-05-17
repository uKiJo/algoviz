import React, { useEffect, useState, useCallback } from "react";
import { scaleBand } from "d3-scale";
import { select } from "d3-selection";
import { axisBottom } from "d3-axis";
import { Data } from "../types";
import "d3-transition";
import { bubbleSortByStep } from "../../../application/bubbleSortSteps";

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

export const useBubbleSort = (
  svgRef: React.MutableRefObject<SVGSVGElement>,
  data: Data[]
) => {
  const [play, setPlay] = useState(false);

  const [state, setState] = useState({
    currentStep: -1,
    pass: 0,
    isIterating: false,
    sortedData: data,
    isSwapped: false,
    sortedItems: 0,
  });

  useEffect(() => {
    const svg = select(svgRef.current);

    // Function to reorder bars
    const reorderBars = () => {
      // Update xScale domain
      const xScale = scaleBand()
        .domain(state.sortedData.map((d) => d.name))
        .range([0, 400])
        .padding(0.2);

      // Animate transition
      svg
        .selectAll("rect")
        .data(state.sortedData, (d: Data) => d.name)
        .transition()
        .duration(500)
        .attr("x", (d) => xScale(d.name))
        .attr("fill", (d, i) => {
          if (
            (i == state.currentStep || i == state.currentStep + 1) &&
            state.isIterating
          ) {
            return "green";
          }
          if (
            state.sortedData.length - state.sortedItems <=
            i
            // state.end
          ) {
            return "red";
          }
          return "steelblue";
        });

      // Update x-axis
      const xAxis = axisBottom(xScale);
      svg
        .select<SVGSVGElement>(".x-axis")
        .transition()
        .duration(500)
        .call(xAxis);
    };

    reorderBars();
  }, [state, svgRef]);

  useEffect(() => {
    const intervalId =
      play &&
      setInterval(() => {
        handleStepForward();
      }, 1000);

    if (state.sortedItems === state.sortedData.length - 1)
      clearInterval(intervalId);

    return () => {
      clearInterval(intervalId);
    };
  }, [state, play]);

  const handlePlay = () => {
    setPlay(!play);
  };

  const handleStepForward = () => {
    const nextStepStates = bubbleSortByStep(state);

    setState(nextStepStates);
  };

  return { handleStepForward, handlePlay, play };
};
