import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {withNamespaces} from 'react-i18next';
import {Redirect} from 'react-router-dom';
import {Form} from 'react-bootstrap';
import {changeRoute} from '../helpers';
import {signup} from '../actions';

const SignUpPage = ({t}) => {
    const dispatch = useDispatch();
    const {loggedIn} = useSelector((state) => state.authReducer);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    if (!loggedIn) {
        return (
            <div className="signup-page">
                <div className="signup-page__inner">
                    <form>
                        <h3>{t('label.signup')}</h3>
                        <Form.Group>
                            <Form.Label>{t('label.name')}</Form.Label>
                            <Form.Control
                                type="text"
                                className="form-control"
                                placeholder={t('label.enter_name')}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>{t('label.password')}</Form.Label>
                            <Form.Control
                                type="password"
                                className="form-control"
                                placeholder={t('label.enter_password')}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <button
                            type="submit"
                            className="btn btn-primary btn-block"
                            disabled={!name || !password}
                            onClick={(e) => {
                                e.preventDefault();
                                dispatch(signup(name, password))
                            }}>
                            {t('label.submit')}
                        </button>
                        <label
                            className="signup-page__login"
                            onClick={() => {
                                changeRoute('/login');
                            }}>
                            {t('label.back_to_login')}
                        </label>
                    </form>
                </div>
            </div>
        );
    }

    return <Redirect to="/"/>;
};

export default withNamespaces()(SignUpPage);
