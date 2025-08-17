
document.addEventListener('DOMContentLoaded', async function () {

    const metadataUrl = 'https://raw.githubusercontent.com/Hamza-248/Saahib/main/assets/data/blogs_metadata.JSON';
    const contentBaseUrl = 'https://raw.githubusercontent.com/Hamza-248/Saahib/25d98cff2b5f4463834f5f74b3214b49bdef5007/';

    const heroContainer = document.getElementById('article-hero-container');
    const bodyContainer = document.getElementById('article-body-container');
    const sidebarContainer = document.getElementById('sidebar-container');
    const relatedPostsContainer = document.getElementById('related-posts-container');

    const getSlugFromURL = () => new URLSearchParams(window.location.search).get('slug');

    const addMetaTags = (post) => {
        document.title = `${post.title} | Saahib`;
        const description = post.description || post.title;

        document.querySelector('head').insertAdjacentHTML('beforeend', `
                    <meta name="description" content="${description}">
                    <meta name="keywords" content="${post.category}, Saahib, Blog">
                    <meta property="og:type" content="article">
                    <meta property="og:url" content="${window.location.href}">
                    <meta property="og:title" content="${post.title}">
                    <meta property="og:description" content="${description}">
                    <meta property="og:image" content="${post.heroImage}">
                    <meta property="twitter:card" content="summary_large_image">
                    <meta property="twitter:url" content="${window.location.href}">
                    <meta property="twitter:title" content="${post.title}">
                    <meta property="twitter:description" content="${description}">
                    <meta property="twitter:image" content="${post.heroImage}">
                `);
    };

    const renderHero = (post) => {
        heroContainer.innerHTML = `
                    <div class="article-hero" style="background-image: url('${post.heroImage}');">
                        <div class="container hero-content">
                            <span class="article-category">${post.category}</span>
                            <h1 class="article-title">${post.title}</h1>
                            <p class="article-meta-info">By ${post.author} &bull; ${post.date}</p>
                        </div>
                    </div>
                `;
    };

    const getCustomRenderer = () => {
        const renderer = new marked.Renderer();
        renderer.blockquote = (quote) => {
            const noteRegex = /<p><strong>Note<\/strong>([\s\S]*)<\/p>/;
            const warningRegex = /<p><strong>Warning<\/strong>([\s\S]*)<\/p>/;
            const tipRegex = /<p><strong>Tip<\/strong>([\s\S]*)<\/p>/;
            if (noteRegex.test(quote)) return `<blockquote class="alert alert-note">${quote.replace(noteRegex, '$1')}</blockquote>`;
            if (warningRegex.test(quote)) return `<blockquote class="alert alert-warning">${quote.replace(warningRegex, '$1')}</blockquote>`;
            if (tipRegex.test(quote)) return `<blockquote class="alert alert-tip">${quote.replace(tipRegex, '$1')}</blockquote>`;
            return `<blockquote>${quote}</blockquote>`;
        };
        renderer.listitem = (text) => {
            if (/\[[x ]\]/.test(text)) return `<li class="task-list-item">${text}</li>`;
            return `<li>${text}</li>`;
        };
        renderer.image = (href, title, text) => {
            return `<figure><img src="${href}" alt="${text}" title="${title || ''}">${text ? `<figcaption>${text}</figcaption>` : ''}</figure>`;
        };
        return renderer;
    };

    const renderSidebar = (post) => {
        const encodedUrl = encodeURIComponent(window.location.href);
        const encodedTitle = encodeURIComponent(post.title);

        sidebarContainer.innerHTML = `
                    <div class="sidebar-widget author-bio">
                        <img src="${post.authorImage}" alt="${post.author}" class="author-img">
                        <h5 class="widget-title">${post.author}</h5>
                        <p class="text-white-50 small">${post.authorBio || 'Author of this article.'}</p>
                    </div>
                    <div class="sidebar-widget share-card">
                        <h5 class="widget-title">Enjoy this article?</h5>
                        <p>Share it with your friends and colleagues!</p>
                        <div class="social-share">
                            <a href="https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}" target="_blank" title="Share on Twitter"><i data-feather="twitter"></i></a>
                            <a href="https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}" target="_blank" title="Share on LinkedIn"><i data-feather="linkedin"></i></a>
                            <a href="#" id="copy-link-btn" title="Copy Link"><i data-feather="link"></i></a>
                        </div>
                    </div>
                `;

        document.getElementById('copy-link-btn').addEventListener('click', e => {
            e.preventDefault();
            navigator.clipboard.writeText(window.location.href).then(() => {
                const iconContainer = e.target.closest('a');
                iconContainer.innerHTML = '<i data-feather="check"></i>';
                feather.replace();
                setTimeout(() => {
                    iconContainer.innerHTML = '<i data-feather="link"></i>';
                    feather.replace();
                }, 2000);
            });
        });
    };

    const renderBody = async (post) => {
        const correctedPath = post.path_to_content.replace('/blog/', '/blogs/');
        const contentUrl = contentBaseUrl + correctedPath;
        const markdownResponse = await fetch(contentUrl);
        if (!markdownResponse.ok) throw new Error(`Could not load article content.`);
        const markdown = await markdownResponse.text();

        marked.setOptions({ renderer: getCustomRenderer() });
        bodyContainer.innerHTML = marked.parse(markdown);
        hljs.highlightAll();
    };

    const renderRelatedPosts = (currentPost, allPosts) => {
        const related = allPosts.filter(p => p.category === currentPost.category && p.slug !== currentPost.slug).slice(0, 3);

        if (related.length > 0) {
            relatedPostsContainer.innerHTML = `
                        <div class="related-posts-section">
                            <h2 class="text-center mb-5">Related Posts</h2>
                            <div class="row g-4">
                                ${related.map(post => `
                                    <div class="col-md-4">
                                        <a href="post.html?slug=${post.slug}" class="text-decoration-none">
                                            <div class="related-post-card">
                                                <img src="${post.heroImage}" class="card-img-top" alt="${post.title}">
                                                <div class="card-body">
                                                    <h5 class="card-title">${post.title}</h5>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    `;
        }
    };

    const main = async () => {
        try {
            const slug = getSlugFromURL();
            if (!slug) throw new Error("No blog specified in URL.");

            const metadataResponse = await fetch(metadataUrl);
            if (!metadataResponse.ok) throw new Error("Could not fetch blog metadata.");
            const allPosts = await metadataResponse.json();

            const post = allPosts.find(p => p.slug === slug);
            if (!post) throw new Error("Blog post not found.");

            addMetaTags(post);
            renderHero(post);
            renderSidebar(post);
            await renderBody(post);
            renderRelatedPosts(post, allPosts);

        } catch (error) {
            console.error('Error loading blog post:', error);
            heroContainer.innerHTML = '';
            sidebarContainer.innerHTML = '';
            document.title = "Error";
            bodyContainer.innerHTML = `<p class="text-danger h3 text-center">${error.message}</p>`;
        } finally {
            feather.replace();
        }
    };

    main();
});
