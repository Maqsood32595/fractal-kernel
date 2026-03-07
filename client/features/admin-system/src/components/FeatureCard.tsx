import React, { useState } from 'react';
import { Feature } from '../App';
import { PowerIcon, CheckCircle2, XCircle } from 'lucide-react';

interface FeatureCardProps {
    feature: Feature;
    onToggle: (id: string) => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature, onToggle }) => {
    const [isToggling, setIsToggling] = useState(false);

    const handleToggle = async () => {
        setIsToggling(true);
        await onToggle(feature.id);
        setIsToggling(false);
    };

    return (
        <div className={`p-6 rounded-xl border transition-all duration-300 ${feature.enabled ? 'bg-gray-800 border-cyan-500/50 shadow-lg shadow-cyan-500/10' : 'bg-gray-800/50 border-gray-700'}`}>
            <div className="flex justify-between items-start mb-4">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-white tracking-wide">{feature.name}</h3>
                        {feature.enabled ? (
                            <span className="flex items-center gap-1 text-xs font-semibold bg-green-500/10 text-green-400 px-2 py-1 rounded-full border border-green-500/20">
                                <CheckCircle2 size={14} /> Active
                            </span>
                        ) : (
                            <span className="flex items-center gap-1 text-xs font-semibold bg-red-500/10 text-red-400 px-2 py-1 rounded-full border border-red-500/20">
                                <XCircle size={14} /> Disabled
                            </span>
                        )}
                    </div>
                    <p className="text-sm font-mono text-gray-500">v{feature.version}</p>
                </div>

                <button
                    onClick={handleToggle}
                    disabled={isToggling}
                    className={`p-3 rounded-full transition-all duration-300 ${feature.enabled ? 'bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30' : 'bg-gray-700 text-gray-400 hover:bg-gray-600'} ${isToggling ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    <PowerIcon size={20} className={isToggling ? 'animate-pulse' : ''} />
                </button>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed mb-4 min-h-[40px]">
                {feature.description || 'No description provided in manifest.'}
            </p>

            <div className="pt-4 border-t border-gray-700/50">
                <p className="text-xs text-gray-500 font-mono flex items-center gap-2">
                    📁 {feature.basePath}
                </p>
            </div>
        </div>
    );
};

export default FeatureCard;
