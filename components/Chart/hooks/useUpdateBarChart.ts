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
  const [pass, setPass] = useState(0);
  const [start, setStart] = useState(false);
  const [end, setEnd] = useState(false);
  const [sortedData, setSortedData] = useState<Data[]>(data);
  const [isSelectStep, setIsSelectStep] = useState(false);
  const [isSwapped, setIsSwapped] = useState(false);
  const [sortedItems, setSortedItems] = useState(-1);

  const lastStepInPass = currentStep === sortedData.length - pass - 2;

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
          }
          if (sortedData.length - sortedItems - 1 <= i && end) {
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
  }, [sortedData, start, isSelectStep, currentStep, end, sortedItems]);

  const handleSortClick = () => {
    // if the pass is finished and swapped is false then the list is sorted!
    if (currentStep == sortedData.length - pass - 1 && !isSwapped) {
      console.log("SORTED!");
      setSortedItems(5);
      return;
    }

    if (currentStep === sortedData.length - pass - 1) {
      console.log("pass finished!");
      setStart(true);
      setIsSwapped(false);
      setPass(pass + 1);
      setCurrentStep(0);
      return;
    }
    if (currentStep <= 0) setStart(true);

    if (isSelectStep) {
      if (isCurrentGreaterThanNext()) {
        const swapped = swap(sortedData, currentStep, currentStep + 1);
        setSortedData(swapped);
        setIsSelectStep(false);
        setIsSwapped(true);
      } else {
        if (lastStepInPass) {
          console.log("ffinal");
          setStart(false);
          setEnd(true);
          setSortedItems(sortedItems + 1);
          setCurrentStep(currentStep + 1);
        } else {
          setCurrentStep(currentStep + 1);
        }
      }
    } else {
      if (lastStepInPass) {
        console.log("ffinal");
        setStart(false);
        setEnd(true);
        setCurrentStep(currentStep + 1);
        // setPass(pass + 1);
        setSortedItems(sortedItems + 1);
        setIsSelectStep(true);
      } else {
        setCurrentStep(currentStep + 1);
        setIsSelectStep(true);
      }
    }
  };

  function isCurrentGreaterThanNext() {
    return sortedData[currentStep].units > sortedData[currentStep + 1].units;
  }

  return handleSortClick;
};
