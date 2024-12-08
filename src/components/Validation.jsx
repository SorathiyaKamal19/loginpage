
export const Validate = (userInput) => {
    const errors = {};
    // if (!userInput.firstName){
    //     errors.firstName = "First Name is required";
    // }else if(userInput.firstName.length >= 20 ){
    //     errors.firstName = "First Name not more than 20 character";
    // }else if(userInput.firstName.trim() === " "){
    //     errors.firstName = "you must write a letter ";
    // }else if(!/^[a-zA-Z]+$/.test(userInput.firstName) ){
    //     errors.firstName = "special character is not allowed ";
    // }

    

    // if (!userInput.email) {
    //   errors.email = "Email is required";
    // } else if (!/\S+@\S+\.\S+/.test(userInput.email)) {
    //   errors.email = "Email is invalid";
    // }
    // if (!userInput.phone) {
    //     errors.phone = "PhoneNumber is required";
    // }else if(/^[+]{1}(?:[0-9\-.]\s?){6, 15}[0-9]{1}$/.test(userInput.phone)){
    //         errors.phone="Phone number is not valid"
    // }

    if (!userInput.password) errors.password = "Password is required";
    if(!userInput.username) errors.username = "Username is required";
    // if (!userInput.dob) errors.dob = "Date of Birth is required";
    // if (!userInput.file){
    //     errors.file = "File is required";
    // }  else {
    //     const allowedFileTypes = [
    //       "application/pdf",
    //       "application/msword",
    //       "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    //       "text/plain",
    //     ];
    //     const maxSizeInBytes = 2 * 1024 * 1024;
    
    //     if (!allowedFileTypes.includes(userInput.file.type)) {
    //       errors.file = "Only document files (pdf, doc, docx, txt) are allowed";
    //     } else if (userInput.file.size > maxSizeInBytes) {
    //       errors.file = "File size should be less than 2MB";
    //     }
    //   }
    
    return errors;
  };
  