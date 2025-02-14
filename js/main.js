async function loadPost (){
    loadSpinner(true)
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');
    const data = await res.json()
    displayPosts(data.posts)
}

const displayPosts = posts => {
    
    posts.filter(post => {
        setTimeout(()=>{
            displayPostByFunction(post)
            loadSpinner(false)
        }, 2000)
    })
    // console.log(posts)
}

function displayPostByFunction(post){
    const postContainer = document.getElementById('post-container')
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
                                    <p>Author: <span>${post.author?.name}</span></p>
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
}

const markRead = (title, view)=>{
    const readCount = document.getElementById('read-count')
    const readText = readCount.innerText;
    readCount.innerText = parseInt(readText) + 1
    const readContainer = document.getElementById('read-container')
    const addRead = document.createElement('div')
    addRead.classList = `grid grid-cols-3 my-5 p-3 bg-white rounded-lg`
    addRead.innerHTML = `
    <h3 class="col-span-2 font-semibold text-[16px]">${title}</h3>
                        <div class="flex items-center justify-end text-[#12132D99]">
                            <img src="./images/eye.png" alt="">
                            <span>${view}</span>
    `
    readContainer.appendChild(addRead)

}

const loadLatestPost = async ()=>{
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts')
    const data = await res.json()
    displayLatestPosts(data)
}
const displayLatestPosts = posts =>{
    const latestPostContainer = document.getElementById('latest-post-container')
    posts.filter(post => {
        console.log(post)
        const latestpost = document.createElement('div')
        latestpost.classList = `card bg-base-100 shadow-xl`
        latestpost.innerHTML = `
        <figure class="px-10 pt-10">
                        <img src="${post.cover_image}"
                            alt="Shoes" class="rounded-xl" />
                    </figure>
                    <div class="card-body space-y-5">
                        <p class="text-[#12132D99] flex items-center gap-2 text-sm"><img src="./images/calender.png" alt=""> <span>${post?.author?.posted_date || 'No Publish Date'}</span></p>
                        <h2 class="card-title font-extrabold text-xl">${post.title}</h2>
                        <p class="text-[#12132D99] text-sm">${post.description}</p>
                        <div class="flex gap-3 items-center">
                            <img class="w-11 rounded-full" src="${post.profile_image}" alt="">
                            <div>
                                <h2 class="">${post.author.name}</h2>
                                <p>${post?.author?.designation || 'Unknown'}</p>
                            </div>
                        </div>
                    </div>
        `
        latestPostContainer.appendChild(latestpost)
    })
}

const handleSearch = async ()=>{
    const inputField = document.getElementById('search-field')
    const inputText = inputField.value;
    loadSpinner(true)
    const postContainer = document.getElementById('post-container')
    
    const error = document.createElement('div')
    error.classList = `text-3xl text-center text-red-500 font-bold`
    try{
        const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${inputText}`);
        const data =await res.json()
        const posts = data.posts
        if(posts.length>0){
            displaySearchPosts(posts)
        }
        else{
            postContainer.innerHTML = ''
            postContainer.appendChild(error)
        }
        if(posts.length === 0){
            throw "No Data Found"
        }
        else if(inputText.length <= 0){
            postContainer.innerHTML = ''
            postContainer.appendChild(error)
            throw "Write Something for search"
        }
        else{
            error.classList.add('hidden')
        }
        
    } 
    catch(err){
        console.log('something wrong', err)
        error.innerText = err
        error.classList.remove('hidden')
        
    }
    inputField.value = ''
}

function displaySearchPosts(posts){
    const postContainer = document.getElementById('post-container')
    postContainer.textContent = ''
    posts.filter(post => {
        setTimeout(()=>{
            displayPostByFunction(post)
            loadSpinner(false)
        }, 2000)
    })
}

function loadSpinner(isLoading){
    const spinner = document.getElementById('spinner')
    if(isLoading){
        spinner.style.display = 'flex'
    }
    else{
        spinner.style.display = 'none'
    }
}


loadPost()
loadLatestPost()