import { useMemo, useState } from 'react';

const AnalyticsChart = ({ title, points, height = 200, valueFormatter = (v) => v }) => {
  const [hoverIndex, setHoverIndex] = useState(null);

  const { viewBoxPoints, minY, maxY } = useMemo(() => {
    if (!points || points.length === 0) {
      return { viewBoxPoints: [], minY: 0, maxY: 1 };
    }

    const padding = 24; // inner padding for axes/labels
    const width = 600; // virtual width; SVG will scale responsively
    const innerWidth = width - padding * 2;
    const innerHeight = height - padding * 2;

    const xs = points.map((_, i) => i);
    const ys = points.map(p => p.value);
    const min = Math.min(...ys);
    const max = Math.max(...ys);
    const yRange = max - min || 1;

    const viewPts = points.map((p, i) => {
      const x = padding + (i / Math.max(points.length - 1, 1)) * innerWidth;
      const y = padding + (1 - (p.value - min) / yRange) * innerHeight;
      return { x, y, label: p.label, value: p.value };
    });

    return { viewBoxPoints: viewPts, minY: min, maxY: max };
  }, [points, height]);

  const pathD = useMemo(() => {
    if (viewBoxPoints.length === 0) return '';
    return viewBoxPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  }, [viewBoxPoints]);

  const areaD = useMemo(() => {
    if (viewBoxPoints.length === 0) return '';
    const padding = 24;
    const baseY = height - padding; // x-axis
    const line = viewBoxPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
    const closing = `L ${viewBoxPoints[viewBoxPoints.length - 1].x} ${baseY} L ${viewBoxPoints[0].x} ${baseY} Z`;
    return `${line} ${closing}`;
  }, [viewBoxPoints, height]);

  return (
    <div className="analytics-chart">
      <div className="chart-header">
        <h3>{title}</h3>
        <div className="chart-range">
          <span>Min: {valueFormatter(minY)}</span>
          <span>Max: {valueFormatter(maxY)}</span>
        </div>
      </div>
      <div className="chart-canvas">
        <svg viewBox={`0 0 600 ${height}`} preserveAspectRatio="none" className="chart-svg">
          {/* Area fill */}
          <path d={areaD} fill="rgba(0, 255, 200, 0.08)" stroke="none" />
          {/* Line */}
          <path d={pathD} fill="none" stroke="#16f2b3" strokeWidth="2" />

          {/* X-axis labels */}
          {viewBoxPoints.map((p, i) => (
            <g key={i}>
              <circle cx={p.x} cy={p.y} r={3} fill="#16f2b3" />
              <text x={p.x} y={height - 6} textAnchor="middle" fontSize="10" fill="#9aa4af">
                {p.label}
              </text>
            </g>
          ))}

          {/* Hover guide */}
          {hoverIndex !== null && viewBoxPoints[hoverIndex] && (
            <g>
              <line
                x1={viewBoxPoints[hoverIndex].x}
                y1={24}
                x2={viewBoxPoints[hoverIndex].x}
                y2={height - 24}
                stroke="rgba(22,242,179,0.3)"
                strokeWidth="1"
              />
            </g>
          )}
        </svg>
        {/* Simple legend/tooltip */}
        {hoverIndex !== null && viewBoxPoints[hoverIndex] && (
          <div className="chart-tooltip" style={{ left: `${(viewBoxPoints[hoverIndex].x / 600) * 100}%` }}>
            <div className="tooltip-inner">
              <div className="tooltip-label">{viewBoxPoints[hoverIndex].label}</div>
              <div className="tooltip-value">{valueFormatter(viewBoxPoints[hoverIndex].value)}</div>
            </div>
          </div>
        )}
        <div
          className="chart-hover-capture"
          onMouseLeave={() => setHoverIndex(null)}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 600;
            const idx = viewBoxPoints.reduce((best, p, i) => {
              const dist = Math.abs(p.x - x);
              if (best.idx === -1 || dist < best.dist) return { idx: i, dist };
              return best;
            }, { idx: -1, dist: Infinity }).idx;
            setHoverIndex(idx);
          }}
        />
      </div>
    </div>
  );
};

export default AnalyticsChart;


