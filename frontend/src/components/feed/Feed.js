import React, { Component } from "react";
import { List, Avatar, Icon, Divider } from 'antd';
import { connect } from 'react-redux';
import { Redirect } from 'react-router'

export class Feed extends Component {
	
	render() {

		const listData = [];
		for (let i = 0; i < 23; i++) {
			listData.push({
				href: "http://ant.design",
				title: `ant design part ${i}`,
				avatar:
					"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
				description:
					"Ant Design, a design language for background applications, is refined by Ant UED Team.",
				content:
					"We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently."
			});
		}

		const IconText = ({ type, text }) => (
			<span>
				<Icon type={type} style={{ marginRight: 8 }} />
				{text}
			</span>
		);

		return (
			<div>
				<List
					itemLayout="vertical"
					size="large"
					pagination={{
						onChange: page => {
							console.log(page);
						},
						pageSize: 3
					}}
					dataSource={listData}
					renderItem={item => (
						<div>
							<List.Item
								key={item.title}
								actions={[
									<IconText
										type="star-o"
										text="156"
									/>,
									<IconText
										type="like-o"
										text="156"
									/>,
									<IconText type="message" text="2" />
								]}
								// extra={<img width={272} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
							>
								<List.Item.Meta
									// avatar={<Avatar src={item.avatar} />}
									title={
										<a href={item.href}>
											{item.title}
										</a>
									}
									description={
										<div>
											<Avatar src={item.avatar} />
											&nbsp; &nbsp;
											{item.description}
										</div>
									}
								/>
								{item.content}
							</List.Item>
							<div>This is my comment</div>

							<Divider />
						</div>
					)}
				/>
				,
			</div>
		);
	}
}

const mapStateToProps = state => ({
	
});

Feed.propTypes = {
	
};

export default connect(mapStateToProps, {  })(Feed);