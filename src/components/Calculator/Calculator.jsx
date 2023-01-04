import React, { Component, Fragment } from "react";
import Button from "../Button/Button";
import Display from "../Display/Display";
import './Calculator.css';

let initialState = {
    currentDisplay: '0',
    operation: '',
    history: [],
    values: [0, 0],
    index: 0,
    clearDisplay: false
};

export default class Calculator extends Component {
    state = { ...initialState };

    clearMemory() {
        this.setState({ ...initialState })
    }

    addDigit(n) {

        if ((n === '.' && this.state.currentDisplay.includes('.')) || (n === '0' && this.currentDisplay === '0')) return
        let currentDisplay;
        let index = this.state.index;
        const values = [...this.state.values];
        const history = [...this.state.history];

        if (this.state.clearDisplay) {
            currentDisplay = n;
        }
        else if (this.state.currentDisplay.includes('.') || n === '.')
            currentDisplay = this.state.currentDisplay + n;
        else
            currentDisplay = this.state.currentDisplay.startsWith('0') ? n : this.state.currentDisplay + n;

        this.setState({ currentDisplay, clearDisplay: false, values, history, index })
    }

    addOperation(op) {
        switch (op) {
            case 'AC':
                this.clearMemory()
                break;
            case '+/-': {
                let currentDisplay;
                if (!this.state.currentDisplay.startsWith('-') && this.state.currentDisplay !== '0')
                    currentDisplay = '-' + this.state.currentDisplay
                else
                    currentDisplay = this.state.currentDisplay.replace('-', '');
                this.setState({ currentDisplay })
                break;
            }
            default: {
                if (op === 'x') op = '*'
                
                let history = [...this.state.history];
                let values = [...this.state.values];
                let index = this.state.index;
                let currentDisplay;

                if (history.length === 2) {
                    history = []
                    history.push(this.state.values[this.state.index])
                }

                values[this.state.index] = parseFloat(this.state.currentDisplay);
                if (index === 1 && !this.state.clearDisplay) {
                    values[0] = eval(`${values[0]} ${this.state.operation} ${values[1]}`)
                    if(isNaN(values[0]) || !isFinite(values[0])){
                        this.clearMemory();
                        return;
                    }
                }
                index = 1
                currentDisplay = values[0].toString();


                if (op === '=') {
                    let lastOperation = this.state.operation;

                    if (this.state.clearDisplay || history.length === 2) {
                        history = []
                        lastOperation = ''
                    }
                    else history.push(values[1]);

                    this.clearMemory();
                    this.setState({ currentDisplay, operation: lastOperation, clearDisplay: true, history });

                    return;
                }

                history[0] = index === 0 ? values[1] : values[0];
                this.setState({ currentDisplay, operation: op, clearDisplay: true, values, index, history })

                break;
            }
        }
    }
    render() {
        return (
            <Fragment>
                <div className="calculator">
                    <Display current={this.state.currentDisplay} operation={this.state.operation} history={this.state.history} />
                    <section className="nums">
                        <Button label="AC" double green click={e => this.addOperation(e)} />
                        <Button label="+/-" green click={e => this.addOperation(e)} />
                        <Button label="/" red click={e => this.addOperation(e)} />
                        <Button label="7" click={e => this.addDigit(e)} />
                        <Button label="8" click={e => this.addDigit(e)} />
                        <Button label="9" click={e => this.addDigit(e)} />
                        <Button label="x" red click={e => this.addOperation(e)} />
                        <Button label="4" click={e => this.addDigit(e)} />
                        <Button label="5" click={e => this.addDigit(e)} />
                        <Button label="6" click={e => this.addDigit(e)} />
                        <Button label="-" red click={e => this.addOperation(e)} />
                        <Button label="1" click={e => this.addDigit(e)} />
                        <Button label="2" click={e => this.addDigit(e)} />
                        <Button label="3" click={e => this.addDigit(e)} />
                        <Button label="+" red click={e => this.addOperation(e)} />
                        <Button label="0" click={e => this.addDigit(e)} double />
                        <Button label="." click={e => this.addDigit(e)} />
                        <Button label="=" red click={e => this.addOperation(e)} />
                    </section>
                </div>
            </Fragment>
        );
    }
}