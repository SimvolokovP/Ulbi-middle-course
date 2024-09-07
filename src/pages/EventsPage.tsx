import { FC } from "react";
import EventsCalendar from "../components/EventsCalendar";

const EventsPage: FC = () => {
  return (
    <div>
      <EventsCalendar events={[]} />
    </div>
  );
};

export default EventsPage;
