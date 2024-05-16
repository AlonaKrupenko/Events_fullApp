import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import EventCard from "./EventCard";
import axios from "axios";
import ArrowUpIcon from "../../assets/icons/arrowUp";
import ArrowDownIcon from "../../assets/icons/arrowDown";

const EventsList = () => {
  const [eventsList, setEventsList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [sortField, setSortField] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const fetchEvents = async () => {
      const url = `http://localhost:3001/api/events?page=${currentPage}&limit=12&sort=${sortField}&direction=${sortOrder}`;

      try {
        const res = await axios.get(url);
        setEventsList(res.data.events);
        setTotalPages(res.data.totalPages);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [currentPage, sortField, sortOrder]);

  const handleSortChange = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  return (
    <div className={styles.container}>
      <h1>Events List</h1>
      <div className={styles.sortButtonsWrapper}>
        <span className={styles.sortTitle}>Sort by: </span>
        <button
          className={`${styles.sortButton} ${
            sortField === "title" ? styles.active : ""
          }`}
          onClick={() => handleSortChange("title")}
        >
          Title
          {sortOrder === "asc" && sortField === "title" ? (
            <ArrowUpIcon />
          ) : (
            <ArrowDownIcon />
          )}
        </button>
        <button
          className={`${styles.sortButton} ${
            sortField === "date" ? styles.active : ""
          }`}
          onClick={() => handleSortChange("date")}
        >
          Date
          {sortOrder === "asc" && sortField === "date" ? (
            <ArrowUpIcon />
          ) : (
            <ArrowDownIcon />
          )}
        </button>
        <button
          className={`${styles.sortButton} ${
            sortField === "organizer" ? styles.active : ""
          }`}
          onClick={() => handleSortChange("organizer")}
        >
          Organizer
          {sortOrder === "asc" && sortField === "organizer" ? (
            <ArrowUpIcon />
          ) : (
            <ArrowDownIcon />
          )}
        </button>
      </div>
      <div className={styles.eventsList}>
        {eventsList.map((el) => (
          <EventCard
            title={el.title}
            description={el.description}
            date={new Date(el.date).toLocaleDateString()}
            organizer={el.organizer}
            id={el._id}
            key={el._id}
          />
        ))}
      </div>

      <div className={styles.paginationBlock}>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`${styles.paginationButton} ${
              currentPage === i + 1 ? styles.active : ""
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EventsList;
