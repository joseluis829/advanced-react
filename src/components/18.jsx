import React from 'react';
import {Switch} from './switch'

const ToggleContext = React.createContext({
    on: false,
    toggle: () => {},
})

class Toggle extends React.Component {
    static Consumer = ToggleContext.Consumer
    toggle = () => {
        this.setState(
            ({on}) => ({on: !on}),
            () => this.props.onToggle(this.state.on),
        )
    }

    state = { on: false, toggle: this.toggle }

    render() {
        return <ToggleContext.Provider value={this.state} {...this.props} />
    }
}

const Layer1 = () => <Layer2 />
const Layer2 = () => (
    <Toggle.Consumer>
        {({on}) => (
            <React.Fragment>
                {on ? 'The button is on' : 'The button is off'}
                <Layer3 />
            </React.Fragment>
        )}
    </Toggle.Consumer>
    
)
const Layer3 = () => <Layer4 />
const Layer4 = () => (
    <Toggle.Consumer>
        {
            ({on, toggle}) => <Switch on={on} onClick={toggle} />
        }
    </Toggle.Consumer>
)

function Usage({
    onToggle = (...args) => console.log('onToggle', ...args),
}) {
    return(
        <Toggle onToggle={onToggle}>
            <Layer1 />
        </Toggle>
    )
}

export default Usage;


/**
 * Implement a Higher Order Component
 */

 /**
  * Sometimes you have some boilerplate for components that would be nice to abstract away slightly with a simple helper function. 
  * In this lesson we'll learn how to create a "Higher Order Component" which is a component factory function. 
  * We'll use it to give a given component a prop for our context value.
  */