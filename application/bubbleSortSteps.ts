import { Data } from "../components/Chart/types";
import { swap } from "./utils";

interface State {
  currentStep: number;
  pass: number;
  isSwapped: boolean;
  sortedData: Data[];
  sortedItems: number;
  isIterating: boolean;
  isSelectStep: boolean;
}

export function bubbleSortByStep(state: State) {
  const { currentStep, pass, isSwapped, sortedData, isSelectStep } = state;

  let nextStepStates = { ...state };

  const isPassFinished = currentStep === sortedData.length - pass - 1;
  const lastStepInPass = currentStep === sortedData.length - pass - 2;

  if (isPassFinished) {
    nextStepStates = !isSwapped
      ? terminateSort(nextStepStates)
      : goToNextPass(nextStepStates);
  } else {
    if (currentStep <= 0) {
      nextStepStates.isIterating = true;
    }
    // if (isSelectStep) {
    nextStepStates = isCurrentGreaterThanNext(nextStepStates)
      ? swapItems(nextStepStates)
      : (lastStepInPass ? markLastItemAsSorted : goToNextStep)(nextStepStates);
    // } else {
    //   nextStepStates = lastStepInPass
    //     ? markLastItemAsSorted(nextStepStates)
    //     : goToNextStep(nextStepStates);
    // }
  }

  return nextStepStates;
}

function markLastItemAsSorted(nextStepStates: State) {
  const { currentStep, sortedItems } = nextStepStates;

  return {
    ...nextStepStates,
    isIterating: false,
    currentStep: currentStep + 1,
    sortedItems: sortedItems + 1,
    isSelectStep: true,
  };
}

function goToNextStep(nextStepStates: State) {
  const { currentStep } = nextStepStates;
  return {
    ...nextStepStates,
    currentStep: currentStep + 1,
    isSelectStep: true,
  };
}

function swapItems(nextStepStates: State) {
  const { sortedData, currentStep } = nextStepStates;
  return {
    ...nextStepStates,
    sortedData: swap(sortedData, currentStep, currentStep + 1),
    isSelectStep: false,
    isSwapped: true,
  };
}

function isCurrentGreaterThanNext(nextStepStates) {
  const { sortedData, currentStep } = nextStepStates;
  return sortedData[currentStep].units > sortedData[currentStep + 1].units;
}

function goToNextPass(nextStepStates: State) {
  const { pass } = nextStepStates;
  return {
    ...nextStepStates,
    isIterating: true,
    isSwapped: false,
    pass: pass + 1,
    currentStep: 0,
  };
}

function terminateSort(nextStepStates: State) {
  const { sortedData } = nextStepStates;
  return {
    ...nextStepStates,
    sortedItems: sortedData.length,
  };
}
