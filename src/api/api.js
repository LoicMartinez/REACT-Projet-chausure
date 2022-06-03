import {getLocalStorage, setLocalStorage} from '../lib/localStorage'

class Client {
    async call(method, endpoint, headers, body) {
        const options = {
            method,
            credentials: 'same-origin',
            redirect: 'manual',
        };
        headers = headers || {};

        if (['POST', 'PUT', 'PATCH'].includes(method) && body) {
            if (typeof body === 'object') {
                headers['Content-Type'] = 'application/json';
                options.body = JSON.stringify(body);
            } else {
                options.body = body;
            }
        }

        const bearer = getLocalStorage('access_token');
        if (bearer) {
            headers['Authorization'] = 'Basic ' + bearer
        }

        options.headers = headers;

        return await fetch(endpoint, options);
    }

    async login(email, password) {
        const response = await this.call(
            "POST",
            "/user/login",
            null,
            {email, password}
        );

        if (!response.ok) {
            return null;
        }

        const body = await response.json();

        setLocalStorage('access_token', body.token)

        return true;
    }

    async getCollection() {
        console.log("mama")
        const response = await this.call(
            "GET",
            "/product/collection"
        )

        if (!response.ok) {
            return null;
        }

        return await response.json();
    }

}

export default new Client();