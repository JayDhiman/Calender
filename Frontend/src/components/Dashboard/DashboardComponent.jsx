import React from 'react';
import { 
  Dashboard as DashboardIcon, 
  EventNote, 
  NotificationsActive, 
 
} from '@mui/icons-material';

const DashboardComponent = () => {
  const stats = [
    { 
      icon: <EventNote />, 
      title: 'Total Events', 
      value: 42,
      color: 'bg-blue-500'
    },
    { 
      icon: <NotificationsActive />, 
      title: 'Upcoming Events', 
      value: 7,
      color: 'bg-green-500'
    }
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex items-center mb-6">
        <DashboardIcon className="mr-3 text-3xl" />
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className={`${stat.color} text-white p-6 rounded-lg shadow-lg transform transition hover:scale-105`}
          >
            <div className="flex items-center justify-between">
              <div>
                {stat.icon}
                <h3 className="text-xl font-semibold mt-2">{stat.title}</h3>
              </div>
              <span className="text-4xl font-bold">{stat.value}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-3 gap-4">
          <button className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700">
            Create Event
          </button>
          <button className="bg-green-600 text-white p-3 rounded-lg hover:bg-green-700">
            View Schedule
          </button>
          <button className="bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700">
            Manage Teams
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[
            { 
              title: 'Team Meeting', 
              time: '2 hours ago',
              status: 'Completed'
            },
            { 
              title: 'Project Deadline', 
              time: '1 day ago',
              status: 'Upcoming'
            }
          ].map((activity, index) => (
            <div 
              key={index} 
              className="flex justify-between items-center p-4 bg-gray-100 rounded-lg"
            >
              <div>
                <h3 className="font-semibold">{activity.title}</h3>
                <p className="text-gray-500">{activity.time}</p>
              </div>
              <span 
                className={`
                  px-3 py-1 rounded-full text-sm 
                  ${activity.status === 'Completed' 
                    ? 'bg-green-200 text-green-800' 
                    : 'bg-yellow-200 text-yellow-800'
                  }
                `}
              >
                {activity.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardComponent;