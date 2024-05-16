import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { Link, useParams } from "react-router-dom";
import { getEventById } from "../../helpers/getEventById";
import ParticipantCard from "./ParticipantCard/PatricipantCard";

const ViewEvent = () => {
  const { id } = useParams();

  const [eventData, setEventData] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    getEventById(id, handleDataChange);
  }, [id]);

  const handleDataChange = (data) => {
    setEventData(data);
  };

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h3>{`Participants of ${eventData.title}`} </h3>
        <input
          type="text"
          placeholder="Search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className={styles.searchInput}
        />
        <Link to="/">
          <button className={styles.button}>Go back</button>
        </Link>
      </div>
      <div className={styles.eventDetails}>
        <p>{`Event description: ${eventData?.description}`}</p>
        <p>{`Event date: ${eventData?.date}`}</p>
      </div>
      <div className={styles.participantsList}>
        {eventData.participants
          ?.filter(
            (participant) =>
              participant.fullName
                .toLowerCase()
                .includes(searchValue.toLowerCase()) ||
              participant.email
                .toLowerCase()
                .includes(searchValue.toLowerCase())
          )
          .map((participant) => (
            <ParticipantCard participant={participant} key={participant._id} />
          ))}
      </div>
    </div>
  );
};

export default ViewEvent;
