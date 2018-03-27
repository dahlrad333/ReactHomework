class FontChooser extends React.Component {

    constructor(props) {
		super(props);

		var minFromProps = parseInt(this.props.min);
		var maxFromProps = parseInt(this.props.max);
		var sizeFromProps = parseInt(this.props.size);
		var boldnessFromProps = (this.props.bold == 'true');
		var initialColor;

		if(minFromProps <= 0){
			minFromProps = 1;
		} 
		if(minFromProps >= maxFromProps){
			maxFromProps = minFromProps;
		}
		if(sizeFromProps < minFromProps){
			sizeFromProps = minFromProps;
		} else if(sizeFromProps > maxFromProps){
			sizeFromProps = maxFromProps;
		}
		if(minFromProps == sizeFromProps || maxFromProps == sizeFromProps){
			initialColor = 'red';
		} else {
			initialColor = 'black';
		}

		this.state = {
			formIsHidden: true,
			textIsBold: boldnessFromProps,
			checkboxIsChecked: boldnessFromProps,
			minimumSizeOfText: minFromProps,
			maximumSizeOfText: maxFromProps,
			sizeOfText: sizeFromProps,
			textColor: initialColor,
		};
	}

	changeVisibility(){
		this.setState({formIsHidden: !this.state.formIsHidden});
		console.log('changed everythings visibility: ');
		console.log('text is bold: ' + this.state.textIsBold);
		console.log('minimum size of text: ' + this.state.minimumSizeOfText);
		console.log('maximum size of text: ' + this.state.maximumSizeOfText);
		console.log('initial size of text: ' + this.state.sizeOfText);
		console.log('color: ' + this.state.textColor);
	}

	changeBoldness(){
		this.setState({textIsBold: !this.state.textIsBold});
		console.log('changed boldness');
	}

	increaseFontSize(){
		if(this.state.sizeOfText < this.state.maximumSizeOfText){
			this.setState({sizeOfText: this.state.sizeOfText+=1});
		} 
		console.log(this.state.maximumSizeOfText + ' ' + this.state.sizeOfText);
		if(this.state.sizeOfText == this.state.maximumSizeOfText){
			this.setState({textColor: 'red'});
		} else {
			this.setState({textColor: 'black'});
		}
	}

	decreaseFontSize(){
		if(this.state.sizeOfText > this.state.minimumSizeOfText){
			this.setState({sizeOfText: this.state.sizeOfText-=1});
		} 
		console.log(this.state.minimumSizeOfText + ' ' + this.state.sizeOfText);
		if(this.state.sizeOfText == this.state.minimumSizeOfText){
			this.setState({textColor: 'red'});
		} else {
			this.setState({textColor: 'black'});
		}
	}

	returnToInitialFontSize(){
		this.setState({sizeOfText: parseInt(this.props.size)});
		if(parseInt(this.props.size) == this.state.minimumSizeOfText || parseInt(this.props.size) == this.state.maximumSizeOfText){
			this.setState({textColor: 'red'});
		} else {
			this.setState({textColor: 'black'});
		}
	}

    render() {
		var visibility = this.state.formIsHidden;
		var checkboxChecked = this.state.textIsBold;
		var boldness = this.state.textIsBold ? 'bold':'normal';
		var size = this.state.sizeOfText;
		var theColor = this.state.textColor;
	return(
	       <div>
		   <span id="textSpan" style={{fontWeight: boldness, fontSize: size}} onClick={this.changeVisibility.bind(this)}>{this.props.text}</span>
	       <br/>
		   <input type="checkbox" checked={checkboxChecked} id="boldCheckbox" onChange={this.changeBoldness.bind(this)} hidden={visibility}/>
	       <button id="decreaseButton" onClick={this.decreaseFontSize.bind(this)} hidden={visibility}>-</button>
	       <span id="fontSizeSpan" style={{color: theColor}} onDoubleClick={this.returnToInitialFontSize.bind(this)} hidden={visibility}>{size}</span>
	       <button id="increaseButton" onClick={this.increaseFontSize.bind(this)} hidden={visibility}>+</button>
	       </div>
	);
    }
}

