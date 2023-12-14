import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";

import { contactContext } from "./context/contactContext";
import {
  AddContact,
  Contacts,
  Navbar,
  EditContact,
  ViewContact,
} from "./components";

import {
  CURRENTLINE,
  YELLOW,
  FOREGROUND,
  PURPLE,
  COMMENT,
} from "./helpers/colors";

import {
  getAllContacts,
  getAllGroups,
  createContact,
  deleteContact,
} from "./services/contactService";

import "./App.css";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [groups, setGroups] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [contact, setContact] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(false);
        const { data: contactsData } = await getAllContacts();
        const { data: groupsData } = await getAllGroups();

        setContacts(contactsData);
        setFilteredContacts(contactsData);
        setGroups(groupsData);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  const createContactForm = async (values) => {
    try {
      setLoading((prevLoading) => !prevLoading);

      const { status, data } = await createContact(values);

      if (status === 201) {
        const allContacts = [...contacts, data];
        setContacts(allContacts);
        setFilteredContacts(allContacts);

        setLoading((prevLoading) => !prevLoading);
        navigate("/contacts");
      }
    } catch (error) {
      setLoading((prevLoading) => !prevLoading);
    }
  };

  const onContactChange = (event) => {
    setContact({ ...contact, [event.target.name]: event.target.value });
  };

  const confirmDelete = (contactId, contactFullname) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div
            dir="rtl"
            style={{
              backgroundColor: CURRENTLINE,
              border: `1px solid ${PURPLE}`,
              borderRadius: "1em",
            }}
            className="p-4"
          >
            <h1 style={{ color: YELLOW }}>پاک کردن مخاطب</h1>
            <p style={{ color: FOREGROUND }}>
              مطمئنی که میخوای مخاطب {contactFullname} رو پاک کنی ؟
            </p>
            <button
              onClick={() => {
                removeContact(contactId);
                onClose();
              }}
              className="btn mx-2"
              style={{ backgroundColor: PURPLE }}
            >
              مطمئن هستم
            </button>
            <button
              onClick={onClose}
              className="btn"
              style={{ backgroundColor: COMMENT }}
            >
              انصراف
            </button>
          </div>
        );
      },
    });
  };

  const removeContact = async (contactId) => {
    try {
      setLoading(true);
      const response = await deleteContact(contactId);
      if (response) {
        const allContacts = contacts.filter((contact) => {
          return contact.id != contactId;
        });
        setContacts(allContacts);
        setFilteredContacts(allContacts);
        setLoading(false);
      }
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };

  let filterTimeout;
  const contactSearch = (query) => {
    clearTimeout(filterTimeout);

    if (!query) return setFilteredContacts([...contacts]);

    filterTimeout = setTimeout(() => {
      setFilteredContacts(
        contacts.filter((contact) => {
          return contact.fullname.toLowerCase().includes(query.toLowerCase());
        })
      );
    }, 1000);
  };

  return (
    <contactContext.Provider
      value={{
        loading,
        setLoading,
        contact,
        setContacts,
        setFilteredContacts,
        filteredContacts,
        contacts,
        groups,
        onContactChange,
        deleteContact: confirmDelete,
        createContact: createContactForm,
        contactSearch,
      }}
    >
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/contacts" />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/contacts/add" element={<AddContact />} />
          <Route path="/contacts/:contactId" element={<ViewContact />} />
          <Route path="/contacts/edit/:contactId" element={<EditContact />} />
        </Routes>
      </div>
    </contactContext.Provider>
  );
};

export default App;
