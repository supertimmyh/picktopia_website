import React from 'react';
import { CMS_DATA } from '../data/data';

const LatestBlogPosts = () => {
    const { title, posts } = CMS_DATA.blog;

    return (
        <div className="bg-picktopia-blue-dark text-white py-16 md:py-24">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-bold mb-12">{title}</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {posts.map((post, index) => (
                        <div key={index} className="bg-picktopia-blue-mid rounded-2xl overflow-hidden group shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <img src={post.image} alt={post.title} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
                            <div className="p-6">
                                <h3 className="font-bold text-xl">{post.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LatestBlogPosts;