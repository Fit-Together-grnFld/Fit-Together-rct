import React from 'react';

const GameListItem = (props) => (
  
					<tr>
						<td>
							{props.image}
						</td>
						<td>
							{props.name}
						</td>
						<td>
							{props.desc}
						</td>
						<td>
							{props.date}
						</td>
					</tr>
				
)

export default GameListItem;