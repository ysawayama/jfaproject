import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900">404</h1>
        <h2 className="mt-4 text-2xl font-semibold text-gray-700">
          ページが見つかりません
        </h2>
        <p className="mt-2 text-gray-500">
          お探しのページは存在しないか、移動した可能性があります。
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-md bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 transition-colors"
        >
          ホームに戻る
        </Link>
      </div>
    </div>
  );
}
