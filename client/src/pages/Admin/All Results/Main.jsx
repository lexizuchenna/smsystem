import { useState } from "react";

import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import AllResults from "./AllResults";

function Main({ setIsLoading }) {
  const [step, setStep] = useState(1);
  const [resultsData, setResultsData] = useState({
    session: "",
    term: "",
    grade: "",
  });

  return step === 1 ? (
    <StepOne
      setStep={setStep}
      setIsLoading={setIsLoading}
      setResultsData={setResultsData}
    />
  ) : step === 2 ? (
    <StepTwo setStep={setStep} setResultsData={setResultsData} />
  ) : step === 3 ? (
    <StepThree setStep={setStep} setResultsData={setResultsData} />
  ) : step === 4 ? (
    <AllResults
      resultsData={resultsData}
      setIsLoading={setIsLoading}
      setStep={setStep}
      setResultsData={setResultsData}
    />
  ) : null;
}

export default Main;
