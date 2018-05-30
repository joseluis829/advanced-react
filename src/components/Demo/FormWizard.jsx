import * as React from 'react';
import { Form, Label, Input, Button } from "semantic-ui-react";

export class FormWizard extends React.Component {

    state = { activeStepIndex: 0 }
    
    getTotalSteps = (children) => {
        let totalSteps = 0
        for (let child of children) {
            if(child.type.name === 'StepList') {
                totalSteps = child.props.children.length - 1
            }
        }
        this.setState({ totalSteps })
    }
 
    submitHandler = () => {
        alert('Form submitted!')
    }

    componentDidMount() {
        this.getTotalSteps(this.props.children)
    }

    render() {
        const { activeStepIndex, totalSteps } = this.state
        const children = React.Children.map(this.props.children, child => {
            if(child.type.name === 'StepList') {
                return React.cloneElement(child, {
                    activeStepIndex,
                })
            } else if (child.type.name === 'ButtonList') {
                return React.cloneElement(child, {
                    activeStepIndex,
                    totalSteps,
                    handleSubmit: () => this.submitHandler(),
                    onNextStep: () => {
                        this.setState({
                            activeStepIndex: activeStepIndex + 1
                        })
                    },
                    onPreviousStep: () => {
                        this.setState({
                            activeStepIndex: activeStepIndex - 1
                        })
                    },
                })
            } else {
                return child
            }
        })

        return (
            <Form>{children}</Form>
        );
    }
}



export class StepList extends React.Component {
    render () {
        const { activeStepIndex } = this.props
        const children = React.Children.map(this.props.children, (child, index) => {
            return React.cloneElement(child, {
                isActive: index === activeStepIndex
            })
        })
        return children
    }
}

export class ButtonList extends React.Component {
    render() {
        const { activeStepIndex, totalSteps } = this.props
        const children = React.Children.map(this.props.children, (child, index) => {
            if (child.type.name === 'Previous') {
                return React.cloneElement(child, {
                    isPreviousActive: activeStepIndex > 0 ? true : false,
                    goToPreviousStep: () => this.props.onPreviousStep()
                })
            } else if (child.type.name === 'Next') {
                return React.cloneElement(child, {
                    isNextActive: activeStepIndex < totalSteps ? true : false,
                    goToNextStep: () => this.props.onNextStep()
                })
            } else if (child.type.name === 'Submit') {
                return React.cloneElement(child, {
                    isLastStep: activeStepIndex === totalSteps,
                    handleSubmit: () => this.props.handleSubmit()
                })
            }
        })
        return children
    }
}



export const Step = (props) => {
    if(props.isActive) {
        return (
            <React.Fragment>
                {props.render()}
            </React.Fragment>
        )
    }

    return null
}

export const Previous = (props) => {
    if(props.isPreviousActive) {
        return(
            <Button onClick={() => props.goToPreviousStep()} color='red' size='large'>
                Previous
            </Button>
        )
    }

    return null
}

export const Next = (props) => {
    if (props.isNextActive) {
        return(
            <Button onClick={() => props.goToNextStep()} color='green' size='large'>
                Next
            </Button>
        )
    }

    return null
}

export const Submit = (props) => {
    if (props.isLastStep) {
        return(
            <Button onClick={() => props.handleSubmit()} size='large'>
                Submit
            </Button>
        )
    }

    return null
}