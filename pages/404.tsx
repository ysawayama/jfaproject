import Link from 'next/link';

export default function Custom404() {
  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f3f4f6',
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '4rem', fontWeight: 'bold', color: '#111827' }}>
          404
        </h1>
        <h2 style={{ marginTop: '1rem', fontSize: '1.5rem', fontWeight: 600, color: '#374151' }}>
          ページが見つかりません
        </h2>
        <p style={{ marginTop: '0.5rem', color: '#6b7280' }}>
          お探しのページは存在しないか、移動した可能性があります。
        </p>
        <Link
          href="/"
          style={{
            display: 'inline-block',
            marginTop: '1.5rem',
            padding: '0.75rem 1.5rem',
            backgroundColor: '#2563eb',
            color: 'white',
            borderRadius: '0.375rem',
            textDecoration: 'none',
          }}
        >
          ホームに戻る
        </Link>
      </div>
    </div>
  );
}
