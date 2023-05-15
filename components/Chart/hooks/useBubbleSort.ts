import React, { useEffect, useState, useCallback } from "react";
import { scaleBand } from "d3-scale";
import { select } from "d3-selection";
import { axisBottom } from "d3-axis";
import { Data } from "../types";
import { swap } from "../../../application/utils";
import "d3-transition";
import { getNextStepStates } from "../../../application/bubbleSortSteps";

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
  const [currentStep, setCurrentStep] = useState(-1);
  const [pass, setPass] = useState(0);
  const [start, setStart] = useState(false);
  const [play, setPlay] = useState(false);
  const [end, setEnd] = useState(false);
  const [sortedData, setSortedData] = useState<Data[]>(myData);
  const [isSelectStep, setIsSelectStep] = useState(false);
  const [isSwapped, setIsSwapped] = useState(false);
  const [sortedItems, setSortedItems] = useState(-1);
  const [state, setState] = useState({
    currentStep: -1,
    pass: 0,
    start: false,
    end: false,
    sortedData: data,
    isSelectStep: false,
    isSwapped: false,
    sortedItems: -1,
  });

  // const lastStepInPass = currentStep === sortedData.length - pass - 2;

  useEffect(() => {
    const svg = select(svgRef.current);

    // Function to reorder bars
    const reorderBars = () => {
      console.log("EFFECT");
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
            state.start
          ) {
            return "green";
          }
          if (
            state.sortedData.length - state.sortedItems - 1 <= i &&
            state.end
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

  // useEffect(() => {
  //   const intervalId =
  //     play &&
  //     setInterval(() => {
  //       handleStepForward();
  //     }, 1000);

  //   if (sortedItems === sortedData.length - 1) clearInterval(intervalId);

  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, [sortedData, start, isSelectStep, currentStep, end, sortedItems, play]);

  const handlePlay = () => {
    setPlay(!play);
    // console.log(currentStep);
  };

  const handleStepForward = () => {
    console.log(state);
    // const nextStepStates = getNextStepStates({
    //   pass,
    //   currentStep,
    //   sortedData,
    //   sortedItems,
    //   isSwapped,
    //   isSelectStep,
    //   end,
    //   start,
    // });
    const nextStepStates = getNextStepStates(state);

    setState(nextStepStates);
    // setPass(nextStepStates.pass);
    // setIsSwapped(nextStepStates.isSwapped);
    // setSortedData(nextStepStates.sortedData);
    // setSortedItems(nextStepStates.sortedItems);
    // setCurrentStep(nextStepStates.currentStep);
    // setIsSelectStep(nextStepStates.isSelectStep);
    // setStart(nextStepStates.start);
    // setEnd(nextStepStates.end);
  };

  // const handleStepForward = () => {
  //   const isPassFinished = currentStep === sortedData.length - pass - 1;
  //   // if the pass is finished and swapped is false then the list is sorted!
  //   if (isPassFinished) {
  //     if (!isSwapped) {
  //       handleTerminateSort();
  //       return;
  //     }
  //     handleNextPass();
  //   } else {
  //     if (currentStep <= 0) setStart(true);

  //     if (isSelectStep) {
  //       handleSelectStep();
  //     } else {
  //       handleNonSelectStep();
  //     }
  //   }
  // };

  // function handleTerminateSort() {
  //   console.log("List is sorted!");
  //   setSortedItems(sortedData.length - 1);
  // }

  // function handleNextPass() {
  //   console.log("Pass finished!");
  //   setStart(true);
  //   setIsSwapped(false);
  //   setPass(pass + 1);
  //   setCurrentStep(0);
  // }

  // function handleSelectStep() {
  //   if (isCurrentGreaterThanNext()) {
  //     swapItems(currentStep, currentStep + 1);
  //   } else {
  //     handleNonSwapStep();
  //   }
  // }

  // function handleNonSelectStep() {
  //   if (lastStepInPass) {
  //     console.log("Final step in pass");
  //     setStart(false);
  //     setEnd(true);
  //     setCurrentStep(currentStep + 1);
  //     setSortedItems(sortedItems + 1);
  //     setIsSelectStep(true);
  //   } else {
  //     setCurrentStep(currentStep + 1);
  //     setIsSelectStep(true);
  //   }
  // }

  // function handleNonSwapStep() {
  //   if (lastStepInPass) {
  //     console.log("Final step in pass");
  //     setStart(false);
  //     setEnd(true);
  //     setCurrentStep(currentStep + 1);
  //     setSortedItems(sortedItems + 1);
  //   } else {
  //     setCurrentStep(currentStep + 1);
  //     setIsSelectStep(true);
  //   }
  // }

  // function swapItems(firstIndex: number, secondIndex: number) {
  //   const swapped = swap(sortedData, firstIndex, secondIndex);
  //   setSortedData(swapped);
  //   setIsSelectStep(false);
  //   setIsSwapped(true);
  // }

  // function isCurrentGreaterThanNext() {
  //   return sortedData[currentStep].units > sortedData[currentStep + 1].units;
  // }

  return { handleStepForward, handlePlay, play };
};
