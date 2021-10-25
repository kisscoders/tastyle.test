import React from "react";
import { Card1, CardBody1, CardText1, CardTitle1 } from "./cards";
import { Redirect } from "react-router-dom";
import { EditAtom, DeleteAtom } from "./atoms";

function AddressCard(props) {
  const data = props.data;
  if (!data) return <Redirect to="/" />;

  const columns = [
    {
      path: "addressName",
      label: "Name",
      content: (data) => (
        <CardTitle1 key={data._id}>{data.addressName}</CardTitle1>
      ),
    },
    { path: "addLine1", label: "City" },
    { path: "addLine2", label: "Zip" },
    { path: "city", label: "Zip" },
    { path: "contactNo", label: "Contact" },
    {
      key: "action",
      content: (data) => (
        <div
          // key={createKey(data, "")}
          className="mt-3 d-flex justify-content-end"
        >
          <EditAtom
            clicked={() => props.clicked}
            onClick={() => props.onEdit(data)}
            key={createKey(data, "editatom")}
          />
          <DeleteAtom
            clicked={() => props.clicked}
            onClick={() => props.onDelete(data)}
            key={createKey(data, "deleteatom")}
          />
        </div>
      ),
    },
  ];

  const renderCell = (item, column) => {
    if (column.content) return column.content(item);

    return (
      <CardText1 className="m-0" key={createKey(item, column)}>
        {_.get(item, column.path)}
      </CardText1>
    );
  };

  const createKey = (item, column) => {
    return item._id + (column.path || column.key || column) + item._id;
  };

  return (
    <div className="row">
      {data.map((item) => (
        <div className="col col-lg-6">
          <Card1 key={item._id}>
            <CardBody1>
              {columns.map((column) => (
                <>{renderCell(item, column)}</>
              ))}
            </CardBody1>
          </Card1>
        </div>
      ))}
    </div>
  );
}

export default AddressCard;
