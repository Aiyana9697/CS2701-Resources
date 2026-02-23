/*
users view component for admin dashboard
displays a list of registered users including metadata (name, email, role, join date, account status)
includes search bar to filter users by name or email
includes action buttons for each user to allow admins to flag or delete inappropriate accounts
*/
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Search, Trash2, Flag } from 'lucide-react';

// mock data for users (structured for future replacement with API data)
const users = [
  { id: 1, name: 'Dr. Sarah Ocean', email: 'sarah@ocean.org', role: 'Researcher', joinDate: '2024-01-15', status: 'Active' },
  { id: 2, name: 'John Maritime', email: 'john@marine.com', role: 'Contributor', joinDate: '2024-02-20', status: 'Active' },
  { id: 3, name: 'Emma Waters', email: 'emma@waters.net', role: 'Observer', joinDate: '2024-03-10', status: 'Inactive' },
];

/*
state variable 'searchQuery' is used to keep track of current value of search input to allow admins to filter users
handleDelete / handleFlag functions defined to handle respective actions when admin clicks on delete or flag buttons for a user (currently logs the action to console but will be expanded to include delete/flag logic)
*/
export function UsersView() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleDelete = (id: number) => {
    console.log('Deleting user with ID:', id);
    // Implement delete logic
  };

  const handleFlag = (id: number) => {
    console.log('Flagging user with ID:', id);
    // Implement flag logic
  };

  /*
  animation - content slides up and fades in when component first mounts
  defines a search bar at the top of the view for filtering users by name or email
  searchQuery state updates as admin types in the search input & users are filtered based on if name or email is included (case-insensitive)
  */
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      {/* Search Bar */}
      <div className="bg-gradient-to-br from-slate-900/90 to-cyan-900/30 rounded-2xl p-4 border border-cyan-500/30">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyan-400" />
          <Input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-slate-950/50 border-cyan-400/30 text-white placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Users List 
      users is mapped over to render a table row for each user that matches search query, displaying their name, email, role, join date and account status
      dynamic styling is applied to the account status badge based on whether the user is active or inactive 
      action buttons for flagging or deleting a user are included in each row, with click handlers to manage those actions
      */}
      <div className="bg-gradient-to-br from-slate-900/90 to-cyan-900/30 rounded-2xl border border-cyan-500/30 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-950/50 border-b border-cyan-500/20">
              <tr>
                <th className="text-left p-4 text-cyan-300">Name</th>
                <th className="text-left p-4 text-cyan-300">Email</th>
                <th className="text-left p-4 text-cyan-300">Role</th>
                <th className="text-left p-4 text-cyan-300">Join Date</th>
                <th className="text-left p-4 text-cyan-300">Status</th>
                <th className="text-left p-4 text-cyan-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-cyan-500/10 hover:bg-cyan-500/5 transition-colors">
                  <td className="p-4 text-white">{user.name}</td>
                  <td className="p-4 text-slate-300">{user.email}</td>
                  <td className="p-4 text-slate-300">{user.role}</td>
                  <td className="p-4 text-slate-300">{user.joinDate}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      user.status === 'Active' 
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                        : 'bg-slate-500/20 text-slate-400 border border-slate-500/30'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleFlag(user.id)}
                        className="text-yellow-400 hover:bg-yellow-500/10"
                      >
                        <Flag className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(user.id)}
                        className="text-red-400 hover:bg-red-500/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
