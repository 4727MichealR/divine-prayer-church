
import express from "express";
import mongoose from "mongoose";
import Event from "../models/Event.js";
import { requireAdmin } from "../middleware/auth.js";

const router = express.Router();

// Public: display events on the church homepage
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    return res.json(events);
  } catch (error) {
    console.error("Fetch events error:", error.message);
    return res.status(500).json({
      message: "Unable to fetch events.",
    });
  }
});

// Admin only: create an event
router.post("/", requireAdmin, async (req, res) => {
  try {
    const { title, description, date, location } = req.body;

    if (
      typeof title !== "string" ||
      !title.trim() ||
      typeof date !== "string" ||
      !date.trim() ||
      Number.isNaN(Date.parse(date))
    ) {
      return res.status(400).json({
        message: "A valid event title and date are required.",
      });
    }

    const event = await Event.create({
      title: title.trim(),
      description:
        typeof description === "string" ? description.trim() : "",
      date: new Date(date),
      location:
        typeof location === "string" ? location.trim() : "",
    });

    return res.status(201).json(event);
  } catch (error) {
    console.error("Create event error:", error.message);
    return res.status(500).json({
      message: "Unable to create event.",
    });
  }
});

// Admin only: delete an event
router.delete("/:id", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid event ID.",
      });
    }

    const event = await Event.findByIdAndDelete(id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found.",
      });
    }

    return res.json({
      message: "Event deleted successfully.",
    });
  } catch (error) {
    console.error("Delete event error:", error.message);
    return res.status(500).json({
      message: "Unable to delete event.",
    });
  }
});

export default router;
