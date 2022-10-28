import {useState, React} from 'react';
import {useNavigate} from 'react-router-dom';
// @mui
import {Link, Stack, IconButton, InputAdornment, TextField, Checkbox} from '@mui/material';
import {LoadingButton} from '@mui/lab';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------


export default function LoginForm() {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const handleClick = () => {
        // navigate('/dashboard', {replace: true});
        submitHandler()
    };

    let emailEl = ' ';
    let passwordEl = ' ';
    let email = ' ';
    let password = ' ';

    const changeEmail = (event) => {
        emailEl = event.target.value;
        console.log(emailEl);
    };

    const changePassword = (event) => {
        passwordEl = event.target.value;
        console.log(passwordEl);
    };

    const submitHandler = () => {

        email = emailEl.toString();
        password = passwordEl.toString();

        console.log(email);
        console.log(password);

        
        if (email.trim().length === 0 || password.trim().length === 0) {
        
            return
        }


        const requestBody = {
            query: `
            query{
                studentLogin(loginInput:{
                  email: "${email}",
                  password: "${password}"
                }){
                  id
                  token
                }
              }
            `
        }

        fetch("http://localhost:8080/graphql", {
            method: "POST",
            body: JSON.stringify(requestBody),
            headers: {
                "Content-Type": "application/json"
            }

        })
            .then(
                (res) => {
                    if (res.status !== 200 && res.status !== 201){
                        throw new Error("Failed!!");
                    }
                    return res.json();
                }
            )
            .then((resData) => {
                console.log(email);
                console.log(password)
                console.log(resData);
            })
            .catch((err) => {
                console.log(err);
            })

    }

    return (
        <>
            <Stack spacing={3}>
                <TextField name="email" label="Email address" onChange={changeEmail}/>

                <TextField
                    name="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    onChange={changePassword}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}/>
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </Stack>

            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{my: 2}}>
                <Checkbox name="remember" label="Remember me"/>
                <Link variant="subtitle2" underline="hover">
                    Forgot password?
                </Link>
            </Stack>

            <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
                Login
            </LoadingButton>
        </>
    );
}


