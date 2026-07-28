const ProgressRing = ({ percentage, size = 160 }) => {
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;

  const circumference = 2 * Math.PI * radius;

  const offset =
    circumference - (percentage / 100) * circumference;

  const color =
    percentage === 100
      ? "#22C55E"
      : percentage >= 50
      ? "#3B82F6"
      : "#F59E0B";

  return (
    <div className="relative flex items-center justify-center">
      <svg
        width={size}
        height={size}
        className="-rotate-90"
      >
        {/* Background */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E5E7EB"
          strokeWidth={strokeWidth}
          fill="none"
        />

        {/* Progress */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{
            transition:
              "stroke-dashoffset .8s ease, stroke .4s ease",
          }}
        />
      </svg>

      <div className="absolute text-center">
        <h2 className="text-3xl font-bold">
          {percentage}%
        </h2>

        <p className="text-xs text-gray-500">
          Progress
        </p>
      </div>
    </div>
  );
};

export default ProgressRing;