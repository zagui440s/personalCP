import { Component } from "react";

export default class Checkbox extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <label>{this.props.label}</label>
                <input type="checkbox" checked={this.props.isChecked} readOnly />
            </>
        )
    }
}