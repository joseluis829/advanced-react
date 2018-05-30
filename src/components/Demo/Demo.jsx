import * as React from 'react';
import { FormWizard, StepList, Step, ButtonList, Previous, Next, Submit } from "./FormWizard";
import { Form, Label, Input, Button } from "semantic-ui-react";

////////////////////////////////////////////////////////////////////////////////

const RegistrationFields = () => {
    return (
      <React.Fragment>
        <Form.Input label="What is your name?" placeholder="Name" />
      </React.Fragment>
    );
  };
  
  const BillingFields = () => {
    return (
      <React.Fragment>
        <Form.Input
          label="What is your billing address?"
          placeholder="Billing address"
        />
      </React.Fragment>
    );
  };
  
  const MailingFields = () => {
    return (
      <React.Fragment>
        <Form.Input
          label="What is your mailing address?"
          placeholder="Mailing address"
        />
      </React.Fragment>
    );
  };
  
  ///////////////////////////////////////////////////////////////////////////////
  

class Demo extends React.Component {
    state = {  }
    render() {
        return (
            <div>
                <FormWizard>
                    <StepList>
                        <Step render={RegistrationFields} />
                        <Step render={BillingFields} />
                        <Step render={MailingFields} />
                    </StepList>
                    <ButtonList>
                        <Previous />
                        <Next />
                        <Submit />
                    </ButtonList>
                </FormWizard>
            </div>
        );
    }
}

export default Demo;