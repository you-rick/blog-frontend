import * as axios from 'axios';
import {authHeader} from "../utils/helpers/auth-helpers";

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL
});


export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return axiosInstance.get(`users`, {params: {page: currentPage, limit: pageSize}});
    },
    getUserById(userId) {
        return axiosInstance.get(`users/${userId}`);
    },
    follow(userId) {
        return axiosInstance.put(`users/${userId}/follow`, {headers: authHeader()});
    },
    unfollow(userId) {
        return axiosInstance.put(`users/${userId}/unfollow`, {headers: authHeader()});
    }
};

export const profileAPI = {
    login(creds) {
        return axiosInstance.post(`auth/login`, creds);
    },
    register(data) {
        return axiosInstance.post(`auth/register`, data);
    },
    update(data) {
        return axiosInstance.put(`auth/update/${data._id}`, data, {headers: authHeader()});
    },
    me() {
        return axiosInstance.get(`auth/profile`, {headers: authHeader()});
    }
};

export const articlesAPI = {
    getArticles(currentPage = 1, pageSize = 10, author = '', category = '') {
        let query = `page=${currentPage}&limit=${pageSize}&author=${author}&category=${category}`;
        return axiosInstance.get(`articles?${query}`);
    },
    getArticleBySlug(slug) {
        return axiosInstance.get(`articles/${slug}`);
    },
    postArticle(data) {
        return axiosInstance.post(`articles`, data, {headers: authHeader()});
    },
    updateArticle(data) {
        return axiosInstance.put(`articles/${data._id}`, data, {headers: authHeader()});
    },
    deleteArticle(articleId) {
        return axiosInstance.delete(`articles`, articleId, {headers: authHeader()});
    },
    like(articleId) {
        return axiosInstance.put(`articles/${articleId}/like`, {}, {headers: authHeader()});
    },
    unlike(articleId) {
        return axiosInstance.put(`articles/${articleId}/unlike`, {}, {headers: authHeader()});
    },
    save(articleId) {
        return axiosInstance.put(`articles/${articleId}/save`, {}, {headers: authHeader()});
    },
    unsave(articleId) {
        return axiosInstance.put(`articles/${articleId}/unsave`, {}, {headers: authHeader()});
    }
};

export const categoriesAPI = {
    getCategories() {
        return axiosInstance.get(`categories`);
    },
    getCategoryById(categoryId) {
        return axiosInstance.get(`categories/${categoryId}`);
    },
};
