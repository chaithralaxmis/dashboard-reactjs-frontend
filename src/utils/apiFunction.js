import { authRequest, noAuthRequest } from "./request";

export const register = (data) => {
  return noAuthRequest({
    url: "/register",
    method: "post",
    data,
  });
};

export const login = (data) => {
  return noAuthRequest({
    url: "/login",
    method: "post",
    data,
  });
};

export const logout = (data) => {
  return noAuthRequest({
    url: "/logout",
    method: "get",
    params: {
      email: data,
    },
  });
};

// products start

export const getAProduct = (id) => {
  return authRequest({
    url: `/product/${id}`,
    method: "get",
  });
};

export const getProducts = (data) => {
  return authRequest({
    url: "/product",
    method: "get",
    params: {
      page: data.page,
    },
  });
};

export const addProduct = (data) => {
  return authRequest({
    url: "/product/add",
    method: "post",
    data,
  });
};

export const uploadProductImages = (data) => {
  return authRequest({
    url: "/product/upload",
    method: "put",
    data,
  });
};

export const updateProduct = (id, data) => {
  return authRequest({
    url: `/product/update/${id}`,
    method: "put",
    data,
  });
};

export const deleteProduct = (id) => {
  return authRequest({
    url: `/product/delete/${id}`,
    method: "delete",
  });
};

// products end

// product category start

export const getProductCategory = (data) => {
  return authRequest({
    url: "/category",
    method: "get",
    params: {
      type: data,
    },
  });
};

export const getProductSubCategory = (id) => {
  return authRequest({
    url: `/category/all-subcategory/${id}`,
    method: "get",
  });
};

export const addProductCategory = (data) => {
  return authRequest({
    url: "/category/add",
    method: "post",
    data,
  });
};

export const updateProductCategory = (id, data) => {
  return authRequest({
    url: `/category/update/${id}`,
    method: "put",
    data,
  });
};

export const deleteProductCategory = (id) => {
  return authRequest({
    url: `/category/delete/${id}`,
    method: "delete",
  });
};

// product category end

// product brand start

export const getProductBrand = () => {
  return authRequest({
    url: "/brand",
    method: "get",
  });
};

export const addProductBrand = (data) => {
  return authRequest({
    url: "/brand/add",
    method: "post",
    data,
  });
};

export const updateProductBrand = (id, data) => {
  return authRequest({
    url: `/brand/update/${id}`,
    method: "put",
    data,
  });
};

export const deleteProductBrand = (id) => {
  return authRequest({
    url: `/brand/delete/${id}`,
    method: "delete",
  });
};

// product brand end

// product color start
export const getProductColor = () => {
  return authRequest({
    url: "/color",
    method: "get",
  });
};

export const addProductColor = (data) => {
  return authRequest({
    url: "/color/add",
    method: "post",
    data,
  });
};

export const updateProductColor = (id, data) => {
  return authRequest({
    url: `/color/update/${id}`,
    method: "put",
    data,
  });
};

export const deleteProductColor = (id) => {
  return authRequest({
    url: `/color/delete/${id}`,
    method: "delete",
  });
};

// product color end
