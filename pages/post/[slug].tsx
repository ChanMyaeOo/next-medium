import { GetStaticProps } from "next";
import React from "react";
import Header from "../../components/Header";
import { sanityClient, urlFor } from "../../sanity";
import { Post } from "../../typings";

interface Props {
    post: Post;
}

function Post({ post }: Props) {
    console.log(post);
    return (
        <main>
            <Header />

            <img
                className="w-full h-40 object-cover"
                src={urlFor(post.mainImage).url()!}
                alt=""
            />

            <article>
                <h1>{post.title}</h1>
                <h2>{post.description}</h2>

                <div>
                    <img src={urlFor(post.author.image).url()!} alt="" />
                    <p>
                        Blog post by {post.author.name} - Published at{" "}
                        {new Date(post._createdAt).toLocaleString()}
                    </p>
                </div>
            </article>
        </main>
    );
}

export default Post;

export const getStaticPaths = async () => {
    const query = `
        *[_type == "post"]{
            _id,
            slug {
                current
            }
        }
    `;

    const posts = await sanityClient.fetch(query);

    const paths = posts.map((post: Post) => ({
        params: {
            slug: post.slug.current,
        },
    }));

    return {
        paths,
        fallback: "blocking",
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const query = `
        *[_type == "post" && slug.current == $slug][0]{
            _id,
            _createdAt,
            title,
            author -> {
                name,
                image
            },
            'comments': *[
                _type == "comment" &&
                post._ref == ^._id &&
                approved == true
            ],
            description,
            mainImage,
            slug,
            body
        }
    `;

    const post = await sanityClient.fetch(query, {
        slug: params?.slug,
    });

    if (!post) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            post,
        },
        revalidate: 60,
    };
};
