import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)

    const capitaliseFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // constructor(props) {
    //     super(props);
    //     // console.log("This is a constructor from News Component");
    //     // this.state = {
    //     //     // articles: this.articles,
    //     //     articles: [],
    //     //     loading: true,
    //     //     page: 1,
    //     //     totalResults: 0
    //     // }
    // }

    const updateNews = async () => {
        // console.log("updateNews");
        props.setProgress(10)
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        
        console.log("updateNews before 1st setState(loading = true) called");
        console.log('articles: ', articles);
        console.log('totalResults: ', totalResults);
        console.log('loading: ', loading);
        
        // this.setState({ loading: true })
        setLoading(true)

        console.log("updateNews after 1st setState(loading = true) called");
        console.log('articles: ', articles);
        console.log('totalResults: ', totalResults);
        console.log('loading: ', loading);

        let data = await fetch(url);
        props.setProgress(30)
        let parseData = await data.json();
        props.setProgress(70)
        // console.log(parseData);
        
        console.log("updateNews before 2nd setState called");
        console.log('articles: ', articles);
        console.log('totalResults: ', totalResults);
        console.log('loading: ', loading);

        setArticles(parseData.articles)
        setTotalResults(parseData.totalResults)
        setLoading(false)

        // this.setState({
        //     articles: parseData.articles,
        //     totalResults: parseData.totalResults,
        //     loading: false
        // })

        console.log("updateNews after 2nd setState called");
        console.log('articles: ', articles);
        console.log('totalResults: ', totalResults);
        console.log('loading: ', loading);

        props.setProgress(100)
    }

    useEffect(() => {
       document.title = `${capitaliseFirstLetter(props.category)} - NewsMonkey App`;
       console.log('useEffect()');
       updateNews();
    }, [])
    

    // async componentDidMount() {
    //     // console.log("componentDidMount");
    //     await this.updateNews();
    // }

    // handlePrevClick = async () => {

    //     this.setState({ page: this.state.page - 1 });
    //     await this.updateNews();
    // }

    // handleNextClick = async () => {

    //     this.setState({ page: this.state.page + 1 });
    //     await this.updateNews();
    // }

    const fetchMoreData = async () => {
        console.log("fetchMoreData()");
        console.log("fetchMoreData before 1st setState(page + 1) called");
        console.log('page: ', page);
        // this.setState({ page: this.state.page + 1 });
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page+1)
        console.log("fetchMoreData after 1st setState(page + 1) called");
        console.log('page: ', page);
        let data = await fetch(url);
        let parseData = await data.json();
        // console.log(parseData);
        console.log("fetchMoreData before 2nd setState called");
        console.log('articles: ', articles);
        console.log('totalResults: ', totalResults);
        console.log('loading: ', loading);
        // this.setState({
        //     articles: this.state.articles.concat(parseData.articles),
        //     totalResults: parseData.totalResults,
        //     loading: false
        // })

        setArticles(articles.concat(parseData.articles))
        setTotalResults(parseData.totalResults)
        setLoading(false)

        console.log("fetchMoreData after 2nd setState called");
        console.log('articles: ', articles);
        console.log('totalResults: ', totalResults);
        console.log('loading: ', loading);
    }

    // render() {
        // console.log("render");
        return (
            <>
                {console.log("return()")}
                <h1 className='text-center' style={{ margin: '30px', marginTop: '90px'}}>NewsMonkey - Top {capitaliseFirstLetter(props.category)} Headlines</h1>
                {loading && <Spinner/>}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Spinner />}
                >
                    <div className="container">
                        <div className="row my-4">
                            {/* {!this.state.loading && this.state.articles.map((element) => { */}
                            {articles.map((element) => {
                                return <div className="col-md-4" key={element.url}>
                                    <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
                {/* <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div> */}
            </>
        );
    // }
}


News.defaultProps = {
    pageSize: 8,
    country: 'in',
    category: 'general'
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

export default News;