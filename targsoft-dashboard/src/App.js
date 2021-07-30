import React, { Component } from 'react';
import CreatePage from './pages/create/create.component'
import './App.css';
import 'office-ui-fabric-react/dist/css/fabric.css';

import CardList from './components/card-list/card-list.component'


class App extends Component {
  constructor() {
    super()

    this.state = {
      posts: [],
      isOpen: false
    }
    this.deletePostFromList = this.deletePostFromList.bind(this);
    this.closePanel = this.closePanel.bind(this);
  }
  
  async deletePostFromList(id) {
    if (this.state.posts.some(post => post.id === id)) {
      this.setState({ posts: this.state.posts.filter((post) => post.id !== id) })
    }
    else
      alert('Error Deleting this Post')
  }
  async closePanel() {
    this.state.setState({
      isOpen:
        this.state.isOpen ? false : true
    })
  }


  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(posts => this.setState({ posts: posts }))
  }

  render() {
    const { posts, isOpen } = this.state

    return (
      <div className='ms-Grid' dir='ltr'>
        <div className='ms-Grid-row'>
          <div className='ms-Grid-col ms-sm-1 ms-xl1'>
            <CreatePage openPanel={isOpen} />
          </div>
          <div className='ms-Grid-col ms-sm11 ms-xl11 main-element'>
            <CardList onDelete={this.deletePostFromList} posts={posts} />
          </div>
        </div>
      </div>
    )
  }
}
export default App