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
            togglerProps: {
                onClick: this.toggle,
                'aria-pressed': this.state.on,
            }
        }
    }
    render() {
        return (
            this.props.children(this.getStateAndHelpers())
        );
    }
}

const showOnConsole = ({name, surname}, newName) => {
    console.log('name', name)
    console.log('surname', surname);
    console.log('newName', newName);
    
}

function Usage({
    onToggle = (...args) => console.log('onToggle', ...args),
}) {
    const object = {name: 'jose', surname: 'cullcay'}
    const newName = 'luis'
    showOnConsole(object, newName)
    return (
        <Toggle onToggle={onToggle}>
            {({on, toggle, togglerProps}) => (
                <div>
                    <Switch on={on} {...togglerProps} />
                    <hr />
                    <button aria-label="custom-button" {...togglerProps}>
                        {on ? 'on' : 'off'}
                    </button>
                    <hr />
                    <span style={{cursor: 'pointer'}} onClick={toggle} >click me</span>
                </div>
            )}
        </Toggle>
    )
}

export default Usage
