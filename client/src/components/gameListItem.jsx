import React from 'react';
import GoogleImg from './googleImg.jsx';

const GameListItem = (props) => (
		<div>
					<tr>
						<td>
							<GoogleImg />
						</td>
						<td>
							{/* {props.game.name} */}
						</td>
						<td>
							{/* {props.game.description} */}
						</td>
						<td>
							{/* {props.game.date} */}
						</td>
					</tr>
		</div>
)

export default GameListItem;