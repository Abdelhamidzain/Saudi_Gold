import { toAr, fmt } from '../lib/gold';

export default function PriceTable({ prices, showDollar = true }) {
  const rows = [
    { name: 'جرام الذهب عيار 24', k: 24, type: 'gram' },
    { name: 'جرام الذهب عيار 22', k: 22, type: 'gram' },
    { name: 'جرام الذهب عيار 21', k: 21, type: 'gram' },
    { name: 'جرام الذهب عيار 18', k: 18, type: 'gram' },
    { name: 'جرام الذهب عيار 14', k: 14, type: 'gram' },
    { name: 'أونصة الذهب عيار 24', k: 24, type: 'ounce' },
    { name: 'كيلو الذهب عيار 24', k: 24, type: 'kilo' },
  ];

  return (
    <div className="table-section">
      <div className="table-header">
        <h2>📊 جدول سعر الذهب اليوم في السعودية</h2>
      </div>
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>الوحدة</th>
              <th>السعر (ر.س)</th>
              {showDollar && <th>السعر ($)</th>}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                <td>
                  <span className="karat-badge">{toAr(row.k)}K</span>
                  {row.name}
                </td>
                <td>{fmt(prices[row.k]?.[row.type])}</td>
                {showDollar && <td>{fmt(prices[row.k]?.[row.type] / 3.75)}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
