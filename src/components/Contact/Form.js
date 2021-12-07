import React, { Component } from 'react'
import './Form.scss';

const validarEmail = (email) => {
    if(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email)){
        return true;
    }else{
        return false;
    }
}


export default class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            success: false,
            error: false,
            nombre: 'uk-input uk-form-width-large',
            telefono: 'uk-input uk-form-width-large',
            email: 'uk-input uk-form-width-large',
            mensaje: 'uk-textarea',
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        
        const dataForm = new FormData(event.target);

        if (dataForm.get('nombre') !== '' && dataForm.get('telefono') !== '' && dataForm.get('email') !== '' && dataForm.get('mensaje') !== '' && validarEmail(dataForm.get('email'))) {
            this.setState({
                loading: true
            }); 
            const data = {
                "nombre": dataForm.get('nombre'),
                "telefono": dataForm.get('telefono'),
                "email": dataForm.get('email'),
                "mensaje": dataForm.get('mensaje')
            };

            this.sendMail( JSON.stringify(data) );
            //this.sendMail( dataForm );
        }else{
            this.setState({
                nombre: 'uk-input uk-form-width-large uk-form-danger',
                telefono: 'uk-input uk-form-width-large uk-form-danger',
                email: 'uk-input uk-form-width-large uk-form-danger',
                mensaje: 'uk-textarea uk-form-danger',
            });
        }
    }

    async sendMail(data){
        try{
            const response = await fetch('https://glnicolas-api.herokuapp.com/send', {
            //const response = await fetch('http://localhost:3001/send', {
                method: "POST",
                body: data,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  }
            });
            const res = await response;

            this.setState({
                loading: false
            })

            if (res.status === 200) {
                this.setState({
                    success: true   
                });
            }
        }catch{
            console.log('Hubo un error');
            this.setState({
                loading: false,
                error: true
            });
        }
    }

    handleChange(event){
        this.actualizarEstado(event.target);
    }

    actualizarEstado(campo){
        if (campo.name === 'mensaje') {
            if (campo.value === '') {
                this.setState({
                    [campo.name]: 'uk-textarea uk-form-danger'
                });
            }else{
                this.setState({
                    [campo.name]: 'uk-textarea uk-form-success'
                });
            }
        }else if (campo.name === 'email'){
            if (validarEmail(campo.value)) {
                this.setState({
                    [campo.name]: 'uk-input uk-form-width-large uk-form-success'
                });
            }else{
                this.setState({
                    [campo.name]: 'uk-input uk-form-width-large uk-form-danger'
                });
            }
        }else{
            if (campo.value === '') {
                this.setState({
                    [campo.name]: 'uk-input uk-form-width-large uk-form-danger'
                });
            }else{
                this.setState({
                    [campo.name]: 'uk-input uk-form-width-large uk-form-success'
                });
            }
        }

    }

    render() {
        if (this.state.loading) {
            return (
                <div className="uk-section uk-text-center uk-section-default">
                    <span data-uk-spinner="ratio: 8;" className="custom-color"></span>
                </div>
            );
        }else if (this.state.success) {
            return (
                <div className="uk-section uk-text-center uk-section-default">
                     <span data-uk-icon="icon: check; ratio: 9;" className="custom-color"></span>
                </div>
            );
        }else if (this.state.error) {
            return (
                <div className="uk-section uk-text-center uk-section-default uk-text-center">
                     <span data-uk-icon="icon: close; ratio: 9;" className="custom-color"></span>
                     <p> Ocurrió un error al intentar enviar el correo </p>
                </div>
            );
        }else{
            return (
                
                <form className="uk-grid-small uk-text-left" data-uk-grid onSubmit={this.handleSubmit}>
                    <div className="uk-width-1-3@s uk-margin-top">
                        <label className="uk-form-label uk-text-large" htmlFor="nombre">Nombre</label>
                        <div className="uk-form-controls">
                            <div className="uk-inline">
                                <span className="uk-form-icon" data-uk-icon="icon: user"></span>
                                <input className={this.state.nombre} id="nombre" type="text" placeholder="Nombre..." name="nombre" onChange={this.handleChange}/>
                            </div>
                        </div>
                    </div>
                    <div className="uk-width-1-3@s uk-margin-top">
                        <label className="uk-form-label uk-text-large" htmlFor="telefono">Teléfono</label>
                        <div className="uk-form-controls">
                            <div className="uk-inline">
                                <span className="uk-form-icon" data-uk-icon="icon: phone"></span>
                                <input className={this.state.telefono} id="telefono" type="number" placeholder="Telefóno..." name="telefono" onChange={this.handleChange}/>
                            </div>
                        </div>
                    </div>
                    <div className="uk-width-1-3@s uk-margin-top">
                        <label className="uk-form-label uk-text-large" htmlFor="email">Email</label>
                        <div className="uk-form-controls">
                            <div className="uk-inline">
                                <span className="uk-form-icon" data-uk-icon="icon: mail"></span>
                                <input className={this.state.email} id="email" type="email" placeholder="Email..." name="email" onChange={this.handleChange}/>
                            </div>
                        </div>
                    </div>
                    <div className="uk-width-1-1@s uk-margin-top">
                        <label className="uk-form-label uk-text-large" htmlFor="mensaje">Mensaje</label>
                        <div className="uk-form-controls">
                            <textarea className={this.state.mensaje} rows="5" placeholder="Mensaje..." id="mensaje" style={{resize: "none"}} name="mensaje" onChange={this.handleChange}></textarea>
                        </div>
                    </div>
                    <div className="uk-width-1-1@s">
                        <button className="uk-button uk-button-primary uk-margin-small-top">
                            Enviar
                            <span className="uk-margin-small-left" data-uk-icon="icon: arrow-right"></span>
                        </button>
                    </div>
                </form>
            );
        }
    }

}
