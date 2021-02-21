import React from "react";
import { get, post } from "../../utilities";
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from "@material-ui/core/styles";
import { blue } from '@material-ui/core/colors';

const styles = theme => ({
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  title: {
      margin: theme.spacing(0, 0, 2),
  },
  buttonProgress: {
    color: blue[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -8,
    marginLeft: -12,
  },
});

class GetDisasterData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      area: '',
      areaError: false,
      loading: true,
    };
  }

  async loadAreaData(e,area) {    
    e.preventDefault();
    this.setState({
      loading: true,
      areaError: false,
    });

    await get("https://api.weather.gov/alerts/active/area/"+area).then((res) => {
      const dataList = res.features.map((v,_) => v.properties);
      this.setState({
        data: dataList,
        loading: false,
      });
      console.log(dataList);
    }).catch((err) => {
      console.log(err);
      this.setState({
        areaError: true,
        data: null,
        loading: false,
      });
    });
  }

  async loadData() {
    await get("https://api.weather.gov/alerts/active").then((res) => {
      let dataList = res.features.map((v,_) => v.properties);
      this.setState({
        data: dataList,
        loading: false,
      });
    });
  }

  componentDidMount() {
    this.loadData();
  }

  render() {
    const { classes } = this.props;
    const data = this.state.data;


    return (
      <div>
        <form noValidate onSubmit={e => this.loadAreaData(e,this.state.area)}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="state"
            label="State Code"
            type="text"
            name="state"
            autoComplete="state"
            error={this.state.areaError}
            value={this.state.area}
            onInput={e=>{this.setState({area:e.target.value})}}
            autoFocus
          />
          <div className={classes.wrapper}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={data==null}
            >
              Submit
            </Button>
            {this.state.loading && <CircularProgress size={24} className={classes.buttonProgress} />}
          </div>
        </form>
      {data == null || this.state.loading
      ? <div align="center">
          <CircularProgress/>
        </div>
      : <div>
        {data.map((v,i)=>{
          return <div key={i}>
            <h3>{v.headline}</h3>
            <p>{v.description}</p>
          </div>
        })}
      </div>}
      </div>
    );
  }
}

export default withStyles(styles)(GetDisasterData);