import * as axios from 'axios';

const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:4200/'
});

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return axiosInstance.get(`users?page=${currentPage}&limit=${pageSize}`);
    },
    getUserById(userId) {
        return axiosInstance.get(`users/${userId}`);
    },
    follow(userId) {
        return axiosInstance.put(`users/${userId}/follow`);
    },
    unfollow(userId) {
        return axiosInstance.put(`users/${userId}/unfollow`);
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
        return axiosInstance.put(`auth/update/${data._id}`, data);
    },
    me() {
        return axiosInstance.get(`auth/profile`);
    }
};

export const articlesAPI = {
    getArticles(currentPage = 1, pageSize = 10, author = '', category = '') {
        let query = `page=${currentPage}&limit=${pageSize}&author=${author}&category=${category}`;
        return axiosInstance.get(`articles?${query}`);
    },
    getArticleById(articleId) {
        return axiosInstance.get(`articles/${articleId}`);
    },
    postArticle(data) {
        return axiosInstance.post(`articles`, data);
    },
    updateArticle(data) {
        return axiosInstance.put(`articles/${data._id}`, data);
    },
    deleteArticle(articleId) {
        return axiosInstance.delete(`articles`, articleId);
    },
    like(articleId) {
        return axiosInstance.put(`articles/${articleId}/like`);
    },
    unlike(articleId) {
        return axiosInstance.put(`articles/${articleId}/unlike`);
    },
    save(articleId) {
        return axiosInstance.put(`articles/${articleId}/save`);
    },
    unsave(articleId) {
        return axiosInstance.put(`articles/${articleId}/unsave`);
    }
};


export const categoriesAPI = {
    getCategories() {
        return axiosInstance.get(`categories`);
    },
    getCategoryById(categoryId) {
        return axiosInstance.get(`categories/${categoryId}`);
    },
    addCategory(data) {
        return axiosInstance.post(`categories`, data);
    },
    updateCategory(data) {
        return axiosInstance.put(`categories/${data._id}`, data);
    },
    deleteArticle(categoryId) {
        return axiosInstance.delete(`categories`, categoryId);
    }
};
