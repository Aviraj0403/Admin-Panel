import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-hot-toast";
import { getAllCategories, deleteCategory as deleteCategoryApi } from "../../services/CategoryApi";
import { FaEdit, FaEye, FaTrashAlt } from 'react-icons/fa';   // If it's a named export

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [pagination, setPagination] = useState({});
    const [loading, setLoading] = useState(true);

    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const limit = 20;
    const [sortField, setSortField] = useState("createdAt");
    const [sortOrder, setSortOrder] = useState(-1);

    useEffect(() => {
        fetchCategories();
    }, [page, searchTerm, sortField, sortOrder]);

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const response = await getAllCategories({
                page,
                limit,
                search: searchTerm,
                sortField,
                sortOrder,
            });

            if (response && response.success) {
                console.log("Fetched Categories:", response.categories); // Log the fetched categories
                setCategories(response.categories || []);
                setPagination(response.pagination || {});
            } else {
                toast.error("Failed to fetch categories");
                setCategories([]);
                setPagination({});
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
            toast.error("Error fetching categories");
            setCategories([]);
            setPagination({});
        }
        setLoading(false);
    };


    const handlePageChange = (newPage) => {
        if (newPage < 1 || (pagination.totalPages && newPage > pagination.totalPages)) {
            return;
        }
        setPage(newPage);
    };

    const handleDeleteCategory = async (categoryId) => {
        if (window.confirm("Are you sure you want to delete this category?")) {
            try {
                const response = await deleteCategoryApi(categoryId);
                if (response && response.success) {
                    toast.success("Category deleted successfully");
                    fetchCategories();
                } else {
                    toast.error(response.message || "Failed to delete category");
                }
            } catch (error) {
                console.error("Error deleting category:", error);
                toast.error("Error deleting category");
            }
        }
    };

    const handleSort = (field) => {
        if (sortField === field) {
            setSortOrder(sortOrder === 1 ? -1 : 1);
        } else {
            setSortField(field);
            setSortOrder(-1);
        }
    };

    return (
        <div className="p-6 max-w-7xl mx-auto bg-white rounded-lg shadow-md border border-gray-200">
            <div className="flex flex-wrap items-center justify-between mb-6">
                <h4 className="text-2xl font-semibold text-gray-800">Category List</h4>
                <div className="flex flex-wrap gap-2 items-center">
                    <input
                        type="text"
                        placeholder="Search categories..."
                        value={searchTerm}
                        onChange={(e) => {
                            setPage(1);
                            setSearchTerm(e.target.value);
                        }}
                        className="border rounded px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                    <NavLink
                        to="/admin/addCategory"
                        className="inline-flex items-center px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
                    >
                        <svg
                            className="mr-2"
                            stroke="currentColor"
                            fill="none"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            height="20"
                            width="20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M5 12h14"></path>
                            <path d="M12 5v14"></path>
                        </svg>
                        Add Category
                    </NavLink>
                </div>
            </div>

            {loading ? (
                <div className="text-center text-gray-500 py-20">Loading categories...</div>
            ) : (
                <>
                    {/* Desktop Table */}
                    <div className="hidden md:block">
                        <table className="min-w-full bg-white border border-gray-200 divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    {[{ label: "Image", field: null },
                                    { label: "Name", field: "name" },
                                    { label: "Display Order", field: "displayOrder" },
                                    { label: "Status", field: null },
                                    { label: "Created At", field: "createdAt" },
                                    { label: "Action", field: null }
                                    ].map(({ label, field }) => (
                                        <th
                                            key={label}
                                            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer select-none"
                                            onClick={() => field && handleSort(field)}
                                        >
                                            {label}
                                            {field && sortField === field && (
                                                <span>{sortOrder === 1 ? " 🔼" : " 🔽"}</span>
                                            )}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {categories && categories.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="text-center py-4 text-gray-600">
                                            No categories available.
                                        </td>
                                    </tr>
                                ) : (
                                    categories.map((category) => (
                                        <tr key={category._id}>
                                            <td className="px-4 py-4 text-sm font-medium text-gray-900">
                                                <img
                                                    src={category.image[0]}
                                                    alt={category.name}
                                                    className="w-16 h-16 object-cover rounded-full mx-auto"
                                                />
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-900">{category.name}</td>
                                            <td className="px-4 py-4 text-sm text-gray-900">{category.displayOrder}</td>
                                            <td className="px-4 py-4 text-sm text-gray-900">
                                                <span
                                                    className={`font-semibold ${category.isActive ? 'text-green-500' : 'text-red-500'}`}
                                                >
                                                    {category.isActive ? 'Active' : 'Inactive'}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-900">
                                                {category.createdAt
                                                    ? new Date(category.createdAt).toLocaleDateString()
                                                    : "N/A"}
                                            </td>
                                            <td className="px-4 py-4 text-sm font-medium flex space-x-3 justify-center">
                                                <NavLink
                                                    to={`/admin/editCategory/${category._id}`}
                                                    className="text-blue-600 hover:text-blue-800"
                                                >
                                                    <FaEdit />
                                                </NavLink>
                                                <NavLink
                                                    to={`/admin/viewCategory/${category._id}`}
                                                    className="text-gray-600 hover:text-gray-800 transition"
                                                >
                                                    <FaEye />
                                                </NavLink>
                                                <button
                                                    onClick={() => handleDeleteCategory(category._id)}
                                                    className="text-red-600 hover:text-red-800"
                                                >
                                                    <FaTrashAlt />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile View */}
                    <div className="block md:hidden">
                        {categories.length === 0 ? (
                            <p className="text-center py-4 text-gray-600">No categories available.</p>
                        ) : (
                            categories.map((category) => (
                                <div
                                    key={category._id}
                                    className="p-4 mb-4 border border-gray-200 rounded-lg"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center flex-1">
                                            <img
                                                src={category.image[0]}
                                                alt={category.name}
                                                className="w-16 h-16 object-cover rounded-full"
                                            />
                                            <div className="ml-4">
                                                <p className="text-lg font-semibold text-gray-900">{category.name}</p>
                                                <p className="text-sm text-gray-500">{category.displayOrder}</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end space-y-2">
                                            <p className="text-sm text-gray-700">
                                                {category.isActive ? "Active" : "Inactive"}
                                            </p>
                                            <div className="flex space-x-3 mt-2">
                                                <NavLink
                                                    to={`/admin/editCategory/${category._id}`}
                                                    className="text-blue-600 hover:text-blue-800"
                                                >
                                                    <FaEdit />
                                                </NavLink>
                                                <NavLink
                                                    to={`/admin/viewCategory/${category._id}`}
                                                    className="text-gray-600 hover:text-gray-800"
                                                >
                                                    <FaEye />
                                                </NavLink>
                                                <button
                                                    onClick={() => handleDeleteCategory(category._id)}
                                                    className="text-red-600 hover:text-red-800"
                                                >
                                                    <FaTrashAlt />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </>
            )}

            {/* Pagination */}
            <div className="mt-4 flex items-center justify-between">
                <button
                    disabled={page <= 1}
                    onClick={() => handlePageChange(page - 1)}
                    className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <span>
                    Page {pagination.page || 1} of {pagination.totalPages || 1}
                </span>
                <button
                    disabled={page >= (pagination.totalPages || 1)}
                    onClick={() => handlePageChange(page + 1)}
                    className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default CategoryList;
