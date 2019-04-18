import React from 'react';
import { Menu, Icon, Button, Input, Checkbox, Row, Col, Pagination,  Table, Divider, Tag,Alert  } from 'antd';
import BackHome from '../backIndex';
import UserDetail from '../userDetail';
import ManageUser from '../manageUser';
import Album from '../album/album';
import AddLecture from '../lecture/addLecture';
import ShowLecture from '../lecture/manageLecture';
import UpdateLecture from '../lecture/updateLecture';
import PersonLecture from '../lecture/personLecture';
import ShowFriend from '../friendurl/manageFriend';
import ShowInvitation from '../invitation/manageInvitation';
import UpdateInvatition from '../invitation/updateInvitation';
import AddInvitationShow from '../invitation/addInvitation';
import ManageComment from '../invitation/manageComment';


const routes = [
  {
    path: "/",
    exact: true,
    main: () => <BackHome />
  }, {
    path: "/manageUser",
    main: () => <ManageUser />
  },
  {
    path: "/album",
    main: () => <Album />
  },
  {
    path: "/addLecture",
    main:  () => <AddLecture />
  },
  {
    path: "/manageLecture",
    main:  () => <ShowLecture />
  },
  {
    path: "/updateLecture/:id",
    main:  (props) => <UpdateLecture {...props}/>
  },
  {
    path: "/personLecture/:id",
    main:  (props) => <PersonLecture {...props}/>
  },
  {
    path: "/manageFriendurl",
    main:  (props) => <ShowFriend />
  },
  {
    path: "/manageInvitation",
    main:  () => <ShowInvitation />
  },
  {
    path: "/updateInvitation/:id",
    main:  (props) => <UpdateInvatition {...props}/>
  },
  {
    path: "/addInvitation",
    main:  () => <AddInvitationShow/>
  },
  {
    path: "/manamgeComment/:id",
    main:  (props) => <ManageComment {...props}/>
  }
];
export default routes;