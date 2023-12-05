import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";

const AppointmentItems = () => {
  const [formData, setFormData] = useState({
    appointment: "",
    appointmentDate: "",
  });
  const [listData, setListData] = useState([]);
  const [starred, setStarred] = useState([]);
  const [showStarredOnly, setShowStarredOnly] = useState(false);

  const changeHandler = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };
  
 let DateFormatStyle = format(new Date(), "dd MMMM yyyy, EEEE");

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const updatedData = { ...formData, id: uuidv4(), isStarred: false };
    setListData((prevData) => [...prevData, updatedData]);
    setFormData({
      appointment: "",
      appointmentDate: "",
    });
  };

  const starredData = (id) => {
    const updatedStarred = starred.map((item) =>
      item.id === id ? { ...item, isStarred: !item.isStarred } : item
    );
    setStarred(updatedStarred);

    const updatedListData = listData.map((item) =>
      item.id === id ? { ...item, isStarred: !item.isStarred } : item
    );
    setListData(updatedListData);
  };

  useEffect(() => {
    setStarred(listData.map((item) => ({ id: item.id, isStarred: false })));
  }, [listData]);

  const toggleStarredOnly = () => {
    setShowStarredOnly(!showStarredOnly);
  };

  return (
    <div>
      <h1>Add Appointment</h1>
      <form onSubmit={onSubmitHandler}>
        <div>
          <input
            type="text"
            id="appointment"
            value={formData.appointment}
            onChange={changeHandler}
          />
          <div>
            <input
              type="date"
              id="appointmentDate"
              value={formData.appointmentDate}
              onChange={changeHandler}
            />
          </div>
        </div>
        <button type="submit">Add Appointment</button>
      </form>
      <div>
        <h1>Appointments</h1>
        {listData
          .filter((i) => !showStarredOnly || (showStarredOnly && i.isStarred))
          .map((i) => (
            <p key={i.id}>
              {i.appointment}, {i.appointmentDate}
              <img
                src={
                  i.isStarred
                    ? "https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png"
                    : "https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png"
                }
                alt={i.isStarred ? "filledStar-img" : "star-img"}
                onClick={() => starredData(i.id)}
              />
              {DateFormatStyle}
            </p>
          ))}
        <button onClick={toggleStarredOnly}>
          {showStarredOnly ? "Show All" : "Starred"}
        </button>
      </div>
    </div>
  );
};

export default AppointmentItems;
