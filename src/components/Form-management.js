import React from 'react';
import { Component } from 'react';

//Création de composant
class Form extends Component {
    constructor(props) {
        super(props)
        this.state = {
            celsius: '',
            fahrenheit: '',
            isCelsius: -1,
        }
        this.handleChangeCelsius = this.handleChangeCelsius.bind(this);
        this.handleChangeFahrenhait = this.handleChangeFahrenhait.bind(this);
        this.alertManagement = this.alertManagement.bind(this);
        this.myIntervalle = '';
        this.convert = this.convert.bind(this);
    }

    alertManagement = () =>{
        if(parseFloat(this.state.celsius) >= 100) alert(`L'eau bouillit !`);
        else alert(`L'eau n'a pas bouilli !`);
        clearInterval(this.myIntervalle);
    }

    handleChangeCelsius = async (e) =>{
        await this.setState({celsius: e.target.value, isCelsius: 1});
        await this.convert(this.state.isCelsius, parseFloat(this.state.celsius));
    }

    handleChangeFahrenhait = async (e) =>{
        await this.setState({fahrenheit: e.target.value, isCelsius: 0});
        await this.convert(this.state.isCelsius, parseFloat(this.state.fahrenheit));
    }

    convert = (verifier, temperateur)=>{
        if(isNaN(temperateur)){
            return null;
        }else {
            verifier === 1 ? this.setState({fahrenheit: temperateur * (9/5) + 32}) :
            verifier === 0 ? this.setState({celsius: (temperateur - 32) * 5/9}) :
            this.setState({celsius: '', fahrenheit: ''})
            clearInterval(this.myIntervalle);
            this.myIntervalle = setInterval(()=>{ this.alertManagement();}, 1000);
        }
    }

    render() {
        return (
            <form className='form--container'>
                <div className='champs-saisi'>
                    <label htmlFor='celsius'>Degré Celsius</label>
                    <input value={this.state.celsius} onChange={this.handleChangeCelsius} type='text' id='celsius' className='celsisus'/>
                </div>
                <div className='champs-saisi'>
                    <label htmlFor='fahrenheit'>Degré Fahrenheit</label>
                    <input value={this.state.fahrenheit} onChange={this.handleChangeFahrenhait} type='text' id='fahrenheit' className='fahrenheit'/>
                </div>
            </form>
        );
    }
}

export default Form;