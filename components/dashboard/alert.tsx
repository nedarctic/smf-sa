export function Alert({ text }: { text: string }) {
  return (
    <div className="rounded-lg bg-red-100 px-3 py-2 text-sm text-red-700">
      {text}
    </div>
  )
}