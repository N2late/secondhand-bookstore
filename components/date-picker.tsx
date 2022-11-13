import 'react-datepicker/dist/react-datepicker.css';
import range from 'lodash/range';
import DatePicker from 'react-datepicker';
import Select from 'react-select';

export function MonthYearPicker({ setReleaseDate, releaseDate }: any) {
  return (
    <DatePicker
      selected={releaseDate}
      placeholderText="MM/YYYY"
      onChange={(date) => {
        date ? setReleaseDate(date) : setReleaseDate(null);
      }}
      dateFormat="MM/yyyy"
      showMonthYearPicker
      renderCustomHeader={({ date, changeYear }) =>
        CustomYearDropdownPicker({ date, changeYear })
      }
    />
  );
}

function CustomYearDropdownPicker({ changeYear }: any) {
  return (
    <Select
      options={range(1920, new Date().getFullYear() + 1).map((y) => ({
        label: y.toString(),
        value: y,
      }))}
      onChange={(e: any) => changeYear(e.value)}
    />
  );
}
