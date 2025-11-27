import { NextPageContext } from 'next';
import Link from 'next/link';

interface ErrorProps {
  statusCode?: number;
}

function Error({ statusCode }: ErrorProps) {
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
          {statusCode || 'Error'}
        </h1>
        <h2 style={{ marginTop: '1rem', fontSize: '1.5rem', fontWeight: 600, color: '#374151' }}>
          {statusCode === 404
            ? 'ページが見つかりません'
            : 'エラーが発生しました'}
        </h2>
        <p style={{ marginTop: '0.5rem', color: '#6b7280' }}>
          {statusCode === 404
            ? 'お探しのページは存在しないか、移動した可能性があります。'
            : 'しばらく経ってから再度お試しください。'}
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

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
