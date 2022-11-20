import { renderHook } from '@testing-library/react';
import { useProvideSearch } from '../search';

describe('useProvideSearch hook', () => {
  const { result } = renderHook(() => useProvideSearch());
  const expected = {
    filter: {
      genre: 'All',
      language: 'All',
    },
    handleCheckbox: expect.any(Function),
    handleFilter: expect.any(Function),
    handleOnChangeSearch: expect.any(Function),
    handleOnSubmit: expect.any(Function),
    handleSearchOnKeyPress: expect.any(Function),
    handleSort: expect.any(Function),
    recentlyReleased: false,
    search: '',
    setFilter: expect.any(Function),
    setRecentlyReleased: expect.any(Function),
    setSearch: expect.any(Function),
    sort: {
      price: 'asc',
      recentlyAdded: 'asc',
    },
  };

  it('should return the default state', () => {
    expect(result.current).toEqual(expected);
  });
});
