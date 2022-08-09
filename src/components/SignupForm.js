import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from './Button'
import Checkbox from './Checkbox'
import { useAuth } from './contexts/AuthContext'
import Form from './Form'
import TextInput from './TextInput'

export default function SingupForm() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [agree, setAgree] = useState("")

    const {signup} = useAuth();

    return (
        <Form style={{ height: "500px" }}>
            <TextInput type='text' placeholder='Enter name' icon='person' value={username} onChange={(e) => setUsername(e.target.value)} />

            <TextInput type='text' placeholder='Enter email' icon='alternate_email' value={email} onChange={(e) => setEmail(e.target.value)}/>

            <TextInput type='password' placeholder='Enter password' icon='lock' value={password} onChange={(e) => setPassword(e.target.value)} />

            <TextInput type='password' placeholder='Confirm password' icon='lock_clock' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

            <Checkbox text='I agree to the Terms &amp; Conditions' value={agree} onChange={(e) => setAgree(e.target.value)}/>

            <Button><span>Submit Now</span></Button>

            <div className="info">
                Already have an account? <Link to="/login">Login</Link> instead.
            </div>
        </Form>
    )
}