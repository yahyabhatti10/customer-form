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

  const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    if (file.size > 1024 * 1024) {
      alert("Image file is too large. Max size is 1MB.");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result); 
    };
    reader.readAsDataURL(file);
  }
};

  async function handleSubmit(e){
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
      const response = await axios.post(
        "https://cors-anywhere.herokuapp.com/https://webhook.site/3ce93fad-2e3a-41a3-b3a5-0145be691bbf",
        formData
      );
    //   console.log(response)
    // console.log(response.data)
    console.log(`STATUS: ${response.status}`)
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
          required
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
          required
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
          required
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
          required
          placeholder="What kind of property are you looking for?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <br />

        <input
          type="file"
          className="input"
          accept="image/*"
          onChange={handleImageChange}
        />          
        <br />

        {image && (
        <div>
            <h3>Preview:</h3>
            <img src={image} alt="Selected" style={{ maxWidth: '300px' }} />
        </div>
)}

        <button type="submit" className="button">Submit</button>
      </form>
    </div>
  );
}

export default CustomerForm;
