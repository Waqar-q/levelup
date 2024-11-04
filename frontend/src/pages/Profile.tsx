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

const Profile: React.FC = () => {
  
  const navigate = useNavigate();
  const csrftoken = getCookie('csrftoken');
  const userID = localStorage.getItem('user_id');
  const [formData, setFormData] = useState({
    'firstName': '',
    'lastName': '',
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
          'firstName': userData.first_name,
          'lastName': userData.last_name,
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

  const submitForm = () => {
    try{
      fetch(process.env.REACT_APP_BASE_FRONT_URL + '/api/users/' + userID +'/',{
        method: 'PATCH',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken,
        }
      })
    } catch (error){
      console.error(error);
    }
  }

  if (localStorage.getItem('logged') == 'true'){
    //first name , last name, age, gender, interests, current skills,
  return (        
      <section className="profile">
        <Header page='Profile'/>
            <form action="" className="p-5">
                <input type="text" placeholder="First Name" name="firstName" onChange={handleInputChange} value={formData.firstName}/>
                <input type="text" placeholder="Last Name" name="lastName" onChange={handleInputChange} value={formData.lastName}/>
                <input type="tel" name="phone" id=""  placeholder="Contact Number with Country Code" onChange={handleInputChange} value={formData.phone}/>
                <input type="number" name="age" id="" placeholder="Age" onChange={handleInputChange} value={formData.age}/>
                <select className={` dropdown p-4 bg-sky-200 rounded-xl w-full max-w-96`} onChange={handleInputChange} >
                        <option key='gender'>Gender</option>
                        <option key='M'>Male</option>
                        <option key='F'>Female</option>
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
