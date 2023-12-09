import { useContext } from "react";

import { contactContext } from "../../context/contactContext";

import { PURPLE } from "../../helpers/colors";

const SearchContact = () => {
  const { contactQuery, contactSearch } = useContext(contactContext);

  return (
    <div className="input-group mx-2 w-75" dir="ltr">
      <span
        className="input-group-text"
        id="basic-addon1"
        style={{ backgroundColor: "purple" }}
      >
        <i className="fa fa-search" />
      </span>
      <input
        dir="rtl"
        type="text"
        value={contactQuery.text}
        onChange={contactSearch}
        style={{ borderColor: PURPLE }}
        className="form-control"
        placeholder="جستجوی مخاطب"
        aria-label="Search"
        aria-describedby="basic-addon1"
      />
    </div>
  );
};

export default SearchContact;
