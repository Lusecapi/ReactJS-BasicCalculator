import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//Set the calculator buttons configurations, (empty-space returns no button in that position)
var buttonsMatrix = [[{text:'7'},{text:'8'},{text: '9'},{text:'empty-space'},{text:'empty-space'}],
                    [{text: '4'},{text: '5'},{text:'6'},{text:'+'},{text:'x'}],
                    [{text: '1'},{text: '2'},{text: '3'},{text: '-'},{text: '/'}],
                    [{text:'empty-space'},{text: '0'},{text: 'empty-space'},{text: '=', id: 'equal'}]];


var digitedNumber= ''; //The actual number that is been writing
var numA = '';//The first number wrote
var numB = '';//The second number wrote
var result = '';//The result of the two numbers operation
var operation : Operation = null;//The type of operation to realize
var isOperating = false;//If an operation button was pressed already


class Screen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '0'
    }
  }

  render(){
    return(
      <div {...this.props} className= 'Screen'>
        {this.state.text}
      </div>
    );
  }
}

class Button extends React.Component {
  props: ButtonProps;

  constructor(props, context) {
    super(props, context);
    this.onClick = this.onClick.bind(this);

  }

  render(){
    return(
        this.props.text === 'empty-space'? <div className = 'EmptySpace'></div> : <button {...this.props} className = 'Button' onClick = {this.onClick} > {this.props.text} </button>
    );
  }

  //Method Executed when a button is clicked
  onClick(){

    if(this.props.text === '+'){
      this.props.setOperationMethod('add');
    }
    else if (this.props.text === '-') {
      this.props.setOperationMethod('substract');
    }
    else if (this.props.text === 'x') {
      this.props.setOperationMethod('multiply');
    }
    else if (this.props.text === '/') {
      this.props.setOperationMethod('divide');
    }
    else if (this.props.text === '=') {

      if(isOperating === true){
        isOperating = false;
        numB = parseInt(digitedNumber);
        this.props.operateNumbersMethod();
        digitedNumber = result;
        this.props.updateScreenMethod(digitedNumber);
      }
    }
    else{

      digitedNumber === '0'? digitedNumber = this.props.text : digitedNumber += this.props.text;
      this.props.updateScreenMethod(digitedNumber);
    }
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
        this.props.buttonsText.map( (buttonProps) => <Button {...buttonProps} updateScreenMethod = {this.props.updateScreenMethod} operateNumbersMethod = {this.props.operateNumbersMethod} setOperationMethod = {this.props.setOperationMethod} />)
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
        this.props.buttonsMatrix.map(row => <ButtonsRow buttonsText = {row} updateScreenMethod = {this.props.updateScreenMethod} operateNumbersMethod = {this.props.operateNumbersMethod} setOperationMethod = {this.props.setOperationMethod}/>)
      }
      </div>
    );
  }
}


class Calculator extends React.Component{

  constructor(props){
    super(props);
    this.updateScreen = this.updateScreen.bind(this);
    this.operateNumbers = this.operateNumbers.bind(this);
    this.setOperation = this.setOperation.bind(this);
  }

  render(){
    return(
      <div className = 'Calculator'>
        <Screen ref={screen => (this.screen = screen)} />
        <ButtonsMatrix buttonsMatrix = {this.props.buttonsMatrix} updateScreenMethod = {this.updateScreen} operateNumbersMethod = {this.operateNumbers}setOperationMethod = {this.setOperation}/>
      </div>
    );
  }

  //Updates text shown in screen
  updateScreen(textToShow){
    this.screen.setState({text: textToShow});
  }

  //Sets the operation to realize
  setOperation(op){

    if(isOperating === false){
      isOperating = true;
      operation = op;
      numA = parseInt(digitedNumber);
      digitedNumber = '0';
      this.updateScreen(digitedNumber);
    }
    else {

      numB = parseInt(digitedNumber);
      this.operateNumbers();
      this.updateScreen(result);
      numA = result;
      digitedNumber = '0';
      isOperating = true;
      operation = op;

    }
  }

  //Operates the two digited numbers (numA and numB) with the operation previusly setted
  operateNumbers(){
    if(operation === 'add'){
      result = numA + numB
    }
    else if (operation === 'substract') {
      result = numA - numB;
    }
    else if (operation == 'multiply') {
      result = numA * numB;
    }
    else if (operation == 'divide'){
      result = numA / numB;
    }

    this.updateScreen(result);
  }
}

ReactDOM.render(

  <Calculator buttonsMatrix = {buttonsMatrix}/>,
  document.getElementById('root')
);
