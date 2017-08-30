// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Screen extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <div className= 'Screen'>
        {this.props.text}
      </div>
    );
  }
}

type ButtonProps = {
  text: string | number,
};

class Button extends React.Component {
  props: ButtonProps;

  constructor(props: Props, context) {
    super(props, context);

  }

  render(){
    return(
        this.props.text === 'empty-space'? <div className = 'EmptySpace'></div> : <button {...this.props} className = 'Button' > {this.props.text} </button>
    );
  }
}

class ButtonsRow extends React.Component {
  constructor(props) {
    super(props);

  }

  render(){
    return(
      <div className = 'ButtonsRow'>
      {
        this.props.buttonsText.map( (buttonProps) => <Button  {...buttonProps}/>)
      }
      </div>
    );
  }
}

class ButtonsMatrix extends React.Component {
  constructor(props) {
    super(props);

  }

  render(){
    return(
      <div className = 'ButtonsMatrix'>
      {
        this.props.buttonsMatrix.map(row => <ButtonsRow buttonsText = {row} />)
      }
      </div>
    );
  }
}

var buttonsMatrix = [[{text:'7'},{text:'8'},{text: '9'},{text:'empty-space'},{text:'empty-space'}],
                    [{text: '4'},{text: '5'},{text:'6'},{text:'+'},{text:'x'}],
                    [{text: '1'},{text: '2'},{text: '3'},{text: '-'},{text: '/'}],
                    [{text:'empty-space'},{text: '0'},{text: 'empty-space'},{text: '=', id: 'equal'}]];
const Calculator = props => (
      <div id = 'Calculator' >
        <Screen text='0000' />
        <ButtonsMatrix buttonsMatrix = {buttonsMatrix} />
      </div>
    );

ReactDOM.render(
  //<Screen text = 'la pantalla' />,
  //<Button text= 'el boton'/>,
  //<ButtonsRow buttonsText = {['el boton 1', 'el boton 2', 'el boton 3']} />,
  //<ButtonsMatrix buttonsMatrix = {[['7','8','9'],['4','5','6'],['1','2','3']]} />,
  <Calculator />,
  document.getElementById('root')
);
