import React, { useEffect, useState } from "react";
import _ from "lodash";
import { toast } from "react-toastify";
import { getMyAddresses, deleteAddress } from "../../services/orderService";
import { paginate } from "../../utils/paginate";

import Pagination from "../common/pagination";
import Table from "../common/table";
import { TextInput } from "../common/inputs";
import { Button } from "../common/buttons";
import { Card1, CardBody1, CardHeader1 } from "../common/cards";

const AddressBook = () => {
  const [addresses, setAddresses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [sortColumn, setSortColumn] = useState({ path: "title", order: "asc" });
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});

  const columns = [
    { path: "firstName", label: "Name" },
    { path: "contactNo", label: "Contact" },
    { path: "city", label: "City" },
    { path: "zipcode", label: "Zip" },
  ];

  useEffect(() => {
    populateAddresses();
    toast("addressbook useEffect executed!");
    addresses.filter((o) => {
      console.log(o);
    });
  }, []);

  const populateAddresses = async () => {
    const getaddresses = await getMyAddresses();
    setAddresses(getaddresses);
  };

  const handleDelete = async (address) => {
    const backup = addresses;
    const filter = addresses.filter((m) => m._id !== address._id);
    setAddresses(filter);
    try {
      await deleteAddress(address._id);
    } catch (e) {
      if (e.response && e.response.status === 404) {
        toast.error("This address has already been deleted");
        setAddresses(backup);
      }
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSort = (sortColumn) => {
    setSortColumn(sortColumn);
  };

  const getPagedData = () => {
    const all = addresses;

    const sorted = _.orderBy(all, [sortColumn.path], [sortColumn.order]);

    const displayData = paginate(sorted, currentPage, pageSize);

    return {
      displayData,
    };
  };

  const renderInput = (name, label, type = "text") => {
    return (
      <TextInput
        type={type}
        name={name}
        value={data[name]}
        label={label}
        //   onChange={handleChange}
        error={errors[name]}
      />
    );
  };

  const renderButton = (label) => {
    return <Button className="mt-2">{label}</Button>;
  };

  const totalCount = addresses.length;

  const { displayData } = getPagedData();
  return (
    <div className="row">
      <div className="col col-6">
        {totalCount === 0 ? (
          <Card1>
            <CardHeader1 as="h6">
              You haven't added any addresses, you're pretty anonymous!
            </CardHeader1>
          </Card1>
        ) : (
          <Card1>
            <CardHeader1 as="h6">
              {totalCount === 1 ? (
                <>You've added an address!</>
              ) : (
                <>You've added {totalCount} addresses. Have Fun!!!</>
              )}
            </CardHeader1>
            <CardBody1>
              <Table
                columns={columns}
                data={displayData}
                sortColumn={sortColumn}
                onSort={handleSort}
                onDelete={handleDelete}
              />
              <Pagination
                itemsCount={totalCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </CardBody1>
          </Card1>
        )}
      </div>
      <div className="col col-6">
        <Card1>
          <CardHeader1 as="h5">Add an Address</CardHeader1>
          <CardBody1>
            <form>
              {renderInput("productName", "Pla")}
              {renderInput("user", "Customer")}
              {renderInput("price", "Price")}
              {renderInput("quantityVar", "Quantity")}
              {renderInput("orderStatus", "We are currently")}
              {renderButton("Add")}
            </form>
          </CardBody1>
        </Card1>
      </div>
    </div>
  );
};

export default AddressBook;
