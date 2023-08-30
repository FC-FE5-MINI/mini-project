import { DatePicker, Space } from "antd";
import useDateStore from "../store/dateStore";
import { RangeValue } from "rc-picker/lib/interface";
import { Dayjs } from "dayjs";

const { RangePicker } = DatePicker;

type DateValue = Dayjs | null;

interface DatePickerProp {
  isRange: boolean;
}

const DatePickerComponent = ({ isRange }: DatePickerProp) => {
  const { setStartDate, setEndDate } = useDateStore();

  const getSelectedDate = (_: RangeValue<Dayjs> | DateValue, dateString: string[] | string) => {
    if (typeof dateString === "string") {
      setStartDate(new Date(dateString));
    } else {
      const [start, end] = dateString;
      setStartDate(new Date(start));
      setEndDate(new Date(end));
    }
  };
  return (
    <Space direction="vertical" size={12}>
      {isRange ? (
        <RangePicker onChange={getSelectedDate} disabledDate={(current) => current.isBefore(Date.now())} />
      ) : (
        <DatePicker
          showToday={false}
          onChange={getSelectedDate}
          disabledDate={(current) => current.isBefore(Date.now())}
        />
      )}
    </Space>
  );
};

export default DatePickerComponent;
