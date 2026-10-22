//メインメニュー　全てのページに繋がる場所　大きな仕事はなし

"use client";
import Link from 'next/link'

export default function Home() {

    return (
    <main>
      <h1>メニュー画面</h1>
      <div className='flex flex-col'>
        <Link href="/signup">アカウント登録</Link>
        <Link href="/login">ログイン画面</Link>
        <Link href={"/getUser"}>User Data画面</Link>
        <Link href={"/profile"}>Profile画面</Link>
        <Link href={"/post/create"}>投稿画面</Link>
        <Link href={"/posts"}>投稿一覧</Link>
        <Link href={"/followerPosts"}>フォロー中の投稿一覧</Link>
      </div>
    </main>
  );
}