import React from "react";
import { get, post } from "../../utilities";
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from "@material-ui/core/styles";
import { blue } from '@material-ui/core/colors';
import Container from "@material-ui/core/Container";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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
  formControl: {
    margin: theme.spacing(1),
    width: '100%',
  },
  item: {
    margin: theme.spacing(0),
  }
});

const validTypes = ["Blizzard","Hurricane","Ice Storm","Winter Storm"];

class GetDisasterData extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      area: '',
      areaError: false,
      loading: true,
      disaster: 'All',
      eventTypes: [],
    };
  }

  async loadEventTypeData() {
    await get("https://api.weather.gov/alerts/types").then((res) => {
      let dataList = [];
      for(let ev of res.eventTypes) {
        for(let type of validTypes) {
          if(ev.includes(type)) {
            dataList.push(ev);
            break;
          }
        }
      }
      console.log(dataList);
      this.setState({
        eventTypes: dataList,
        loading: false,
      });
    }).catch((err) => {
      console.log(err);
      this.setState({
        loading: false,
      });
    });

  }

  async loadAreaData(e,area,disaster="All") {  
    e.preventDefault();
    this.setState({
      loading: true,
      areaError: false,
    });

    if(disaster == "All") {
      disaster="";
    }
    
    const allData = [];
    for (let dis of this.state.eventTypes) {
      if(dis.includes(disaster)) {
        await get("https://api.weather.gov/alerts", {"area":area, "event":dis}).then((res) => {
          const dataList = res.features.map((v,_) => v.properties);
          for(let elem of dataList) {
            allData.push(elem);
          }
          console.log(dis+" done");
        }).catch((err) => {
          console.log(err);
          this.setState({
            areaError: true,
          });
        });
      }      
    }

    console.log(allData);
    this.setState({
      data: allData,
      loading: false,
    });
  }

  componentDidMount() {
    this.loadEventTypeData();
  }

  render() {
    const { classes } = this.props;
    const data = this.state.data;

    if (data != null) {
      for(let i=0; i < data.length; i++) {
        if(data[i].event == "Test") {
          data.splice(i,1);
          i--;
        }
      }
    }

    return (
      <div>
        <Container maxWidth="md">
          <Container className={classes.paper} maxWidth="xs">
            <form noValidate onSubmit={e => this.loadAreaData(e,this.state.area,this.state.disaster)} className={classes.form}>
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
              <FormControl className={classes.formControl}>
                <InputLabel>Disaster Type</InputLabel>
                <Select 
                  id="disaster-type-select"
                  value={this.state.disaster}
                  onChange={(e)=>this.setState({disaster: e.target.value})}
                >
                  <MenuItem value="All">All</MenuItem>
                  {validTypes.map((v,i) => <MenuItem value={v}>{v}</MenuItem>)}
                </Select>
              </FormControl>
              <div className={classes.wrapper}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  disabled={this.state.loading}
                >
                  Submit
                </Button>
                {this.state.loading && <CircularProgress size={24} className={classes.buttonProgress} />}
              </div>
            </form>
          </Container>
      {this.state.loading
      ? <div align="center">
          <CircularProgress className={classes.buttonProgress}/>
        </div>
      : <div>
        {data != null && data.length > 0
        ? data.map((v,i)=>{
          return <div key={i}>
            <h3 className={classes.item}>{v.event + " (" + v.severity + ")"}</h3>
            <h5 className={classes.item}>Affected Locations: {v.areaDesc.replaceAll(";",",")}</h5>
            <p>{v.instruction}</p>
          </div>
        })
        : <p>No data found.</p> 
        }
      </div>}
      </Container>
      </div>
    );
  }
}

export default withStyles(styles)(GetDisasterData);