import React from "react";
import { Switch } from "../components/switch";

//const callAll = (...fns) => (...args) => fns.forEach(fn => fn && fn(...args))
const callAll = (...fns) => {
    return (...args) => { fns.forEach(fn => fn && fn(...args)) }
}

class Toggle extends React.Component {

    static defaultProps = {
        initialOn: false,
        onReset: () => {},
    }

    initialState = { on: this.props.initialOn }
    state = this.initialState

    toggle = () =>
        this.setState(
            ({on}) => ({on: !on}),
            () => this.props.onToggle(this.state.on),
        )

    reset = () => 
        this.setState(this.initialState, () => this.props.onReset(this.state.on))    

    getTogglerProps = ({onClick, ...props} = {}) => {
        return {
            'aria-pressed': this.state.on,
            onClick: callAll(onClick, this.toggle),
            ...props,
        }
    }

    getStateAndHelpers() {
        return {
            on: this.state.on,
            toggle: this.toggle,
            reset: this.reset,
            getTogglerProps: this.getTogglerProps,
        }
    }

    render() {
        return (
            this.props.children(this.getStateAndHelpers())
        );
    }
}

function Usage({
    initialOn = true,
    onToggle = (...args) => console.log('onToggle', ...args),
    onReset = (...args) => console.log('onReset', ...args),
}) {
    return (
        <Toggle 
            initialOn={initialOn}
            onToggle={onToggle}
            onReset={onReset}
        >
            {({getTogglerProps, on, reset}) => (
                <div>
                    <Switch {...getTogglerProps({on})} />
                    <hr />
                    <button onClick={reset}>Reset</button>
                    <hr />
                </div>
            )}
        </Toggle>
    )
}

export default Usage
