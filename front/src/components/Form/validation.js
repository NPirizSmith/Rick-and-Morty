
const emailRegexp = new RegExp(/\S+@\S+\.\S+/)
// const passwordRegexp = new RegExp (/^[a-z0-9_-]{6,18}$/)


export default (data) => {
  let errors = {};
  
    if (!data.email) {
      errors.e1 = "Enter an email";
    }
    if (data.email.length > 35) {
      errors.e2 = "Email cannot be more than 35 characters";
    }
    if (!emailRegexp.test(data.email)) {
        errors.e3 = "Enter a valid email";
    }
    if(data.password.length < 6 || data.password.length > 15) {
      errors.p1 = "Password must be between 6 and 15 characters"
    }
    if(!/\d/.test(data.password)) {
      errors.p2 = "Password must have at least one number"
    }
    return errors
      
    }
