import React, { useMemo, useState } from 'react';
import { Feature } from '../App';
import FeatureCard from './FeatureCard';
import { Search } from 'lucide-react';

interface AdminDashboardProps {
    features: Feature[];
    onToggleFeature: (id: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ features, onToggleFeature }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredFeatures = useMemo(() => {
        return features.filter(f =>
            f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            f.id.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [features, searchTerm]);

    const activeCount = features.filter(f => f.enabled).length;

    return (
        <div className="max-w-7xl mx-auto">
            <div className="mb-8 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-800 p-6 rounded-2xl border border-gray-700">
                <div className="flex items-center gap-6">
                    <div className="text-center">
                        <p className="text-3xl font-black text-white">{features.length}</p>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Cells</p>
                    </div>
                    <div className="w-px h-10 bg-gray-700"></div>
                    <div className="text-center">
                        <p className="text-3xl font-black text-cyan-400">{activeCount}</p>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Active</p>
                    </div>
                </div>

                <div className="relative w-full sm:w-72">
                    <Search className="absolute text-gray-400 top-1/2 left-3 transform -translate-y-1/2" size={18} />
                    <input
                        type="text"
                        placeholder="Search features..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredFeatures.length > 0 ? (
                    filteredFeatures.map(feature => (
                        <FeatureCard
                            key={feature.id}
                            feature={feature}
                            onToggle={onToggleFeature}
                        />
                    ))
                ) : (
                    <div className="col-span-full py-12 text-center text-gray-500 bg-gray-800/30 rounded-xl border border-dashed border-gray-700">
                        No features matched your search.
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
