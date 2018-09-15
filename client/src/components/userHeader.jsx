import React from 'react';

const UserHeader = (props) => (

	<div class="row">
		<div class="col-md-2">
			<img alt="profile-pic" src={props.image} class="rounded" />
		</div>
		<div class="col-md-10">
			<div class="page-header">
				<h1>
        {props.name}
				</h1>
			</div>
		</div>
	</div>
)
export default UserHeader;