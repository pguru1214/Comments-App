import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { formatDistanceToNow } from "date-fns";

const CommentsItem = ({ commentsColor }) => {
  const [formData, setFormData] = useState({
    name: "",
    comment: "",
  });

  const [commentsData, setCommentsData] = useState([]);

  const changeHandler = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const updatedData = { ...formData, id: uuidv4() };
    setCommentsData((prevstate) => [...prevstate, updatedData]);
    setFormData({
      name: "",
      comment: "",
    });
  };

  let currentIndex = 0;

  const randomColor = () => {
    const nextColor = commentsColor[currentIndex];
    currentIndex = (currentIndex + 1) % commentsColor.length;
    return nextColor;
  };

  for (let i = 0; i < commentsData.length + 1; i++) {
    randomColor();
  }

  const deleteComment = (id) => {
    setCommentsData((prevstate) => prevstate.filter((i) => i.id !== id));
  };

  console.log(formatDistanceToNow(new Date()));

  return (
    <div className="comments">
      <div className="comment-section">
        <form onSubmit={submitHandler}>
          <h1>Comments</h1>
          <p>Say Something about 4.0 Technologies</p>
          <input
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={changeHandler}
            id="name"
            className="input-Section"
          />
          <div>
            <textarea
              placeholder="Your Comment"
              value={formData.comment}
              onChange={changeHandler}
              id="comment"
              className="input-Section"
              rows="8"
            />
          </div>
          <button type="submit" className="addButton">
            Add Button
          </button>
        </form>
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
            alt="banner"
            className="banner-Image"
          />
        </div>
      </div>

      <div>
        <div className="ownerComments">
          {commentsData.map((i) => (
            <li key={i.id}>
              <div className="comment-added-section">
                <span
                  style={{ backgroundColor: randomColor() }}
                  className="first-letter"
                >
                  {i.name[0]}
                </span>
                <div>
                  <div className="time-section">
                    <h3 className="ownerName">
                      {i.name}{" "}
                      <span className="time">
                        {formatDistanceToNow(new Date())}
                      </span>
                    </h3>
                    <span>
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
                        alt="delete"
                        onClick={() => deleteComment(i.id)}
                        className="delete"
                      />
                    </span>
                  </div>
                  <p className="ownerComments">{i.comment}</p>
                </div>
              </div>
            </li>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommentsItem;
