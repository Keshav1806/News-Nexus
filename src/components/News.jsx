import React from 'react'
import Newsitem from './Newsitem'
import InfiniteScroll from "react-infinite-scroll-component";
import { ColorRing } from 'react-loader-spinner'

const News = ({ news, dark, fetchmorenews, total, category, country, page }) => {

    const newsList = news || [];
    return (
        <>
            <InfiniteScroll
                dataLength={newsList.length}
                next={() => fetchmorenews(category, country, page)}
                hasMore={newsList.length < total}
                loader={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <ColorRing
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="color-ring-loading"
                        colors={!dark? ['#FF0000',  '#99004C','#000000']: ['#FF0000',  '#99004C','#FFFFFF']}
                    />
                </div>}
            >
                <div className="newscont">
                    <div className="news">
                        {news.map((article, index) => (
                            <Newsitem title={article.title} image={article.urlToImage} desc={article.description} source={article.url} author={article.author} published={article.publishedAt} dark={dark} />
                        ))}

                    </div>
                </div>
            </InfiniteScroll>
        </>
    )
}

export default News
