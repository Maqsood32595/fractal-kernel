const API_BASE_URL = 'http://localhost:3000/api';

export const featuresApi = {
    getFeatures: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/features`);
            if (!response.ok) throw new Error(`Failed to fetch features`);
            const data = await response.json();
            return data.features || [];
        } catch (e) {
            console.error('API Call Failed:', e);
            throw e;
        }
    },

    toggleFeature: async (id: string) => {
        const response = await fetch(`${API_BASE_URL}/features/${id}/toggle`, {
            method: 'POST',
        });
        if (!response.ok) throw new Error('Failed to toggle feature');
        return response.json();
    }
};
