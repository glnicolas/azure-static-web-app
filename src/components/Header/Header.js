import React, { Component, Fragment } from 'react'
import './header.scss';
import logo from './logo-ccad.png';

export default class Header extends Component {
    render() {
        return (
            <Fragment>
                <div className="uk-navbar-container header">
                    <div className="uk-container uk-container-expand ">
                        <div className="uk-navbar ">
                            <div className="uk-navbar-center">
                                <div className="uk-navbar-item">
                                    <img src={logo} className="logo-ccad" alt="logo" />
                                </div>
                                <div className="uk-navbar-item uk-text-lead uk-text-bold texto">
                                    Azure Logic Apps & Azure Static Web Apps
                                </div>
                            </div>


                        </div>
                    </div>
                </div>

            </Fragment>
        )
    }
}
