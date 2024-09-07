import { Button, DatePicker, Form, Input, Row, Select } from "antd";
import { FC, useEffect, useState } from "react";
import { rulesUtils } from "../utils/utils";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { getUsers } from "../store/slices/eventSlcie";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { IEvent } from "../models/IEvent";
import { formatDate } from "../utils/date";
import { Dayjs } from "dayjs";
import { IUser } from "../models/IUser";

interface EventFormProps {
  guests: IUser[];
  submit: (event: IEvent) => void;
}

const EventForm: FC<EventFormProps> = (props) => {
  const { user } = useTypedSelector((state) => state.auth);
  const [newEvent, setNewEvent] = useState<IEvent>({
    descr: "",
    author: user?.username,
    date: "",
    guest: "",
  });
  const guests = props.guests;
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const selectDate = (date: Dayjs | null) => {
    if (date) {
      setNewEvent({ ...newEvent, date: formatDate(date.toDate()) });
    }
  };

  return (
    <>
      <Form
        onFinish={() => props.submit({ ...newEvent, author: user?.username })}
      >
        <Form.Item
          label="Description"
          name={"descr"}
          rules={[rulesUtils.required()]}
        >
          <Input
            onChange={(e) =>
              setNewEvent({ ...newEvent, descr: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item label="Date" name={"date"} rules={[rulesUtils.required()]}>
          <DatePicker onChange={(value) => selectDate(value)} />
        </Form.Item>
        <Form.Item label="Guest" name={"guset"} rules={[rulesUtils.required()]}>
          <Select onChange={(e) => setNewEvent({ ...newEvent, guest: e })}>
            {guests.map((guest) => (
              <Select.Option key={guest.username}>
                {guest.username}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Row justify={"center"}>
          <Button htmlType={"submit"} type={"primary"}>
            Create!
          </Button>
        </Row>
      </Form>
    </>
  );
};

export default EventForm;
