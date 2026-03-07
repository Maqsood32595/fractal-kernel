import { useEffect, useState } from 'react';
import AdminDashboard from './components/AdminDashboard';
import { featuresApi } from './api';

export interface Feature {
    id: string;
    name: string;
    description: string;
    basePath: string;
    enabled: boolean;
    version: string;
}

function App() {
    const [features, setFeatures] = useState<Feature[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFeatures();
    }, []);

    const fetchFeatures = async () => {
        const data = await featuresApi.getFeatures();
        setFeatures(data);
        setLoading(false);
    };

    const handleToggle = async (id: string) => {
        try {
            await featuresApi.toggleFeature(id);
            await fetchFeatures(); // Refresh state after toggle
        } catch (e) {
            console.error(e);
            alert('Failed to toggle feature');
        }
    };

    if (loading) {
        return <div className="p-8 text-center text-gray-400">Loading Control Plane...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
            <header className="mb-8">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    Fractal Kernel Control Plane
                </h1>
                <p className="text-gray-400 mt-2">Manage your isolated feature cells in real-time.</p>
            </header>

            <main>
                <AdminDashboard features={features} onToggleFeature={handleToggle} />
            </main>
        </div>
    );
}

export default App;
