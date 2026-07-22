import { Link } from 'react-router-dom'

function Mallpage() {
  return (
    <div style={{ padding: '20px', maxWidth: '480px', margin: '0 auto' }}>
      <h1>🛍️ 会员权益商城</h1>
      <p>欢迎来到会员权益商城！这里即将展示丰富的会员权益。</p>
      <Link to="/" style={{ display: 'block', marginTop: '20px', color: '#4a90d9' }}>
        ← 返回作品集
      </Link>
    </div>
  )
}

export default Mallpage