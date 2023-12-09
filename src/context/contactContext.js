import { createContext } from "react";

export const contactContext = createContext({
  loading: false,
  setLoading: () => {},
  contact: {},
  setContacts: () => {},
  contacts: [],
  filteredContacts: [],
  setFilteredContacts: () => {},
  contactQuery: {},
  groups: [],
  onContactChange: () => {},
  deleteContact: () => {},
  updateContact: () => {},
  createContact: () => {},
  contactSearch: () => {},
});
