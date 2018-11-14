import React from 'react';

import style from './Sidebar.sass';

export class Sidebar extends React.Component {
  render(){
    return (
      <div className={style.Sidebar}>
        <img src="http://4.bp.blogspot.com/-mVRDp1KWHrc/UQxXQYv5HSI/AAAAAAAAAdk/25XcVn2scCc/s1600/GutsManLR.png" />
      </div>
    )
  }
}
