import { logout } from '../firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();  
    navigate('/login');
  };

  return (
    <div>
      <h2>Welcome to your Dashboard!</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
