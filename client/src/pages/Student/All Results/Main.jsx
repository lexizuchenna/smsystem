import { useState } from "react";

import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";

function Main({ setIsLoading }) {
  const [step, setStep] = useState(1);
  const [resultData, setResultData] = useState({
    session: "",
    term: "",
  });

  return step === 1 ? (
    <StepOne
      setStep={setStep}
      setIsLoading={setIsLoading}
      setResultData={setResultData}
    />
  ) : step === 2 ? (
    <StepTwo setStep={setStep} setResultData={setResultData} />
  ) : step === 3 ? (
    <StepThree
      setStep={setStep}
      setResultData={setResultData}
      setIsLoading={setIsLoading}
      resultData={resultData}
    />
  ) : null;
}

export default Main;
