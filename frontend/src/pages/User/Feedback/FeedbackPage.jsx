import React, { useState } from "react";
import { FaStar, FaCommentDots } from "react-icons/fa";
import "./FeedbackPage.css";

export default function FeedbackPage() {
  const [rating, setRating] = useState(0);
  const [msg, setMsg] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="feedback-bg">
      <div className="feedback-container">
        <div className="feedback-title-row">
          <span className="feedback-title">
            <FaCommentDots className="feedback-mainicon" />
            Support & Feedback
          </span>
          <div className="feedback-desc">
            Rate your experience and share your thoughts or suggestions.
          </div>
        </div>
        {!sent ? (
          <form className="feedback-form" onSubmit={handleSubmit}>
            {/* Rating */}
            <div>
              <label className="feedback-label">
                Rate Your Experience
              </label>
              <div>
                {[1, 2, 3, 4, 5].map(n =>
                  <FaStar
                    key={n}
                    className={`feedback-star${n <= rating ? " selected" : ""}`}
                    onClick={() => setRating(n)}
                  />
                )}
                <span className="feedback-rating-number">{rating ? `${rating}/5` : ""}</span>
              </div>
            </div>
            {/* Message */}
            <div>
              <label className="feedback-label">
                Your Feedback
              </label>
              <textarea
                rows={5}
                className="feedback-msg"
                placeholder="Type your feedback, suggestion, or issue…"
                value={msg}
                onChange={e => setMsg(e.target.value)}
                required
              />
            </div>
            <button className="feedback-submitbtn">
              <FaCommentDots className="feedback-submiticon" />
              Send Feedback
            </button>
          </form>
        ) : (
          <div className="feedback-confirm-msg">
            <span className="feedback-emoji">✅</span>
            Thank you for your feedback!
            {rating ? <span> (Rated: <span>{rating}/5</span>)</span> : null}
            <br />
            <span className="feedback-confirm-note">We’ll get back to you soon.</span>
          </div>
        )}
      </div>
    </div>
  );
}
