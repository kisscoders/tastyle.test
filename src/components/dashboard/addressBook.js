import React, { useEffect, useState } from "react";
import _ from "lodash";
import { toast } from "react-toastify";
import {
  getMyAddresses,
  deleteAddress,
  saveAddress,
} from "../../services/orderService";
import { paginate } from "../../utils/paginate";

import { TextInput } from "../common/inputs";
import { Button } from "../common/buttons";
import { Card1, CardBody1, CardHeader1 } from "../common/cards";
import AddressCard from "../common/addressCard";
import { Toast } from "bootstrap";
import AddressForm from "../common/addressForm";

const AddressBook = () => {
  const [addresses, setAddresses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [sortColumn, setSortColumn] = useState({ path: "title", order: "asc" });
  const [data, setData] = useState({
    displayName: "",
    addressName: "",
    contactNo: "",
    addLine1: "",
    addLine2: "",
    city: "",
    zipcode: "",
    landmarks: "",
  });
  const [errors, setErrors] = useState({});

  // const schema = {
  //   _id: Joi.string(),
  //   title: Joi.string().required().label("Title"),
  //   genreId: Joi.string().required().label("Genre"),
  //   numberInStock: Joi.number()
  //     .min(0)
  //     .max(100)
  //     .required()
  //     .label("Number in Stock"),
  //   dailyRentalRate: Joi.number()
  //     .min(0)
  //     .max(10)
  //     .required()
  //     .label("Daily Rental Rate"),
  // };

  useEffect(() => {
    getData();
    toast("addressbook useEffect executed!");
    // addresses.filter((o) => {
    //   console.log(o);
    // });
  }, []);

  const getData = async () => {
    const getaddresses = await getMyAddresses();
    setAddresses(getaddresses);
  };

  const mapToViewModel = (data) => {
    return {
      _id: data._id,
      displayName: data.displayName,
      addressName: data.addressName,
      contactNo: data.contactNo,
      addLine1: data.addLine1,
      addLine2: data.addLine2,
      city: data.city,
      zipcode: data.zipcode,
      landmarks: data.landmarks,
    };
  };

  const handleDelete = async (address) => {
    const backup = addresses;
    const filter = addresses.filter((m) => m._id !== address._id);
    setAddresses(filter);
    try {
      await deleteAddress(address._id);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        Toast;
        toast.error("This address has already been deleted");
        setAddresses(backup);
      }
    }
  };
  const handleEdit = (address) => {
    populateForm(address);
    console.log(address._id);
  };

  const populateForm = (address) => {
    const found = addresses.find((o) => {
      if (o._id === address._id) return true;
    });
    const mapped = mapToViewModel(found);
    setData(mapped);
    // let filtered = addresses.filter((o) => {
    //   console.log(o);
    //   o._id == address.id;
    // });
    // console.log(mapped);
    // try {
    //   const { data: address } = await getAddress(id);
    //   console.log(address);
    //   // setData(mapToViewModel(address));
    // } catch (error) {
    //   if (error.response && error.response.status === 404)
    //     // this.props.history.replace("/not-found");
    //     toast.error("error ocurred on populating");
    // }
  };

  // const handleClicked = (page) => {
  //   setCurrentPage(page);
  // };

  const doSubmit = async () => {
    console.log(data);
    await saveAddress(data);
    toast("Updated");
  };

  // const handlePageChange = (page) => {
  //   setCurrentPage(page);
  // };

  // const handleSort = (sortColumn) => {
  //   setSortColumn(sortColumn);
  // };

  const getPagedData = () => {
    const all = addresses;

    const sorted = _.orderBy(all, [sortColumn.path], [sortColumn.order]);

    const displayData = paginate(sorted, currentPage, pageSize);

    return {
      displayData,
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // const err = validate();
    // setErrors(err || {});
    // if (err) return;

    doSubmit();
    getData();
  };

  const handleChange = ({ currentTarget: input }) => {
    // const errorMessage = this.validateProperty(input);
    // if (errorMessage) errors[input.name] = errorMessage;
    // else delete errors[input.name];
    const type = { ...data };
    type[input.name] = input.value;

    setData(type);
  };

  // const renderInput = (name, label, type = "text") => {
  //   return (
  //     <TextInput
  //       type={type}
  //       name={name}
  //       value={data[name]}
  //       label={label}
  //       onChange={handleChange}
  //       error={errors[name]}
  //     />
  //   );
  // };

  // const renderButton = (label) => {
  //   return <Button className="mt-2">{label}</Button>;
  // };

  const totalCount = addresses.length;

  const { displayData } = getPagedData();
  return (
    <div className="row">
      {AddressForm(data, handleSubmit, handleChange, errors)}
      {/* <div className="col col-6">
        <Card1>
          <CardHeader1 as="h5">Add/Update Address</CardHeader1>
          <CardBody1>
            <form onSubmit={handleSubmit}>
              {renderInput("nickName", "What do we call you?")}
              {renderInput("contactNo", "Contact Number")}
              {renderInput("addLine1", "Address Line 1")}
              {renderInput("addLine2", "Address Line 2")}
              {renderInput("city", "City")}
              {renderInput("zipcode", "Zip Code")}
              {renderInput("landmarks", "Landmarks")}
              {renderButton("Save")}
            </form>
          </CardBody1>
        </Card1>
      </div> */}
      <div className="col col-6">
        {totalCount === 0 ? (
          <Card1>
            <CardHeader1 as="h6">
              You haven't added any addresses, you're pretty anonymous!
            </CardHeader1>
          </Card1>
        ) : (
          <div>
            <AddressCard
              data={displayData}
              onDelete={handleDelete}
              onEdit={handleEdit}
              // clicked={handleClicked}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressBook;
