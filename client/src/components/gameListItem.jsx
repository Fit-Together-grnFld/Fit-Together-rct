import React from 'react';

const GameListItem = (props) => (
  
					<tr>
						<td>
							{/* {props.game.image} */}
						</td>
						<td>
							{props.game.name}
						</td>
						<td>
							{props.game.description}
						</td>
						<td>
							{props.game.date}
						</td>
					</tr>
				
)

export default GameListItem;