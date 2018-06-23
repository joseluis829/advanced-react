import React from "react";
import { Switch } from "../components/switch";

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
}) {
    return (
        <Toggle onToggle={onToggle}>
            {({on, togglerProps}) => (
                <div>
                    <Switch on={on} {...togglerProps} />
                    <hr />
                    <button aria-label="custom-button" {...togglerProps}>
                        {on ? 'on' : 'off'}
                    </button>
                </div>
            )}
        </Toggle>
    )
}

export default Usage
