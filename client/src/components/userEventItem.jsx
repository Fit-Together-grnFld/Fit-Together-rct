import React from 'react';

const UserEventItem = (props) => (
 

<tr>
  <td>
  <img alt="profile-pic" src={props.game.data.image} class="rounded" />
  </td>
  <td>
    {props.game.data.name}
  </td>
  <td>
  	{props.game.data.city}
  </td>
  <td>
  	{props.game.data.date}
  </td>
</tr>

)

export default UserEventItem;
