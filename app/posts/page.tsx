// postテーブルから投稿をすべて取得する
// userも一緒に取得して投稿者のnameを表示できるようにする
// Server ComponentなのでDBから直接データを取得する
// 投稿ごとに削除・編集ボタンのコンポーネントを表示する
//　いいねボタンを表示しいいねの数も表示
//　コメント返信ボタンを追加し実際にコメントも表示する
// 表示数を10個ごとにする
// 検索ページに遷移するボタンを作成
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { DeletePostButton } from "../components/DeletePostButton";
import { PatchPostButton } from "../components/PatchPostButton";
import { LikePostButton } from "../components/LikePostButton";
import { CommentPostButton } from "../components/CommentPostButton";
import { CommentViews } from "../components/CommentViews";
import { FollowButton } from "../components/FollowButton";
import { FollowDeleteButton } from "../components/FollowDeleteButton";

// 1ページあたりの投稿数
const limit = 10;
//searchParamsのプロパティ
type Props = {
    searchParams: Promise<{
        page?: string;
        keyword?:string;
    }>;
};
// searchParamsはURLのクエリパラメータを受け取るための特別なprops名
// URLの?page=〇から、pageというプロパティ名とその値を取得できる
export default async function Posts({ searchParams }: Props) {
    // URLからページ番号を取得する
    const params = await searchParams;
    //params.pageなのはURLがそうなっているから　もしスペルミスなどでpagaなどになっていればここもpagaになってしまう
    const pageParam = Number(params.page);
    const keywordParam=params.keyword;
    // Number.isInteger()で整数かどうかを判定する（true / false）
    // pageParam >= 1 でページ番号が1以上か確認する
    // 条件を両方満たせばpageParamを使い、そうでなければ1ページ目にする
    const page =
        Number.isInteger(pageParam) && pageParam >= 1
            ? pageParam
            : 1;

    // ページ番号から飛ばす投稿数を計算する
    const skip = (page - 1) * limit;
    //三項演算子でkeywordがない場合は空白を渡す、ある場合はkeywordを含む投稿を探す
    const where = keywordParam
    ? { content: { contains: keywordParam } }
    : {};

    // skipで先頭から飛ばす投稿数を指定し、takeで取得する投稿数を指定する
    // 例えば2ページ目なら、10件飛ばして次の10件を取得する　
    // skipとtakeは順不同
    // whereのcontainsは含まれるものを検索する
    const posts = await prisma.post.findMany({
        skip: skip,
        take: limit,
        orderBy: {
            createdAt: "desc",
        },
        include: {
            user: true,
            _count: {
                select: {
                    like: true,
                },
            },
        },
        where:where,
    });

    // 次のページに投稿があるか確認するため、1件だけ取得する
    // 1件以上あれば「次へ」を表示する
    const nextPosts = await prisma.post.findMany({
        skip: skip + limit,
        take: 1,
        orderBy: {
            createdAt: "desc",
        },
        select: {
            id: true,
        },
        where:where,
    });

    const hasNextPage = nextPosts.length > 0;
    //keywordparamがない状態で遷移するとundefinedになるためない場合はURLにkeywordを加えない
    const backPageUrl = keywordParam
    ? `/posts?keyword=${keywordParam}&page=${page - 1}`
    : `/posts?page=${page - 1}`;
    //backPageUrlと同じ
    const nextPageUrl = keywordParam
    ? `/posts?keyword=${keywordParam}&page=${page + 1}`
    : `/posts?page=${page + 1}`;

    
    return (
        <main>
            <p>検索欄</p>
            <form method="GET" action="/posts">
                <input name="keyword" />
                <button type="submit">検索する</button>
            </form>
            <p>投稿一覧</p>
            {posts.length === 0 ? (
                keywordParam?(
                    <p>検索しても見つかりません</p>
                ):(
                    <p>投稿がありません</p>
                )
            ) : (
                posts.map((post) => (
                    <div key={post.id}>
                        <Link href={`/profile/${post.user.id}`}>
                            {post.user.name}
                        </Link>
                        <p>{post.content}</p>
                        <p>{post.createdAt.toLocaleDateString()}</p>

                        <DeletePostButton postId={post.id} />
                        <PatchPostButton postId={post.id} />
                        <LikePostButton postId={post.id} />

                        <p>いいねの数: {post._count.like}</p>

                        <CommentPostButton postId={post.id} />
                        <CommentViews postId={post.id} />
                        <FollowButton userId={post.user.id}/>
                        <FollowDeleteButton userId={post.user.id}/>
                    </div>
                ))
            )}

            <nav>
                {page > 1 ? (
                    <Link href={backPageUrl}>
                        前へ
                    </Link>
                ) : (
                    <span>前へ</span>
                )}

                <span> {page} ページ目 </span>

                {hasNextPage ? (
                    <Link href={nextPageUrl}>
                        次へ
                    </Link>
                ) : (
                    <span>次へ</span>
                )}
            </nav>
        </main>
    );
}