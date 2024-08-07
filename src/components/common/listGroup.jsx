import React from "react";

const ListGroup = ({
	items,
	textProperty,
	valueProperty,
	onItemSelect,
	selectedItem,
}) => {
	return (
		<ul className="list-group list-group-horizontal my-3">
			{items.map((item) => (
				<li
					onClick={() => onItemSelect(item)}
					key={item[valueProperty]}
					className={
						item === selectedItem
							? "list-group-item clickable active"
							: "list-group-item clickable"
					}
				>
					{item[textProperty]}
				</li>
			))}
		</ul>
	);
};

ListGroup.defaultProps = {
	textProperty: "name",
	valueProperty: "_id",
};

export default ListGroup;
