import React from 'react';

const GameListItem = (props) => (
  
					<tr>
						<td>
							{props.game.image}
						</td>
						<td>
							{props.name}
						</td>
						<td>
							{props.description}
						</td>
						<td>
							{props.date}
						</td>
					</tr>
				
)

export default GameListItem;