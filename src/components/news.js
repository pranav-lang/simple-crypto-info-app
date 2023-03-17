import React from 'react'
import { Select,Typography,Row,Col,Avatar,Card } from 'antd'
import moment from 'moment/moment'
import { useGetCryptoNewsQuery } from '../services/cryptoApiNews'
import { useGetCryptosQuery } from '../services/cryptoApi'
import { useState , useEffect } from 'react'

const {Text,Title} =  Typography
const {Option} =  Select

function News({simplified}) {
  const {data} = useGetCryptosQuery(100)
  const [category,setCategory] = useState('Cryptocurrency')
  const {data : cryptoNews}  = useGetCryptoNewsQuery({newsCategory : category,count : simplified ? 6 : 12})
  console.log(cryptoNews)

  if(!cryptoNews?.value) return "Loading.."
  return (
    <Row gutter={[24,24]}>
    {!simplified && (
      <Col span={24} >
        <Select
        showSearch
        placeholder = "Select Crypto"
        className='crypto-select'
        onChange={(value) => setCategory(value)}
        filterOption={(input,option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
        <option value="Cryptocurrency">Cryptocurrency</option>
        {data?.data?.coins?.map((coin,i) => <Option key={i}  value={coin.name}>{coin.name}</Option>)}
      </Select>
      </Col>
    )}
    {

      cryptoNews.value.map((news,i) => (
       <Col xs={24} sm={12} lg={8} key={i} >
        <Card hoverable className='news-card' >
             <a href={news.url} target="_blank" rel="noreferrer">
             <div className="news-image-container">
                <Title className='news-title' level={4}>{news.name}</Title>
                <img style={{
                  borderRadius : '25px',
                  height : '100px',
                  width : '100px'
                }} src={news?.image?.thumbnail?.contentUrl} alt="news" />
             </div>
             <p className="news-description">
                {news.description >  100 ? `${news.description.substring(0,100)}...` : news.description}
             </p>
             <div style={{
              display : 'flex',
              alignItems : 'center',
              justifyContent : 'space-between',

             }} className="provider-container">
               <div>
                <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl} alt="news"></Avatar>
                 <Text>{news.provider[0].name}</Text>
               </div>
                 <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>

             </div>
             </a>
        </Card>
       </Col>
      ))
    }

    </Row>
  )
}

export default News
