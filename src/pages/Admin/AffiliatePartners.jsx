import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

// Mock data for demonstration
const MOCK_AFFILIATES = {
  pending: [
    {
      id: 1,
      name: "FreshGrow Market",
      email: "contact@freshgrowmarket.com",
      location: "Portland, OR",
      businessType: "Organic Grocery Store",
      applicationDate: "2025-04-12",
      status: "pending",
    },
    {
      id: 2,
      name: "Green Fields Supermarket",
      email: "info@greenfieldssupermarket.com",
      location: "Austin, TX",
      businessType: "Supermarket Chain",
      applicationDate: "2025-04-11",
      status: "pending",
    },
    {
      id: 3,
      name: "Nature's Basket",
      email: "support@naturesbasket.com",
      location: "Seattle, WA",
      businessType: "Health Food Store",
      applicationDate: "2025-04-10",
      status: "pending",
    },
  ],
  approved: [
    {
      id: 4,
      name: "Organic World",
      email: "partners@organicworld.com",
      location: "Chicago, IL",
      businessType: "Organic Retailer",
      applicationDate: "2025-04-05",
      approvalDate: "2025-04-07",
      status: "active",
    },
    {
      id: 5,
      name: "Farm Fresh Co-op",
      email: "hello@farmfreshcoop.com",
      location: "Denver, CO",
      businessType: "Farmers Co-op",
      applicationDate: "2025-04-01",
      approvalDate: "2025-04-03",
      status: "active",
    },
  ],
  rejected: [
    {
      id: 6,
      name: "Quick Mart",
      email: "info@quickmart.com",
      location: "Las Vegas, NV",
      businessType: "Convenience Store",
      applicationDate: "2025-04-02",
      rejectionDate: "2025-04-04",
      rejectionReason:
        "Business model doesn't align with our sustainability goals",
      status: "rejected",
    },
  ],
};

const AffiliatePartners = () => {
  const [pendingAffiliates, setPendingAffiliates] = useState([]);
  const [approvedAffiliates, setApprovedAffiliates] = useState([]);
  const [rejectedAffiliates, setRejectedAffiliates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("pending");
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [selectedAffiliateId, setSelectedAffiliateId] = useState(null);

  // Admin user mock data
  const adminUser = {
    name: "Admin User",
    role: "Administrator",
    email: "admin@example.com",
  };

  useEffect(() => {
    // Simulate API call to fetch data
    setLoading(true);
    setTimeout(() => {
      setPendingAffiliates(MOCK_AFFILIATES.pending);
      setApprovedAffiliates(MOCK_AFFILIATES.approved);
      setRejectedAffiliates(MOCK_AFFILIATES.rejected);
      setLoading(false);
    }, 1000);
  }, []);

  const handleApprove = (id) => {
    // Find the affiliate to approve
    const affiliateToApprove = pendingAffiliates.find(
      (affiliate) => affiliate.id === id
    );

    if (affiliateToApprove) {
      // Create a new approved affiliate with approval date
      const approvedAffiliate = {
        ...affiliateToApprove,
        status: "active",
        approvalDate: new Date().toISOString().split("T")[0],
      };

      // Add to approved list
      setApprovedAffiliates((prev) => [...prev, approvedAffiliate]);

      // Remove from pending list
      setPendingAffiliates((prev) =>
        prev.filter((affiliate) => affiliate.id !== id)
      );

      // Show success message (in a real app, you'd use a toast or alert component)
      alert(
        `Affiliate ${affiliateToApprove.name} has been approved successfully.`
      );
    }
  };

  const openRejectModal = (id) => {
    setSelectedAffiliateId(id);
    setRejectReason("");
    setShowRejectModal(true);
  };

  const handleReject = () => {
    if (!rejectReason.trim()) {
      alert("Please provide a reason for rejection.");
      return;
    }

    // Find the affiliate to reject
    const affiliateToReject = pendingAffiliates.find(
      (affiliate) => affiliate.id === selectedAffiliateId
    );

    if (affiliateToReject) {
      // Create a new rejected affiliate with rejection details
      const rejectedAffiliate = {
        ...affiliateToReject,
        status: "rejected",
        rejectionDate: new Date().toISOString().split("T")[0],
        rejectionReason: rejectReason,
      };

      // Add to rejected list
      setRejectedAffiliates((prev) => [...prev, rejectedAffiliate]);

      // Remove from pending list
      setPendingAffiliates((prev) =>
        prev.filter((affiliate) => affiliate.id !== selectedAffiliateId)
      );

      // Close modal
      setShowRejectModal(false);

      // Show success message
      alert(`Affiliate ${affiliateToReject.name} has been rejected.`);
    }
  };

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar user={adminUser} />

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Admin Header */}
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Affiliate Partners
            </h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button className="p-2 text-gray-600 rounded-full hover:bg-gray-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900">
              Manage Affiliate Partners
            </h2>
            <p className="text-gray-600">
              Review and manage retailer affiliation requests
            </p>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab("pending")}
                className={`py-4 px-6 text-sm font-medium ${
                  activeTab === "pending"
                    ? "border-b-2 border-green-500 text-green-600"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <span className="flex items-center">
                  <span className="mr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  Pending Requests
                  <span className="ml-2 bg-yellow-100 text-yellow-600 py-0.5 px-2.5 rounded-full text-xs">
                    {pendingAffiliates.length}
                  </span>
                </span>
              </button>

              <button
                onClick={() => setActiveTab("approved")}
                className={`py-4 px-6 text-sm font-medium ${
                  activeTab === "approved"
                    ? "border-b-2 border-green-500 text-green-600"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <span className="flex items-center">
                  <span className="mr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  Approved
                  <span className="ml-2 bg-green-100 text-green-600 py-0.5 px-2.5 rounded-full text-xs">
                    {approvedAffiliates.length}
                  </span>
                </span>
              </button>

              <button
                onClick={() => setActiveTab("rejected")}
                className={`py-4 px-6 text-sm font-medium ${
                  activeTab === "rejected"
                    ? "border-b-2 border-green-500 text-green-600"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <span className="flex items-center">
                  <span className="mr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  Rejected
                  <span className="ml-2 bg-red-100 text-red-600 py-0.5 px-2.5 rounded-full text-xs">
                    {rejectedAffiliates.length}
                  </span>
                </span>
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {activeTab === "pending" && (
              <div>
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Pending Affiliation Requests
                  </h3>
                </div>
                {pendingAffiliates.length === 0 ? (
                  <div className="p-6 text-center text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 mx-auto text-gray-400 mb-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <p>No pending requests found.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Retailer
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Business Type
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Location
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Applied On
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Status
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {pendingAffiliates.map((affiliate) => (
                          <tr key={affiliate.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                                  <span className="text-green-700 font-semibold">
                                    {affiliate.name.charAt(0)}
                                  </span>
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    {affiliate.name}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {affiliate.email}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {affiliate.businessType}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {affiliate.location}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {affiliate.applicationDate}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                                  affiliate.status
                                )}`}
                              >
                                {affiliate.status.charAt(0).toUpperCase() +
                                  affiliate.status.slice(1)}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button
                                onClick={() => handleApprove(affiliate.id)}
                                className="text-green-600 hover:text-green-900 mr-4"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => openRejectModal(affiliate.id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                Reject
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {activeTab === "approved" && (
              <div>
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Approved Affiliates
                  </h3>
                </div>
                {approvedAffiliates.length === 0 ? (
                  <div className="p-6 text-center text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 mx-auto text-gray-400 mb-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <p>No approved affiliates found.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Retailer
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Business Type
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Location
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Approved On
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {approvedAffiliates.map((affiliate) => (
                          <tr key={affiliate.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                                  <span className="text-green-700 font-semibold">
                                    {affiliate.name.charAt(0)}
                                  </span>
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    {affiliate.name}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {affiliate.email}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {affiliate.businessType}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {affiliate.location}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {affiliate.approvalDate}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                                  affiliate.status
                                )}`}
                              >
                                {affiliate.status.charAt(0).toUpperCase() +
                                  affiliate.status.slice(1)}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {activeTab === "rejected" && (
              <div>
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Rejected Affiliation Requests
                  </h3>
                </div>
                {rejectedAffiliates.length === 0 ? (
                  <div className="p-6 text-center text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 mx-auto text-gray-400 mb-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <p>No rejected requests found.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Retailer
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Business Type
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Location
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Rejected On
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Reason
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {rejectedAffiliates.map((affiliate) => (
                          <tr key={affiliate.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                                  <span className="text-red-700 font-semibold">
                                    {affiliate.name.charAt(0)}
                                  </span>
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    {affiliate.name}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {affiliate.email}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {affiliate.businessType}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {affiliate.location}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {affiliate.rejectionDate}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">
                              <div className="max-w-xs">
                                {affiliate.rejectionReason}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                                  affiliate.status
                                )}`}
                              >
                                {affiliate.status.charAt(0).toUpperCase() +
                                  affiliate.status.slice(1)}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Reject Affiliation Request
              </h3>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <label
                  htmlFor="rejectReason"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Reason for rejection
                </label>
                <textarea
                  id="rejectReason"
                  rows="4"
                  className="w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Please provide a reason for rejection..."
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                ></textarea>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowRejectModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReject}
                  className="px-4 py-2 bg-red-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Reject Request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AffiliatePartners;
