import Link from 'next/link'

export default function FirstPost() {
  return (
    <>
      <h1>Account Settings</h1>
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
        <div>Welcome to my testing area</div>
      </h2>
    </>
  )
}
