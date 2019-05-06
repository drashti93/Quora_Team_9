import React, { Component } from "react";
import { Comment, Avatar, Form, Button, List, Input } from 'antd';
import moment from 'moment';
import {ReactQuill, toolbarOptions} from 'react-quill'; 

const TextArea = Input.TextArea;

const Editor = ({ onChange, onSubmit, submitting, value }) => (
	<div>
		<Form.Item>
			<TextArea rows={4} onChange={onChange} value={value} />
		</Form.Item>
		<Form.Item>
			<Button
				htmlType="submit"
				loading={submitting}
				onClick={onSubmit}
				type="primary"
			>
				Answer
			</Button>
		</Form.Item>
	</div>
);

const CommentList = ({ comments }) => (
	<List
		dataSource={comments}
		header={`${comments.length} ${
			comments.length > 1 ? "replies" : "reply"
		}`}
		itemLayout="horizontal"
		renderItem={props => <Comment {...props} />}
	/>
);

export class Comments extends Component {
	state = {
		comments: [],
		submitting: false,
		value: ""
	};

	handleSubmit = () => {
		if (!this.state.value) {
			return;
		}

		this.setState({
			submitting: true
		});

		setTimeout(() => {
			this.setState({
				submitting: false,
				value: "",
				comments: [
					{
						author: "Han Solo",
						avatar:
							"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
						content: <p>{this.state.value}</p>,
						datetime: moment().fromNow()
					},
					...this.state.comments
				]
			});
		}, 1000);
	};

	
    
    handleChange(content, delta, source, editor) {
        const text = editor.getText(content);
        this.setState({ bodyText: content ,
        plainText:text})
      }

	render() {
		const { comments, submitting, value } = this.state;

		return (
			<div>
				{comments.length > 0 && (
					<CommentList comments={comments} />
				)}
				<ReactQuill 
                modules={{toolbar:toolbarOptions}}
                  onChange={this.handleChange} />
					}
					content={
						<Editor
							onChange={this.handleChange}
							onSubmit={this.handleSubmit}
							submitting={submitting}
							value={value}
						/>
					}
				/>
			</div>
		);
	}
}

export default Comments;
