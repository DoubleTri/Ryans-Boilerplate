import React, { useState } from 'react';
import { auth, fireStore } from '../../firebase'

import {  Form, Input, Button, Divider } from 'antd';

const FormItem = Form.Item;

function CreateAccountForm(props) {

const [accountObj, setAccountObj] = useState({ 
    firstName: null, 
    lastName: null, 
    email:null, 
    password: null,
 });

    const handleSubmit = (e) => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                props.close()
                props.form.resetFields()
                   
                auth.createUserWithEmailAndPassword(accountObj.email, accountObj.password).catch(function (error) {
                    alert(error.message)
                }).then(() => {
                    waitForCurrentUser()
                });

                async function waitForCurrentUser() {
                    try {
                        let uid = await auth.currentUser.uid;
                        if (uid) {
                            clearInterval(waitForCurrentUser);

                            fireStore.collection("users").doc().set({
                                uid: uid,
                                firstName: accountObj.firstName,
                                lastName: accountObj.lastName,
                                email: accountObj.email        
                            })
                            .catch(function(error) {
                                console.error("Error adding document: ", error);
                            });
                        }
                        else {
                            console.log('Wait for it');
                        }
                    }
                    catch (e) {
                        console.log(e)
                    }
                };
            }
        })
    }

const onChangeText = (e) => {
    let newAccountObj = Object.assign({}, accountObj);
    newAccountObj[e.target.id] = e.target.value;
    setAccountObj(newAccountObj)
}

const { getFieldDecorator } = props.form;

  return (
    <div className="CreateAccount">

          <Form onSubmit={handleSubmit} className="CreateAccountForm">

              <Divider orientation="left">Your Info</Divider>

                  <FormItem>
                      {getFieldDecorator('firstName', {
                          rules: [{ required: true, message: 'Please enter your first name' }],
                      })(
                          <Input onChange={onChangeText} placeholder="First Name" />
                          )}
                  </FormItem>

                  <FormItem>
                      {getFieldDecorator('lastName', {
                          rules: [{ required: true, message: 'Please enter your last name' }],
                      })(
                          <Input onChange={onChangeText} placeholder="Last Name" />
                          )}
                  </FormItem>

                  <FormItem>
                      {getFieldDecorator('email', {
                          rules: [{ required: true, message: 'Please enter your email' }],
                      })(
                          <Input onChange={onChangeText} placeholder="Email" type='email' />
                          )}
                  </FormItem>

                  <FormItem>
                      {getFieldDecorator('password', {
                          rules: [{ required: true, message: 'Please create a password' }],
                      })(
                          <Input onChange={onChangeText} placeholder="Create a Password" type='password' />
                          )}
                  </FormItem>

                  <FormItem>
                      <Button htmlType="submit">Create Account</Button>
                      <br />
                  </FormItem>

          </Form>

    </div>
  );
}

const CreateAccount = Form.create()(CreateAccountForm);

export default CreateAccount; 