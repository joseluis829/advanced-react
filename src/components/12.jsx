import React from "react";
import { Switch } from "../components/switch";

const callAll = (...fns) => (...args) => fns.forEach(fn => fn && fn(...args))

class Toggle extends React.Component {

    static defaultProps = {
        initialOn: false,
        onReset: () => {},
        stateReducer: (state, changes) => changes,
    }

    initialState = { on: this.props.initialOn }
    state = this.initialState

    internalSetState(changes, callback) {
        this.setState(state => {
            // handle function setState call
            const changesObject = typeof changes === 'function' ? changes(state) : changes
            // apply state reducer
            const reducedChanges = this.props.stateReducer(state, changesObject)
            return reducedChanges
        }, callback)
    }

    reset = () => {
        this.internalSetState({...this.initialState, type: 'reset'}, () => 
            this.props.onReset(this.state.on) 
        )
    }

    toggle = ({type = 'toggle'} = {}) =>
        this.internalSetState(
            ({on}) => ({on: !on, type}),
            () => this.props.onToggle(this.state.on),
        )

    getTogglerProps = ({onClick, ...props} = {}) => ({
        'aria-pressed': this.state.on,
        onClick: callAll(onClick, () => this.toggle()),
        ...props,
    })

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

class Usage extends React.Component {
    initialState = {timesClicked: 0}
    state = this.initialState

    handleToggle = (...args) => {
        this.setState((({timesClicked}) => ({
            timesClicked: timesClicked + 1,
        })))
    }

    handleReset = (...args) => {
        this.setState(this.initialState)
    }

    toggleStateReducer = (state, changes) => {
        if (changes.type === 'forced') {
            return changes
        }
        if(this.state.timesClicked > 4) {
            return {...changes, on: false}
        }
        return changes
    }

    render() {
        const {timesClicked} = this.state
        return (
            <Toggle 
                stateReducer={this.toggleStateReducer}
                onToggle={this.handleToggle}
                onReset={this.handleReset}
            >
                {({getTogglerProps, reset, toggle, on}) => (
                    <div>
                        <Switch 
                            {...getTogglerProps({
                                on,
                            })}
                        />
                        {
                            timesClicked > 4 ? (
                                <div>
                                    Whoa, you clicked too much!
                                    <br />
                                    <button onClick={() => toggle({type: 'forced'})}>
                                        Force Toggle
                                    </button>
                                    <br />
                                </div>
                            ) : timesClicked > 0 ? (
                                <div>Click count: {timesClicked}</div>
                            ) : null
                        }
                        <button onClick={reset}>Reset</button>
                    </div>
                )}
            </Toggle>
        )
    }

}

Usage.title = 'State Reducers'
export {Toggle, Usage as default}

/**
 * Improve the usability of Component State Reducers with state change types
 * 
 * Users of our component can make custom modifications to the state whenever it changes, 
 * but in more complex components they may only want to change the state updates for certain types of changes. 
 * Let's add a type property to our changes object so people providing a state reducer have more insight 
 * into the source of the changes and can reduce the changes based on that information.
 * 
 */