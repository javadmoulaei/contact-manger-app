import { createContext } from "react";

export const contactContext = createContext({
  loading: false,
  setLoading: () => {},
  setContacts: () => {},
  contacts: [],
  filteredContacts: [],
  setFilteredContacts: () => {},
  groups: [],
  deleteContact: () => {},
  updateContact: () => {},
  createContact: () => {},
  contactSearch: () => {},
});
