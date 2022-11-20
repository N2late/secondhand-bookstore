import { useRouter } from 'next/router';
import React, { createContext, useContext, useState } from 'react';

type SearchContextType = ReturnType<typeof useProvideSearch>;

/* Creating a context object. */
const searchContext = createContext({} as SearchContextType);

type Props = {
  children: React.ReactNode;
};

/**
 * ProvideSearch is a function that takes a children prop and returns a searchContext.Provider
 * component with a value of search.
 * @param {Props}  - Props
 * @returns The searchContext.Provider is being returned.
 */
export function ProvideSearch({ children }: Props) {
  const search = useProvideSearch();
  return (
    <searchContext.Provider value={search}>{children}</searchContext.Provider>
  );
}

/**
 * This function returns the value of the searchContext object.
 * @returns The useContext hook is being used to return the searchContext.
 */
export const useSearch = () => {
  return useContext(searchContext);
};

export function useProvideSearch() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState({
    genre: 'All',
    language: 'All',
  });
  const [recentlyReleased, setRecentlyReleased] = useState(false);
  const [sort, setSort] = useState({
    price: 'asc',
    recentlyAdded: 'asc',
  });
  const router = useRouter();

  const handleSearchOnKeyPress = async (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setSearch(search);
      if (!search) {
        return;
      }
      if (router.pathname !== '/books/buy') {
        setFilter({ genre: 'All', language: 'All' });
        return await router.push(
          `/books/buy?search=${search.toLocaleLowerCase()}`,
        );
      } else {
        return await router.push(
          `/books/buy?search=${search.toLocaleLowerCase()}${
            filter.genre ? `&genre=${filter.genre}` : 'All'
          }${filter.language ? `&language=${filter.language}` : 'All'}${
            recentlyReleased
              ? `&recentlyReleased=${recentlyReleased}`
              : `&recentlyReleased=${recentlyReleased}`
          }
            ${sort.price ? `&price=${sort.price}` : ''}${
            sort.recentlyAdded ? `&recentlyAdded=${sort.recentlyAdded}` : ''
          }`,
        );
      }
    }
  };

  const handleFilter = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ) => {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecentlyReleased(e.target.checked);
  };

  const handleOnChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort({ ...sort, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    return await router.push(
      `/books/buy?search=${search.toLocaleLowerCase()}${
        filter.genre ? `&genre=${filter.genre}` : ''
      }${filter.language ? `&language=${filter.language}` : ''}${
        recentlyReleased ? `&recentlyReleased=true` : `&recentlyReleased=false`
      }
        ${sort.price ? `&price=${sort.price}` : ''}${
        sort.recentlyAdded ? `&recentlyAdded=${sort.recentlyAdded}` : ''
      }`,
    );
  };

  return {
    search,
    filter,
    sort,
    setSearch,
    handleSearchOnKeyPress,
    handleFilter,
    handleOnChangeSearch,
    handleSort,
    handleOnSubmit,
    handleCheckbox,
    setFilter,
    recentlyReleased,
    setRecentlyReleased,
  };
}
