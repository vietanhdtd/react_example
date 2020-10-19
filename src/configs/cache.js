import { makeVar, InMemoryCache } from "@apollo/client";

export const defaultFilter = [
  {
    id: "vote_average",
    checked: true,
    label: "Score",
  },
  {
    id: "release_date",
    checked: true,
    label: "Release Date",
  },
  {
    id: "original_title",
    checked: false,
    label: "Original title",
  },
  {
    id: "overview",
    checked: false,
    label: "Overview",
  },
];

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        filter: {
          read() {
            return filterVar();
          },
        },
      },
    },
  },
});

export const filterVar = makeVar(defaultFilter);
