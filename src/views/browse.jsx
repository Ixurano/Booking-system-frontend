import React, { useState, useEffect } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import { makeStyles } from '@mui/styles';
import { Paper } from '@mui/material';
import Button from '@mui/material/Button';

import MobileDatePicker from '@mui/lab/MobileDatePicker';
import TextField from '@mui/material/TextField';
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';


const Browse = ({ tokens }) => {
  const classes = useStyles();
  const [cabinOption, setCabinOption] = useState('');
  const [serviceOption, setServiceOption] = useState('');
  const [orderOption, setOrderOption] = useState('');
  const [dateV, setDateV] = useState(new Date());
  const [cabins, setCabins] = useState([]);
  const [services, setServices] = useState([]);
  const [orders, setOrders] = useState([]);


  const handleChange = (event) => {
    setDateV(event._d);
  };

  useEffect(() => {
    loadPage();
    loadService();
    loadOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokens]);

  useEffect(() => {
    console.log(orderOption)
  }, [orderOption]);

  const loadPage = () => {
    if (tokens.token) {
      fetch("https://sleepy-depths-95784.herokuapp.com/cabins", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': tokens.token
        },
      })
        .then(
          response => {
            if (response.ok) {
              response.json().then(json => {
                setCabins(json);
                return json;
              });
            } else {
            }
          },
          (error) => {
            console.log(error.message)
          }
        )
    }
  }

  const loadService = () => {
    fetch("https://sleepy-depths-95784.herokuapp.com/services", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(
        response => {
          response.json().then(json => {
            setServices(json);
            return json;
          })
        }
      )
  }
  const loadOrders = () => {
    fetch("https://sleepy-depths-95784.herokuapp.com/orders", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(
        response => {
          response.json().then(json => {
            setOrders(json);
            return json;
          })
        }
      )
  }

  /* <TODO> If-sats for submit/delte and edit order that something needs to be selected otherwise throw error </TODO> */
  const submitOrders = () => {
    if (cabinOption && serviceOption && dateV) {
      const data = {
        "cabin_id": cabinOption,
        "service_id": serviceOption,
        "date": new Date(dateV)
      }
      fetch("https://sleepy-depths-95784.herokuapp.com/orders", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)

      })
        .then(
          response => {
            response.json().then(json => {
              loadOrders()
              return json;
            })
          }
        )
    } else { alert('You must choose an cabin, service and a date to procceed') }
  }

  const updateOrderById = () => {
    if (cabinOption && serviceOption && dateV) {
      const data = {
        "id": orderOption,
        "cabin_id": cabinOption,
        "service_id": serviceOption,
        "date": new Date(dateV)
      }
      fetch("https://sleepy-depths-95784.herokuapp.com/orders", {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      }).then(
        response => {
          response.json().then(json => {
            loadOrders()
            console.log(data)
            return json;
          })
        }
      )
    } else { alert('You must at least choose one cabin or aservice or a date to procceed') }
  }

  const deleteOrderById = () => {
    if (orderOption){
      const data = {
        "id": orderOption
      }
      fetch("https://sleepy-depths-95784.herokuapp.com/orders", {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(
          loadOrders(),
          console.log(orders)
        )
    } else { alert('You must choose a Order to delete') }
  }
  const findServicesNameById = (id, obj) => {
    const service = obj.find(el => el.id === id);
    return service ? service.service : "Service not loaded";
  }
  const findCabinsNameById = (id, obj) => {
    const adress = obj.find(el => el._id === id);
    return adress ? adress.adress : "Adress not loaded";
  }

  return (
    <div >
      <div className={classes.mainTitle}>Cabin Maintenance Services</div>
      <div className={classes.title}>Browse Services</div>

      <div className={classes.container}>
        <div>
          <Paper elevation={3} className={classes.paper}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Choose on of your cabins</FormLabel>
              <RadioGroup
                aria-label="cabin"
                name="controlled-radio-buttons-group"
                value={cabinOption}
                onChange={(event) => setCabinOption(event.target.value)}
              >
                {cabins ?
                  cabins.map((x, index) => (
                    <FormControlLabel key={index} value={x._id} control={<Radio />} label={x.adress + ", " + x.size + ", "} />
                  ))
                  :
                  "No cabin data "
                }
              </RadioGroup>
            </FormControl>
          </Paper>

          <Paper elevation={3} className={classes.paper}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Choose Service</FormLabel>
              <RadioGroup
                aria-label="cabin"
                name="controlled-radio-buttons-group"
                value={serviceOption}
                onChange={(event) => setServiceOption(event.target.value)}
              >
                {services ?
                  services.map((x, index) => (
                    <FormControlLabel key={index} value={x.id} control={<Radio />} label={x.service} />
                  ))
                  :
                  "No services found"
                }
              </RadioGroup>
            </FormControl>
          </Paper>

          <Paper elevation={3} className={classes.paper}>
            <LocalizationProvider dateAdapter={DateAdapter} >
              <MobileDatePicker
                label="Select Date"
                inputFormat="DD.MM.YYYY"
                value={dateV}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>

            <div className={classes.submit} >
              <Button onClick={() => submitOrders()} variant="contained" >Submit</Button>
            </div>
          </Paper>
        </div>

        <Paper elevation={3} className={classes.paper}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Ordered Services</FormLabel>
            <RadioGroup
              aria-label="cabin"
              name="controlled-radio-buttons-group"
              value={orderOption}
              onChange={(event) => setOrderOption(event.target.value)}
            >
              {orders && cabins && services ?
                orders.map((x, index) => (
                  <FormControlLabel key={index} value={x.id} control={<Radio />} label={findCabinsNameById(x.cabin_id, cabins) + "," + findServicesNameById(x.service_id, services) + "," + new Date(x.date).toLocaleDateString('en-GB')} />
                ))
                :
                "No Orders found"
              }
            </RadioGroup>
          </FormControl>

          <div className={classes.buttonRow}>
            <div>
              <Button onClick={() => updateOrderById()} variant="contained" >Modify</Button>
            </div>
            <div>
              <Button onClick={() => deleteOrderById()} variant="contained">Delete</Button>
            </div>
          </div>

        </Paper>
      </div>
    </div>
  )
}
export default Browse;


const useStyles = makeStyles({
  root: {
    padding: '0',
    margin: '0 auto',
    top: 0,
  },
  mainTitle: {
    color: 'white',
    fontSize: '2rem',
    marginTop: '3rem',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '2rem'
  },
  paper: {
    marginTop: '2rem',
    width: '20rem',
    display: 'flex',
    flexDirection: 'column',
    padding: '2rem',
  },
  textField: {
    padding: '1rem',
  },
  submit: {
    paddingTop: '3rem',
  },
  container: {
    margin: '0 auto',
    width: '54rem',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  buttonRow: {
    marginTop: '4rem',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});