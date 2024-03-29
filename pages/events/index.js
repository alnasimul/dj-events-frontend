import EventItem from "@/components/EventItem";
import Layout from "@/components/Layout";
import Pagination from "@/components/Pagination";
import { API_URL, PER_PAGE } from "@/config/index";

export default function EventsPage({ events, page, total }) {
  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}

      {events.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}
     <Pagination page={page} total={total}/>
    </Layout>
  );
}

export async function getServerSideProps({ query: { page = 1 } }) {
  //Calculate Start Page
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;

  //Fetching Total/Count Events
  const totalRes = await fetch(`${API_URL}/events/count`);
  const total = await totalRes.json();

  // Fetching Evants
  const eventsRes = await fetch(
    `${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`
  );
  const events = await eventsRes.json();

  return {
    props: { events, page: +page, total },
  };
}
