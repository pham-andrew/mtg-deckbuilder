import React from 'react';

class App extends React.Component{

  constructor(){
    super()
    this.state={
      d:[]
    }
    this.componentDidMount=this.componentDidMount.bind(this)
  }


  async componentDidMount(){
    await fetch('https://api.magicthegathering.io/v1/cards')
    .then(res=>res.json())
    .then((data)=>{
      this.setState({d: data})
    })
    //.then(a => console.log(a));
    console.log(this.state.d.cards[0].name)
  }
  
  render(){
    if(this.state.d.cards)
      return(
        <div>
          {
            this.state.d.cards.map((card) => (
            <div>
              {card.name}
            </div>
          ))}
        </div>
      )
    else
      return(<div>Loading...</div>)
  }
}

export default App;