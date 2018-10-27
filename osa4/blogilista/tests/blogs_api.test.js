const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }
]


beforeAll(async () => {
    await Blog.remove({})

    const blogs = initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogs.map(blog => blog.save())
    await Promise.all(promiseArray)
})


test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api
        .get('/api/blogs')
    expect(response.body.length).toBe(initialBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
    const response = await api
        .get('/api/blogs')
    const titles = response.body.map(r => r.title)
    expect(titles).toContain(initialBlogs[2].title)
})

test('blog is addedd to db', async () => {
    let testBlog = {
        title: "Blaah blaah blaah",
        author: "Mr Bla bla",
        url: "http://dev.null/blaablaa",
        likes: 25
    }


    let testEntry = new Blog(testBlog)
    await testEntry.save()

    const response = await api
        .get('/api/blogs')
    const titles = response.body.map(r => r.title)
    expect(titles).toContain(testEntry.title)
})

test('likes set to zero if value omitted', async () => {
    let testBlog = {
        title: "Jada jada blaah",
        author: "Mr Bla bla",
        url: "http://dev.null/jadajada"
    }

    const countBefore = await Blog.count({})

    let testEntry = new Blog(testBlog)
    await testEntry.save()

    const response = await api
        .get('/api/blogs')
    expect(response.body[countBefore].likes).toBe(0)
})

test('Bad request (HTTP status code 400) if no title', async () => {
    let testBlog = {
        author: "Mr Bla bla",
        url: "http://dev.null/jadajada"
    }


    let testEntry = new Blog(testBlog)
    let response = await api
        .post('/api/blogs')
        .send(testEntry)
        .expect(400)


})

test('Bad request (HTTP status code 400) if no url', async () => {
    let testBlog = {
        title : "ha ha ha haa",
        author: "Mr Bla bla"
    }


    let testEntry = new Blog(testBlog)
    let response = await api
        .post('/api/blogs')
        .send(testEntry)
        .expect(400)

})


test('a blog can be deleted', async () => {
    let testBlog = {
        title : "ha ha ha haa, delete rules",
        author: "Mr Bla bla",
        url : "http://example.com/hahaha",
        likes : 10
    }

    const addedBlog = await api
        .post('/api/blogs')
        .send(testBlog)

    const blogsAtBeginningOfOperation = await api
        .get('/api/blogs')

    await api
        .delete(`/api/blogs/${addedBlog.body.id}`)
        .expect(204)

    const blogsAfterDelete = await api
        .get('/api/blogs')

    const titles = blogsAfterDelete.body.map(r => r.title)

    expect(titles).not.toContain(testBlog.title)
    expect(blogsAfterDelete.body.length).toBe(blogsAtBeginningOfOperation.body.length - 1)
})


test('a blog can be updated', async () => {
    let testBlog = {
        title : "a blog can be updated",
        author: "Mr Bla bla",
        url : "http://example.com/hahaha",
        likes : 20
    }

    const addedBlog = await api
        .post('/api/blogs')
        .send(testBlog)

    const modifiedBlog =  {
        title : addedBlog.body.title,
        author : addedBlog.body.author,
        url : addedBlog.body.url,
        likes : 30,
        id : addedBlog.body.id
    }
    const result = await api
       .put('/api/blogs/' + addedBlog.body.id)
       .send(modifiedBlog)

    expect(result.body.likes).toBe(30)
    expect(result.body.id).toBe(addedBlog.body.id)
})

afterAll(() => {
    server.close()
})