// Store posts in memory (in a real app, this would be in a database)
let posts = [];
let selectedMedia = null;

// Function to create a new post
function createPost(content, mediaUrl, mediaType) {
    const post = {
        id: Date.now(),
        author: "AL FANGKY",
        content: content,
        mediaUrl: mediaUrl,
        mediaType: mediaType,
        timestamp: new Date().toLocaleString(),
        likes: 0,
        comments: []
    };
    
    posts.unshift(post);
    updateFeed();
    return post;
}

// Function to add comment
function addComment(postId, commentText) {
    const post = posts.find(p => p.id === postId);
    if (post) {
        post.comments.push({
            id: Date.now(),
            author: "AL FANGKY",
            content: commentText,
            timestamp: new Date().toLocaleString()
        });
        updateFeed();
    }
}

// Function to update the feed display
function updateFeed() {
    const feedElement = document.getElementById('main-feed');
    feedElement.innerHTML = '';
    
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.style.cssText = 'background: white; border-radius: 12px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);';
        
        let mediaContent = '';
        if (post.mediaUrl) {
            if (post.mediaType === 'image') {
                mediaContent = `<img src="${post.mediaUrl}" alt="Post image" style="max-width: 100%; border-radius: 8px;">`;
            } else if (post.mediaType === 'video') {
                mediaContent = `
                    <video controls style="max-width: 100%; border-radius: 8px;">
                        <source src="${post.mediaUrl}" type="video/mp4">
                    </video>`;
            }
        }

        // Format comments HTML
        const commentsHTML = post.comments.map(comment => `
            <div class="comment" style="padding: 8px 0; border-bottom: 1px solid #eee;">
                <div style="display: flex; align-items: center; gap: 8px;">
                    <img src="/api/placeholder/24/24" alt="Profile" style="border-radius: 50%;">
                    <strong style="font-size: 0.9em;">${comment.author}</strong>
                    <span style="font-size: 0.8em; color: #666;">${comment.timestamp}</span>
                </div>
                <div style="margin-left: 32px; margin-top: 4px;">
                    ${comment.content}
                </div>
            </div>
        `).join('');
        
        postElement.innerHTML = `
            <div class="post-header" style="display: flex; align-items: center; gap: 10px; padding: 15px;">
                <img src="/api/placeholder/40/40" alt="Profile" style="border-radius: 50%;">
                <div class="post-info">
                    <strong>${post.author}</strong>
                    <div style="font-size: 0.8em; color: #666;">${post.timestamp}</div>
                </div>
            </div>
            
            <div class="post-content" style="padding: 0 15px;">
                <p style="margin-bottom: 15px;">${post.content}</p>
                ${mediaContent}
            </div>
            
            <div class="post-actions" style="padding: 15px; display: flex; align-items: center; gap: 20px; border-top: 1px solid #eee;">
                <button onclick="likePost(${post.id})" style="background: none; border: none; cursor: pointer; display: flex; align-items: center; gap: 5px; color: ${post.likes > 0 ? '#ff4d4d' : '#666'};">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                    <span>${post.likes}</span>
                </button>
                <button onclick="toggleComments(${post.id})" style="background: none; border: none; cursor: pointer; display: flex; align-items: center; gap: 5px; color: #666;">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                    </svg>
                    <span>${post.comments.length}</span>
                </button>
                <button onclick="sharePost(${post.id})" style="background: none; border: none; cursor: pointer; display: flex; align-items: center; gap: 5px; color: #666;">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="18" cy="5" r="3"></circle>
                        <circle cx="6" cy="12" r="3"></circle>
                        <circle cx="18" cy="19" r="3"></circle>
                        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                    </svg>
                </button>
            </div>
            
            <div class="comments-section" id="comments-${post.id}" style="padding: 0 15px 15px; display: none;">
                <div class="comments-list" style="max-height: 300px; overflow-y: auto; margin-bottom: 15px;">
                    ${commentsHTML}
                </div>
                <div class="comment-form" style="display: flex; gap: 10px;">
                    <input type="text" placeholder="Add a comment..." 
                           id="comment-input-${post.id}"
                           style="flex: 1; padding: 8px; border: 1px solid #ddd; border-radius: 20px; outline: none;">
                    <button onclick="submitComment(${post.id})" 
                            style="background: #0095f6; color: white; border: none; padding: 8px 16px; border-radius: 20px; cursor: pointer;">
                        Post
                    </button>
                </div>
            </div>
        `;
        
        feedElement.appendChild(postElement);
    });
    
    // Update post count in profile
    const postCountElements = document.querySelectorAll('.stat-item:first-child strong');
    postCountElements.forEach(element => {
        element.textContent = posts.length;
    });
}

// Toggle comments section
function toggleComments(postId) {
    const commentsSection = document.getElementById(`comments-${postId}`);
    commentsSection.style.display = commentsSection.style.display === 'none' ? 'block' : 'none';
}

// Submit comment
function submitComment(postId) {
    const input = document.getElementById(`comment-input-${postId}`);
    const commentText = input.value.trim();
    
    if (commentText) {
        addComment(postId, commentText);
        input.value = '';
    }
}

// Function to show modal
function showModal() {
    const modal = document.getElementById('image-upload-modal');
    modal.style.display = 'flex';
    
    // Update modal content
    const modalContent = modal.querySelector('.modal-content');
    modalContent.innerHTML = `
        <div style="position: relative; padding: 20px;">
            <span class="close-modal" onclick="closeModal('image-upload-modal')" 
                  style="position: absolute; right: 10px; top: 10px; cursor: pointer; font-size: 20px;">×</span>
            <h2 style="margin-bottom: 20px;">Create New Post</h2>
            
            <div style="margin-bottom: 15px;">
                <textarea id="post-text" placeholder="What's on your mind?" 
                         style="width: 100%; min-height: 100px; padding: 10px; border: 1px solid #ddd; border-radius: 5px;"></textarea>
            </div>
            
            <div id="media-preview" style="margin-bottom: 15px; text-align: center;"></div>
            
            <div style="display: flex; gap: 10px; margin-bottom: 15px;">
                <input type="file" id="file-input" accept="image/*,video/*" style="display: none;">
                <button onclick="document.getElementById('file-input').click()" 
                        style="padding: 8px 15px; border-radius: 20px; border: 1px solid #ddd; background: #f8f8f8;">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: middle;">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        <circle cx="8.5" cy="8.5" r="1.5"></circle>
                        <polyline points="21 15 16 10 5 21"></polyline>
                    </svg>
                    Add Photo/Video
                </button>
                <button onclick="finalizePost()" 
                        style="padding: 8px 20px; border-radius: 20px; border: none; background: #0095f6; color: white;">
                    Post
                </button>
            </div>
        </div>
    `;
    
    // Setup file input listener
    document.getElementById('file-input').addEventListener('change', handleImageUpload);
}

// Handle image upload
function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            selectedMedia = {
                url: e.target.result,
                type: file.type.startsWith('image/') ? 'image' : 'video'
            };
            
            // Show preview
            const previewDiv = document.getElementById('media-preview');
            if (selectedMedia.type === 'image') {
                previewDiv.innerHTML = `
                    <div style="position: relative; display: inline-block;">
                        <img src="${selectedMedia.url}" style="max-width: 100%; max-height: 300px; border-radius: 8px;">
                        <button onclick="removeMedia()" style="position: absolute; top: 10px; right: 10px; background: rgba(0,0,0,0.5); color: white; border: none; border-radius: 50%; width: 30px; height: 30px; cursor: pointer;">×</button>
                    </div>
                `;
            } else {
                previewDiv.innerHTML = `
                    <div style="position: relative; display: inline-block;">
                        <video controls style="max-width: 100%; max-height: 300px; border-radius: 8px;">
                            <source src="${selectedMedia.url}" type="video/mp4">
                        </video>
                        <button onclick="removeMedia()" style="position: absolute; top: 10px; right: 10px; background: rgba(0,0,0,0.5); color: white; border: none; border-radius: 50%; width: 30px; height: 30px; cursor: pointer;">×</button>
                    </div>
                `;
            }
        };
        reader.readAsDataURL(file);
    }
}

// Remove selected media
function removeMedia() {
    selectedMedia = null;
    document.getElementById('media-preview').innerHTML = '';
}

// Finalize and create the post
function finalizePost() {
    const content = document.getElementById('post-text').value;
    
    if (content.trim() || selectedMedia) {
        createPost(
            content,
            selectedMedia ? selectedMedia.url : null,
            selectedMedia ? selectedMedia.type : null
        );
        
        // Reset and close modal
        selectedMedia = null;
        closeModal('image-upload-modal');
    } else {
        alert('Please add some content or media to your post!');
    }
}

// Close modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'none';
    selectedMedia = null;
}

// Setup initial event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Setup post form buttons
    const photoButton = document.querySelector('.post-actions div');
    photoButton.style.cursor = 'pointer';
    photoButton.addEventListener('click', showModal);
    
    const postButton = document.querySelector('.post-actions').lastElementChild;
    postButton.style.cursor = 'pointer';
    postButton.addEventListener('click', showModal);
});

// Like post function
function likePost(postId) {
    const post = posts.find(p => p.id === postId);
    if (post) {
        post.likes++;
        updateFeed();
    }
}

// Share post function
function sharePost(postId) {
    alert('Share feature coming soon!');
}