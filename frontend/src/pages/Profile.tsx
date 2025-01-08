import React, { ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Card from "../components/Card";
import testImage from "../assets/Web-Development-Course-Thumbnail.jpg";
import Checkbox from "../components/Checkbox";
import Dropdown from "../components/Dropdown";
import Header from "../components/Header";
import Input from "../components/Input_Field";
import Loader from "../components/Loader";
import Dialog from "../components/Dialog";
import Radio from "../components/Radio";
import BottomMenu from "../components/Bottom_Menu";
import defaultDp from "../assets/default_dp.jpg";
import getCookie from "../utilities/getCookie";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile: React.FC = () => {
  
  const navigate = useNavigate();
  const csrftoken = getCookie('csrftoken');
  const userID = localStorage.getItem('user_id');
  const [formData, setFormData] = useState({
    'first_name': '',
    'last_name': '',
    'phone': '',
    'age': '',
    'gender': '',
    
  })
  
  useEffect(() => {
    const fetchUserData = async () => {
      try{
        const response = await fetch(process.env.REACT_APP_BASE_FRONT_URL + '/api/users/' + userID,{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,

            }
        })
        const userData = await response.json();
        setFormData({
          ...formData,
          'first_name': userData.first_name,
          'last_name': userData.last_name,
          'phone': userData.phone,
          'age': userData.age,
          'gender': userData.gender,
        })
        console.log(formData, userData);
  
      } catch (error){
        console.error(error);
      }
    }


    if (userID == null){
      navigate('/login')
    } else {
      fetchUserData();}

    
  
},[userID]);


  const handleInputChange = (event: any) => {
    setFormData({
        ...formData,
        [event.target.name]: event.target.value,
        
    })
    console.log(formData)
  }

  const submitForm = async () => {
    try{
      const response = await fetch(process.env.REACT_APP_BASE_FRONT_URL + '/api/users/' + userID +'/',{
        method: 'PATCH',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken,
        }
      })

      if (response.ok){
        const data =await response.json()
        console.log("Apna data:",data)
        toast.success("Saved.")
          localStorage.setItem('firstName', formData['first_name']);
          localStorage.setItem('lastName', formData['last_name']);
          localStorage.setItem('age', formData['age']);
          localStorage.setItem('gender', formData['gender']);
          localStorage.setItem('phone', formData['phone']); 
        setTimeout(() => navigate(-1), 500)}

    } catch (error){
      toast.error("Failed to update profile. Please try again.");
      console.error(error);
    }
  }

  if (localStorage.getItem('logged') == 'true'){
    //first name , last name, age, gender, interests, current skills,
  return (        
      <section className="profile">
        <ToastContainer/>
        <Header page='Profile'/>
            <form action="" className="p-5 pt-16 flex flex-col justify-self-center">
                <input type="text" placeholder="First Name" name="first_name" onChange={handleInputChange} value={formData.first_name}/>
                <input type="text" placeholder="Last Name" name="last_name" onChange={handleInputChange} value={formData.last_name}/>
                <input type="tel" name="phone" id=""  placeholder="Contact Number with Country Code" onChange={handleInputChange} value={formData.phone}/>
                <input type="number" name="age" id="" placeholder="Age" onChange={handleInputChange} value={formData.age}/>
                <select className={` dropdown p-4 bg-sky-200 rounded-xl w-full max-w-96`} onChange={handleInputChange} name='gender'>
                        <option key='gender'>Gender</option>
                        <option key='M' selected={formData.gender == 'M'}>M</option>
                        <option key='F' selected={formData.gender == 'F'}>F</option>
                </select>
                <button type='button' onClick={submitForm}>Save Profile</button>
            </form>
        <BottomMenu/>
      </section>
  );
} else{
  navigate('/login');
  return null;
}
}
export default Profile;
