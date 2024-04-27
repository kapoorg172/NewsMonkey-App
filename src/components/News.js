import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
// impt is for import prop-types
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const updateNews = async () => {
        props.setProgress(0)
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
        setLoading(true)
        let data = await fetch(url)
        let parsedData = await data.json()
        console.log(parsedData)
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100)
    }

    useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`
        updateNews()
        // eslint-disable-next-line
    }, [])

    // async componentDidMount() {
    //     // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=14b99b6247fa4aff8ce3e16d85f3cad3&page=1&pageSize=${props.pageSize}`
    //     // this.setState({ loading: true })
    //     // let data = await fetch(url)
    //     // let parsedData = await data.json()
    //     // console.log(parsedData)
    //     // this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false })
    //     this.updateNews()
    // }

    const handleNextClick = async () => {
        // console.log("prev")
        // if (this.state.page + 1 > Math.ceil(this.state.totalResults / props.pageSize)) {

        // }
        // else {
        //     let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=14b99b6247fa4aff8ce3e16d85f3cad3&page=${this.state.page + 1}&pageSize=${props.pageSize}`
        //     let data = await fetch(url)
        //     this.setState({ loading: true })
        //     let parsedData = await data.json()
        //     console.log(parsedData)
        //     this.setState({
        //         page: this.state.page + 1,
        //         articles: parsedData.articles,
        //         loading: false
        //     })
        // }
        setPage(page + 1)
        updateNews();
    }
    const handlePrevClick = async () => {
        // console.log("next")
        // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=14b99b6247fa4aff8ce3e16d85f3cad3&page=${this.state.page - 1}&pageSize=${props.pageSize}`
        // this.setState({ loading: true })
        // let data = await fetch(url)
        // let parsedData = await data.json()
        // // console.log(parsedData)
        // this.setState({
        //     page: this.state.page - 1,
        //     articles: parsedData.articles,
        //     loading: false
        // })
        setPage(page - 1)
        updateNews();
    }
    const fetchMoreData = async () => {

        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`
        // this.setState({ loading: true })
        setPage(page + 1)
        // we are updating the prop page to page+1 as it takes a msec before setPage(async fn) is called and invoked
        let data = await fetch(url)
        let parsedData = await data.json()
        console.log(parsedData)
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
        setLoading(false)
    };

    return (
        <>
            <h1 className="text-center" style={{ margin: '35px 0px', marginTop: '90px' }}>MonkeyNews-Top {capitalizeFirstLetter(props.category)} Headlines</h1>
            {loading && <Spinner />}
            {/* we wont use spinner anymore as we will be adding infinite scroll */}
            {/* !this.state.loading->not needed */}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >
                <div className="container">
                    <div className="row">
                        {articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title.slice(0, 45) : " "} description={element.description ? element.description.slice(0, 88) : " "} imageURL={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>
            {/* <div className="container d-flex justify-content-between my-4">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div> */}

        </>
    )
}
News.defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general"
}
News.propTypes = {
    country: PropTypes.string,
    page: PropTypes.number,
    category: PropTypes.string
}

export default News


// key is like a uniue id like a primary key
// componentDidMount() runs after render
// constructor runs-> render runs-> componentDidMount runs