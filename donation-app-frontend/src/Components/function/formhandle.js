import {useState,useEffect} from 'react';


//This is the function that handles the form
 const useForm = () => {

    const [form ,setForm] = useState({});
    const [current,setCurrent] = useState("");
    const [formError, setFormError] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [open , setOpen] = useState(false);
    const [errMessage,setErrMessage] = useState(false);
    const [message,setMessage] = useState("");
    const [forgot,setForgot] = useState(false);
    const [modOpen,setModopen] = useState(false);

      
      //This is for handling the form value is right or wrong accordingly do something
      const saveAndContinue = (e) => {
        // console.log(form,formError);
        e.preventDefault();
        setIsSubmitting(true);
        setFormError(validate(form,current));
      }

      //This is for storing the form value in the state
    const handleChange = (e,{name, value}) => {
      // console.log(name,value);
          setForm({...form, [name]: value});
      }

   //This is for fetching data from the server   
  async function fetchData(url,dt,type,method){
    const response = await fetch(url,{
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...dt
      })
    });
    const data = await response.json();
    // console.log(data);
    if(data.msg.includes("Sucess")){
      setModopen(true);

      if(type==="Loginuser"||type==="Loginorg"){
        localStorage.setItem("token",data.token);
        if(type==="Loginuser")
        localStorage.setItem("userType","user");
        else
        localStorage.setItem("userType","org");
      }
      
      setErrMessage(false);
      setMessage("");
    }else{
      setOpen(false);
      setErrMessage(true);
      setMessage(data.msg);
    }
  }
     //This function called when all things is correct and all data get stored or updated in the server 
    useEffect(() => {
        if (Object.keys(formError).length === 0 && isSubmitting) {
        setOpen(true);
        }
        else {
        setIsSubmitting(false);
        }

        }, [formError,isSubmitting]);

      const countryOptions = [
        { key: 'a', value: 'Andaman and Nicobar Islands', text: 'Andaman and Nicobar Islands' },
        { key: 'b', value: 'Andhra Pradesh', text: 'Andhra Pradesh' },
        { key: 'c', value: 'Arunachal Pradesh', text: 'Arunachal Pradesh' },
        { key: 'd', value: 'Assam', text: 'Assam' },
        { key: 'e', value: 'Bihar', text: 'Bihar' },
        { key: 'f', value: 'Chandigarh', text: 'Chandigarh' },
        { key: 'g', value: 'Chhattisgarh', text: 'Chhattisgarh' },
        { key: 'h', value: 'Dadra & Nagar Haveli', text: 'Dadra & Nagar Haveli' },
        { key: 'i', value: 'Delhi', text: 'Delhi' },
        { key: 'j', value: 'Goa', text: 'Goa' },
        { key: 'k', value: 'Gujrat', text: 'Gujrat' },
        { key: 'l', value: 'Haryana', text: 'Haryana' },
        { key: 'm', value: 'Himachal Pradesh', text: 'Himachal Pradesh' },
        { key: 'n', value: 'Jammu and Kashmir', text: 'Jammu and Kashmir' },
        { key: 'o', value: 'Jammu and Kashmir', text: 'Jharkhand' },
        { key: 'p', value: 'Karnataka', text: 'Karnataka' },
        { key: 'q', value: 'Kerala', text: 'Kerala' },
        { key: 'r', value: 'Lakshadweep', text: 'Lakshadweep' },
        { key: 's', value: 'Madhya Pradesh', text: 'Madhya Pradesh' },
        { key: 't', value: 'Maharashtra', text: 'Maharashtra' },
        { key: 'u', value: 'Manipur', text: 'Manipur' },
        { key: 'v', value: 'Meghalaya', text: 'Meghalaya' },
        { key: 'w', value: 'Mizoram', text: 'Mizoram' },
        { key: 'x', value: 'Nagaland', text: 'Nagaland' },
        { key: 'y', value: 'Odisha', text: 'Odisha' },
        { key: 'z', value: 'Punjab', text: 'Punjab' },
        { key: 'aa', value: 'Puducherry', text: 'Puducherry' },
        { key: 'ab', value: 'Sikkim', text: 'Sikkim' },
        { key: 'ac', value: 'Tamil Nadu', text: 'Tamil Nadu' },
        { key: 'ad', value: 'Telangana', text: 'Telangana' },
        { key: 'ae', value: 'Tripura', text: 'Tripura' },
        { key: 'af', value: 'Uttar Pradesh', text: 'Uttar Pradesh' },
        { key: 'ag', value: 'Uttarakhand', text: 'Uttarakhand' },
        { key: 'ah', value: 'West Bengal', text: 'West Bengal' },
      ]

      //this is for making all the state to its default value
      const setreset = () =>{
        setForm({});
        setFormError({});
        setOpen(false);
        setIsSubmitting(false);
      }


      return {form, handleChange,saveAndContinue,formError,errMessage,message,forgot,setForgot,
        countryOptions,open,setOpen,setForm,setIsSubmitting,setreset,setCurrent,setModopen,modOpen,fetchData};

  }
  
  export default useForm;

  //This is for validating the form value
  const  validate = (val,type) =>{
    const errors = {};

    if(type==="Transaction"){

      if(!val.name || val.name.length < 4)
      {
        if(!val.name)
        errors.nameError = 'Name Required';
        else
        errors.nameError = ' Name must be at least 4 characters';

      }
      if (!val.email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val?.email)) {
        if(!val.email)
        errors.emailError = ' Email Required';
        else
        errors.emailError = 'Invalid Email';
      }
      if(!val.phoneNo || val.phoneNo.length < 10){
        if(!val.phoneNo)
        errors.phoneNoError = ' Phone No. Required';
        else
        errors.phoneNoError = ' Phone No. must be at least 10 characters';
      }
      if(!val.anonymous){
        if(!val.anonymous)
        errors.anonymous = 'Select Yes or NO';
      }
      if(!val.amount || val.amount<=0)
      {
        if(!val.amount)
        errors.amountError = 'Amount Required';
        else
        errors.amountError = 'Amount must be greater than 0';

      }
      if(!val.cardNo || val.cardNo < 1000000000000000 || val.cardNo > 9999999999999999)
      {
        if(!val.cardNo)
        errors.cardNoError = 'Card No. Required';
        else 
        errors.cardNoError = 'Please Enter Valid Card No.';
      }
      if(!val.cvv || val.cvv < 100 || val.cvv > 999){
        if(!val.cvv)
        errors.cvvError = 'CVV Required';
        else
        errors.cvvError = 'CVV must be 3 digits only';
      }
      if(!val.date)
      {
        errors.dateError = 'Date Required';
      }


    }

    if(type==='post')
    {
      if(!val.name || val.name.length < 4)
      {
        if(!val.name)
        errors.nameError = ' Name Required';
        else
        errors.nameError = ' Name must be at least 4 characters';

      }

      if(!val.cause || val.cause.length<50)
      {
        if(!val.cause)
        errors.causeError = 'Cause Required';
        else
        errors.causeError = 'Cause must be at least 50 characters';
      }
      if(!val.amount|| val.amount<5000)
      {
        if(!val.amount)
        errors.amountError = 'Amount Required';
        else
        errors.amountError = 'Amount must be at least 5000';
      }

       
      // const pat = "[^\\s]+(\\.(?i)(jpe?g|png|gif|bmp))$"
      if(!val.image)
      {

        if(!val.image)
        errors.imageError = 'Image Required';
        
      }

      if(!val.document)
      {
        errors.documentError = "Document Required"
      }

    }
   
    if(type === 'user')
    {
      if (!val.lastName || val.lastName.length < 3) 
      {
        if(!val.lastName)
        errors.lastNameError = ' First Name Required';
        else
        errors.lastNameError = ' First Name must be at least 3 characters';
      }
    }
    
    if(type === 'user' || type === 'org')
    {

      if(!val.name || val.name.length < 4)
      {
        if(!val.name)
        errors.nameError = ' Name Required';
        else
        errors.nameError = ' Name must be at least 4 characters';

      }
      
      if (!val.state ) {
        if(!val.state)
        errors.stateError = ' State Required';
        else
        errors.stateError = ' State not found';
      }

      if(!val.phoneNo || val.phoneNo.length < 10){
        if(!val.phoneNo)
        errors.phoneNoError = ' Phone No. Required';
        else
        errors.phoneNoError = ' Phone No. must be at least 10 characters';
      }

      if(!val.date)
      {
        errors.dateError = ' Date Required';
      }

    }

    if(type === 'org' || type === 'user' || type === "forgot")
    {         
      if (!val.email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val?.email)) {
        if(!val.email)
        errors.emailError = ' Email Required';
        else
        errors.emailError = 'Invalid Email';
      }
      if (!val?.confirmPassword || val?.confirmPassword !== val.password || val.confirmPassword.length < 8) {
        if(!val?.confirmPassword)
        errors.confirmPasswordError = ' Confirm Password Required';
        else if(val?.confirmPassword !== val?.password)
        errors.confirmPasswordError = ' Password does not match';
        else
        errors.confirmPasswordError = ' Password must be at least 8 characters';
      }
      if (!val.password || val.password.length < 8) {
        if(!val?.password)
        errors.passwordError = ' Password Required';
        else
        errors.passwordError = ' Password must be at least 8 characters';
      }

    }
        
    

    if(type === 'login')
    {
      if (!val.password || val.password.length < 8) {
        if(!val?.password)
        errors.passwordError = ' Password Required';
        else
        errors.passwordError = ' Password must be at least 8 characters';
      }
      if (!val.email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val?.email)) {
        if(!val.email)
        errors.emailError = ' Email Required';
        else
        errors.emailError = 'Invalid Email';
      }

    }

    if(type === 'forgot'){
      if(!val.OTP)
      {
        errors.OTPError = ' OTP Required';
      }
      if (!val.email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val?.email)) {
        if(!val.email)
        errors.emailError = ' Email Required';
        else
        errors.emailError = 'Invalid Email';
      }
    }
    if(type==='Contact')
    {
      if(!val.name || val.name.length < 4)
      {
        if(!val.name)
        errors.nameError = ' Name Required';
        else
        errors.nameError = ' Name must be at least 4 characters';

      }
      if(!val.userType)
      {
        errors.userTypeError = ' User Type Required';
      }

      if(!val.message || val.message.length < 20)
      {
        if(!val.message)
        {
          errors.messageError = ' Message Required';
        }
        else
        {
          errors.messageError = ' Message must be at least 20 characters';
        }

      }

      if (!val.email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val?.email)) {
        if(!val.email)
        errors.emailError = ' Email Required';
        else
        errors.emailError = 'Invalid Email';
      }
      
    }
    
    return errors;
}
  


  export  {validate}