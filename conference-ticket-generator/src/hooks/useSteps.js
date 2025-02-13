import { useState } from 'react';

const useSteps = (totalSteps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [stepsCompleted, setStepsCompleted] = useState([]);

  const goToNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
      setStepsCompleted(prev => [...prev, currentStep]);
    }
  };

  const goToBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      setStepsCompleted(prev => prev.filter(step => step !== currentStep - 1));
    }
  };

  const resetSteps = () => {
    setCurrentStep(1);
    setStepsCompleted([]);
  };

  const progress = (stepsCompleted.length / totalSteps) * 100;

  return {
    currentStep,
    goToNext,
    goToBack,
    resetSteps,
    progress,
    isFirstStep: currentStep === 1,
    isLastStep: currentStep === totalSteps,
    isStepCompleted: (step) => stepsCompleted.includes(step)
  };
};

export default useSteps;