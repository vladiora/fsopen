const dummy = (blogs) => {

    return 1
}

const totalLikes = (blogs) => {

    return blogs.reduce(
        (accumulator, currentValue) => accumulator + currentValue.likes,
        0,
    )
}

const favoriteBlog = (blogs) => {

    if (blogs.length === 0)
        return {}

    let res = blogs[0];

    for (let i = 1; i < blogs.length; i++)
        if (blogs[i].likes > res.likes)
            res = blogs[i]

    return {title: res.title, author: res.author, likes: res.likes}
}

const mostBlogs = (blogs) => {

    if (blogs.length === 0)
        return {}

    const authors = [] // key => authors name, value => blogs
    for (let i = 0; i < blogs.length; i++) {

        if (authors[blogs[i].author])
            authors[blogs[i].author] += 1
        else
            authors[blogs[i].author] = 1
    }


    let res = null;
    for (const name in authors) {

        if (res === null || authors[name] > res?.blogs)
            res = {author: name, blogs: authors[name]}
    }

    return res
}

const mostLikes = (blogs) => {

    if (blogs.length === 0)
        return {}

    const authors = [] // key => authors name, value => likes
    for (let i = 0; i < blogs.length; i++) {

        if (authors[blogs[i].author])
            authors[blogs[i].author] += blogs[i].likes
        else
            authors[blogs[i].author] = blogs[i].likes
    }


    let res = null;
    for (const name in authors) {

        if (res === null || authors[name] > res?.likes)
            res = {author: name, likes: authors[name]}
    }

    return res
}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}