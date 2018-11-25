import React, { Component } from 'react'
import { Form, Icon } from 'semantic-ui-react'
import FileUpload from '../FileUpload';

class FormExampleClearOnSubmit extends Component {
  state = {}

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = () => this.setState({  post: '' })

  render() {
    const { post } = this.state

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group>
          <Form.TextArea placeholder='Post' name='post' value={post} onChange={this.handleChange} />
          <Form.Button content='Submit' />
        </Form.Group>
      </Form>
    )
  }
}

export default FormExampleClearOnSubmit


// import React, { Component } from 'react'
// import { Form,Button, Icon } from 'semantic-ui-react'
// import FileUpload from '../FileUpload';

//   class PostForm extends Component {
//   state = { post: '', submittedPost: '' }

//   onInputChange (event) {
//     console.log(event.target.value);
//   }
//   handleChange = (e, { post, value }) => this.setState({[post]: value })

//   handleSubmit = () => {
//     const { post } = this.state

//     this.setState({ submittedPost: post })
//   }

//   render() {
//     const { post, submittedPost } = this.state

//     return (
//       <div>
//         <Form onSubmit={this.handleSubmit}>
//           <Form.Group>
//             <Form.TextArea placeholder='Type Away...' post='post' value={post} onChange={this.handleChange} />
         
//             <Button.Group>
//             <FileUpload/>
//               <Button content ="Submit">
//                 <Icon name='angle double up' />Post
//               </Button>
//             </Button.Group>
           

//           </Form.Group>
//         </Form>
//         <strong>onChange:</strong>
//         <pre>{JSON.stringify({ post }, null, 2)}</pre>
//         <strong>onSubmit:</strong>
//         <pre>{JSON.stringify({ submittedPost }, null, 2)}</pre>
//       </div>
//     )
//   }
// }
// export default PostForm;