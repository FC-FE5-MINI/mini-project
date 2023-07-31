import { createElement, forwardRef } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { styled } from "styled-components";
import { theme } from "../styles/theme";
import useDateStore from "../store/dateStore";

interface DatePickerProp {
  isRange: boolean;
}

interface CusTomInputProp {
  value: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const DatePickerComponent = ({ isRange }: DatePickerProp) => {
  const { startDate, setStartDate, endDate, setEndDate } = useDateStore();

  const CustomInput = forwardRef<HTMLButtonElement, CusTomInputProp>(({ value, onClick }, ref) => (
    <DateButton className="example-custom-input" onClick={onClick} ref={ref}>
      {value}
    </DateButton>
  ));

  return (
    <PickerWrapper>
      <ReactDatePicker
        selected={startDate}
        selectsStart
        onChange={(date) => {
          setStartDate(date as Date);
        }}
        customInput={createElement(CustomInput)}
      />
      {isRange && (
        <>
          <div>-</div>
          <EndDatePicker>
            <ReactDatePicker
              selected={endDate}
              selectsEnd
              startDate={startDate}
              minDate={startDate}
              onChange={(date) => {
                setEndDate(date as Date);
              }}
              customInput={createElement(CustomInput)}
            />
          </EndDatePicker>
        </>
      )}
    </PickerWrapper>
  );
};

const PickerWrapper = styled.div`
  display: flex;
  height: 20px;
  border: 1px solid ${theme.colors.black};
  border-radius: 5px;
  background-color: ${theme.colors.white};
`;

const DateButton = styled.button`
  height: 20px;
  width: 100px;
  border: none;
  cursor: pointer;
  background-color: transparent;
`;

const EndDatePicker = styled.div``;

export default DatePickerComponent;
