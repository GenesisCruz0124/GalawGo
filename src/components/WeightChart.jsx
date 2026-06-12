import './WeightChart.css'

// ===========================================================
// WeightChart - a small, dependency-free SVG line chart.
//
// Props:
//   data - array of { date: "YYYY-MM-DD", weight: number },
//          already sorted oldest -> newest.
// ===========================================================
export default function WeightChart({ data }) {
  const width = 300
  const height = 140
  const padding = 20

  const weights = data.map((entry) => entry.weight)
  const minWeight = Math.min(...weights)
  const maxWeight = Math.max(...weights)
  const range = maxWeight - minWeight || 1 // avoid divide-by-zero for flat data

  // Convert each {date, weight} into an {x, y} pixel position
  const points = data.map((entry, i) => {
    const x =
      data.length === 1
        ? width / 2
        : padding + (i / (data.length - 1)) * (width - padding * 2)
    const y =
      height - padding - ((entry.weight - minWeight) / range) * (height - padding * 2)
    return { x, y }
  })

  const polylinePoints = points.map((p) => `${p.x},${p.y}`).join(' ')

  // Turn "2026-06-12" into a short label like "Jun 12"
  function shortLabel(dateStr) {
    const date = new Date(dateStr)
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
  }

  return (
    <div className="weight-chart">
      <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
        {data.length > 1 && (
          <polyline className="weight-chart-line" points={polylinePoints} />
        )}
        {points.map((p, i) => (
          <circle key={i} className="weight-chart-dot" cx={p.x} cy={p.y} r="3.5" />
        ))}
      </svg>
      <div className="weight-chart-labels">
        <span>{shortLabel(data[0].date)}</span>
        <span>{shortLabel(data[data.length - 1].date)}</span>
      </div>
    </div>
  )
}
