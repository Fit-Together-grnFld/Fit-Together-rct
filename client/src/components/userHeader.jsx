import React from 'react';

const UserHeader = (props) => (

	<div className="row">
		<div className="col-md-2">
			<img alt="profile-pic" src={props.image} className="rounded" />
		</div>
		<div className="col-md-10">
			<div className="page-header">
				<h1>
        {props.name}
				</h1>
			</div>
		</div>
	</div>
)
export default UserHeader;