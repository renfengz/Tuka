import React from 'react';
import Recaptcha from 'react-recaptcha';
import {Form, FormGroup, Input, Label, Button,Table} from 'reactstrap';
import axios from 'axios';

const backdropStyle = {
    position:'fixed',
    zIndex:90,
    top:0,
    bottom:0,
    left:0,
    right:0,
    backgroundColor:'rgba(0,0,0,0.3)',
    padding:50,
};

const modalStyle = {
    backgroundColor: '#fff',
    borderRadius:5,
    maxWidth:500,
    minHeight:600,
    margin:'0 auto',
    padding: 30,
    position: 'relative'
};

const headerStyle = {
    position:'absolute',
    top: 20,
    right:20,
};

const contentStyle = {
    position:'absolute',
    margin:'5% 5%'
}

export default  class Modal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isVerified:false,
            Email:'',
            ConfirmEmail:'',
            Password:'',
            ConfirmPassword:'',
            EmailValidate:true,
            PasswordValidate:true,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.recaptchaLoaded = this.recaptchaLoaded.bind(this);
        this.verifyCallback = this.verifyCallback.bind(this);
        this.SubmitSignUp = this.SubmitSignUp.bind(this);
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value})
    };

    async handleSubmit(e){
        e.preventDefault()

        const { Email,ConfirmEmail,Password,ConfirmPassword} = this.state;

        const form = await axios.post('/api/form',{
            Email,
            ConfirmEmail,
            Password,
            ConfirmPassword
        })
    }

    recaptchaLoaded(){
        console.log("capcha loaded");
    }

    verifyCallback(response){
        if(response){
            this.setState({
                isVerified:true
            })
        }
    }

    SubmitSignUp(){
        if(this.state.Email!==this.state.ConfirmEmail){
            this.setState({
                EmailValidate:false,
            })
        }else{
            this.setState({
                EmailValidate:true,
            })
        }
        if(this.state.Password!==this.state.ConfirmPassword){
            this.setState({
                PasswordValidate:false,
            })
        }else{
            this.setState({
                PasswordValidate:true,
            })
        }
    }
    render() {
        if(this.props.show){
            return null;
        }
        return (
            <div style={backdropStyle}>
                <div style={modalStyle}>
                    <div style={headerStyle}>
                        <button onClick={this.props.onClose}>
                           X
                        </button>
                    </div>
                    <div style={contentStyle}>
                        <div style={{textAlign:'center',fontSize:'large'}}>
                            <b>Sign Up</b>
                        </div>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label for="Email" />
                                <Input
                                    type="email"
                                    name="Email"
                                    onChange={this.handleChange}
                                    placeholder="Email"/></FormGroup>
                            <FormGroup>
                                <Label for="ConfirmEmail" />
                                <Input
                                    valid={this.state.Email!==""&&this.state.Email===this.state.ConfirmEmail&&this.state.EmailValidate}
                                    invalid={!this.state.EmailValidate}
                                    type="email"
                                    name="ConfirmEmail"
                                    onChange={this.handleChange}
                                    placeholder="Confirm Email"/></FormGroup>
                            <FormGroup>
                                <Label for="Password" />
                                <Input
                                    type="password"
                                    name="Password"
                                    pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$" //Minimum eight characters, at least one letter, one number
                                    onChange={this.handleChange}
                                    placeholder="Password(8 characters minimum)"/></FormGroup>
                            <FormGroup>
                                <Label for="ConfirmPassword" />
                                <Input
                                    valid={this.state.Password!==""&&this.state.ConfirmPassword===this.state.Password&&this.state.PasswordValidate}
                                    invalid={!this.state.PasswordValidate}
                                    type="password"
                                    name="ConfirmPassword"
                                    onChange={this.handleChange}
                                    placeholder="Confirm Password"/></FormGroup>
                            <Table className="Table1">
                                <tr className="tr1">
                                <th className="th1">
                                    <Recaptcha
                                        size="default"
                                        sitekey="6Lco76sUAAAAACdWahIKj_ECwE81xKF-96onh8h2"
                                        render="explicit"
                                        verifyCallback={this.verifyCallback}
                                        onloadCallback={this.recaptchaLoaded}
                                    />
                                </th>
                            <th className="th2"><Button size="lg" color="danger" onClick={this.SubmitSignUp}>Sign Up</Button></th>
                                </tr></Table>
                            <div>By Signing up, you agree to our <a style={{color:'blue'}}>Term of Use</a> and
                                <a style={{color:'blue'}}> Privacy Policy</a></div>
                            <div style={{height:'1px',width:'100%',margin:'10px',backgroundColor:'grey',marginLeft:'-10px'}} />
                            <div style={{textAlign:'center',fontSize:'large'}}>Already have an account? <a style={{color:'blue'}}>Log In</a></div>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}
