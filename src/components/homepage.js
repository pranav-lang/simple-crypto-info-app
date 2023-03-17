import { Typography,Row,Col,Statistic } from 'antd'
import millify from 'millify'
import React, { useState } from 'react'
import  {useGetCryptosQuery}  from '../services/cryptoApi'
import { Link } from 'react-router-dom'
import Cryptocurrencies from './cryptocurrencies'
import News from './news'
const { Title } = Typography
function Homepage() {
const {data,isFetching} = useGetCryptosQuery(10)
// const [cryptos,setCryptos] = useState(cryptosList?.data?.coins)
// console.log(data)
const globalStats = data?.data?.stats
if(isFetching) return "loading ..."
  return (
    <div>
      <Title level={2} className="heading" >Global Crypto Stats</Title>
       <Row>
            <Col span={12}><Statistic title="Total Crypto Currencies" value={globalStats.total} /></Col>
            <Col span={12}><Statistic title="Total Excahnges " value={millify(globalStats.totalExchanges)} /></Col>
            <Col span={12}><Statistic title="Total Market Cap" value={millify(globalStats.totalMarketCap)} /></Col>
            <Col span={12}><Statistic title="Total 24th Volume" value={millify(globalStats.total24hVolume)} /></Col>
            <Col span={12}><Statistic title="Total Markets" value={millify(globalStats.totalMarkets)} /></Col>
       </Row>
       <div className="home-heading-container">
        <Title level={2} className="home-title">Top 10 cryptocurreny in the world</Title>
        <Title level={3} className="show-more"><Link to={"/cryptocurrencies"}>Show more</Link></Title>
       </div>
       <Cryptocurrencies simplified={true} />
       <div className="home-heading-container">
        <Title level={2} className="home-title">Latest Crypto News</Title>
        <Title level={3} className="show-more"><Link to={"/news"}>Show more</Link></Title>
       </div>
       <News simplified = {true} />
    </div>
  )
}

export default Homepage
