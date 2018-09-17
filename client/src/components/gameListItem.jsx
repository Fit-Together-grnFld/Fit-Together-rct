import React from 'react';
import axios from 'axios';
import $ from 'jquery';
window.jQuery = $;
window.$ = $;
global.jQuery = $;
import GamePage from '../index.jsx'
import ReactDOM from 'react-dom';

class GameListItem extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			userName: this.props.userName,
			image: this.props.image,
			name: this.props.name,
			desc: this.props.desc,
			date: this.props.date,
			game: ''
		}
	this.onClick = this.onClick.bind(this)
	}

	onClick(event){
		let text = $(event.target).text()
		console.log(text);
		// let text = event.target.value;
		// console.log(text)
		// text = text.slice(4)
		// let tArr = [];
		// for(let i = 0; i < text.length-5; i++){
  	// 	tArr.push(text[i]);
		// }
		// text = tArr.join('');
		ReactDOM.render(<GamePage game={text} userName={this.state.userName}/>, document.getElementById('app'));
	}

	render(){
		return (
			<tr>
						<td>
							<img src={this.state.image}></img>
						</td>
						<td onClick={this.onClick}>
							{this.state.name}
						</td>
						<td>
							{this.state.desc}
						</td>
						<td>
							{this.state.date}
						</td>
					</tr>
		)
	}
}
export default GameListItem;