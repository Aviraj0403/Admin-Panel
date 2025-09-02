import Axios from '../utils/Axios';

// ========== FOOD API CALLS ==========

// Create Food (with images, form-data)
export const createFood = async (formData) => {
  const res = await Axios.post('/foods/createFood', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};

// Update Food (PATCH)
export const updateFood = async (foodId, data) => {
  const res = await Axios.patch(`/foods/updateFood/${foodId}`, data);
  return res.data;
};

// Delete Food
export const deleteFood = async (foodId) => {
  const res = await Axios.delete(`/foods/deleteFood/${foodId}`);
  return res.data;
};

// Get one food by ID
export const getFood = async (foodId) => {
  const res = await Axios.get(`/foods/getFood/${foodId}`);
  return res.data.food; // or res.data depending on your controller
};

// Get all food items
export const getAllFood = async () => {
  const res = await Axios.get('/foods/getAllFood');
  return res.data.foods; // or res.data depending on backend
};

// Get food by category
export const getFoodByCategory = async (categoryId) => {
  const res = await Axios.get(`/foods/getFoodByCategory/category`, {
    params: { category: categoryId },
  });
  return res.data.foods;
};

// Get total food count
export const getTotalFood = async () => {
  const res = await Axios.get('/foods/getTotalFood/total');
  return res.data.total; // { total: 10 }
};

// Update food images (form-data)
export const updateFoodImages = async (foodId, formData) => {
  const res = await Axios.patch(`/foods/updateFoodImages/${foodId}/images`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};
