const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const dbURI = process.env.MONGODB_URI || "mongodb://localhost/eventsdb";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const ParticipantSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  birthDate: { type: String, required: true },
  source: { type: String, required: false },
});

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  organizer: { type: String, required: true },
  participants: [ParticipantSchema],
});

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;

app.get("/api/events", async (req, res) => {
  const { page = 1, limit = 12, sort = "title", direction = "asc" } = req.query;
  const sortOrder = direction === "asc" ? 1 : -1;

  try {
    const events = await Event.find()
      .sort({ [sort]: sortOrder })
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();

    const count = await Event.countDocuments();

    res.json({
      events,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (err) {
    console.error("Error in sorting events:", err);
    res.status(500).json({ message: err.message });
  }
});

app.get("/api/events/:eventId", async (req, res) => {
  const { eventId } = req.params;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/events/:eventId/participants", async (req, res) => {
  const { eventId } = req.params;
  const participant = req.body;

  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      { $push: { participants: participant } },
      { new: true, runValidators: true }
    );
    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.use(express.static(path.join(__dirname, "../app/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../app/build"));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
