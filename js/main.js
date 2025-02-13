async function loadPost (){
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');
    const data = await res.json()
    displayPosts(data.posts)
}

const displayPosts = posts => {
    const postContainer = document.getElementById('post-container')
    posts.filter(post => {
        console.log(post)
        let active = ''
        if(post.isActive){
            active = '#10B981'
        }
        else{
            active = '#FF3434'
        }
        const card = document.createElement('div');
        card.classList = `p-6 bg-[#797DFC1A] rounded-xl flex gap-6 mt-5`
        card.innerHTML = `
            <div class="relative">
                            <img class="w-[70px] rounded-full" src="${post.image}" alt="">
                            <div class="w-[10px] h-[10px] bg-[${active}] rounded-full absolute top-0 right-0"></div>
                        </div>
                        <div class="flex-grow">
                            <div class="space-y-5 border-b-2 border-dotted w-full">
                                <div class="flex gap-3">
                                    <p># <span>${post.category}</span></p>
                                    <p>Author: <span>${post.author.name}</span></p>
                                </div>
                                <h2 class="text-[20px] font-bold">${post.description}</h2>
                                <p class="text-[#12132D99]">
                                    It’s one thing to subject yourself to ha Halloween  <br>
                                    costume mishap because, hey that’s your prerogative
                                </p>
                            </div>
                            <div class="grid grid-cols-3 justify-between">
                                <div class="flex col-span-2 items-center justify-between">
                                    <div class="flex gap-3 text-[#12132D99]">
                                        <img src="./images/message.png" alt="">
                                        <span>${post.comment_count}</span>
                                    </div>
                                    <div class="flex gap-3 text-[#12132D99]">
                                        <img src="./images/eye.png" alt="">
                                        <span>${post.view_count}</span>
                                    </div>
                                    <div class="flex gap-3 text-[#12132D99]">
                                        <img src="./images/timer.png" alt="">
                                        <span>${post.posted_time}</span>
                                    </div>
                                </div>
                                <div class="flex col-span-1 justify-end items-end">
                                    <button onclick="markRead('${post.description}', '${post.view_count}')" class="btn"><img src="./images/color-message.png" alt=""></button>
                                </div>
                            </div>
                        </div>
        `
        postContainer.appendChild(card)
    })
    // console.log(posts)
}


const markRead = (title, view)=>{
    
}

loadPost()