
import React from 'react';

class GetDetailsComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          q:"",
          from:"",
          sortBy:"",
          apiKey:"",
          articals: []
        };
    }
    apiCallSubmit() {

       let endpoint = "http://localhost:3333/api/news";
       let data = this.state;

       fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "*/*"
          },
          body: JSON.stringify(data)
       }).then(result => {
          result.json().then(rs=> {
            this.setState({articals: rs.result});
          }).catch(error => {
            console.log(error);
          })
       }).catch(error => {
         console.log(error);
       })
    }
    
    render() {
        return (
          <div className="form">
               <table>
               <tbody>
                  <tr>
                     <td>Query[q]</td>
                     <td><input type="text" name="q" value={this.state.q} onChange={(data)=>{this.setState({q: data.target.value})}}></input></td>
                  </tr>
                  <tr>
                     <td>From[Date]</td>
                     <td><input type="date" name="from" value={this.state.from} onChange={(data)=>{this.setState({from: data.target.value})}}></input></td>
                  </tr>
                  <tr>
                     <td>Sort By</td>
                     <td><input type="text" name="sortBy" value={this.state.sortBy} onChange={(data)=>{this.setState({sortBy: data.target.value})}}></input></td>
                  </tr>
                  <tr>
                     <td>API Key</td>
                     <td><input type="text" name="apiKey" value={this.state.apiKey} onChange={(data)=>{this.setState({apiKey: data.target.value})}}></input></td>
                  </tr>
                  <tr>
                     <td></td>
                     <td><button onClick={() => this.apiCallSubmit()}>Submit</button></td>
                  </tr>
                 </tbody> 
               </table>

               <div>
                  <h3>Artical Details</h3>
                  <table>
                    <tbody>
                        { 
                            this.state.articals.map((artical, i) => 
                                <tr key={i}>
                                    <td>{(artical.author===null)?'unknow':artical.author}</td>
                                    <td>{artical.publishedAt}</td>
                                    <td>{artical.source.name}</td>
                                    <td>{artical.description}</td>
                                    <td>{artical.url}</td>
                                </tr>)
                        }
                    </tbody>
                  </table>
               </div>
          </div>
        );
      }
}

export default GetDetailsComponent;
