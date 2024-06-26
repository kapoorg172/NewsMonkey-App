import React from 'react'

const NewsItem = (props) => {
    let { title, description, imageURL, newsUrl, author, date, source } = props
    // destructuring is done above
    return (
        <div className='my-3'>
            <div className="card">
                <img src={imageURL ? imageURL : "https://cdn.vectorstock.com/i/1000x1000/31/20/image-error-icon-editable-outline-vector-30393120.webp"} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}...<span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{ left: '70%', zIndex: '1' }}>
                        {source}
                    </span></h5>
                    <p className="card-text">{description}...</p>
                    <p className="card-text"><small className="text-body-secondary">By {author ? author : "Unknown"} on {new Date(date).toGMTString()}</small></p>
                    <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
                </div>
            </div>
        </div >
    )
}

export default NewsItem


// for function based component remove extends and class make it a function then remove the render method
// change this.props to only props
// remove {component} also