import { RegisterData } from "store/types/authTypes";

export const formValidate = ({ fullname, username, email, password, confirmPassword }: RegisterData) => {

    const err = {
        fullname: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    };

    if(!fullname) {
        err.fullname = 'Please enter your fullname.'
    } else if (fullname.length < 6 || fullname.length > 25) {
        err.fullname = 'Minimum characters are 6 and maximum characters are 25.'
    }

    if(!username) {
        err.username = 'Please enter your username.'
    } else if (username.replace(/ /g, '').length > 25) {
        err.username = 'Username is only up to 25 characters long.'
    }

    if(!email) {
        err.email = 'Please enter your email.'
    } else if (!validateEmail(email)) {
        err.email = 'Email is invalid.'
    }

    if(!password) {
        err.password = 'Please enter your password.'
    } else if (password.length < 6) {
        err.password = 'Password must be at lesat 6 characters.'
    }

    if(password !== confirmPassword) {
        err.confirmPassword = 'Passwords are not matching.'
    }

    return {
        errMsg: err,
        errLength: Object.keys(err).length
    }
}

const validateEmail = (email: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
