import { useEffect, useState } from "react";
import styles from "./Home.module.css";
import type {PostType} from "./Detail.tsx"
import { Link } from "react-router";

function Home() {
    const [loading, setLoading] = useState<boolean>(true);
    const [posts, setPosts] = useState<PostType[]>([]);

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/posts`)
            .then(res => res.json())
            .then((json: PostType[]) => {
                setPosts(json);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    if (loading) {
        return <div className={styles.loading}>데이터를 로드 중입니다...</div>
    }
    return <div className={styles.container}>
        <h1 className={styles.title}>커뮤니티 게시판</h1>
        <table className={styles.boardTable}>
            <thead>
                <tr>
                    <th className={styles.idCell}>번호</th>
                    <th className={styles.titleCell}>제목</th>
                    <th>작성자 ID</th>
                </tr>
            </thead>
            <tbody>
            {posts.map((value, index) => (
                <tr key={index} className={styles.tableRow}>
                    <td className={styles.idCell}>{value.id}</td>
                    <td className={styles.titleCell}>
                        <Link to={`/${value.id}`} className={styles.link}>{value.title}</Link>
                    </td>
                    <td style={{textAlign: "center", color: "#666"}}>{value.userId}</td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>;
}

export default Home;
