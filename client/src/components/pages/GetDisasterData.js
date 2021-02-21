import React from "react";
import { get, post } from "../../utilities";

class GetDisasterData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }

  async loadData(area) {
    await get("https://api.weather.gov/alerts/active/area/"+area).then((res) => {
      let dataList = res.features.map((v,_) => v.properties);
      this.setState({
        data: dataList,
      });
      console.log(dataList);
    });
  }

  componentDidMount() {
    this.loadData('NC');
  }

  render() {
    const data = this.state.data;
    return (
      data == null ? "Loading" 
      : <p>
        {data.map((v,i)=>{
          return <div key={i}>
            <h3>{v.headline}</h3>
            <p>{v.description}</p>
          </div>
        })}
      </p>
    );
  }
}

export default GetDisasterData;