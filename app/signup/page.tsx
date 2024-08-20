import { redirect } from "next/navigation";
import { register } from "../lib/lib";
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import SignUp from "../components/SignUp";


export default function signup(){
    return(
      <SignUp />
    )
}