
const BlogForm = ({ saveBlog }) => {

  const handleBlogAddition = (event) => {
    event.preventDefault();

    const blog = {
      title: event.target.Title.value,
      author: event.target.Author.value,
      url: event.target.URL.value
    }

    saveBlog(blog);

    event.target.Title.value = '';
    event.target.Author.value = '';
    event.target.URL.value = '';
  }

  return (
    <div>
      <h2>Add a new blog</h2>
      <form onSubmit={handleBlogAddition}>
        <div className="row">
          <div className="one-half column">
            <label htmlFor="title">Title</label>
            <input className="u-full-width" id="title" name='Title' type='text'/>
          </div>
          <div className="one-half column">
            <label htmlFor="author">Author</label>
            <input className="u-full-width" id="author" name='Author' type='text'/>
          </div>
        </div>
        <label htmlFor="url">URL</label>
        <input className="u-full-width" id="url" name='URL' type='text'/>
        <br/>
        <button className="button-primary" type='submit'>Add</button>
      </form>
    </div>
  )
}

export default BlogForm
