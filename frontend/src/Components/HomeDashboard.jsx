import { motion } from 'framer-motion';
import { FiActivity, FiUsers, FiDollarSign, FiTrendingUp } from 'react-icons/fi';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useInView } from 'react-intersection-observer';

const HomeDashboard = () => {
  // Static data
  const stats = [
    { id: 1, title: 'Total Customers', value: '2,845', icon: FiUsers, color: 'bg-blue-500' },
    { id: 2, title: 'Revenue', value: '$52,420', icon: FiDollarSign, color: 'bg-green-500' },
    { id: 3, title: 'Active Deals', value: '143', icon: FiActivity, color: 'bg-purple-500' },
    { id: 4, title: 'Growth Rate', value: '+24%', icon: FiTrendingUp, color: 'bg-orange-500' },
  ];

  const salesPipeline = [
    { stage: 'Proposal', value: 45 },
    { stage: 'Negotiation', value: 30 },
    { stage: 'Closed Won', value: 25 },
    { stage: 'Closed Lost', value: 10 },
  ];

  const recentActivities = [
    { id: 1, title: 'New deal added', time: '2 min ago', user: 'John Doe' },
    { id: 2, title: 'Meeting with client', time: '1 hour ago', user: 'Sarah Smith' },
    { id: 3, title: 'Contract signed', time: '4 hours ago', user: 'Mike Johnson' },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
 

      {/* Stats Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {stats.map((stat) => (
          <motion.div
            key={stat.id}
            variants={itemVariants}
            className={`p-6 rounded-xl text-white ${stat.color} transition-transform hover:scale-105`}
          >
            <stat.icon className="w-8 h-8 mb-4" />
            <h3 className="text-2xl font-bold mb-2">{stat.value}</h3>
            <p className="opacity-90">{stat.title}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Pipeline Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm"
        >
          <h2 className="text-xl font-semibold mb-6">Sales Pipeline</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesPipeline}>
                <XAxis dataKey="stage" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#4F46E5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-6 rounded-xl shadow-sm"
        >
          <h2 className="text-xl font-semibold mb-6">Recent Activities</h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-start p-4 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="flex-shrink-0 w-2 h-2 bg-green-500 rounded-full mt-2" />
                <div className="ml-4 flex-1">
                  <p className="font-medium text-gray-900">{activity.title}</p>
                  <p className="text-sm text-gray-500">{activity.user}</p>
                  <p className="text-xs text-gray-400">{activity.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <button className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
          Add New Deal
        </button>
        <button className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
          Schedule Meeting
        </button>
        <button className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
          Generate Report
        </button>
        <button className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
          View Analytics
        </button>
      </motion.div>
    </div>
  );
};

export default HomeDashboard;