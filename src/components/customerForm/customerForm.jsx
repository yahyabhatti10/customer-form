import { useState } from "react";
import axios from "axios";
import './customerForm.css'; 

function CustomerForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name,
      email,
      phone,
      gender,
      description,
      image,
    };
    try {
      const response = axios.post(
        "https://cors-anywhere.herokuapp.com/https://webhook.site/99d86acc-688d-423d-bc92-5700e582d4ed",
        formData
      );
      console.log(response)
      alert("Form submitted successfully");
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to submit form");
    }
  };

  return (
    <div>
      <h1>Real-Estate Customer Form</h1>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          className="input"
          placeholder="e.g. Muhammad Yahya"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <br />

        <label>Email:</label>
        <input
          type="email"
          className="input"
          placeholder="e.g. muhammadyahya.work@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <br />

        <label>Phone:</label>
        <input
          type="tel"
          className="input"
          placeholder="e.g. 03218814089"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <br />
        <br />

        <label>Gender:</label>
        <input
          type="radio"
          name="gender"
          value="Male"
          checked={gender === "Male"}
          onChange={(e) => setGender(e.target.value)}
        /> Male
        <input
          type="radio"
          name="gender"
          value="Female"
          checked={gender === "Female"}
          onChange={(e) => setGender(e.target.value)}
        /> Female
        <br />
        <br />

        <label>Description:</label>
        <textarea
          className="textarea"
          placeholder="What kind of property are you looking for?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <br />

        <label>
          Image Upload:
          <input
            type="file"
            className="input"
            accept="image/*"
            onChange={(e) => setImage(e.target.value)}
          />
        </label>
        <br />

        <button type="submit" className="button">Submit</button>
      </form>
    </div>
  );
}

export default CustomerForm;
