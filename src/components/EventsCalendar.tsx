import { Button, Calendar, Modal, Row } from "antd";
import { FC, useEffect, useState } from "react";
import { IEvent } from "../models/IEvent";
import EventForm from "./EventForm";
import { useDispatch } from "react-redux";
import { createEvent, fetchEvents } from "../store/slices/eventSlcie";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { AppDispatch } from "../store";
import { formatDate } from "../utils/date";
import { Dayjs } from "dayjs";

interface EventsCalendarEvents {
  events: IEvent[];
}

const EventsCalendar: FC<EventsCalendarEvents> = () => {
  const [modal, setModal] = useState(false);
  const [userEvents, setUserEvents] = useState<IEvent[]>([]);

  const dispatch = useDispatch<AppDispatch>();
  const { guests } = useTypedSelector((state) => state.event);
  const { user } = useTypedSelector((state) => state.auth);

  const submit = async (newEvent: IEvent) => {
    await dispatch(createEvent(newEvent));
    setModal(false);
    console.log(newEvent);
  };

  useEffect(() => {
    const fetchData = async () => {
      const resultAction = await dispatch(fetchEvents(user?.username));
      if (fetchEvents.fulfilled.match(resultAction)) {
        setUserEvents(resultAction.payload);
      } else {
        console.error("Не удалось получить события:", resultAction.payload);
      }
    };

    fetchData();
  }, [dispatch]);

  const dateCellRender = (value: Dayjs) => {
    const formatedDate = formatDate(value.toDate());
    const currentDayEvents = userEvents.filter(
      (ev) => ev.date === formatedDate
    );
    return (
      <div>
        {currentDayEvents.map((ev, index) => (
          <div key={index}>{ev.descr}</div>
        ))}
      </div>
    );
  };

  return (
    <>
      <Calendar cellRender={dateCellRender} />
      <Row justify={"center"}>
        <Button className="fixed-btn" onClick={() => setModal(true)}>
          Добавить новое событие
        </Button>
      </Row>
      <Modal
        title="Добавить новое событие"
        footer={null}
        onCancel={() => setModal(false)}
        open={modal}
      >
        <EventForm guests={guests} submit={submit} />
      </Modal>
    </>
  );
};

export default EventsCalendar;
