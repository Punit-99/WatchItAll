import Show from "../../../models/Shows.js";

// Create a new Show (movie or webseries)
export const createShows = async (req, res) => {
  try {
    const {
      title,
      description,
      releaseDate,
      type,
      poster,
      genres,
      languages,
      movieParts,
      webseriesSeasons,
    } = req.body;

    // Basic validation
    if (!type || !title || !releaseDate) {
      return res
        .status(400)
        .json({ message: "Type, title, and release date are required." });
    }

    const newShow = new Show({
      type,
      title,
      description,
      genres,
      releaseDate,
      language: languages?.join(", "), // save as a comma string or adjust as needed
      poster: poster?.url || "",
      parts:
        type === "movie"
          ? movieParts?.map((part) => ({
              partTitle: part.subtitle,
              videoUrl: part.url,
              duration: 0, // optional, fill in if available
            }))
          : [],
      seasons:
        type === "webseries"
          ? webseriesSeasons?.map((season) => ({
              seasonNumber: season.season,
              episodes: season.episodes.map((episode) => ({
                episodeTitle: episode.subtitle,
                videoUrl: episode.url,
                duration: 0, // optional
              })),
            }))
          : [],
    });

    await newShow.save();

    console.log("Show uploaded to DB ✅");
    res
      .status(201)
      .json({ message: "Show created successfully", show: newShow });
  } catch (error) {
    console.error("Create Show Error:", error);
    res
      .status(500)
      .json({ message: "Failed to create show", error: error.message });
  }
};

// Get all shows
export const getAllShows = async (req, res) => {
  try {
    const shows = await Show.find().sort({ createdAt: -1 });

    if (!shows || shows.length === 0) {
      return res.status(200).json({
        success: true,
        shows: [],
        message: "No shows found.",
      });
    }

    res.status(200).json({ success: true, shows });
  } catch (error) {
    console.error("Fetch Shows Error:", error);
    res.status(500).json({
      message: "Failed to fetch shows",
      error: error.message,
    });
  }
};
