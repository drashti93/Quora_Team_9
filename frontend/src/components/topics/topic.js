import React from "react";
import "antd/dist/antd.css";

import { List, Row } from "antd";
import { Icon,message } from "antd";
import InfiniteScroll from 'react-infinite-scroller';

import { Component } from 'react';

class TopicBar extends Component{

    state = {
    data: [],
    loading: false,
    hasMore: true,
  }
    

    handleInfiniteOnLoad = () => {
        let data = this.state.data;
        this.setState({
          loading: true,
        });
        if (data.length > 14) {
          message.warning('Infinite List loaded all');
          this.setState({
            hasMore: false,
            loading: false,
          });
          return;
        }
        this.fetchData((res) => {
          data = data.concat(res.results);
          this.setState({
            data,
            loading: false,
          });
        });
      }
    render(){
        const data = [
        "Racing car sprays burning fuel into crowd.",
        "Japanese princess to wed commoner.",
        "Australian walks 100km after outback crash.",
        "Man charged over missing wedding girl.",
        "Los Angeles battles huge wildfires.",
        "Racing car sprays burning fuel into crowd.",
        "Japanese princess to wed commoner.",
        "Australian walks 100km after outback crash.",
        "Man charged over missing wedding girl.",
        "Los Angeles battles huge wildfires."
        ];
        return(
            <div className="topic-bar">
    <h3 style={{ marginBottom: 0 }}></h3>
    <h3 style={{ margin: "0px 0" }}></h3>

    

    <List
      size="small"
      header={<div>{<Icon type="copy" />} Feed</div>}
      footer={<div>{<Icon type="book" />} Bookmark</div>}
      split = {false}
      loadMore
    

      
      
      dataSource={data}
      renderItem={item => (
        <InfiniteScroll
        initialLoad={false}
        pageStart={0}
        loadMore={this.handleInfiniteOnLoad}
        hasMore={!this.state.loading && this.state.hasMore}
        useWindow={false}
      >
        <List.Item>
          {<Icon type="read" />} {item}

        </List.Item>
    </InfiniteScroll>

      )}
    />
  </div>
          
        )
    }
    }
    
    export default TopicBar;