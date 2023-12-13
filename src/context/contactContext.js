import { createContext } from "react";

export const contactContext = createContext({
  loading: false,
  setLoading: () => {},
  contact: {},
  setContacts: () => {},
  contacts: [],
  filteredContacts: [],
  setFilteredContacts: () => {},
  groups: [],
  onContactChange: () => {},
  deleteContact: () => {},
  updateContact: () => {},
  createContact: () => {},
  contactSearch: () => {},
  errors: [],
});
