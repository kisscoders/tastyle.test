// import React from "react";
// import { Button } from "../components/common/buttons";
// import { FileInput } from "../components/common/inputs";
// import {
//   Card1,
//   CardBody1,
//   CardText1,
//   CardTitle1,
// } from "../components/common/cards";
// import { DeleteAtom, EditAtom } from "../components/common/atoms";
// import { Redirect } from "react-router-dom";

// function TestPage(props) {
//   const renderCell = (item, column) => {
//     if (column.content) return column.content(item);

//     return (
//       <CardText1 className="m-0" key={createKey(item, column)}>
//         {_.get(item, column.path)}
//       </CardText1>
//     );
//   };
//   const createKey = (item, column) => {
//     return item._id + (column.path || column.key);
//   };
//   const data = props.data;
//   if (!data) return <Redirect to="/" />;
//   const columns = props.columns;
//   console.log(props);

//   return (
//     <div>
//       {data.map((item) => (
//         <Card1 className="col" key={item._id}>
//           <CardBody1>
//             {columns.map((column) => (
//               <>{renderCell(item, column)}</>
//             ))}
//           </CardBody1>
//         </Card1>
//       ))}
//     </div>
//   );
// }

// export default TestPage;
