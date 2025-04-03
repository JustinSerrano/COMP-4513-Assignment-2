import { useNavigate } from 'react-router-dom';
import heroImage from '../assets/hero-image.jpg';

const LoginView = () => {
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        navigate('/galleries');
    };

    const handleRegister = () => {
        alert("Implementation coming soon");
    };

    return (
        <div
            className="h-screen w-full bg-cover bg-center relative"
            style={{ backgroundImage: `url(${heroImage})` }}
        >
            <div className="flex items-center justify-center h-full">
                <div className="bg-white bg-opacity-80 p-8 rounded-xl shadow-lg text-center w-96">
                    <h1 className="text-4xl font-bold mb-6">Art Gallery Dashboard</h1>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-left font-medium mb-1">Username</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder='Implementation coming soon'
                            />
                        </div>
                        <div>
                            <label className="block text-left font-medium mb-1">Password</label>
                            <input
                                type="password"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder='Implementation coming soon'
                            />
                        </div>
                        <div className="space-y-2">
                            <button
                                type="submit"
                                className="w-full px-4 py-2 bg-blue-500 text-white text-lg rounded-lg hover:bg-blue-600 transition"
                            >
                                Login
                            </button>
                            <button
                                type="button"
                                onClick={handleRegister}
                                className="w-full px-4 py-2 bg-gray-500 text-white text-lg rounded-lg hover:bg-gray-600 transition"
                            >
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Credit Box */}
            <div className="absolute bottom-0 right-0 m-4 p-2 bg-black bg-opacity-70 text-white text-sm rounded-lg">
                Photo by <a href="https://unsplash.com/@wx1993" target="_blank" rel="noopener noreferrer" className="underline">Raychan</a> on Unsplash
            </div>
        </div>
    );
}

export default LoginView;
