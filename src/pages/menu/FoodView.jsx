import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getFood } from "../../services/FoodApi";

const FoodView = () => {
    const { foodId } = useParams(); // Fetch the foodId from URL params
    const navigate = useNavigate();
    const [food, setFood] = useState(null); // Initial state for food
    const [loading, setLoading] = useState(true); // State for loading

    useEffect(() => {
        fetchFood();
    }, [foodId]); // Run fetchFood whenever foodId changes

    const fetchFood = async () => {
        try {
            const { food } = await getFood(foodId); // Destructure the food from the response
            setFood(food); // Update the state with the fetched food
        } catch (error) {
            console.error("Error fetching food:", error);
        } finally {
            setLoading(false); // Stop loading after fetch
        }
    };

    // Loading state
    if (loading) {
        return (
            <div className="p-6 text-center text-gray-600 text-lg">Loading...</div>
        );
    }

    // If no food item is found
    if (!food) {
        return (
            <div className="p-6 text-center text-gray-600 text-lg">
                Food item not found.
            </div>
        );
    }

    return (
        <div className="p-6 max-w-5xl mx-auto space-y-10">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-4xl font-extrabold text-gray-800">{food?.name}</h2>
                <button
                    onClick={() => navigate(-1)}
                    className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-transform transform hover:scale-105"
                >
                    ← Back
                </button>
            </div>

            {/* Image Section with 3D Zoom Effect */}
            <div className="mb-6">
                {food?.foodImages && food.foodImages.length > 0 ? (
                    <div className="relative group">
                        <img
                            src={food.foodImages[0]}
                            alt={food.name}
                            className="w-full h-96 object-cover rounded-lg shadow-xl transform transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black opacity-20 group-hover:opacity-0 transition-opacity duration-300 rounded-lg"></div>
                    </div>
                ) : (
                    <div className="w-full h-96 bg-gray-200 flex items-center justify-center rounded-lg">
                        <span className="text-gray-500">No image available</span>
                    </div>
                )}
            </div>

            {/* Info Section */}
            <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
                <p className="text-xl font-medium text-gray-800 leading-relaxed tracking-wide p-6 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                    {food?.description || "No description provided."}
                </p>


                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div>
                        <h4 className="font-semibold text-gray-800">Category:</h4>
                        <p className="text-gray-600">{food?.category?.name || "N/A"}</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-800">Item Type:</h4>
                        <p className="text-gray-600">{food?.itemType || "N/A"}</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-800">Cook Time:</h4>
                        <p className="text-gray-600">{food?.cookTime || "N/A"}</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-800">Status:</h4>
                        <p
                            className={`${food?.status === "Active"
                                    ? "text-green-600 font-semibold"
                                    : "text-red-600 font-semibold"
                                }`}
                        >
                            {food?.status}
                        </p>
                    </div>
                </div>

                {/* Ingredients */}
                <div>
                    <h4 className="font-semibold text-gray-800">Ingredients:</h4>
                    <p className="text-gray-600">{food?.ingredients?.join(", ") || "No ingredients provided."}</p>
                </div>

                {/* Variety */}
                <div>
                    <h4 className="font-semibold text-gray-800">Variety:</h4>
                    <p className="text-gray-600">{food?.variety || "N/A"}</p>
                </div>

                {/* Discount */}
                <div>
                    <h4 className="font-semibold text-gray-800">Discount:</h4>
                    <p className="text-gray-600">{food?.discount ? `${food.discount}%` : "No discount"}</p>
                </div>

                {/* Created By */}
                <div>
                    <h4 className="font-semibold text-gray-800">Created By:</h4>
                    <p className="text-gray-600">{food?.createdBy || "Unknown"}</p>
                </div>

                {/* Created & Updated At */}
                <div className="grid grid-cols-2 gap-8">
                    <div>
                        <h4 className="font-semibold text-gray-800">Created At:</h4>
                        <p className="text-gray-600">{new Date(food?.createdAt).toLocaleString() || "N/A"}</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-800">Updated At:</h4>
                        <p className="text-gray-600">{new Date(food?.updatedAt).toLocaleString() || "N/A"}</p>
                    </div>
                </div>

                {/* Tags */}
                <div className="mt-6 flex flex-wrap gap-4">
                    {food?.isHotProduct && (
                        <span className="px-4 py-2 bg-red-100 text-red-600 text-xs font-semibold rounded-full transform transition-transform duration-300 hover:scale-105">
                            Hot
                        </span>
                    )}
                    {food?.isFeatured && (
                        <span className="px-4 py-2 bg-blue-100 text-blue-600 text-xs font-semibold rounded-full transform transition-transform duration-300 hover:scale-105">
                            Featured
                        </span>
                    )}
                    {food?.isRecommended && (
                        <span className="px-4 py-2 bg-yellow-100 text-yellow-600 text-xs font-semibold rounded-full transform transition-transform duration-300 hover:scale-105">
                            Recommended
                        </span>
                    )}
                    {food?.isBudgetBite && (
                        <span className="px-4 py-2 bg-green-100 text-green-600 text-xs font-semibold rounded-full transform transition-transform duration-300 hover:scale-105">
                            Budget Bite
                        </span>
                    )}
                    {food?.isSpecialOffer && (
                        <span className="px-4 py-2 bg-purple-100 text-purple-600 text-xs font-semibold rounded-full transform transition-transform duration-300 hover:scale-105">
                            Special Offer
                        </span>
                    )}
                </div>

                {/* Variants */}
                <div className="mt-8">
                    <h4 className="font-semibold text-gray-800 text-lg">Variants:</h4>
                    {food?.variants?.length > 0 ? (
                        <div className="space-y-4">
                            {food?.variants.map((variant, idx) => (
                                <div
                                    key={idx}
                                    className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-sm hover:shadow-lg transform transition-all duration-200 hover:scale-105"
                                >
                                    <span className="font-medium text-gray-700">{variant.name}</span>
                                    <div className="text-gray-800">
                                        ₹ {variant.price}{" "}
                                        {variant.priceAfterDiscount && (
                                            <span className="text-red-500 line-through ml-2">
                                                ₹ {variant.priceAfterDiscount}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-600">No variants available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FoodView;
