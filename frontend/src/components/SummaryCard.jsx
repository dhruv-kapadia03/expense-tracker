const SummaryCard = ({ title, value, icon, color }) => {
    return (
        <div className={`bg-white rounded-2xl p-5 shadow-sm border border-gray-100`}>
            <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium text-gray-500">{title}</p>
                <span className={`text-xl p-2 rounded-xl ${color}`}>{icon}</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
    );
};

export default SummaryCard;