// import React from "react";
// import { Button } from "./buttons";
// import { Card1, CardBody1, CardHeader1 } from "./cards";
// import { TextInput } from "./inputs";

// const AddressForm = (data, handleSubmit, handleChange, errors) => {
//   const renderInput = (name, label, type = "text") => {
//     return (
//       <TextInput
//         type={type}
//         name={name}
//         value={data[name]}
//         label={label}
//         onChange={handleChange}
//         error={errors[name]}
//       />
//     );
//   };

//   const renderButton = (label) => {
//     return <Button className="mt-2">{label}</Button>;
//   };

//   // const handleSubmit = (e) => {
//   //   e.preventDefault();

//   //   // const err = validate();
//   //   // setErrors(err || {});
//   //   // if (err) return;

//   //   doSubmit();
//   //   getData();
//   // };

//   return (
//     <div className="col col-6">
//       <Card1>
//         <CardHeader1 as="h5">Add/Update Address</CardHeader1>
//         <CardBody1>
//           <form onSubmit={handleSubmit}>
//             {renderInput("displayName", "What do we call you?")}
//             {renderInput("addressName", "Address Name")}
//             {renderInput("contactNo", "Contact Number")}
//             {renderInput("addLine1", "Address Line 1")}
//             {renderInput("addLine2", "Address Line 2")}
//             {renderInput("city", "City")}
//             {renderInput("zipcode", "Zip Code")}
//             {renderInput("landmarks", "Landmarks")}
//             {renderButton("Save")}
//           </form>
//         </CardBody1>
//       </Card1>
//     </div>
//   );
// };

// export default AddressForm;
