import React, { Component } from "react";
import axios from "axios";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import MaterialTable from "material-table";
import moment from "moment";
import { forwardRef } from "react";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import CustomDialog from './CustomDialog'
import cookie from 'react-cookies'
import Button from "@material-ui/core/Button";
import { withRouter } from 'react-router-dom';




const tableIcons = {
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />)
};

const columns = [
  {
    field: "avatar",
    title: "Avatar",
    render: rowData => (
      <img
        src={rowData.avatar}
        alt="avatar"
        style={{ width: 40, borderRadius: "50%" }}
      />
    )
  },
  {
    field: "firstName",
    title: "First Name"
  },
  {
    field: "lastName",
    title: "Last Name"
  },
  {
    field: "email",
    title: "Email"
  },
  {
    field: "dob",
    title: "Age",
    render: rowData => moment().diff(moment(rowData.dob), "years")
  },
  {
    field: "gender",
    title: "Gender",
    lookup: { true: "male", false: "female" }
  },
  {
    field: "mobileNumber",
    title: "Number"
  }
];

class List extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      dataloaded: false,
      isopen: false,
      id:'',
      firstname: '',
      lastname:'',
      email:'',
      gender: '',
      avatar: '',
      number:'',
      dob:new Date(),
      editing:false
    };
  }
  componentDidMount() {
    if(!cookie.load('token'))
      this.props.history.push('/')
    this.getalluser();
  }
  getalluser = () => {
    axios
      .get("https://5df923abe9f79e0014b6ae77.mockapi.io/api/users")
      .then(res => this.setState({ data: res.data }))
      .catch(err => console.log(err));
  };
  addUser = () => {
    this.setState({ isopen: true });
  };
  addnewuser = async() => {
    let genderval = true;
    if(this.state.gender === "female")
      genderval=false
    let dat = await axios.post("https://5df923abe9f79e0014b6ae77.mockapi.io/api/users",{
      firstName:this.state.firstname,
      lastName:this.state.lastname,
      email:this.state.email,
      dob:this.state.dob,
      mobileNumber:this.state.number,
      avatar:this.state.avatar,
      gender:genderval
    })
    // .then(res => {console.log(res)})
    // .catch(err => {console.log(err)})
    let user = await this.getalluser()
    this.setState({isopen:false})
  }
  edituser = async() => {
    console.log('editing finished')
    let url = "https://5df923abe9f79e0014b6ae77.mockapi.io/api/users/" + this.state.id
    let genderval = true;
    if(this.state.gender === "female")
      genderval=false
    let dat = await axios.put( url , {
        firstName:this.state.firstname,
        lastName:this.state.lastname,
        email:this.state.email,
        dob:this.state.dob,
        mobileNumber:this.state.number,
        avatar:this.state.avatar,
        gender:genderval
      })
    // .then(res => console.log(res,"edit fin"))
    // .catch(err => console.log(err));
    console.log(dat,"edit done")
    let user = await this.getalluser()
    console.log("updated data")
    this.setState({isopen:false})
  }

  handleClickOpen = () => {
    this.setState({ isopen: true });
  };

  handleClose = () => {
    this.setState({ isopen: false,
    editing:false });
  };
  handleOnChange = field => event => {
    console.log(event,field)
    if(field === "dob")
      this.setState({[field]: event})
    else
    this.setState({[field]: event.target.value})
  }
  handlelogout = () => {
    cookie.remove('token',{path:'/'})
    this.props.history.push('/')
    // this.setState({token:undefined})
}
  handleDelete = async() => {

  }

  render() {
    console.log(this.state);
    return (
      <div className="listview">
        <div className="list-div list-title">All Users</div>
        <div className="list-div list-add">
        <button onClick={this.addUser}>Add user</button>
          <Button  variant="outlined" onClick={this.handlelogout} color="secondary">
                  Logout
                </Button>

          
          <div>
            <CustomDialog  state={this.state} handleOnChange={this.handleOnChange} handleClose={this.handleClose} addnewuser={this.addnewuser} editing={this.state.editing} edituser={this.edituser} />
          </div>
        </div>
        <div className="table">
          <MaterialTable
            title={"User"}
            data={this.state.data}
            columns={columns}
            options={{ pageSize: 20, search: false, actionsColumnIndex: -1 }}
            icons={tableIcons}
            isopen={this.state.isopen}
            actions={[
              {
                icon: EditIcon,
                tootltip: "edit user",
                onClick: (event, rowData) => {
                  let genderval = "male"
                  if(rowData.gender===false)
                    genderval = "female"
                  this.setState({
                    id:rowData.id,
                    firstname:rowData.firstName,
                    lastname:rowData.lastName,
                    number:rowData.mobileNumber,
                    gender:genderval,
                    email:rowData.email,
                    avatar:rowData.avatar,
                    dob:rowData.dob,
                    isopen:true,
                    editing:true
                  })
                  console.log("editing" , rowData);
                  // this.setState({ dataloaded: true });
                }
              },
              {
                icon: DeleteIcon,
                tootltip: "delete user",
                onClick: (event, rowData) => {
                  let url = "https://5df923abe9f79e0014b6ae77.mockapi.io/api/users/" + rowData.id
                    axios.delete(url)
                    .then(res => {this.getalluser()})
                  }
                
              }
            ]}
          />
          }
        </div>
      </div>
    );
  }
}

export default withRouter(List);
