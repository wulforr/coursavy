import React, { Component } from 'react'
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';


  import Radio from '@material-ui/core/Radio';
  import RadioGroup from '@material-ui/core/RadioGroup';
  import FormControlLabel from '@material-ui/core/FormControlLabel';
  import FormControl from '@material-ui/core/FormControl';
  import FormLabel from '@material-ui/core/FormLabel';


export default class CustomDialog extends Component {
    render() {
        return (
            <div>
                        <Dialog
              open={this.props.state.isopen}
              onClose={this.props.handleClose}
              maxWidth={"sm"}
              fullWidth={"sm"}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Add User</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Please fill the form details in order to add the user.
                </DialogContentText>
                <div className="form-input">
                <TextField
                  autoFocus
                  label="First Name"
                  value={this.props.state.firstname}
                  onChange={this.props.handleOnChange("firstname")}
                  fullWidth
                  />
                  </div>
                  <div className="form-input">
                <TextField
                  id="name"
                  label="Last Name"
                  value={this.props.state.lastname}
                  onChange={this.props.handleOnChange("lastname")}
                  fullWidth
                  />
                  </div>
                  <div className="form-input">

                <TextField
                  label="Email Address"
                  type="email"
                  value={this.props.state.email}
                  onChange={this.props.handleOnChange("email")}
                  fullWidth
                  />
                  </div>
                  <div className="form-input">

                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Date picker inline"
          value={this.props.state.dob}
          onChange={this.props.handleOnChange("dob")}
          KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
            />
        </MuiPickersUtilsProvider>
            </div>
        {/* <br /><br /> */}
        <div className="form-input">

        <FormControl component="fieldset">
        <FormLabel component="legend">Gender</FormLabel>
        <RadioGroup aria-label="gender" name="gender1" value={this.props.state.gender} onChange={this.props.handleOnChange("gender")} >
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="male" control={<Radio />} label="Male" />
        </RadioGroup>
      </FormControl>
        </div>
        <div className="form-input">
                <TextField
                label="Number"
                // type="number"
                value={this.props.state.number}
                onChange={this.props.handleOnChange("number")}
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                />
                </div>
                <div className="form-input">
                <TextField
                label="Avatar"
                value={this.props.state.avatar}
                onChange={this.props.handleOnChange("avatar")}
                fullWidth
                />
                </div>
              </DialogContent>
              <DialogActions>
                <Button  variant="outlined" onClick={this.props.handleClose} color="secondary">
                  Cancel
                </Button>
                {this.props.editing && <Button variant="contained" onClick={this.props.edituser} color="primary">
                  Done
                </Button>
                }
                {!this.props.editing && <Button variant="contained" onClick={this.props.addnewuser} color="primary">
                  Add
                </Button>
                }
              </DialogActions>
            </Dialog>
            </div>
        )
    }
}

