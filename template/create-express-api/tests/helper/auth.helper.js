const axios = require('axios');

const BACKEND_URL = 'http://localhost:3000';

class AuthHelper {
    constructor() {
        this.name = "test" + Math.random().toString(36).substring(2);
        this.email = `${this.name}@test.com`;
        this.password = "Your@pa55word";
        this.userToken = null;
        this.adminToken = null;
    }

    async registerUser() {
        return await axios.post(`${BACKEND_URL}/api/auth/register`, {
            name: this.name,
            email: this.email,
            password: this.password,
        });
    }

    async loginUser() {
        const response = await axios.post(`${BACKEND_URL}/api/auth/login`, {
            email: this.email,
            password: this.password,
        });
        this.userToken = response.data.token;
        return response;
    }

    async getUserProfile() {
        return await axios.get(`${BACKEND_URL}/api/auth/profile`, {
            headers: {
                Authorization: `Bearer ${this.userToken}`,
            },
        });
    }

    async refeshToken() {
        return await axios.get(`${BACKEND_URL}/api/auth/refresh-token`, {
            headers: {
                Authorization: `Bearer ${this.userToken}`,
            },
        });
    }
}

module.exports = AuthHelper;
