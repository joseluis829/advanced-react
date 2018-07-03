import React from "react";
import { Switch } from "../components/switch";

const callAll = (...fns) => (...args) => fns.forEach(fn => fn && fn(...args))

class Toggle extends React.Component {
    state = { on: false }
    toggle = () =>
        this.setState(
            ({on}) => ({on: !on}),
            () => this.props.onToggle(this.state.on),
        )
    getStateAndHelpers() {
        return {
            on: this.state.on,
            toggle: this.toggle,
            getTogglerProps: this.getTogglerProps
        }
    }
    getTogglerProps = ({onClick, className, ...props}) => {
        return {
            'aria-pressed': this.state.on,
            /*onClick: (...args) => {
                onClick && onClick(...args)
                this.toggle()
            },*/
            onClick: callAll(onClick, this.toggle),
            className: `${className} our-custom-class-name`,
            ...props,
        }
    }
    render() {
        return (
            this.props.children(this.getStateAndHelpers())
        );
    }
}

function Usage({
    onToggle = (...args) => console.log('onToggle', ...args),
    onButtonClick = () => alert('onButtonClick'),
}) {
    return (
        <Toggle onToggle={onToggle}>
            {({on, getTogglerProps}) => (
                <div>
                    <Switch {...getTogglerProps({on})} />
                    <hr />
                    <button 
                        {...getTogglerProps({
                            id: "custom-button-id",
                            'aria-label': "custom-button",
                            onClick: onButtonClick,
                        })}
                    >
                        {on ? 'on' : 'off'}
                    </button>
                </div>
            )}
        </Toggle>
    )
}

export default Usage
