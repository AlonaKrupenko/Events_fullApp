import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./styles.module.scss";
import axios from "axios";
import * as Yup from "yup";
import { getEventById } from "../../helpers/getEventById";
import CheckmarkIcon from "../../assets/icons/checkmark";
import { useFormik } from "formik";

const Register = () => {
  const [eventData, setEventData] = useState();
  const [loading, setLoading] = useState(false);
  const [submittedSuccessfully, setSubmittedSuccessfully] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    getEventById(id, handleDataChange);
  }, [id]);

  const handleDataChange = (data) => {
    setEventData(data);
  };

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      birthDate: "",
      source: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Full name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      birthDate: Yup.date().required("Birth date is required"),
      source: Yup.string().required("Please select a source"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await axios.post(
          `http://localhost:3001/api/events/${id}/participants`,
          values
        );
        setLoading(false);
        setSubmittedSuccessfully(true);
        formik.resetForm();
      } catch (error) {
        setLoading(false);
        formik.setErrors({
          submit: error.response?.data.message || error.message,
        });
      }
    },
  });

  return (
    <div className={styles.container}>
      <h3
        className={styles.eventHeader}
      >{`Registration to event ${eventData?.title}`}</h3>
      <div className={styles.eventDetails}>
        <p>{`Event description: ${eventData?.description}`}</p>
        <p>{`Event date: ${new Date(eventData?.date).toLocaleDateString()}`}</p>
      </div>
      {loading && (
        <div className={styles.loadingMessage}>
          <p>Please wait. We are handling your registration.</p>
        </div>
      )}
      {submittedSuccessfully ? (
        <div className={styles.successMessage}>
          <CheckmarkIcon />
          <p>You was successfully registered!</p>
          <Link to="/">
            <button className={styles.goBack}>Return to events list</button>
          </Link>
        </div>
      ) : (
        <form onSubmit={formik.handleSubmit} className={styles.form}>
          <div className={styles.formField}>
            <label htmlFor="fullName" className={styles.inputLabel}>
              Full Name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              {...formik.getFieldProps("fullName")}
              placeholder="Full Name"
              className={styles.formInput}
            />
            {formik.touched.fullName && formik.errors.fullName ? (
              <div className={styles.error}>{formik.errors.fullName}</div>
            ) : null}
          </div>

          <div className={styles.formField}>
            <label htmlFor="email" className={styles.inputLabel}>
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="text"
              {...formik.getFieldProps("email")}
              className={styles.formInput}
              placeholder="Email"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className={styles.error}>{formik.errors.email}</div>
            ) : null}
          </div>

          <div className={styles.formField}>
            <label htmlFor="birthDate" className={styles.inputLabel}>
              Date of Birth
            </label>
            <input
              id="birthDate"
              name="birthDate"
              type="date"
              {...formik.getFieldProps("birthDate")}
              className={styles.formInput}
            />
            {formik.touched.birthDate && formik.errors.birthDate ? (
              <div className={styles.error}>{formik.errors.birthDate}</div>
            ) : null}
          </div>

          <div className={styles.formField}>
            <p className={styles.inputLabel}>
              Where did you hear about this event?
            </p>
            <div>
              <label className={styles.radioLabel}>
                <input
                  className={styles.radio}
                  type="radio"
                  {...formik.getFieldProps("source")}
                  value="media"
                />
                Social media
              </label>
              <label className={styles.radioLabel}>
                <input
                  className={styles.radio}
                  type="radio"
                  {...formik.getFieldProps("source")}
                  value="friends"
                />
                Friends
              </label>
              <label className={styles.radioLabel}>
                <input
                  className={styles.radio}
                  type="radio"
                  {...formik.getFieldProps("source")}
                  value="myself"
                />
                Found myself
              </label>
            </div>
            {formik.touched.source && formik.errors.source ? (
              <div className={styles.error}>{formik.errors.source}</div>
            ) : null}
          </div>

          {formik.errors.submit && (
            <div className={styles.errorMessage}>{formik.errors.submit}</div>
          )}

          <div className={styles.buttonsBlock}>
            <Link to="/">
              <button className={styles.button}>Go back</button>
            </Link>
            <button type="submit" className={styles.button}>
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Register;
