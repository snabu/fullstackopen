const dummy = (blogs) => {
   return 1
}



const reducer = (acc,obj) => {
    return acc + obj.likes
}

const totalLikes = (blogs) => {
    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length == 0) return null
    let {__v, _id, url, ...strippedResult} =  blogs.reduce((prev, current) =>{
        return (prev.likes > current.likes) ?  prev : current
    })
    return strippedResult
}

const mostBlogs = (blogs) => {
    if (blogs.length == 0)
        return({})
    let count = 0
    let most = 0
    let index = -1
    for (let i = 0; i < blogs.length; i++) {
        for (let j = i; j < blogs.length; j++) {
            if (blogs[i].author == blogs[j].author)
                count++
            if (count > most) {
                most = count
                index = i
            }
        }
        count = 0
    }

    return {author : blogs[index].author, blogs : most}
}

const mostLikes = (blogs) => {
    if (blogs.length == 0)
        return({})
    let count = 0
    let most = 0
    let index = -1
    for (let i = 0; i < blogs.length; i++) {
        for (let j = i; j < blogs.length; j++) {
            if (blogs[i].author == blogs[j].author)
                count += blogs[j].likes
            if (count > most) {
                most = count
                index = i
            }
        }
        count = 0
    }

    return {author : blogs[index].author, likes : most}
}


module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}