
import { useState } from "react";
import "../App.css";

const photos = [
  {
    title: "Church Worship",
    category: "Worship",
    url: "https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Prayer and Fellowship",
    category: "Prayer",
    url: "https://images.unsplash.com/photo-1519491050282-cf00c82424b4?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Church Gathering",
    category: "Events",
    url: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Praise and Worship",
    category: "Worship",
    url: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Community Fellowship",
    category: "Events",
    url: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Moments of Prayer",
    category: "Prayer",
    url: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=1000&q=80",
  },
];

function Gallery() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [filter, setFilter] = useState("All");

  const categories = ["All", "Worship", "Prayer", "Events"];

  const filteredPhotos =
    filter === "All"
      ? photos
      : photos.filter((photo) => photo.category === filter);

  return (
    <main className="section">
      <div className="container">
        <p className="eyebrow">DIVINE PRAYER CHURCH</p>
        <h1>Our Gallery</h1>
        <p>
          Moments of worship, prayer, fellowship, and community.
        </p>

        <div className="gallery-filters">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setFilter(category)}
              className={filter === category ? "active" : ""}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="gallery-grid">
          {filteredPhotos.map((photo) => (
            <button
              className="gallery-card"
              key={photo.title}
              type="button"
              onClick={() => setSelectedPhoto(photo)}
            >
              <img src={photo.url} alt={photo.title} loading="lazy" />
              <span>{photo.title}</span>
            </button>
          ))}
        </div>

        {selectedPhoto && (
          <div
            className="gallery-lightbox"
            onClick={() => setSelectedPhoto(null)}
          >
            <button
              className="gallery-close"
              type="button"
              aria-label="Close image"
              onClick={() => setSelectedPhoto(null)}
            >
              ×
            </button>
            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.title}
              onClick={(event) => event.stopPropagation()}
            />
          </div>
        )}
      </div>
    </main>
  );
}

export default Gallery;
