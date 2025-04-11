const axios = require('axios');

const BACKEND_URL = 'http://localhost:3000';

class AuthHelper {
    constructor() {
        this.id = null;
        this.name = "test" + Math.random().toString(36).substring(2);
        this.adminName = "testAdin" + Math.random().toString(36).substring(2);
        this.updateName = "updatetest" + Math.random().toString(36).substring(2);
        this.email = `${this.name}@test.com`;
        this.adminEmail = null; // Will be set in createUserByAdmin
        this.password = "Your@pa55word"+Math.random().toString(36).substring(2);
        this.userToken = null;
        this.adminToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZjZkYjcxM2ZhZjI0YTRjMGZlMWExNSIsIm5hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AZXhhbXBsZS5jb20iLCJyb2xlcyI6WyJhZG1pbiJdLCJpYXQiOjE3NDQzNTg4OTEsImV4cCI6MTc0NDQ0NTI5MX0.KqSo3sZ23ytWvHIxgOYwEcCIFwLLw5ZTLTD0UuH6Ax8";
    }

    async registerUser() {
        return await axios.post(`${BACKEND_URL}/api/auth/register`, {
            name: this.name,
            email: this.email,
            password: this.password,
        });
    }

    async loginUser() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/auth/login`, {
                email: this.email,
                password: this.password,
            });
            this.id = response.data.user.id;
            this.userToken = response.data.token;
            return response;
        }
        catch (error) {
            console.error('Error in loginUser:', error.response?.data || error.message);
            throw error;
        }
    }

    async getUserProfile() {
        try {
            return await axios.get(`${BACKEND_URL}/api/auth/profile`, {
                headers: {
                    Authorization: `Bearer ${this.userToken}`,
                },
            });
        } catch (error) {
            console.error('Error in getUserProfile:', error.response?.data || error.message);
            throw error;
        }
    }

    async refeshToken() {
        try {
            return await axios.get(`${BACKEND_URL}/api/auth/refresh-token`, {
                headers: {
                    Authorization: `Bearer ${this.userToken}`,
                },
            });
        } catch (error) {
            console.error('Error in refeshToken:', error.response?.data || error.message);
            throw error;
        }
    }

    async getAllUsers() {
        try {
            return await axios.get(`${BACKEND_URL}/api/users`, {
                headers: {
                    Authorization: `Bearer ${this.adminToken}`,
                },
            });
        } catch (error) {
            console.error('Error in getAllUsers:', error.response?.data || error.message);
            throw error;
        }
    }

    async getUserById() {
        try {
            return await axios.get(`${BACKEND_URL}/api/user/${this.id}`, {
                headers: {
                    Authorization: `Bearer ${this.userToken}`,
                },
            });
        } catch (error) {
            console.error('Error in getUserById:', error.response?.data || error.message);
            throw error;
        }
    }

    async createUserByAdmin() {
        try {
            const adminEmail = `${this.adminName}@test.com`;
            const response = await axios.post(`${BACKEND_URL}/api/user`, {
                name: this.adminName,
                email: adminEmail,
                password: "Your@pa55word",
                roles: "test"
            }, {
                headers: {
                    Authorization: `Bearer ${this.adminToken}`,
                },
            });

            // Store the admin user's email for test validation
            // this.adminEmail = adminEmail;

            return response;
        } catch (error) {
            console.error('Error in createUserByAdmin:', error.response?.data || error.message);
            throw error;
        }
    }

    async updateUser() {
        try {
            const updateEmail = `${this.updateName}@test.com`;
            const updatePassword = `${this.password + Math.random().toString(36).substring(2)}`;
            return await axios.put(`${BACKEND_URL}/api/user/${this.id}`, {
                name: this.updateName,
                email: updateEmail,
                password: updatePassword,
            }, {
                headers: {
                    Authorization: `Bearer ${this.userToken}`,
                },
            });
        }
        catch (error) {
            console.error('Error in updateUser:', error.response?.data || error.message);
            throw error;
        }
    }

    async deleteUser() {
        try {
            return await axios.delete(`${BACKEND_URL}/api/user/${this.id}`, {
                headers: {
                    Authorization: `Bearer ${this.userToken}`,
                },
            });
        }
        catch (error) {
            console.error('Error in deleteUser:', error.response?.data || error.message);
            throw error;
        }
    }

    async deleteUserByName() {
        try {
            return await axios.delete(`${BACKEND_URL}/api/users/`, {
                headers: {
                    Authorization: `Bearer ${this.adminToken}`,
                },
                data: {
                    name: "test",
                },
            });
        }
        catch (error) {
            console.error('Error in deleteUserByName:', error.response?.data || error.message);
            throw error;
        }
    }
}


module.exports = AuthHelper;
