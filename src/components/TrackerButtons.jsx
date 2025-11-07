import { STATUS_OPTIONS } from '../utils/constants';

export default function TrackerButtons({ currentStatus, onStatusChange }) {
  const quickActions = ['Emailed', 'Applied', 'Interviewed', 'Passed', 'Rejected'];

  return (
    <div className="mb-3">
      <div className="mb-2 text-xs font-medium text-gray-500">Quick Actions</div>
      <div className="flex flex-wrap gap-1.5">
        {quickActions.map((action) => (
          <button
            key={action}
            onClick={() => onStatusChange(action)}
            disabled={currentStatus === action}
            className={`
              rounded-md border px-2.5 py-1 text-xs font-medium transition-all
              ${currentStatus === action
                ? 'border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed'
                : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
              }
            `}
          >
            {action}
          </button>
        ))}
      </div>
    </div>
  );
}
