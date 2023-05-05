import React, { useEffect, useState } from "react";
import { scaleBand } from "d3-scale";
import { select } from "d3-selection";
import { axisBottom } from "d3-axis";
import { Data } from "../types";
import { swap } from "../../../application/utils";

export const useUpdateBarChart = (
  svgRef: React.MutableRefObject<SVGSVGElement>,
  data: Data[]
) => {
  const [currentStep, setCurrentStep] = useState(-1);
  const [start, setStart] = useState(false);
  const [end, setEnd] = useState(false);
  const [sortedData, setSortedData] = useState(data);
  const [isSelectStep, setIsSelectStep] = useState(false);
  const [iterator, setI] = useState(0);
  const [swapped, setSwapped] = useState(false);

  useEffect(() => {
    const svg = select(svgRef.current);

    // Function to reorder bars
    const reorderBars = () => {
      // Update xScale domain
      const xScale = scaleBand()
        .domain(sortedData.map((d) => d.name))
        .range([0, 400])
        .padding(0.2);

      // Animate transition
      svg
        .selectAll("rect")
        .data(sortedData, (d: Data) => d.name)
        .transition()
        .duration(500)
        .attr("x", (d) => xScale(d.name))
        .attr("fill", (d, i) => {
          if ((i == currentStep || i == currentStep + 1) && start) {
            return "green";
          } else if (
            sortedData.length - iterator - 1 === i &&
            currentStep === i
          ) {
            return end && "red";
          } else {
            return "steelblue";
          }
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
  }, [sortedData, start, isSelectStep, currentStep]);

  const handleSortClick = () => {
    if (currentStep === sortedData.length - iterator - 1) {
      console.log("current step is greather than i - 1");
      setStart(false);
      setEnd(true);
      return;
    }
    if (currentStep == -1) setStart(true);
    if (isSelectStep) {
      if (sortedData[currentStep].units > sortedData[currentStep + 1].units) {
        const swapped = swap(sortedData, currentStep, currentStep + 1);
        setSortedData(swapped);
        // setSwapped(true);
        setIsSelectStep(false);
      } else {
        // setSwapped(false);
        setCurrentStep(currentStep + 1);
      }
    } else {
      setCurrentStep(currentStep + 1);
      setIsSelectStep(true);
    }
    console.log(sortedData.length);
    console.log(currentStep);
  };

  return handleSortClick;
};
