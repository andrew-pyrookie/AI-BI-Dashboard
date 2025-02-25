import { useState } from 'react';
import { FiUploadCloud } from 'react-icons/fi';
import { LineChart, Line, BarChart, Bar, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Sidebar from './Sidebar';
import Header from './Header';

const AnalyticsPage = () => {
  const [selectedModel, setSelectedModel] = useState('sales-forecast');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const salesData = [
    { month: 'Jan', actual: 65, predicted: 70 },
    { month: 'Feb', actual: 80, predicted: 78 },
    { month: 'Mar', actual: 75, predicted: 82 },
    { month: 'Apr', actual: 90, predicted: 88 },
    { month: 'May', actual: 85, predicted: 91 },
  ];

  const riskData = [
    { customer: 'C001', score: 42, risk: 'High' },
    { customer: 'C002', score: 78, risk: 'Low' },
    { customer: 'C003', score: 65, risk: 'Medium' },
    { customer: 'C004', score: 88, risk: 'Low' },
    { customer: 'C005', score: 35, risk: 'High' },
  ];

  const clusterData = [
    { x: 25, y: 50, cluster: 'Group A' },
    { x: 45, y: 75, cluster: 'Group B' },
    { x: 15, y: 30, cluster: 'Group A' },
    { x: 60, y: 85, cluster: 'Group C' },
    { x: 70, y: 40, cluster: 'Group D' },
  ];

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
      console.log('Uploaded file:', file.name);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="md:ml-64">
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <h2 className="text-xl font-semibold">AI Analytics Engine</h2>
            </div>
            <div className="flex items-center space-x-4">
              <label className="flex items-center px-4 py-2 bg-cyan-100 text-cyan-800 rounded-lg cursor-pointer hover:bg-cyan-200">
                <FiUploadCloud className="mr-2" />
                {uploadedFile ? uploadedFile.name : 'Upload Dataset'}
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileUpload}
                  accept=".csv,.xlsx,.json"
                />
              </label>
              {uploadedFile && (
                <div className="text-sm text-gray-500">
                  ({Math.round(uploadedFile.size / 1024)} KB)
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Model Selection */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 p-6 border-b">
          {[
            { id: 'sales-forecast', label: 'Sales Forecast' },
            { id: 'risk-detection', label: 'Credit Risk' },
            { id: 'customer-clusters', label: 'Customer Clusters' },
            { id: 'product-analysis', label: 'Product Analysis' },
            { id: 'factor-analysis', label: 'Factor Analysis' },
          ].map((model) => (
            <button
              key={model.id}
              onClick={() => setSelectedModel(model.id)}
              className={`p-3 text-sm rounded-lg ${
                selectedModel === model.id
                  ? 'bg-black text-white'
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              {model.label}
            </button>
          ))}
        </div>

        {/* Analytics Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
          {/* Main Chart */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold mb-4">
              {selectedModel.replace(/-/g, ' ').toUpperCase()}
            </h3>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                {selectedModel === 'sales-forecast' ? (
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="actual"
                      stroke="#06b6d4"
                      name="Actual Sales"
                    />
                    <Line
                      type="monotone"
                      dataKey="predicted"
                      stroke="#4f46e5"
                      name="Predicted Sales"
                      strokeDasharray="5 5"
                    />
                  </LineChart>
                ) : selectedModel === 'risk-detection' ? (
                  <BarChart data={riskData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="customer" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="score" fill="#06b6d4" />
                  </BarChart>
                ) : (
                  <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <CartesianGrid />
                    <XAxis type="number" dataKey="x" name="X Value" />
                    <YAxis type="number" dataKey="y" name="Y Value" />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Scatter
                      name="Clusters"
                      data={clusterData}
                      fill="#06b6d4"
                    />
                  </ScatterChart>
                )}
              </ResponsiveContainer>
            </div>
          </div>

          {/* Insights Panel */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold mb-4">Key Insights</h3>
              <div className="space-y-3">
                <div className="p-3 bg-cyan-50 rounded-lg">
                  <h4 className="text-sm font-medium text-cyan-800">
                    Top Predictive Factors
                  </h4>
                  <ul className="mt-2 text-sm text-gray-600">
                    <li>• Marketing spend (35% impact)</li>
                    <li>• Seasonal trends (28% impact)</li>
                    <li>• Economic indicators (22% impact)</li>
                  </ul>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <h4 className="text-sm font-medium text-purple-800">
                    Model Performance
                  </h4>
                  <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-gray-500">Accuracy</div>
                      <div className="font-semibold">94.2%</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Processing Time</div>
                      <div className="font-semibold">2.4s</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold mb-4">AI Recommendations</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <span className="shrink-0 mt-1 w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
                  <div className="text-sm">
                    Consider increasing marketing budget in Q3 based on predicted
                    seasonal uplift
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="shrink-0 mt-1 w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
                  <div className="text-sm">
                    High-risk customers detected: Recommend additional credit
                    checks for 15 accounts
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Data Summary */}
        <div className="px-6 pb-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold mb-4">Dataset Overview</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: 'Total Records', value: '24,532' },
                { label: 'Variables', value: '42' },
                { label: 'Time Range', value: 'Jan 2020 - Present' },
                { label: 'Data Quality', value: '98.4%' },
              ].map((metric, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold mb-1">{metric.value}</div>
                  <div className="text-sm text-gray-500">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;