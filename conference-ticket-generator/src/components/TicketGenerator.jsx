import useTicket from "../context/useTicket";
import StepOne from "./Steps/StepOne";
import StepTwo from "./Steps/StepTwo";
import StepThree from "./Steps/StepThree";
import ProgressIndicator from "./Layout/ProgressIndicator";
import Loading from "./Layout/Loading";



// Form validation function
const validateForm = (formData) => {
  let errors = {};

  if (!formData.fullName.trim()) {
    errors.fullName = "Full name is required.";
  }

  if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = "Valid email is required.";
  }

  return errors;
};

const TicketGenerator = () => {
  const { state, dispatch } = useTicket();
  const { currentStep, isLoading, formData, errors, ticketType } = state; // Ensure ticketType is pulled

  const handleNext = () => {
    const formErrors = validateForm(formData);
    if (Object.keys(formErrors).length === 0) {
      dispatch({ type: "SET_STEP", payload: currentStep + 1 });
    } else {
      dispatch({ type: "SET_ERRORS", payload: formErrors });
    }
  };

  return (
    <div className="container">
      {/* Progress Bar */}
      <ProgressIndicator 
        currentStep={currentStep} 
        totalSteps={3} 
        progress={(currentStep - 1) * 50} 
      />

      {/* Loading Indicator */}
      {isLoading && <Loading />}

      {/* Step Components */}
      <div className="ticket-generator-content">
        {currentStep === 1 && (
          <StepOne
            selectedPrice={ticketType} // Ensure this is correctly set
            onSelectPrice={(price) => 
              dispatch({ type: "SET_TICKET_TYPE", payload: price })
            }
            onNext={() => dispatch({ type: "SET_STEP", payload: 2 })}
          />
        )}

          

        {currentStep === 2 && (
          <StepTwo
          formData={formData}
          setFormData={(data) =>
            dispatch({ type: "UPDATE_FORM", payload: { ...formData, ...data } })
          } 
          errors={errors}
          onBack={() => dispatch({ type: "SET_STEP", payload: 1 })}
          onNext={handleNext}
        />
        
        )}

        {currentStep === 3 && (
          <StepThree
          formData={formData}
          ticketType={ticketType}
          onBack={() => dispatch({ type: "SET_STEP", payload: 2 })} 
        />
        
        )}
      </div>
    </div>
  );
};

export default TicketGenerator;
