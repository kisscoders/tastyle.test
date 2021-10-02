import React from "react";

const Like = (props) => {
	let classes = "ri-heart-3-";
	classes += props.liked ? "fill" : "line";
	return (
		<i
			onClick={props.onClick}
			style={{ cursor: "pointer" }}
			className={classes}
		></i>
	);
};

export default Like;
