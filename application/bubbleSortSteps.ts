import { Data } from "../components/Chart/types";
import { swap } from "./utils";

interface State {
  currentStep: number;
  pass: number;
  isSwapped: boolean;
  sortedData: Data[];
  sortedItems: number;
  start: boolean;
  end: boolean;
  isSelectStep: boolean;
}

export function getNextStepStates(nextStepStates: State) {
  const {
    currentStep,
    pass,
    isSwapped,
    sortedData,
    sortedItems,
    isSelectStep,
    // start,
    // end,
  } = nextStepStates;

  const isPassFinished = currentStep === sortedData.length - pass - 1;

  if (isPassFinished) {
    if (!isSwapped) {
      nextStepStates.sortedItems = sortedData.length - 1;
    } else {
      nextStepStates.start = true;
      nextStepStates.isSwapped = false;
      nextStepStates.pass = pass + 1;
      nextStepStates.currentStep = 0;
    }
  } else {
    if (currentStep <= 0) {
      nextStepStates.start = true;
    }

    if (isSelectStep) {
      if (sortedData[currentStep].units > sortedData[currentStep + 1].units) {
        nextStepStates.sortedData = swap(
          sortedData,
          currentStep,
          currentStep + 1
        );
        nextStepStates.isSelectStep = false;
        nextStepStates.isSwapped = true;
      } else {
        if (currentStep === sortedData.length - pass - 2) {
          nextStepStates.start = false;
          nextStepStates.end = true;
          nextStepStates.currentStep = currentStep + 1;
          nextStepStates.sortedItems = sortedItems + 1;
        } else {
          nextStepStates.isSelectStep = true;
          nextStepStates.currentStep = currentStep + 1;
        }
      }
    } else {
      if (currentStep === sortedData.length - pass - 2) {
        nextStepStates.start = false;
        nextStepStates.end = true;
        nextStepStates.currentStep = currentStep + 1;
        nextStepStates.sortedItems = sortedItems + 1;
        nextStepStates.isSelectStep = true;
      } else {
        nextStepStates.currentStep = currentStep + 1;
        nextStepStates.isSelectStep = true;
      }
    }
  }

  return nextStepStates;
}
