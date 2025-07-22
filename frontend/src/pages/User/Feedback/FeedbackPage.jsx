import React, { useState } from "react";
import { FaStar, FaCommentDots, FaEnvelopeOpenText } from "react-icons/fa";

const topics = [
  "App Usability",
  "Trainer Experience",
  "Facility Cleanliness",
  "Equipment Quality",
  "Payment/Billing",
  "Suggestions or Feature Request",
  "Report a Bug",
  "Other",
];

const FeedbackPage = () => {
  const [topic, setTopic] = useState(topics[0]);
  const [rating, setRating] = useState("");
  const [msg, setMsg] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div
      style={{
        minHeight: "92vh",
        width: "100vw",
        background: "#181a1b",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 900,
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <span
            style={{
              display: "inline-block",
              background: "linear-gradient(90deg,#f7c948,#fff700 50%,#fff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: 38,
              fontWeight: 800,
              letterSpacing: 1,
              textShadow: "0 1px 16px #000",
            }}
          >
            <FaCommentDots style={{ marginBottom: 7, marginRight: 8 }} />
            Support & Feedback
          </span>
          <div style={{ color: "#f3f3ce", fontSize: 19, marginTop: 8 }}>
            We value your input! Share your thoughts, suggestions, or issues below.
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{
            margin: "0 auto",
            background: "#26282c",
            borderRadius: 18,
            boxShadow: "0 6px 32px 0 #f7c94833",
            width: "100%",
            maxWidth: 680,
            color: "#fff",
            fontWeight: 500,
            padding: "40px 40px 32px 40px",
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          {/* Topic */}
          <div>
            <label
              style={{
                fontWeight: 700,
                marginBottom: 8,
                display: "block",
                color: "#f7c948",
                fontSize: 17,
              }}
            >
              Topic
            </label>
            <select
              value={topic}
              style={{
                fontWeight: 500,
                minHeight: 46,
                background: "#191c20",
                color: "#fff",
                border: "1.8px solid #f7c948",
                borderRadius: 6,
                width: "100%",
                padding: "0 10px",
                fontSize: 16,
              }}
              onChange={(e) => setTopic(e.target.value)}
            >
              {topics.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* Rating */}
          <div>
            <label
              style={{
                fontWeight: 600,
                color: "#f7c948",
                marginBottom: 8,
                display: "block",
                fontSize: 17,
              }}
            >
              Rate Your Experience{" "}
              <span style={{ fontWeight: 400, color: "#b9b9b9", fontSize: 15 }}>
                (optional)
              </span>
            </label>
            <div>
              {[1, 2, 3, 4, 5].map((n) => (
                <FaStar
                  key={n}
                  style={{
                    fontSize: "1.6rem",
                    color: n <= rating ? "#f7c948" : "#807d72",
                    cursor: "pointer",
                    marginRight: 6,
                    transition: "color .16s",
                  }}
                  onClick={() => setRating(n)}
                  onMouseOver={() => setRating(n)}
                  tabIndex={0}
                />
              ))}
              <span
                style={{
                  marginLeft: 14,
                  color: "#f7c948",
                  fontWeight: 700,
                  fontSize: 15,
                }}
              >
                {rating ? `${rating}/5` : ""}
              </span>
            </div>
          </div>

          {/* Message */}
          <div>
            <label
              style={{
                fontWeight: 600,
                marginBottom: 8,
                display: "block",
                color: "#fff700",
                fontSize: 17,
              }}
            >
              <FaEnvelopeOpenText style={{ marginBottom: 5, marginRight: 6 }} />
              Message
            </label>
            <textarea
              rows="6"
              style={{
                fontWeight: 500,
                fontSize: 16,
                padding: 14,
                borderRadius: 9,
                border: "1.7px solid #f7c948",
                background: "#191c20",
                color: "#fff",
                resize: "vertical",
                width: "100%",
              }}
              placeholder="Describe your issue or suggestion…"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              required
            />
          </div>

          <button
            className="btn w-100"
            style={{
              fontWeight: 800,
              background: "linear-gradient(90deg,#f7c948 85%,#fff 140%)",
              border: "none",
              fontSize: 20,
              letterSpacing: 0.5,
              color: "#181a1b",
              boxShadow: "0 2px 16px #f7c94866",
              borderRadius: 12,
              padding: "12px 0",
              marginTop: 10,
            }}
          >
            <FaCommentDots
              style={{
                marginBottom: 4,
                marginRight: 8,
                fontSize: 22,
                color: "#181a1b",
              }}
            />
            Send Feedback
          </button>
        </form>

        {sent && (
          <div
            className="mt-4 text-center"
            style={{
              color: "#fff",
              fontWeight: 700,
              fontSize: 19,
              background: "#1e2a18",
              padding: "26px 36px",
              borderRadius: 19,
              marginTop: 30,
              maxWidth: 540,
              boxShadow: "0 4px 18px #f7c94833",
              border: "1.7px solid #f7c948",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <span style={{ fontSize: 26, marginRight: 7, color: "#f7c948" }}>
              ✅
            </span>
            Thank you for your feedback on{" "}
            <b style={{ color: "#f7c948" }}>{topic}</b>!
            {rating ? (
              <span>
                {" "}
                (Rated: <span style={{ color: "#f7c948" }}>{rating}/5</span>)
              </span>
            ) : null}
            <br />
            <span style={{ color: "#f7c948" }}>We’ll get back to you soon.</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackPage;
