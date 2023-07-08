// const fetch = require("node-fetch");

class NeedleAgent2 {
    
    async get(url, options = {}) {
        const response = await this.makeRequest(url, 'GET', null, options);
        return this.processResponse(response);
    }

    async post(url, data = null, options = {}) {
        const response = await this.makeRequest(url, 'POST', data, options);
        return this.processResponse(response);
    }

    async put(url, data = null, options = {}) {
        const response = await this.makeRequest(url, 'PUT', data, options);
        return this.processResponse(response);
    }

    async delete(url, data = null, options = {}) {
        const response = await this.makeRequest(url, 'DELETE', data, options);
        return this.processResponse(response);
    }

    async makeRequest(url, method, data, options) {
        const fetchOptions = {
            method,
            headers: options.headers || {},
        };
        
        if (data) {
            fetchOptions.body = JSON.stringify(data);
            fetchOptions.headers['Content-Type'] = 'application/json';
        }
        
        return fetch(url, fetchOptions);
    }

    async processResponse(response) {
        const body = await response.text();
        return {
            ...response,
            body,
            bytes: body.length,
            cookies: this.parseCookies(response.headers.get('set-cookie')),
        };
    }

    parseCookies(setCookieHeader) {
        // Add proper cookie parsing code here
        return setCookieHeader;
    }
}

export default new NeedleAgent2();