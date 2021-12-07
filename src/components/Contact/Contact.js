import React, { Component } from 'react'
import ContactImg from './undraw_mobile_inbox.svg';
import Form from './Form';
import './Contact.scss'

export default class Contact extends Component {
    render() {
        return (
            <div className="uk-text-center uk-margin-medium-top uk-margin-bottom">
                <div className="uk-container">
                    <div className="uk-card uk-card-body uk-width-1@m">
                        <div className="uk-column-1-2@m uk-column-divider">
                            <div>
                                <img alt = "" className="img-contact " src={ContactImg}></img>
                            </div>
                            <div>
                                <Form/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
