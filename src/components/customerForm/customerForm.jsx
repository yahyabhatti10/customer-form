import { useState } from "react";
import axios from "axios";
import './customerForm.css'; 

function CustomerForm() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [gender, setGender] = useState("");
//   const [description, setDescription] = useState("");
//   const [image, setImage] = useState("");

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    description: '',
    image: ''
  })

  const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    if (file.size > 1024 * 1024) {
      alert("Image file is too large. Max size is 1MB.");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        image: reader.result, 
      }));
    };
    reader.readAsDataURL(file);
  }
};

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  async function handleSubmit(e){
    e.preventDefault();
    // const formData = {
    //   name,
    //   email,
    //   phone,
    //   gender,
    //   description,
    //   image,
    // };
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

  const handleRefresh = () => {
    setFormData(
        {
    name: '',
    email: '',
    phone: '',
    gender: '',
    description: '',
    image: ''
  })
  }


  return (
    <div>
      <h1>Real-Estate Customer Form</h1>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name = "name"
          required
          className="input"
          placeholder="e.g. Muhammad Yahya"
          value={formData.name}
        //   onChange={(e) => setName(e.target.value)}
          onChange={(e) => handleChange(e)}
        />
        <br />
        <br />

        <label>Email:</label>
        <input
          type="email"
          required
          name = "email"
          className="input"
          placeholder="e.g. muhammadyahya.work@gmail.com"
          value={formData.email}
        //   onChange={(e) => setEmail(e.target.value)}
          onChange={(e) => handleChange(e)}
        />
        <br />
        <br />

        <label>Phone:</label>
        <input
          type="tel"
          required
          name = "phone"
          className="input"
          placeholder="e.g. 03218814089"
          value={formData.phone}
        //   onChange={(e) => setPhone(e.target.value)}
            onChange={(e) => handleChange(e)}
        
          
        />
        <br />
        <br />

        <label>Gender:</label>
        <input
          type="radio"
          name="gender"
          value="Male"
          checked={formData.gender === "Male"}
        //   onChange={(e) => setGender(e.target.value)}
        onChange={(e) => handleChange(e)}
        /> Male
        <input
          type="radio"
          name="gender"
          value="Female"
          checked={formData.gender === "Female"}
        //   onChange={(e) => setGender(e.target.value)}
          onChange={(e) => handleChange(e)}
        /> Female
        <br />
        <br />

        <label>Description:</label>
        <textarea
          className="textarea"
          required
          name = "description"
          placeholder="What kind of property are you looking for?"
          value={formData.description}
        //   onChange={(e) => setDescription(e.target.value)}
        onChange={(e) => handleChange(e)}
        />
        <br />
        <br />

        <input
          type="file"
          className="input"
          name = "image"
          accept="image/*"
          onChange={handleImageChange}
        />          
        <br />

        {formData.image && (
        <div>
            <h3>Preview:</h3>
            <img src={formData.image} alt="Selected" style={{ maxWidth: '300px' }} />
        </div>
)}

        <button type="submit" className="button">Submit</button>
        <button className="button" onClick={() => handleRefresh()}>Refresh</button>
      </form>
    </div>
  );
}

export default CustomerForm;
