// src/services/userService.ts
import { UserFormData } from '@/components/blocks/EditUserModal';
import axios from 'axios';


// Function to get user data
export const getUserData = async () => {
    try {
        const response = await axios.get("http://localhost:3000/api/users");
        return response.data;
        // Assuming your API returns an array of data similar to your `data` array
    } catch (error) {
        console.error("Error fetching data:", error);
        return []; // Return an empty array in case of error
    }
};



export const addUserData = async (userData: UserFormData) => {
    try {
        const response = await axios.post('https://redpositive-im2y.onrender.com/api/users', userData);
        return response.data;
    } catch (error) {
        console.error('Error adding user:', error);
        throw error;
    }
};

export const updateUserData = async (id: string, userData: UserFormData) => {
    console.log(userData)
    try {
        const response = await axios.put(`https://redpositive-im2y.onrender.com/api/users/${id}`, userData);
        return response.data;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
}

export const deleteUserData = async (id: string) => {
    try {
        const response = await axios.delete(`https://redpositive-im2y.onrender.com/api/users/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
}

export const sendMail = async (formData: FormData) => {
    console.log(formData)
    try {
        const response = await axios.post('https://redpositive-im2y.onrender.com/api/send-email', formData);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('Error sending mail:', error);
        throw error;
    }
}
