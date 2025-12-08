'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="ja">
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-gray-900">500</h1>
            <h2 className="mt-4 text-2xl font-semibold text-gray-700">
              エラーが発生しました
            </h2>
            <p className="mt-2 text-gray-500">
              申し訳ありません。予期しないエラーが発生しました。
            </p>
            <button
              onClick={() => reset()}
              className="mt-6 inline-block rounded-md bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 transition-colors"
            >
              もう一度試す
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}
