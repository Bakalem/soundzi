import { toastr } from 'react-redux-toastr';
import sendApiRequest from '../../../utility/api';

import {
	REQUEST_LOGIN_SUCCESS,
	REQUEST_LOGIN_ERROR
} from "../types/types";


const requestLoginSuccess = user => ({
	type: REQUEST_LOGIN_SUCCESS,
	user
})

const requestLoginError = error => ({
	type: REQUEST_LOGIN_ERROR,
	error
})

export const fetchUser = (email, password, history) => {
	return dispatch => {
		return sendApiRequest({endPoint: '/users/login',
			method: 'POST',
			params: { email, password }
		})
			.then((res) => {
				let user = res.data
				localStorage.setItem('user', JSON.stringify(user));
				dispatch(requestLoginSuccess(user))
				history.push('/');
			})
			.catch((error) => {
				toastr.error("ERROR", "Email or password is incorrect", { position: 'top-center' })
				dispatch(requestLoginError(error))
			})
	}
}