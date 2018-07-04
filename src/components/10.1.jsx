import React from "react";
import { Switch } from "../components/switch";

//const callAll = (...fns) => (...args) => fns.forEach(fn => fn && fn(...args))
const callAll = (...fns) => {
    console.log('fns: ', fns); 
    return () => { 
        //console.log('args1: ', args); 
        fns.forEach(fn => {
            fn && fn(); 
            //console.log('args2: ', args); 
        })
    }
}

class Toggle extends React.Component {

    static defaultProps = {
        initialOn: false,
        onReset: () => {},
    }

    initialState = { on: this.props.initialOn }
    state = this.initialState

    reset = () => {
        this.setState(this.initialState, () => this.props.onReset(this.state.on) )
    }

    toggle = () =>
        this.setState(
            ({on}) => ({on: !on}),
            () => this.props.onToggle(this.state.on),
        )

    printInScreen = (text) => {
        console.log('show this text: ', text);
        
    }

    getTogglerProps = ({onClick, ...props} = {}) => {
        return {
            'aria-pressed': this.state.on,
            onClick: callAll(onClick, this.toggle, this.printInScreen(this.state.on), 
                this.printInScreen('newtext ' + !this.state.on)),
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
