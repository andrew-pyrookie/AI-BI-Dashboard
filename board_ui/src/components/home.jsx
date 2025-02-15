import { useState } from 'react';
import { FiActivity, FiBarChart, FiDatabase, FiSettings, FiMenu, FiX } from 'react-icons/fi';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const QuantAnalyticsDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const chartData = [
    { name: 'Jan', value: 65 },
    { name: 'Feb', value: 80 },
    { name: 'Mar', value: 75 },
    { name: 'Apr', value: 90 },
    { name: 'May', value: 85 },
  ];

  const performanceData = [
    { name: 'Q1', efficiency: 45, accuracy: 75 },
    { name: 'Q2', efficiency: 60, accuracy: 82 },
    { name: 'Q3', efficiency: 75, accuracy: 88 },
    { name: 'Q4', efficiency: 80, accuracy: 91 },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 bg-black text-white w-64 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300`}>
        <div className="p-6">
          <h1 className="text-2xl font-bold">Quant<span className="text-cyan-400">Analytics</span></h1>
        </div>
        <nav className="mt-8">
          {[
            { id: 'dashboard', icon: <FiActivity />, label: 'Dashboard' },
            { id: 'analytics', icon: <FiBarChart />, label: 'Analytics' },
            { id: 'data', icon: <FiDatabase />, label: 'Data Streams' },
            { id: 'settings', icon: <FiSettings />, label: 'Settings' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center px-6 py-3 text-sm hover:bg-gray-800 ${
                activeTab === item.id ? 'bg-gray-800 border-r-4 border-cyan-400' : ''
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="md:ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden text-gray-600 hover:text-gray-800"
            >
              {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
            <div className="flex items-center space-x-4">
              <div className="bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full text-sm">AI Model v2.4.1</div>
              <div className="h-8 w-8 bg-gray-800 rounded-full"></div>
            </div>
          </div>
        </header>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
          {[
            { title: 'Total Models', value: '24', change: '+12%' },
            { title: 'Active Processes', value: '1,432', change: '+8%' },
            { title: 'Accuracy Rate', value: '94.6%', change: '+2.1%' },
            { title: 'API Calls', value: '24.3k', change: '-3%' },
          ].map((metric, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <h3 className="text-gray-500 text-sm mb-2">{metric.title}</h3>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{metric.value}</span>
                <span className={`px-2 py-1 rounded-full text-sm ${metric.change.startsWith('+') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {metric.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-6 pb-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold mb-4">Model Performance</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="efficiency" stroke="#06b6d4" />
                  <Line type="monotone" dataKey="accuracy" stroke="#4f46e5" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold mb-4">Monthly Activity</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#06b6d4" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="px-6 pb-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {[
                { time: '10:42 AM', event: 'Updated prediction model v2.4.1' },
                { time: '9:15 AM', event: 'Triggered new data pipeline' },
                { time: 'Yesterday', event: 'Trained new NLP model (92% accuracy)' },
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                  <span className="text-gray-600">{activity.event}</span>
                  <span className="text-sm text-gray-400">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuantAnalyticsDashboard;