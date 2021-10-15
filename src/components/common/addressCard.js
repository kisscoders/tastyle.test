import React from "react";
import { Card1, CardBody1, CardText1, CardTitle1 } from "./cards";
import { Redirect } from "react-router-dom";
import { EditAtom, DeleteAtom } from "./atoms";

function AddressCard(props) {
  const data = props.data;
  if (!data) return <Redirect to="/" />;

  const columns = [
    {
      path: "nickName",
      label: "Name",
      content: (data) => <CardTitle1>{data.nickName}</CardTitle1>,
    },
    { path: "addLine1", label: "City" },
    { path: "addLine2", label: "Zip" },
    { path: "city", label: "Zip" },
    { path: "contactNo", label: "Contact" },
    {
      key: "action",
      content: (data) => (
        <div key={data._id} className="mt-3 d-flex justify-content-end">
          <EditAtom
            clicked={() => props.clicked}
            onClick={() => props.onEdit(data)}
          />
          <DeleteAtom
            clicked={() => props.clicked}
            onClick={() => props.onDelete(data)}
          />
          ,
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
    return item._id + (column.path || column.key);
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
